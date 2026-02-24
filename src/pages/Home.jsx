import { Link } from 'react-router-dom'
import './Home.css'

const features = [
  { icon: '🧠', label: 'Mental Health', cls: 'mental',    desc: 'Counseling, therapy & self-care guides' },
  { icon: '🏃', label: 'Fitness',       cls: 'fitness',   desc: 'Workouts, classes & campus gym info' },
  { icon: '🥗', label: 'Nutrition',     cls: 'nutrition', desc: 'Meal plans, dining tips & recipes' },
  { icon: '💤', label: 'Wellness',      cls: 'wellness',  desc: 'Sleep, recovery & holistic health' },
]

const testimonials = [
  { name: 'Aisha R.',   role: 'Junior, Biology',    quote: 'The mindfulness program genuinely changed how I handle exam pressure. I feel so much calmer.' },
  { name: 'Marcus T.',  role: 'Sophomore, CS',      quote: 'I enrolled in the fitness challenge and stuck to it for 30 days straight - first time I\'ve done that!' },
  { name: 'Priya S.',   role: 'Senior, Psychology', quote: 'The counseling resources helped me find support when I really needed it. Easy to navigate.' },
]

export default function Home() {
  return (
    <div className="home-page">
      {/* ── Hero ───────────────────────────────────── */}
      <section className="vh-hero">
        <div className="vh-hero-blob" style={{ width: 500, height: 500, background: 'var(--vh-mint)', top: -120, right: -80 }} />
        <div className="vh-hero-blob" style={{ width: 350, height: 350, background: 'var(--vh-sky)', bottom: -100, left: 80 }} />

        <div className="container">
          <div className="row align-items-center gy-5">
            <div className="col-lg-6 fade-up">
              <div className="vh-hero-badge">🌿 Your Campus Health Platform</div>
              <h1>Your <em>well-being</em> starts here</h1>
              <p className="my-4">
                Access mental health support, fitness programs, and nutrition advice - all in one place,
                built for students like you.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/register" className="btn-vh-primary btn">
                  Get Started Free <i className="bi bi-arrow-right ms-1" />
                </Link>
                <Link to="/login" className="btn-vh-outline btn" style={{ color: 'var(--vh-cream)', borderColor: 'rgba(245,240,232,0.35)' }}>
                  Sign In
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="col-lg-6 fade-up anim-d2">
              <div className="row g-3">
                {[
                  { num: '2,847', lbl: 'Active Students',   icon: 'bi-people' },
                  { num: '134',   lbl: 'Health Resources',  icon: 'bi-journal-bookmark' },
                  { num: '6',     lbl: 'Wellness Programs', icon: 'bi-trophy' },
                  { num: '24/7',  lbl: 'Crisis Support',    icon: 'bi-heart-pulse' },
                ].map(s => (
                  <div className="col-6" key={s.lbl}>
                    <div className="hero-stat-card">
                      <i className={`bi ${s.icon} hero-stat-icon`} />
                      <div className="hsc-num">{s.num}</div>
                      <div className="hsc-lbl">{s.lbl}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────── */}
      <section className="py-5 my-4">
        <div className="container">
          <div className="text-center mb-5 fade-up">
            <h2 className="vh-section-title">Everything You Need to Thrive</h2>
            <p className="vh-section-subtitle">Four pillars of student wellness, all in one platform</p>
          </div>
          <div className="row g-4">
            {features.map((f, i) => (
              <div className="col-md-6 col-lg-3 fade-up" style={{ animationDelay: `${i * 0.1}s` }} key={f.label}>
                <div className={`quick-cat-card ${f.cls} h-100`}>
                  <div className="quick-cat-icon">{f.icon}</div>
                  <h5 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--vh-forest)', marginBottom: 8 }}>{f.label}</h5>
                  <p style={{ fontSize: 14, color: 'var(--vh-text-muted)', margin: 0 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────── */}
      <section className="home-steps-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="vh-section-title">How It Works</h2>
            <p className="vh-section-subtitle">Three simple steps to better health</p>
          </div>
          <div className="row g-4 justify-content-center">
            {[
              { step: '01', title: 'Create Your Account', desc: 'Sign up as a student in under 60 seconds. No paperwork required.', icon: 'bi-person-plus' },
              { step: '02', title: 'Explore & Enroll',    desc: 'Browse programs and resources tailored to your health goals.', icon: 'bi-search' },
              { step: '03', title: 'Track Your Progress', desc: 'Monitor your wellness score and celebrate every milestone.', icon: 'bi-graph-up-arrow' },
            ].map(s => (
              <div className="col-md-4" key={s.step}>
                <div className="home-step-card text-center">
                  <div className="step-number">{s.step}</div>
                  <div className="step-icon"><i className={`bi ${s.icon}`} /></div>
                  <h5 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--vh-forest)' }}>{s.title}</h5>
                  <p style={{ fontSize: 14, color: 'var(--vh-text-muted)' }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────── */}
      <section className="py-5 my-2">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="vh-section-title">What Students Say</h2>
          </div>
          <div className="row g-4">
            {testimonials.map((t, i) => (
              <div className="col-md-4 fade-up" style={{ animationDelay: `${i * 0.12}s` }} key={t.name}>
                <div className="home-testimonial-card h-100">
                  <div className="testimonial-stars mb-3">★★★★★</div>
                  <p className="testimonial-quote">"{t.quote}"</p>
                  <div className="d-flex align-items-center gap-3 mt-auto">
                    <div className="testimonial-avatar">{t.name[0]}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--vh-forest)' }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--vh-text-muted)' }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────── */}
      <section className="home-cta-section py-5">
        <div className="container text-center">
          <div className="home-cta-card mx-auto">
            <h2 style={{ color: 'var(--vh-cream)' }}>Ready to Prioritize Your Health?</h2>
            <p style={{ color: 'rgba(245,240,232,0.75)', marginBottom: 32 }}>
              Join thousands of students already using VitalityHub to live healthier, happier lives.
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Link to="/register" className="btn btn-vh-primary">
                <i className="bi bi-person-plus me-2" />Create Free Account
              </Link>
              <Link to="/login" className="btn" style={{ background: 'rgba(255,255,255,0.12)', color: 'var(--vh-cream)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 'var(--vh-radius-sm)', padding: '11px 28px', fontWeight: 600 }}>
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal footer for landing */}
      <div style={{ background: 'var(--vh-forest-dark)', color: 'rgba(245,240,232,0.4)', padding: '20px 0', textAlign: 'center', fontSize: 13 }}>
        © {new Date().getFullYear()} VitalityHub &nbsp;|&nbsp; Crisis Line: <a href="tel:988" style={{ color: 'var(--vh-mint)' }}>988</a>
      </div>
    </div>
  )
}
