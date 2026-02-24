import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="vh-footer">
      <div className="container">
        <div className="row gy-4 pb-4">
          {/* Brand */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <span style={{ fontSize: '1.4rem' }}>🌿</span>
              <span className="vh-footer-brand">Vitality<span>Hub</span></span>
            </div>
            <p style={{ lineHeight: 1.7, maxWidth: '280px' }}>
              Your all-in-one student health and wellness platform. Built with care for student well-being.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="footer-social"><i className="bi bi-instagram" /></a>
              <a href="#" className="footer-social"><i className="bi bi-twitter-x" /></a>
              <a href="#" className="footer-social"><i className="bi bi-facebook" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-3 col-6">
            <h5>Platform</h5>
            <ul className="list-unstyled footer-links">
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/programs">Programs</Link></li>
              <li><Link to="/resources">Resources</Link></li>
              <li><Link to="/support">Support</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-lg-2 col-md-3 col-6">
            <h5>Help</h5>
            <ul className="list-unstyled footer-links">
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Accessibility</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Use</a></li>
            </ul>
          </div>

          {/* Crisis */}
          <div className="col-lg-4 col-md-6">
            <h5>Crisis Support</h5>
            <div className="footer-crisis-box">
              <p className="mb-2" style={{ color: 'rgba(245,240,232,0.75)', fontSize: '13px' }}>
                If you or someone you know is in crisis, help is available 24/7.
              </p>
              <div className="d-flex flex-column gap-2">
                <a href="tel:988" className="footer-crisis-link">
                  <i className="bi bi-telephone-fill" /> 988 Suicide & Crisis Lifeline
                </a>
                <a href="tel:911" className="footer-crisis-link">
                  <i className="bi bi-shield-fill" /> Emergency Services: 911
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr className="vh-footer-divider" />

        <div className="d-flex flex-wrap justify-content-between align-items-center py-3 gap-2">
          <span style={{ fontSize: '13px' }}>© {new Date().getFullYear()} VitalityHub. All rights reserved.</span>
          <span style={{ fontSize: '13px' }}>Made with <span style={{ color: 'var(--vh-mint)' }}>♥</span> for student health</span>
        </div>
      </div>
    </footer>
  )
}
