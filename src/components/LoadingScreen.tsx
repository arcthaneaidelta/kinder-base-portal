import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const loadingSteps = [
  'Preparing your childcare experience…',
  'Loading schedules & activities…',
  'Setting up communications…',
  'Almost ready…',
];

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        const increment = prev < 30 ? 4 : prev < 70 ? 3 : prev < 90 ? 2 : 1;
        return Math.min(prev + increment, 100);
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 25) setStepIndex(0);
    else if (progress < 55) setStepIndex(1);
    else if (progress < 80) setStepIndex(2);
    else setStepIndex(3);
  }, [progress]);

  return (
    <motion.div
      className="loading-screen"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Floating shapes */}
      <motion.div
        style={{
          position: 'absolute', width: 200, height: 200,
          borderRadius: '50%', background: 'rgba(255,255,255,0.03)',
          top: '15%', left: '10%',
        }}
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        style={{
          position: 'absolute', width: 140, height: 140,
          borderRadius: '50%', background: 'rgba(255,255,255,0.02)',
          bottom: '20%', right: '15%',
        }}
        animate={{ y: [0, 15, 0], x: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <motion.div
        className="loading-logo"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="loading-logo-icon"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
            <line x1="9" y1="9" x2="9.01" y2="9"/>
            <line x1="15" y1="9" x2="15.01" y2="9"/>
          </svg>
        </motion.div>
        <motion.div
          className="loading-brand"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          KinderBase
        </motion.div>
        <motion.div
          className="loading-tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Childcare Management Platform
        </motion.div>
      </motion.div>

      <motion.div
        className="loading-progress-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="loading-progress-bar">
          <motion.div
            className="loading-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <motion.div
          className="loading-status"
          key={stepIndex}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {loadingSteps[stepIndex]}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
