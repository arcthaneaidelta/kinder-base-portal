import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../store/AppContext';

export default function AdminAnnouncements() {
  const { announcements, addAnnouncement, showToast } = useApp();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [audience, setAudience] = useState('All Parents');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      showToast('Please fill in all fields');
      return;
    }

    addAnnouncement({
      title: title.trim(),
      body: body.trim(),
      author: 'Admin Director',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      audience,
    });

    setTitle('');
    setBody('');
    showToast('Announcement broadcasted successfully');
  };

  return (
    <div className="page-container">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1>Broadcast Announcements</h1>
        <p>Send center-wide updates to parents and staff</p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '2rem', alignItems: 'start' }}>
        {/* Create Announcement */}
        <motion.div
          className="announcement-form"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Announcement Title</label>
              <input
                className="form-input"
                placeholder="e.g. Center Closure - Monday, April 25"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Target Audience</label>
              <select
                className="form-input"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
              >
                <option>All Parents</option>
                <option>All Staff</option>
                <option>All Parents & Staff</option>
                <option>Butterflies Class Only</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Message Content</label>
              <textarea
                className="announcement-textarea"
                placeholder="Write your detailed update here..."
                rows={6}
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>

            <div className="announcement-actions">
              <p style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 4, verticalAlign: 'middle' }}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                This will be sent as a push notification
              </p>
              <button type="submit" className="btn btn-primary">
                Broadcast Now
              </button>
            </div>
          </form>
        </motion.div>

        {/* History */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="section-header">
            <span className="section-title">Broadcast History</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <AnimatePresence initial={false}>
              {announcements.map((ann) => (
                <motion.div
                  key={ann.id}
                  className="announcement-item"
                  layout
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                    <h4>{ann.title}</h4>
                    <span style={{ fontSize: '0.65rem', color: '#9CA3AF', fontWeight: 500 }}>{ann.date}</span>
                  </div>
                  <p>{ann.body}</p>
                  <div className="announcement-meta">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                      {ann.audience}
                    </div>
                    <span>•</span>
                    <div>{ann.author}</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
