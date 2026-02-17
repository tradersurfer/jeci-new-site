import { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AdminLayout from '@/components/portal/AdminLayout';
import { portalFetch, usePortalAuth } from '@/components/portal/PortalAuthContext';

interface Conversation {
  userId: string;
  fullName: string;
  lastMessage?: string;
  lastMessageDate?: string;
  unreadCount?: number;
}

interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  createdAt: string;
  senderName?: string;
}

export default function AdminMessages() {
  const { user } = usePortalAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await portalFetch('/api/portal/admin/messages');
        if (res.ok) setConversations(await res.json());
      } catch {}
      setLoading(false);
    };
    fetchConversations();
  }, []);

  useEffect(() => {
    if (!selectedUserId) return;
    const fetchThread = async () => {
      try {
        const res = await portalFetch(`/api/portal/messages/${selectedUserId}`);
        if (res.ok) setMessages(await res.json());
      } catch {}
    };
    fetchThread();
    const interval = setInterval(fetchThread, 5000);
    return () => clearInterval(interval);
  }, [selectedUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedUserId) return;
    setSending(true);
    try {
      await portalFetch('/api/portal/messages', {
        method: 'POST',
        body: JSON.stringify({ recipientId: selectedUserId, content: newMessage }),
      });
      setNewMessage('');
      const res = await portalFetch(`/api/portal/messages/${selectedUserId}`);
      if (res.ok) setMessages(await res.json());
    } catch {}
    setSending(false);
  };

  const selectedConvo = conversations.find((c) => c.userId === selectedUserId);

  return (
    <AdminLayout title="Messages">
      <div className="flex bg-white rounded-lg border overflow-hidden" style={{ height: 'calc(100vh - 160px)' }}>
        <div className={`w-full md:w-80 border-r flex flex-col ${selectedUserId ? 'hidden md:flex' : ''}`} data-testid="conversations-list">
          <div className="p-3 border-b">
            <h3 className="font-semibold text-sm text-slate-700">Conversations</h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-slate-400 text-sm">Loading...</div>
            ) : conversations.length === 0 ? (
              <div className="p-4 text-center text-slate-400 text-sm">No conversations</div>
            ) : (
              conversations.map((convo) => (
                <button
                  key={convo.userId}
                  onClick={() => setSelectedUserId(convo.userId)}
                  data-testid={`conversation-${convo.userId}`}
                  className={`w-full text-left px-4 py-3 border-b hover:bg-slate-50 transition-colors ${
                    selectedUserId === convo.userId ? 'bg-slate-50 border-l-4 border-l-amber-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm text-slate-800">{convo.fullName}</span>
                    {(convo.unreadCount ?? 0) > 0 && (
                      <Badge className="bg-red-500 text-white text-[10px] min-w-[20px] h-5 flex items-center justify-center" data-testid={`unread-${convo.userId}`}>
                        {convo.unreadCount}
                      </Badge>
                    )}
                  </div>
                  {convo.lastMessage && (
                    <p className="text-xs text-slate-500 mt-1 truncate">{convo.lastMessage}</p>
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        <div className={`flex-1 flex flex-col ${!selectedUserId ? 'hidden md:flex' : ''}`} data-testid="message-thread">
          {selectedUserId ? (
            <>
              <div className="p-3 border-b flex items-center gap-2">
                <button
                  onClick={() => setSelectedUserId(null)}
                  className="md:hidden text-sm text-amber-600"
                  data-testid="back-to-conversations"
                >
                  ← Back
                </button>
                <h3 className="font-semibold text-sm text-slate-700" data-testid="thread-name">
                  {selectedConvo?.fullName || 'Conversation'}
                </h3>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => {
                  const isAdmin = msg.senderId === user?.id;
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}
                      data-testid={`message-${msg.id}`}
                    >
                      <div className={`max-w-[70%] rounded-lg px-3 py-2 text-sm ${
                        isAdmin ? 'bg-[#0f172a] text-white' : 'bg-slate-100 text-slate-800'
                      }`}>
                        <p>{msg.content}</p>
                        <p className={`text-[10px] mt-1 ${isAdmin ? 'text-slate-400' : 'text-slate-500'}`}>
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
              <div className="p-3 border-t flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                  data-testid="message-input"
                />
                <Button
                  onClick={sendMessage}
                  disabled={sending || !newMessage.trim()}
                  data-testid="send-message"
                  className="bg-amber-600 text-white hover:bg-amber-700"
                >
                  <Send size={16} />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
              Select a conversation to view messages
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
