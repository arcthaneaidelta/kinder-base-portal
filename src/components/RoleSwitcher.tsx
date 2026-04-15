import { motion } from 'framer-motion';
import { useApp } from '../store/AppContext';

const roles = [
  {
    id: 'parent' as const,
    title: 'Parent',
    description: 'View your child\'s day, communicate with staff, manage payments',
    iconClass: 'parent',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    id: 'staff' as const,
    title: 'Staff',
    description: 'Manage attendance, communicate with parents, log activities',
    iconClass: 'staff',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    id: 'admin' as const,
    title: 'Admin',
    description: 'Full overview, payments, analytics, announcements',
    iconClass: 'admin',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function RoleSwitcher() {
  const { setRole } = useApp();

  return (
    <div className="role-switcher-overlay">
      <motion.div
        className="role-switcher-content"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <div style={{
            width: 40, height: 40, background: '#1E3A8A', borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
              <line x1="9" y1="9" x2="9.01" y2="9"/>
              <line x1="15" y1="9" x2="15.01" y2="9"/>
            </svg>
          </div>
          <h1>KinderBase</h1>
        </div>
        <p className="role-switcher-subtitle">Select a role to explore the demo</p>

        <motion.div
          className="role-cards"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {roles.map(r => (
            <motion.div
              key={r.id}
              className="role-card"
              variants={cardVariants}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setRole(r.id)}
            >
              <div className={`role-card-icon ${r.iconClass}`}>
                {r.icon}
              </div>
              <h3>{r.title}</h3>
              <p>{r.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          style={{ marginTop: '2.5rem', fontSize: '0.75rem', color: '#9CA3AF' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Demo mode — all data is simulated. Actions sync across roles in real-time.
        </motion.p>
      </motion.div>
    </div>
  );
}
