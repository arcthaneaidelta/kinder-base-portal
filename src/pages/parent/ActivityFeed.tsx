import { motion } from 'framer-motion';
import { activities } from '../../data/mockData';
import React from 'react';

const iconMap: Record<string, React.ReactElement> = {
  meal: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>,
  play: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>,
  nap: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7"/></svg>,
  diaper: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  note: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  photo: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
};

export default function ActivityFeed() {
  const childActivities = activities.filter(a => a.childId === 'c1');

  return (
    <div className="parent-page">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Activity Feed</h2>
        <p style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '1.25rem' }}>Emma's daily updates from staff</p>
      </motion.div>

      {/* Date header */}
      <motion.div
        style={{
          fontSize: '0.7rem', fontWeight: 600, color: '#9CA3AF',
          textTransform: 'uppercase', letterSpacing: '0.06em',
          marginBottom: '0.75rem', paddingLeft: '0.25rem'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Today — April 15, 2025
      </motion.div>

      <div className="card-static" style={{ padding: '0.5rem 1rem' }}>
        <div className="activity-list">
          {childActivities.map((act, i) => (
            <motion.div
              key={act.id}
              className="activity-item"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.05 * i }}
            >
              <div className={`activity-icon ${act.type}`}>
                {iconMap[act.type]}
              </div>
              <div className="activity-info">
                <div className="activity-title">{act.title}</div>
                <div className="activity-desc">{act.description}</div>
                <div className="activity-time">{act.time} · {act.staffName}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
