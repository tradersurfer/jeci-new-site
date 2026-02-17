import { useState, useEffect, useRef, useCallback } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { usePortalAuth, portalFetch } from '@/components/portal/PortalAuthContext';
import PortalLayout from '@/components/portal/PortalLayout';

interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  messageText: string | null;
  isRead: boolean;
  sentAt: string;
}

export default function ChatTab() {
  const { user } = usePortalAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [adminId, setAdminId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await portalFetch('/api/portal/messages');
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
        if (!adminId && data.length > 0 && user) {
          const otherMsg = data.find((m: Message) => m.senderId !== user.id);
          if (otherMsg) setAdminId(otherMsg.senderId);
        }
      }
    } catch {}
  }, [adminId, user]);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || sending) return;
    setSending(true);
    try {
      const body: { messageText: string; recipientId?: string } = { messageText: input.trim() };
      if (adminId) body.recipientId = adminId;
      else body.recipientId = 'admin';
      await portalFetch('/api/portal/messages', {
        method: 'POST',
        body: JSON.stringify(body),
      });
      setInput('');
      await fetchMessages();
    } catch {}
    setSending(false);
    inputRef.current?.focus();
  };

  const formatTime = (d: string) => {
    const date = new Date(d);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    if (isToday) return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <PortalLayout>
      <div className="flex flex-col" style={{ height: 'calc(100vh - 140px)' }}>
        <h1 className="text-xl font-bold text-[#0f172a] mb-3" data-testid="chat-title">Messages</h1>

        <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 mb-3 pr-1" data-testid="message-list">
          {messages.length === 0 ? (
            <Card className="border-0 shadow-sm">
              <CardContent className="py-12 text-center">
                <MessageCircle className="mx-auto text-slate-300 mb-3" size={48} />
                <p className="text-slate-500 font-medium">Welcome!</p>
                <p className="text-slate-400 text-sm mt-1">Send us a message and we'll get back to you shortly.</p>
              </CardContent>
            </Card>
          ) : (
            messages.map((msg) => {
              const isOwn = msg.senderId === user?.id;
              return (
                <div key={msg.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`} data-testid={`message-${msg.id}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                    isOwn ? 'bg-blue-600 text-white rounded-br-md' : 'bg-slate-200 text-slate-800 rounded-bl-md'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.messageText}</p>
                    <div className={`flex items-center gap-1 mt-1 ${isOwn ? 'justify-end' : ''}`}>
                      <span className={`text-[10px] ${isOwn ? 'text-blue-200' : 'text-slate-400'}`}>
                        {formatTime(msg.sentAt)}
                      </span>
                      {isOwn && (
                        <span className={`text-[10px] ${msg.isRead ? 'text-blue-200' : 'text-blue-300'}`}>
                          {msg.isRead ? '✓✓' : '✓'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <form onSubmit={handleSend} className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl p-2" data-testid="chat-form">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="border-0 shadow-none focus-visible:ring-0 h-10"
            data-testid="input-message"
          />
          <Button
            type="submit"
            disabled={!input.trim() || sending}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-10 h-10 p-0 shrink-0"
            data-testid="button-send"
          >
            <Send size={18} />
          </Button>
        </form>
      </div>
    </PortalLayout>
  );
}
