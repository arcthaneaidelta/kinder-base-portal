import { motion } from 'framer-motion';
import { useApp } from '../../store/AppContext';

export default function AdminLogs() {
  const { alerts } = useApp();

  const logs = [
    { action: 'Sarah Thompson marked Emma as "On the Way"', time: '7:55 AM', type: 'status' },
    { action: 'Maria Martinez reported Sophia absent', time: '7:45 AM', type: 'status' },
    { action: 'Jennifer Brown reported Olivia running late', time: '8:10 AM', type: 'status' },
    { action: 'Ms. Rachel logged meal for Emma Thompson', time: '9:30 AM', type: 'activity' },
    { action: 'Ms. Rachel logged outdoor play for Emma', time: '10:15 AM', type: 'activity' },
    { action: 'Mr. James logged snack for Liam Johnson', time: '9:30 AM', type: 'activity' },
    { action: 'Payment received from Sarah Thompson — $1,200', time: '8:00 AM', type: 'payment' },
    { action: 'Lisa Wilson marked Ava as "On the Way"', time: '8:20 AM', type: 'status' },
    ...alerts.map(a => ({
      action: `${a.parentName}: ${a.message}`,
      time: a.time,
      type: 'alert' as string,
    })),
  ].sort(() => Math.random() - 0.5).slice(0, 12);

  const typeColors: Record<string, { bg: string; color: string; label: string }> = {
    status: { bg: '#DBEAFE', color: '#1D4ED8', label: 'Status' },
    activity: { bg: '#D1FAE5', color: '#059669', label: 'Activity' },
    payment: { bg: '#FEF3C7', color: '#D97706', label: 'Payment' },
    alert: { bg: '#FEE2E2', color: '#DC2626', label: 'Alert' },
  };

  return (
    <div className="page-container">
      <motion.div className="page-header" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1>Activity Logs</h1>
        <p>Complete audit trail of parent and staff activity</p>
      </motion.div>

      <motion.div className="table-container" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}>
        <div className="table-header">
          <span className="table-title">Today's Log</span>
          <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{logs.length} events</span>
        </div>
        {logs.map((log, i) => (
          <motion.div
            key={i}
            className="alert-item"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.02 * i }}
          >
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: typeColors[log.type]?.color || '#6B7280',
              flexShrink: 0, marginTop: 6,
            }} />
            <div className="alert-content">
              <div className="alert-title" style={{ fontSize: '0.8rem' }}>{log.action}</div>
              <div className="alert-time">{log.time}</div>
            </div>
            <span style={{
              fontSize: '0.65rem', fontWeight: 600,
              padding: '0.125rem 0.5rem', borderRadius: 999,
              background: typeColors[log.type]?.bg || '#F3F4F6',
              color: typeColors[log.type]?.color || '#6B7280',
            }}>
              {typeColors[log.type]?.label || 'Event'}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
