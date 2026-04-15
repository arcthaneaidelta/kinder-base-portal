import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../store/AppContext';

export default function ParentMessages() {
  const { messages, addMessage } = useApp();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    addMessage(input.trim(), 'parent');
    setInput('');
    // Simulate staff reply after 1.5s
    setTimeout(() => {
      const replies = [
        'Thank you for letting us know! 😊',
        'Got it! We\'ll keep you updated.',
        'No worries at all. Have a great day!',
        'Absolutely! Emma is doing wonderfully today.',
      ];
      addMessage(replies[Math.floor(Math.random() * replies.length)], 'staff');
    }, 1500);
  };

  return (
    <div style={{ padding: '0', height: 'calc(100vh - 140px)' }}>
      <div className="chat-container" style={{ height: '100%', border: 'none', borderRadius: 0 }}>
        <div className="chat-header">
          <div className="chat-avatar" style={{ background: '#CCFBF1', color: '#0D9488' }}>RK</div>
          <div className="chat-header-info">
            <h4>Ms. Rachel Kim</h4>
            <span>● Online — Butterflies Class</span>
          </div>
        </div>

        <div className="chat-messages" ref={scrollRef}>
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              className={`chat-msg ${msg.sender === 'parent' ? 'sent' : 'received'}`}
              initial={i >= messages.length - 1 ? { opacity: 0, y: 10, scale: 0.95 } : false}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {msg.text}
              <div className="chat-msg-time">{msg.time}</div>
            </motion.div>
          ))}
        </div>

        <div className="chat-input-bar">
          <input
            className="chat-input"
            placeholder="Type a message…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
          <button className="chat-send-btn" onClick={handleSend}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
