import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from '../../store/AppContext';
import AdminOverview from './AdminOverview';
import AdminAttendance from './AdminAttendance';
import AdminLogs from './AdminLogs';
import AdminMessages from './AdminMessages';
import AdminPayments from './AdminPayments';
import AdminAnnouncements from './AdminAnnouncements';

const navItems = [
  { id: 'overview' as const, label: 'Overview', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
  { id: 'attendance' as const, label: 'Attendance', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg> },
  { id: 'logs' as const, label: 'Activity Logs', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  { id: 'messages' as const, label: 'Messages', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
  { id: 'payments' as const, label: 'Payments', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> },
  { id: 'announcements' as const, label: 'Announcements', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"/></svg> },
];

export default function AdminApp() {
  const { adminPage, setAdminPage } = useApp();

  const renderPage = () => {
    switch (adminPage) {
      case 'overview': return <AdminOverview />;
      case 'attendance': return <AdminAttendance />;
      case 'logs': return <AdminLogs />;
      case 'messages': return <AdminMessages />;
      case 'payments': return <AdminPayments />;
      case 'announcements': return <AdminAnnouncements />;
      default: return <AdminOverview />;
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
            <div className="sidebar-brand-sub">Admin Dashboard</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Dashboard</div>
          {navItems.slice(0, 3).map(item => (
            <button
              key={item.id}
              className={`sidebar-item ${adminPage === item.id ? 'active' : ''}`}
              onClick={() => setAdminPage(item.id)}
            >
              {item.icon}
              {item.label}
            </button>
          ))}

          <div className="sidebar-section-label" style={{ marginTop: '0.5rem' }}>Communication</div>
          {navItems.slice(3, 5).map(item => (
            <button
              key={item.id}
              className={`sidebar-item ${adminPage === item.id ? 'active' : ''}`}
              onClick={() => setAdminPage(item.id)}
            >
              {item.icon}
              {item.label}
            </button>
          ))}

          <div className="sidebar-section-label" style={{ marginTop: '0.5rem' }}>Management</div>
          {navItems.slice(5).map(item => (
            <button
              key={item.id}
              className={`sidebar-item ${adminPage === item.id ? 'active' : ''}`}
              onClick={() => setAdminPage(item.id)}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar" style={{ background: '#FEF3C7', color: '#D97706' }}>AD</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">Admin Director</div>
              <div className="sidebar-user-role">Super Admin</div>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={adminPage}
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
