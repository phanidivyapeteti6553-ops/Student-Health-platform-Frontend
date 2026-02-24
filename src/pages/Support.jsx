import { useState } from 'react'
import './Support.css'

const SERVICES = [
  {
    icon: '🧠', title: 'Counseling Center',
    desc: 'Free, confidential counseling sessions with licensed therapists. Individual, group, and couples therapy available to all enrolled students.',
    btn: 'Book a Session', color: 'var(--vh-lavender)', info: 'Mon-Fri - 9 AM - 6 PM - Rm 214, Health Bldg',
  },
  {
    icon: '🏥', title: 'Student Health Clinic',
    desc: 'Primary care, vaccinations, sexual health services, and general wellness check-ups - all under one roof on campus.',
    btn: 'Schedule a Visit', color: 'var(--vh-sky)', info: 'Mon-Sat - 8 AM - 8 PM - Medical Center, Floor 1',
  },
  {
    icon: '🤝', title: 'Peer Support Groups',
    desc: 'Connect with fellow students in facilitator-led peer support groups covering anxiety, depression, grief, loneliness, and more.',
    btn: 'Find a Group', color: 'var(--vh-sage)', info: 'Multiple times per week - Wellness Hub',
  },
  {
    icon: '📱', title: 'Wellness Apps',
    desc: 'Free premium access to Headspace, Calm, and other evidence-based wellness apps - available 24/7 through your student portal.',
    btn: 'Access Apps Now', color: 'var(--vh-amber)', info: 'Available 24/7 - Use student email to register',
  },
  {
    icon: '💬', title: 'Online Chat Counseling',
    desc: 'Real-time text chat with a licensed counselor. No appointment needed. Private and available outside office hours.',
    btn: 'Start Chat', color: 'var(--vh-mint)', info: 'Available Mon-Sun - 8 AM - 11 PM',
  },
  {
    icon: '🌐', title: 'Virtual Appointments',
    desc: 'Video sessions with therapists, doctors, and nutritionists. Same quality care - from anywhere on or off campus.',
    btn: 'Book Virtual Visit', color: 'var(--vh-blush)', info: 'By appointment - All devices supported',
  },
]

const FAQS = [
  { q: 'Are counseling services really free?', a: 'Yes! All enrolled students receive free individual counseling sessions each semester. Group therapy sessions are also free and unlimited.' },
  { q: 'Is everything confidential?', a: 'Absolutely. All conversations with our counselors and health staff are confidential, except in cases where there is an immediate risk of harm to yourself or others.' },
  { q: 'I\'m in crisis right now. What should I do?', a: 'Please call 988 (Suicide & Crisis Lifeline) immediately or go to your nearest emergency room. You can also reach our 24/7 crisis line at 1-800-555-HELP.' },
  { q: 'Can I request a specific counselor?', a: 'Yes, you can state a preference when booking. We\'ll do our best to accommodate your request based on availability.' },
]

export default function Support() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="vh-page">
      <div className="container">

        {/* ── Crisis Banner ── */}
        <div className="crisis-banner d-flex align-items-center justify-content-between gap-3 flex-wrap mb-5 fade-up">
          <div>
            <h4 className="mb-1"><i className="bi bi-shield-exclamation me-2" />Need Immediate Help?</h4>
            <p className="mb-0">If you or someone you know is in crisis, please reach out now. You are not alone.</p>
          </div>
          <div className="d-flex gap-2 flex-wrap">
            <a href="tel:988" className="btn-vh-danger btn">
              <i className="bi bi-telephone-fill me-2" />988 Lifeline
            </a>
            <button className="btn" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 'var(--vh-radius-sm)', fontWeight: 700, padding: '11px 20px' }}>
              <i className="bi bi-chat-dots me-2" />Crisis Chat
            </button>
          </div>
        </div>

        {/* ── Section header ── */}
        <div className="mb-4 fade-up anim-d1">
          <h2 className="vh-section-title">Support Services</h2>
          <p className="vh-section-subtitle">Professional resources to support your mental, physical, and emotional health</p>
        </div>

        {/* ── Service cards ── */}
        <div className="row g-4 mb-5 fade-up anim-d2">
          {SERVICES.map((s, i) => (
            <div className="col-md-6 col-lg-4" key={i}>
              <div className="support-service-card h-100">
                <div className="support-card-icon">{s.icon}</div>
                <h5 style={{ color: 'var(--vh-forest)', marginBottom: 8 }}>{s.title}</h5>
                <p style={{ fontSize: 14, color: 'var(--vh-text-muted)', lineHeight: 1.7, marginBottom: 16 }}>{s.desc}</p>
                <div className="support-info-badge mb-4">
                  <i className="bi bi-info-circle me-1" />{s.info}
                </div>
                <button
                  className="btn w-100"
                  style={{
                    background: s.color, color: '#fff', border: 'none',
                    borderRadius: 'var(--vh-radius-sm)', fontWeight: 600, padding: '11px',
                    marginTop: 'auto',
                  }}
                >
                  {s.btn}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── Emergency contacts ── */}
        <div className="row g-3 mb-5 fade-up anim-d3">
          <div className="col-12">
            <h4 className="mb-3">Emergency & Crisis Contacts</h4>
          </div>
          {[
            { label: '988 Suicide & Crisis Lifeline', num: '988',          icon: 'bi-telephone-fill',  color: '#d9534f', avail: '24/7' },
            { label: 'Campus Security',               num: '555-SAFE',     icon: 'bi-shield-fill',     color: '#4a7c59', avail: '24/7' },
            { label: 'Student Health After-Hours',    num: '555-HEALTH',   icon: 'bi-heart-pulse-fill', color: '#6aaccc', avail: '24/7' },
            { label: 'Crisis Text Line',              num: 'Text HOME to 741741', icon: 'bi-chat-fill', color: '#9b89b4', avail: '24/7' },
          ].map(c => (
            <div className="col-md-6 col-lg-3" key={c.label}>
              <div className="emergency-contact-card">
                <div className="contact-icon" style={{ background: c.color + '22', color: c.color }}>
                  <i className={`bi ${c.icon}`} />
                </div>
                <div className="contact-num">{c.num}</div>
                <div className="contact-label">{c.label}</div>
                <span className="contact-avail">{c.avail}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── FAQ ── */}
        <div className="mb-4 fade-up">
          <h4 className="mb-3">Frequently Asked Questions</h4>
          {FAQS.map((f, i) => (
            <div key={i} className="faq-item" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div className="faq-question">
                <span>{f.q}</span>
                <i className={`bi bi-chevron-${openFaq === i ? 'up' : 'down'}`} />
              </div>
              {openFaq === i && (
                <div className="faq-answer fade-in">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
