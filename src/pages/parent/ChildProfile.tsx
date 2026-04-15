import { motion } from 'framer-motion';
import { useApp } from '../../store/AppContext';

export default function ChildProfile() {
  const { children } = useApp();
  const child = children[0];

  return (
    <div className="parent-page">
      <motion.div
        className="profile-hero"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div
          className="profile-avatar-lg"
          style={{ background: child.avatarBg, color: '#1E3A8A' }}
        >
          {child.avatar}
        </div>
        <div className="profile-name">{child.name}</div>
        <div className="profile-meta">{child.classroom} · Age {child.age}</div>
        <span className={`badge-status ${child.status}`} style={{ marginTop: '0.75rem', display: 'inline-flex' }}>
          <span className="dot"></span>
          {child.status === 'present' ? 'Checked In' : child.status === 'absent' ? 'Absent' : child.status === 'late' ? 'Running Late' : 'On the Way'}
        </span>
      </motion.div>

      <motion.div
        className="profile-details"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="profile-detail-card">
          <label>Parent / Guardian</label>
          <span>{child.parentName}</span>
        </div>
        <div className="profile-detail-card">
          <label>Classroom</label>
          <span>{child.classroom}</span>
        </div>
        <div className="profile-detail-card">
          <label>Emergency Contact</label>
          <span>{child.emergencyContact}</span>
        </div>
        <div className="profile-detail-card">
          <label>Allergies</label>
          <span>{child.allergies.length > 0 ? child.allergies.join(', ') : 'None'}</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <div className="section-header">
          <span className="section-title">Schedule</span>
        </div>
        <div className="card-static" style={{ padding: '1rem 1.25rem' }}>
          {[
            { day: 'Monday – Friday', time: '7:30 AM – 5:00 PM', type: 'Full Day' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#111827' }}>{s.day}</div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>{s.time}</div>
              </div>
              <span className="badge-status present" style={{ background: '#DBEAFE', color: '#1D4ED8' }}>
                {s.type}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        style={{ marginTop: '1.5rem' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="section-header">
          <span className="section-title">Medical Information</span>
        </div>
        <div className="card-static" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.375rem 0', borderBottom: '1px solid #F3F4F6' }}>
            <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>Blood Type</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#111827' }}>A+</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.375rem 0', borderBottom: '1px solid #F3F4F6' }}>
            <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>Allergies</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#111827' }}>{child.allergies.length > 0 ? child.allergies.join(', ') : 'None'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.375rem 0' }}>
            <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>Pediatrician</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#111827' }}>Dr. Sarah Chen</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
