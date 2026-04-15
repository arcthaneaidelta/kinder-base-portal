import { motion } from 'framer-motion';
import { useApp } from '../../store/AppContext';

const statusColors: Record<string, string> = {
  present: '#D1FAE5',
  absent: '#FEE2E2',
  late: '#FEF3C7',
  'on-way': '#DBEAFE',
};
const statusTextColors: Record<string, string> = {
  present: '#059669',
  absent: '#DC2626',
  late: '#D97706',
  'on-way': '#1D4ED8',
};

export default function StaffAttendance() {
  const { children, updateChildStatus, showToast } = useApp();

  const presentCount = children.filter(c => c.status === 'present').length;
  const absentCount = children.filter(c => c.status === 'absent').length;

  const toggleStatus = (id: string, current: string) => {
    const next = current === 'present' ? 'absent' : 'present';
    updateChildStatus(id, next);
    showToast(`Status updated to ${next}`);
  };

  return (
    <div className="page-container">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="page-header-row">
          <div>
            <h1>Attendance Board</h1>
            <p>Live attendance for today — April 15, 2025</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="stats-grid"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>
            </div>
          </div>
          <div className="stat-card-value">{presentCount}</div>
          <div className="stat-card-label">Present Today</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon red">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            </div>
          </div>
          <div className="stat-card-value">{absentCount}</div>
          <div className="stat-card-label">Absent</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
          </div>
          <div className="stat-card-value">{children.length}</div>
          <div className="stat-card-label">Total Enrolled</div>
        </div>
      </motion.div>

      <motion.div
        className="table-container"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="table-header">
          <span className="table-title">All Children</span>
          <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Click status to toggle</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Child</th>
              <th>Classroom</th>
              <th>Parent</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {children.map((child, i) => (
              <motion.tr
                key={child.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.02 * i }}
              >
                <td>
                  <div className="attendance-child">
                    <div
                      className="attendance-child-avatar"
                      style={{ background: child.avatarBg, color: statusTextColors[child.status] || '#1E3A8A' }}
                    >
                      {child.avatar}
                    </div>
                    <div>
                      <div className="attendance-child-name">{child.name}</div>
                      <div className="attendance-child-class">Age {child.age}</div>
                    </div>
                  </div>
                </td>
                <td>{child.classroom}</td>
                <td style={{ fontSize: '0.8rem' }}>{child.parentName}</td>
                <td>
                  <button
                    className={`badge-status ${child.status}`}
                    onClick={() => toggleStatus(child.id, child.status)}
                    style={{ cursor: 'pointer', border: 'none' }}
                  >
                    <span className="dot"></span>
                    {child.status === 'present' ? 'Present' : child.status === 'absent' ? 'Absent' : child.status === 'late' ? 'Late' : 'On Way'}
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => {
                      updateChildStatus(child.id, 'present');
                      showToast(`${child.name} checked in`);
                    }}
                  >
                    Check In
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
