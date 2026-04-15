import { motion } from 'framer-motion';
import { useApp } from '../../store/AppContext';

export default function AdminMessages() {
  const { messages } = useApp();

  return (
    <div className="page-container">
      <motion.div className="page-header" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1>Message Center</h1>
        <p>Overview of all parent-staff communications</p>
      </motion.div>

      {/* Conversation threads */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        <div className="table-container">
          <div className="table-header">
            <span className="table-title">Active Conversations</span>
            <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>3 active threads</span>
          </div>

          {[
            { parent: 'Sarah Thompson', staff: 'Ms. Rachel Kim', child: 'Emma', lastMsg: messages[messages.length - 1]?.text || 'No messages', time: messages[messages.length - 1]?.time || '', avatar: 'ST', bg: '#DBEAFE', unread: 0 },
            { parent: 'Michael Johnson', staff: 'Mr. James Lee', child: 'Liam', lastMsg: 'Liam had a great day today! See you tomorrow.', time: '3:45 PM', avatar: 'MJ', bg: '#D1FAE5', unread: 1 },
            { parent: 'Maria Martinez', staff: 'Ms. Rachel Kim', child: 'Sophia', lastMsg: 'Hope Sophia feels better soon! We miss her.', time: '8:15 AM', avatar: 'MM', bg: '#FEF3C7', unread: 0 },
          ].map((conv, i) => (
            <motion.div
              key={i}
              className="alert-item"
              style={{ cursor: 'pointer' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 * i }}
            >
              <div className="alert-avatar" style={{ background: conv.bg, color: '#1E3A8A' }}>
                {conv.avatar}
              </div>
              <div className="alert-content" style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="alert-title" style={{ fontSize: '0.85rem' }}>
                    {conv.parent} ↔ {conv.staff}
                  </div>
                  <span style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>{conv.time}</span>
                </div>
                <div className="alert-message" style={{ fontSize: '0.8rem' }}>
                  Re: {conv.child} — {conv.lastMsg}
                </div>
              </div>
              {conv.unread > 0 && (
                <span style={{
                  width: 20, height: 20, borderRadius: '50%', background: '#EF4444', color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.6rem', fontWeight: 700, flexShrink: 0
                }}>
                  {conv.unread}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Message Preview */}
      <motion.div
        style={{ marginTop: '1.5rem' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="table-container">
          <div className="table-header">
            <span className="table-title">Sarah Thompson ↔ Ms. Rachel Kim</span>
            <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Re: Emma Thompson</span>
          </div>
          <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: 360, overflowY: 'auto' }}>
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`chat-msg ${msg.sender === 'parent' ? 'received' : 'sent'}`}
                style={{ maxWidth: '60%' }}
              >
                <div style={{ fontSize: '0.65rem', fontWeight: 600, marginBottom: 2, opacity: 0.7 }}>
                  {msg.sender === 'parent' ? 'Sarah Thompson' : 'Ms. Rachel Kim'}
                </div>
                {msg.text}
                <div className="chat-msg-time">{msg.time}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
