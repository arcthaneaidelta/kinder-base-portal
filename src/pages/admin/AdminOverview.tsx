import { motion } from 'framer-motion';
import { useApp } from '../../store/AppContext';
import { payments } from '../../data/mockData';

export default function AdminOverview() {
  const { children, alerts, setAdminPage } = useApp();

  const presentCount = children.filter(c => c.status === 'present').length;
  const totalRevenue = payments.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount, 0);
  const pendingPayments = payments.filter(p => p.status === 'pending' || p.status === 'overdue').length;
  const unreadAlerts = alerts.filter(a => !a.read).length;

  const stats = [
    { label: 'Children Present', value: `${presentCount}/${children.length}`, color: 'green', trend: '+2 today', trendDir: 'up' as const, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
    { label: 'Revenue (Apr)', value: `$${totalRevenue.toLocaleString()}`, color: 'blue', trend: '+12%', trendDir: 'up' as const, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
    { label: 'Pending Payments', value: pendingPayments.toString(), color: 'amber', trend: '2 overdue', trendDir: 'down' as const, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
    { label: 'Unread Alerts', value: unreadAlerts.toString(), color: 'teal', trend: 'from parents', trendDir: 'up' as const, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg> },
  ];

  return (
    <div className="page-container">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1>Dashboard Overview</h1>
        <p>Welcome back, Admin — here's today's snapshot</p>
      </motion.div>

      <motion.div
        className="stats-grid"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        {stats.map((s, i) => (
          <motion.div
            key={i}
            className="stat-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 * i }}
          >
            <div className="stat-card-header">
              <div className={`stat-card-icon ${s.color}`}>{s.icon}</div>
              <span className={`stat-card-trend ${s.trendDir}`}>{s.trend}</span>
            </div>
            <div className="stat-card-value">{s.value}</div>
            <div className="stat-card-label">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Recent Alerts */}
        <motion.div
          className="table-container"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <div className="table-header">
            <span className="table-title">Recent Alerts</span>
            <button className="section-link" onClick={() => setAdminPage('attendance')}>View All</button>
          </div>
          {alerts.slice(0, 4).map((alert, i) => (
            <div key={alert.id} className="alert-item" style={{ padding: '0.75rem 1.25rem' }}>
              <div className="alert-avatar" style={{ background: alert.avatarBg, color: '#1E3A8A', width: 34, height: 34, fontSize: '0.75rem' }}>
                {alert.avatar}
              </div>
              <div className="alert-content">
                <div className="alert-title" style={{ fontSize: '0.8rem' }}>{alert.parentName}</div>
                <div className="alert-message" style={{ fontSize: '0.75rem' }}>{alert.message}</div>
              </div>
              <span className={`alert-type-badge ${alert.type}`}>
                {alert.type === 'absent' ? 'Absent' : alert.type === 'late' ? 'Late' : 'On Way'}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Payment Summary */}
        <motion.div
          className="table-container"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="table-header">
            <span className="table-title">Payment Status</span>
            <button className="section-link" onClick={() => setAdminPage('payments')}>View All</button>
          </div>
          {payments.slice(0, 5).map(p => (
            <div key={p.id} className="alert-item" style={{ padding: '0.75rem 1.25rem' }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%', background: '#F3F4F6',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 600, fontSize: '0.7rem', color: '#374151'
              }}>
                {p.parentName.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="alert-content">
                <div className="alert-title" style={{ fontSize: '0.8rem' }}>{p.parentName}</div>
                <div className="alert-message" style={{ fontSize: '0.75rem' }}>${p.amount} · {p.plan}</div>
              </div>
              <span className={`badge-status ${p.status}`}>
                <span className="dot"></span>
                {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Attendance Quick View */}
      <motion.div
        className="table-container"
        style={{ marginTop: '1.5rem' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
      >
        <div className="table-header">
          <span className="table-title">Today's Attendance</span>
          <button className="section-link" onClick={() => setAdminPage('attendance')}>Full View</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Child</th>
              <th>Classroom</th>
              <th>Parent</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {children.slice(0, 5).map(child => (
              <tr key={child.id}>
                <td>
                  <div className="attendance-child">
                    <div className="attendance-child-avatar" style={{ background: child.avatarBg, color: '#1E3A8A' }}>
                      {child.avatar}
                    </div>
                    <div className="attendance-child-name">{child.name}</div>
                  </div>
                </td>
                <td>{child.classroom}</td>
                <td style={{ fontSize: '0.8rem' }}>{child.parentName}</td>
                <td>
                  <span className={`badge-status ${child.status}`}>
                    <span className="dot"></span>
                    {child.status === 'present' ? 'Present' : child.status === 'absent' ? 'Absent' : child.status === 'late' ? 'Late' : 'On Way'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
