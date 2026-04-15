import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { plans } from '../../data/mockData';

type Step = 'plan' | 'details' | 'processing' | 'success';

export default function PaymentFlow() {
  const [step, setStep] = useState<Step>('plan');
  const [selectedPlan, setSelectedPlan] = useState('plan2');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const handlePay = () => {
    setStep('processing');
    setTimeout(() => setStep('success'), 2500);
  };

  const selectedPlanData = plans.find(p => p.id === selectedPlan)!;

  return (
    <div className="parent-page">
      <AnimatePresence mode="wait">
        {step === 'processing' && (
          <motion.div
            className="processing-overlay"
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="processing-spinner" />
            <h3>Processing Payment</h3>
            <p>Please wait while we securely process your payment…</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>
          {step === 'success' ? 'Payment Confirmed' : 'Billing & Payment'}
        </h2>
        {step !== 'success' && (
          <p style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '1.5rem' }}>
            {step === 'plan' ? 'Select your care plan' : 'Enter payment details'}
          </p>
        )}
      </motion.div>

      <AnimatePresence mode="wait">
        {step === 'plan' && (
          <motion.div
            key="plan"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {plans.map(plan => (
              <motion.div
                key={plan.id}
                className={`payment-plan ${selectedPlan === plan.id ? 'selected' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
                whileTap={{ scale: 0.98 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                  <div className="payment-plan-radio" />
                  <div className="payment-plan-info">
                    <h4>{plan.name}</h4>
                    <p>{plan.description}</p>
                  </div>
                </div>
                <div className="payment-plan-price">
                  ${plan.price}<span>/mo</span>
                </div>
              </motion.div>
            ))}

            {/* Plan features */}
            <div className="card-static" style={{ padding: '1rem 1.25rem', marginTop: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#111827', marginBottom: '0.5rem' }}>
                {selectedPlanData.name} includes:
              </div>
              {selectedPlanData.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span style={{ fontSize: '0.8rem', color: '#4B5563' }}>{f}</span>
                </div>
              ))}
            </div>

            <motion.button
              className="btn btn-primary w-full btn-lg"
              onClick={() => setStep('details')}
              whileTap={{ scale: 0.97 }}
            >
              Continue to Payment
            </motion.button>
          </motion.div>
        )}

        {step === 'details' && (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Summary */}
            <div className="card-static" style={{ padding: '1rem 1.25rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#111827' }}>{selectedPlanData.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Monthly subscription</div>
                </div>
                <div style={{ fontWeight: 700, fontSize: '1.25rem', color: '#111827' }}>${selectedPlanData.price}</div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Cardholder Name</label>
              <input
                className="form-input"
                placeholder="Sarah Thompson"
                value={cardName}
                onChange={e => setCardName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Card Number</label>
              <input
                className="form-input"
                placeholder="4242 4242 4242 4242"
                value={cardNumber}
                onChange={e => setCardNumber(e.target.value)}
                maxLength={19}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Expiry Date</label>
                <input
                  className="form-input"
                  placeholder="MM / YY"
                  value={expiry}
                  onChange={e => setExpiry(e.target.value)}
                  maxLength={7}
                />
              </div>
              <div className="form-group">
                <label className="form-label">CVC</label>
                <input
                  className="form-input"
                  placeholder="123"
                  value={cvc}
                  onChange={e => setCvc(e.target.value)}
                  maxLength={4}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setStep('plan')}>Back</button>
              <motion.button
                className="btn btn-primary"
                style={{ flex: 2 }}
                onClick={handlePay}
                whileTap={{ scale: 0.97 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                Pay ${selectedPlanData.price}.00
              </motion.button>
            </div>

            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem', fontSize: '0.7rem', color: '#9CA3AF' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Secured by 256-bit SSL encryption
              </div>
            </div>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div
            key="success"
            className="payment-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="payment-success-icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 15 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </motion.div>
            <h2>Payment Successful!</h2>
            <p>Your {selectedPlanData.name} plan is now active. A receipt has been sent to your email.</p>
            <div className="card-static" style={{ padding: '1rem', marginBottom: '1.5rem', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.375rem 0', borderBottom: '1px solid #F3F4F6' }}>
                <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>Amount</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#111827' }}>${selectedPlanData.price}.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.375rem 0', borderBottom: '1px solid #F3F4F6' }}>
                <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>Plan</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#111827' }}>{selectedPlanData.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.375rem 0' }}>
                <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>Transaction ID</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#111827' }}>TXN-2025-04158</span>
              </div>
            </div>
            <button className="btn btn-primary" onClick={() => setStep('plan')}>Done</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
