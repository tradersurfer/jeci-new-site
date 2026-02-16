import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Clock, User, Phone, Mail, ChevronRight, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocation } from 'wouter';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [, setLocation] = useLocation();
  
  // Pre-chat form state
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    question: ''
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Initial greeting sound/visual cue could go here
  useEffect(() => {
    // Simulate "Away" status based on time (Example: 9am-5pm EST is "Online")
    // For mockup, we'll assume "Online" or just show the away message if needed.
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasStarted(true);
    
    // Add user's initial question
    const initialUserMsg: Message = {
      id: Date.now().toString(),
      text: form.question,
      sender: 'user',
      timestamp: new Date()
    };
    
    // Add automated greeting
    const greetingMsg: Message = {
      id: (Date.now() + 1).toString(),
      text: `Hi ${form.name}! Thanks for reaching out. A JECI Group expert will be with you shortly. In the meantime, how can we help you achieve your financial goals today?`,
      sender: 'agent',
      timestamp: new Date()
    };

    setMessages([initialUserMsg, greetingMsg]);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newMsg]);
    setInputValue("");

    // Simulate automated reply after a delay
    setTimeout(() => {
      const autoReply: Message = {
        id: Date.now().toString(),
        text: "Thanks for that detail. Based on what you're saying, a Business Strategy Session might be the best starting point. Would you like to see available times?",
        sender: 'agent',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, autoReply]);
    }, 2000);
  };

  const handleQuickReply = (text: string) => {
    const newMsg: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages([...messages, newMsg]);

    // Handle specific quick reply logic
    setTimeout(() => {
      let replyText = "We can certainly help with that.";
      if (text.includes("book")) {
        replyText = "Great! You can view our full calendar and book directly here: /book-consultation";
        // Optionally redirect or show a link
      } else if (text.includes("prices")) {
        replyText = "Our services range from Free Consultations to Premium Packages. You can see our full price list on our Services page.";
      }
      
      const autoReply: Message = {
        id: Date.now().toString(),
        text: replyText,
        sender: 'agent',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, autoReply]);
    }, 1000);
  };

  const quickReplies = [
    "I want to book a consultation",
    "What services do you offer?",
    "What are your prices?",
    "Do you work with crypto/real estate?"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Chat Button */}
      {!isOpen && (
        <Button 
          onClick={() => setIsOpen(true)}
          className="h-16 w-16 rounded-full bg-secondary text-primary hover:bg-white hover:text-primary shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110"
        >
          <MessageCircle size={32} />
          <span className="absolute top-0 right-0 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></span>
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="w-[380px] h-[600px] flex flex-col shadow-2xl border-0 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          {/* Header */}
          <div className="bg-primary p-4 flex justify-between items-center text-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-secondary font-bold font-serif">
                  J
                </div>
                <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-primary"></span>
              </div>
              <div>
                <h3 className="font-bold text-sm">The JECI Group</h3>
                <p className="text-[10px] text-white/70 flex items-center gap-1">
                  <Clock size={10} /> Online Now
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Pre-Chat Form */}
          {!hasStarted ? (
            <CardContent className="flex-1 p-6 bg-slate-50 overflow-y-auto">
              <div className="text-center mb-6">
                <h4 className="font-serif font-bold text-lg text-primary mb-2">Welcome!</h4>
                <p className="text-sm text-slate-600">
                  Hi! Need help choosing a service? Start with a FREE 30-minute consultation!
                </p>
              </div>
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input 
                      required 
                      className="pl-9 bg-white" 
                      placeholder="Your Name"
                      value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})} 
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input 
                      required 
                      type="email" 
                      className="pl-9 bg-white" 
                      placeholder="name@example.com"
                      value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})} 
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone (Optional)</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input 
                      className="pl-9 bg-white" 
                      placeholder="(555) 555-5555"
                      value={form.phone}
                      onChange={e => setForm({...form, phone: e.target.value})} 
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">How can we help? *</label>
                  <Textarea 
                    required 
                    className="bg-white min-h-[80px]" 
                    placeholder="I have a question about taxes..."
                    value={form.question}
                    onChange={e => setForm({...form, question: e.target.value})} 
                  />
                </div>

                <Button type="submit" className="w-full bg-secondary text-primary hover:bg-primary hover:text-white font-bold">
                  Start Chat <ChevronRight size={16} className="ml-1" />
                </Button>
              </form>
            </CardContent>
          ) : (
            <>
              {/* Chat Messages */}
              <div className="flex-1 p-4 bg-slate-50 overflow-y-auto space-y-4">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                        msg.sender === 'user' 
                          ? 'bg-secondary text-primary rounded-br-none font-medium' 
                          : 'bg-white text-slate-700 border border-slate-200 rounded-bl-none shadow-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                
                {/* Quick Replies (Only show if last message was from agent) */}
                {messages.length > 0 && messages[messages.length - 1].sender === 'agent' && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {quickReplies.map((reply, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuickReply(reply)}
                        className="text-xs bg-primary/5 text-primary border border-primary/10 px-3 py-1.5 rounded-full hover:bg-primary hover:text-white transition-colors text-left"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
                <Input 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..." 
                  className="bg-slate-50 border-slate-200 focus-visible:ring-secondary"
                />
                <Button 
                  onClick={handleSendMessage}
                  size="icon" 
                  className="bg-primary hover:bg-secondary hover:text-primary transition-colors shrink-0"
                >
                  <Send size={18} />
                </Button>
              </div>
            </>
          )}
        </Card>
      )}
    </div>
  );
}
