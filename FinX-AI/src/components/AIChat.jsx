
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

const AIChat = ({ messages, onSendMessage }) => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      onSendMessage(inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div className="glass-card rounded-xl flex flex-col h-[500px]">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-lg font-semibold flex items-center">
          <span className="h-2 w-2 rounded-full bg-finance-positive mr-2 animate-pulse-slow"></span>
          AI Financial Advisor
        </h2>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-xl p-3 ${
                message.role === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-secondary'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask about market insights..."
            className="flex-grow bg-secondary rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-white p-2 rounded-lg transition"
          >
            <Send size={20} />
          </button>
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          Try asking: "What are the risks for Apple stock?" or "Analyze recent market trends"
        </div>
      </form>
    </div>
  );
};

export default AIChat;
