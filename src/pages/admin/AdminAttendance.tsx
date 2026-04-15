import { motion } from 'framer-motion';
import { useApp } from '../../store/AppContext';

export default function AdminAttendance() {
  const { children } = useApp();

  return (
    <div className="page-container">
      <motion.div className="page-header" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1>Attendance Tracking</h1>
        <p>Full attendance view — April 15, 2025</p>
      </motion.div>

      <motion.div className="stats-grid" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}>
        {[
          { label: 'Present', value: children.filter(c => c.status === 'present').length, color: 'green' },
          { label: 'Absent', value: children.filter(c => c.status === 'absent').length, color: 'red' },
          { label: 'Late / On Way', value: children.filter(c => c.status === 'late' || c.status === 'on-way').length, color: 'amber' },
          { label: 'Total', value: children.length, color: 'blue' },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-card-value">{s.value}</div>
            <div className="stat-card-label">{s.label}</div>
          </div>
        ))}
      </motion.div>

      <motion.div className="table-container" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
        <div className="table-header">
          <span className="table-title">All Children</span>
        </div>
        <table>
          <thead>
            <tr><th>Child</th><th>Age</th><th>Classroom</th><th>Parent</th><th>Emergency</th><th>Status</th></tr>
          </thead>
          <tbody>
            {children.map(child => (
              <tr key={child.id}>
                <td>
                  <div className="attendance-child">
                    <div className="attendance-child-avatar" style={{ background: child.avatarBg, color: '#1E3A8A' }}>{child.avatar}</div>
                    <div className="attendance-child-name">{child.name}</div>
                  </div>
                </td>
                <td>{child.age}</td>
                <td>{child.classroom}</td>
                <td style={{ fontSize: '0.8rem' }}>{child.parentName}</td>
                <td style={{ fontSize: '0.8rem' }}>{child.emergencyContact}</td>
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
