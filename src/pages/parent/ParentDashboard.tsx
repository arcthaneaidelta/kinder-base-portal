import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../store/AppContext';
import { activities } from '../../data/mockData';

export default function ParentDashboard() {
  const { children, updateChildStatus, addAlert, showToast, setParentPage } = useApp();
  const child = children[0]; // Emma Thompson
  const [pressedBtn, setPressedBtn] = useState<string | null>(null);

  const todayActivities = activities.filter(a => a.childId === child.id).slice(0, 3);

  const handleQuickAction = (type: 'absent' | 'on-way' | 'late') => {
    const labels = { absent: 'Absent Today', 'on-way': 'On the Way', late: 'Running Late' };
    setPressedBtn(type);
    updateChildStatus(child.id, type === 'on-way' ? 'on-way' : type);
    addAlert({
      parentName: child.parentName,
      childName: child.name,
      type,
      message: type === 'absent'
        ? `${child.name} will be absent today.`
        : type === 'late'
        ? `Running late — ${child.name} will arrive soon.`
        : `On the way with ${child.name}!`,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      read: false,
      avatarBg: child.avatarBg,
      avatar: child.avatar,
    });
    showToast(`"${labels[type]}" sent to staff`);
    setTimeout(() => setPressedBtn(null), 2000);
  };

  return (
    <div className="parent-page">
      {/* Greeting */}
      <motion.div
        style={{ marginBottom: '1.5rem' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 style={{ fontSize: '1.375rem', marginBottom: '0.125rem' }}>Good Morning, Sarah 👋</h2>
        <p style={{ fontSize: '0.85rem', color: '#6B7280' }}>Here's what's happening with Emma today</p>
      </motion.div>

      {/* Child Status Card */}
      <motion.div
        className="card-static"
        style={{ padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div style={{
          width: 52, height: 52, borderRadius: '50%', background: child.avatarBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: '1rem', color: '#1E3A8A'
        }}>
          {child.avatar}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: '1rem', color: '#111827', marginBottom: 2 }}>{child.name}</div>
          <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>{child.classroom} · Age {child.age}</div>
        </div>
        <span className={`badge-status ${child.status}`}>
          <span className="dot"></span>
          {child.status === 'present' ? 'Present' : child.status === 'on-way' ? 'On the Way' : child.status === 'late' ? 'Running Late' : 'Absent'}
        </span>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <div className="section-header">
          <span className="section-title">Quick Actions</span>
        </div>
        <div className="quick-actions">
          <motion.button
            className={`quick-action-btn ${pressedBtn === 'absent' ? 'pressed' : ''}`}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleQuickAction('absent')}
          >
            <div className="qa-icon red">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            </div>
            <span>Absent Today</span>
          </motion.button>
          <motion.button
            className={`quick-action-btn ${pressedBtn === 'on-way' ? 'pressed' : ''}`}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleQuickAction('on-way')}
          >
            <div className="qa-icon blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <span>On the Way</span>
          </motion.button>
          <motion.button
            className={`quick-action-btn ${pressedBtn === 'late' ? 'pressed' : ''}`}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleQuickAction('late')}
          >
            <div className="qa-icon amber">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <span>Running Late</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="section-header">
          <span className="section-title">Today's Activity</span>
          <button className="section-link" onClick={() => setParentPage('activity')}>View All</button>
        </div>
        <div className="card-static" style={{ padding: '0.5rem 1rem' }}>
          {todayActivities.map(act => (
            <div key={act.id} className="activity-item">
              <div className={`activity-icon ${act.type}`}>
                {act.type === 'meal' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>}
                {act.type === 'play' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>}
                {act.type === 'nap' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7"/></svg>}
                {act.type === 'diaper' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}
                {act.type === 'note' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>}
                {act.type === 'photo' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>}
              </div>
              <div className="activity-info">
                <div className="activity-title">{act.title}</div>
                <div className="activity-desc">{act.description}</div>
                <div className="activity-time">{act.time} · {act.staffName}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Upcoming info */}
      <motion.div
        style={{ marginTop: '1.5rem' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
      >
        <div className="section-header">
          <span className="section-title">Reminders</span>
        </div>
        <div className="card-static" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: '#DBEAFE', color: '#1D4ED8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#111827' }}>Spring Photo Day</div>
              <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>April 18, 2025 · Dress to impress!</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#111827' }}>Tuition Due</div>
              <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>May 1, 2025 · $1,200.00</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
