import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../store/AppContext';

export default function StaffMessages() {
  const { messages, addMessage } = useApp();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    addMessage(input.trim(), 'staff');
    setInput('');
  };

  return (
    <div className="page-container">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1>Messages</h1>
        <p>Communicate with parents</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        <div className="chat-container">
          <div className="chat-header">
            <div className="chat-avatar" style={{ background: '#DBEAFE', color: '#1E3A8A' }}>ST</div>
            <div className="chat-header-info">
              <h4>Sarah Thompson</h4>
              <span>● Online — Emma's Parent</span>
            </div>
          </div>

          <div className="chat-messages" ref={scrollRef}>
            {messages.map((msg, i) => (
              <motion.div
                key={msg.id}
                className={`chat-msg ${msg.sender === 'staff' ? 'sent' : 'received'}`}
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
      </motion.div>
    </div>
  );
}
