import { motion } from 'framer-motion';
import { payments } from '../../data/mockData';

export default function AdminPayments() {
  const totalCollected = payments.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'pending').reduce((s, p) => s + p.amount, 0);
  const totalOverdue = payments.filter(p => p.status === 'overdue').reduce((s, p) => s + p.amount, 0);

  return (
    <div className="page-container">
      <motion.div className="page-header" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1>Payment Tracking</h1>
        <p>Manage tuition payments and billing</p>
      </motion.div>

      <motion.div className="stats-grid" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}>
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
          </div>
          <div className="stat-card-value">${totalCollected.toLocaleString()}</div>
          <div className="stat-card-label">Collected</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon amber">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
          </div>
          <div className="stat-card-value">${totalPending.toLocaleString()}</div>
          <div className="stat-card-label">Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon red">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            </div>
          </div>
          <div className="stat-card-value">${totalOverdue.toLocaleString()}</div>
          <div className="stat-card-label">Overdue</div>
        </div>
      </motion.div>

      <motion.div className="table-container" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
        <div className="table-header">
          <span className="table-title">All Payments</span>
          <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{payments.length} records</span>
        </div>
        <table>
          <thead>
            <tr><th>Parent</th><th>Child</th><th>Plan</th><th>Amount</th><th>Date</th><th>Status</th></tr>
          </thead>
          <tbody>
            {payments.map((p, i) => (
              <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.02 * i }}>
                <td style={{ fontWeight: 500 }}>{p.parentName}</td>
                <td>{p.childName}</td>
                <td>{p.plan}</td>
                <td style={{ fontWeight: 600 }}>${p.amount.toLocaleString()}</td>
                <td>{p.date}</td>
                <td>
                  <span className={`badge-status ${p.status}`}>
                    <span className="dot"></span>
                    {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
