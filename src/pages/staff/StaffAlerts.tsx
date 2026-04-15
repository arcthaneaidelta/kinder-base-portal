import { motion } from 'framer-motion';
import { useApp } from '../../store/AppContext';

export default function StaffAlerts() {
  const { alerts, markAlertRead } = useApp();

  return (
    <div className="page-container">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1>Parent Alerts</h1>
        <p>Incoming notifications from parents</p>
      </motion.div>

      <motion.div
        className="table-container"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        <div className="table-header">
          <span className="table-title">Recent Alerts</span>
          <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>
            {alerts.filter(a => !a.read).length} unread
          </span>
        </div>
        {alerts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            </div>
            <h3>No alerts yet</h3>
            <p>Parent notifications will appear here</p>
          </div>
        ) : (
          alerts.map((alert, i) => (
            <motion.div
              key={alert.id}
              className={`alert-item ${!alert.read ? 'unread' : ''}`}
              onClick={() => markAlertRead(alert.id)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: 0.03 * i }}
            >
              <div className="alert-avatar" style={{ background: alert.avatarBg, color: '#1E3A8A' }}>
                {alert.avatar}
              </div>
              <div className="alert-content">
                <div className="alert-title">{alert.parentName}</div>
                <div className="alert-message">{alert.message}</div>
                <div className="alert-time">
                  {alert.time} · {alert.childName}
                </div>
              </div>
              <span className={`alert-type-badge ${alert.type}`}>
                {alert.type === 'absent' ? 'Absent' : alert.type === 'late' ? 'Late' : 'On Way'}
              </span>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}
