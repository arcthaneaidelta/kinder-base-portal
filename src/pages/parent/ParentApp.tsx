import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from '../../store/AppContext';
import ParentDashboard from './ParentDashboard';
import ChildProfile from './ChildProfile';
import ParentMessages from './ParentMessages';
import ActivityFeed from './ActivityFeed';
import PaymentFlow from './PaymentFlow';

const navItems = [
  {
    id: 'dashboard' as const,
    label: 'Home',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  },
  {
    id: 'activity' as const,
    label: 'Activity',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  },
  {
    id: 'messages' as const,
    label: 'Chat',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    badge: 2,
  },
  {
    id: 'payment' as const,
    label: 'Billing',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  },
  {
    id: 'profile' as const,
    label: 'Profile',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  },
];

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function ParentApp() {
  const { parentPage, setParentPage } = useApp();

  const renderPage = () => {
    switch (parentPage) {
      case 'dashboard': return <ParentDashboard />;
      case 'profile': return <ChildProfile />;
      case 'messages': return <ParentMessages />;
      case 'activity': return <ActivityFeed />;
      case 'payment': return <PaymentFlow />;
      default: return <ParentDashboard />;
    }
  };

  return (
    <div className="parent-layout">
      <div className="parent-topbar">
        <div className="parent-topbar-left">
          <div className="parent-topbar-logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
              <line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
            </svg>
          </div>
          <span className="parent-topbar-brand">KinderBase</span>
        </div>
        <div className="parent-topbar-right">
          <button className="topbar-icon-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <span className="notif-dot"></span>
          </button>
          <div className="sidebar-avatar" style={{ width: 32, height: 32, fontSize: '0.7rem' }}>ST</div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={parentPage}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>

      <nav className="bottom-nav">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`bottom-nav-item ${parentPage === item.id ? 'active' : ''}`}
            onClick={() => setParentPage(item.id)}
          >
            {item.badge && <span className="nav-badge">{item.badge}</span>}
            {item.icon}
            <span>{item.label}</span>
            {parentPage === item.id && (
              <motion.div
                layoutId="parent-tab-indicator"
                style={{
                  position: 'absolute', bottom: -2, width: 20, height: 2,
                  background: '#1E3A8A', borderRadius: 999,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
