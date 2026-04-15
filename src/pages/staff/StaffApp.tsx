import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from '../../store/AppContext';
import StaffAttendance from './StaffAttendance';
import StaffAlerts from './StaffAlerts';
import StaffMessages from './StaffMessages';
import StaffActivities from './StaffActivities';

const navItems = [
  { id: 'attendance' as const, label: 'Attendance', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg> },
  { id: 'alerts' as const, label: 'Alerts', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>, badge: true },
  { id: 'messages' as const, label: 'Messages', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
  { id: 'activities' as const, label: 'Activities', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
];

export default function StaffApp() {
  const { staffPage, setStaffPage, alerts } = useApp();
  const unreadAlerts = alerts.filter(a => !a.read).length;

  const renderPage = () => {
    switch (staffPage) {
      case 'attendance': return <StaffAttendance />;
      case 'alerts': return <StaffAlerts />;
      case 'messages': return <StaffMessages />;
      case 'activities': return <StaffActivities />;
      default: return <StaffAttendance />;
    }
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
              <line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
            </svg>
          </div>
          <div>
            <div className="sidebar-brand">KinderBase</div>
            <div className="sidebar-brand-sub">Staff Portal</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Main</div>
          {navItems.map(item => (
            <button
              key={item.id}
              className={`sidebar-item ${staffPage === item.id ? 'active' : ''}`}
              onClick={() => setStaffPage(item.id)}
            >
              {item.icon}
              {item.label}
              {item.badge && unreadAlerts > 0 && (
                <span className="badge">{unreadAlerts}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar" style={{ background: '#CCFBF1', color: '#0D9488' }}>RK</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">Rachel Kim</div>
              <div className="sidebar-user-role">Lead Teacher</div>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={staffPage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
