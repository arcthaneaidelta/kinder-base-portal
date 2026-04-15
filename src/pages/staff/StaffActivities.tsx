import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../store/AppContext';

const activityTypes = [
  { value: 'meal', label: 'Meal', icon: '🍽️' },
  { value: 'nap', label: 'Nap', icon: '😴' },
  { value: 'play', label: 'Play', icon: '🎨' },
  { value: 'diaper', label: 'Diaper', icon: '👶' },
  { value: 'note', label: 'Note', icon: '📝' },
];

export default function StaffActivities() {
  const { children, showToast } = useApp();
  const [selectedChild, setSelectedChild] = useState(children[0].id);
  const [actType, setActType] = useState('meal');
  const [note, setNote] = useState('');
  const [recentLogs, setRecentLogs] = useState<{ child: string; type: string; note: string; time: string }[]>([]);

  const handleSubmit = () => {
    if (!note.trim()) {
      showToast('Please add a note');
      return;
    }
    const child = children.find(c => c.id === selectedChild)!;
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    setRecentLogs(prev => [{ child: child.name, type: actType, note: note.trim(), time }, ...prev]);
    setNote('');
    showToast(`Activity logged for ${child.name}`);
  };

  return (
    <div className="page-container">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1>Activity Updates</h1>
        <p>Log meals, naps, activities, and notes for children</p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Log Form */}
        <motion.div
          className="card-static"
          style={{ padding: '1.5rem' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <h3 style={{ fontSize: '1rem', marginBottom: '1.25rem' }}>Log New Activity</h3>

          <div className="form-group">
            <label className="form-label">Child</label>
            <select
              className="form-input"
              value={selectedChild}
              onChange={e => setSelectedChild(e.target.value)}
              style={{ cursor: 'pointer' }}
            >
              {children.map(c => (
                <option key={c.id} value={c.id}>{c.name} — {c.classroom}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Activity Type</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {activityTypes.map(t => (
                <motion.button
                  key={t.value}
                  className={`btn ${actType === t.value ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                  onClick={() => setActType(t.value)}
                  whileTap={{ scale: 0.95 }}
                >
                  {t.icon} {t.label}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Notes</label>
            <textarea
              className="announcement-textarea"
              placeholder="E.g., Emma ate all her lunch today..."
              value={note}
              onChange={e => setNote(e.target.value)}
              style={{ minHeight: '80px' }}
            />
          </div>

          <motion.button
            className="btn btn-primary w-full"
            onClick={handleSubmit}
            whileTap={{ scale: 0.97 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Log Activity
          </motion.button>
        </motion.div>

        {/* Recent Logs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="table-container">
            <div className="table-header">
              <span className="table-title">Recent Logs</span>
              <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{recentLogs.length} today</span>
            </div>
            {recentLogs.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                </div>
                <h3>No activities logged yet</h3>
                <p>Use the form to log child activities</p>
              </div>
            ) : (
              recentLogs.map((log, i) => (
                <motion.div
                  key={i}
                  className="alert-item"
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%', background: '#F3F4F6',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem'
                  }}>
                    {activityTypes.find(t => t.value === log.type)?.icon}
                  </div>
                  <div className="alert-content">
                    <div className="alert-title">{log.child}</div>
                    <div className="alert-message">{log.note}</div>
                    <div className="alert-time">{log.time} · {activityTypes.find(t => t.value === log.type)?.label}</div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
