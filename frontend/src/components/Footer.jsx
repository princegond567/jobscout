import React from 'react'
import { Briefcase, Globe, ExternalLink, Link2, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const links = {
    product: [
      { label: 'Browse Jobs', to: '/jobs' },
      { label: 'Browse Companies', to: '/browse' },
      { label: 'For Recruiters', to: '/signup' },
    ],
    company: [
      { label: 'About Us', to: '/' },
      { label: 'Privacy Policy', to: '/' },
      { label: 'Terms of Service', to: '/' },
    ],
  }

  const socials = [
    { icon: Globe,        href: 'https://github.com',   label: 'GitHub' },
    { icon: ExternalLink, href: 'https://twitter.com',  label: 'Twitter' },
    { icon: Link2,        href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Globe,        href: 'https://facebook.com', label: 'Website' },
  ]

  return (
    <footer
      className="relative overflow-hidden border-t"
      style={{
        backgroundColor: 'var(--bg-deep)',
        borderColor: 'var(--border-default)'
      }}
    >
      {/* Subtle ambient glow */}
      <div
        className="ambient-blob"
        style={{
          width: '600px',
          height: '300px',
          background: 'var(--accent-glow)',
          bottom: '-100px',
          left: '50%',
          transform: 'translateX(-50%)',
          filter: 'blur(100px)',
          animationDuration: '12s',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 pb-12 border-b" style={{ borderColor: 'var(--border-default)' }}>
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_16px_var(--accent-glow)] group-hover:shadow-[0_0_24px_var(--accent-glow)] transition-all duration-300">
                <Briefcase className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-semibold" style={{ color: 'var(--fg)' }}>
                Job<span className="gradient-text-primary">Portal</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--fg-muted)' }}>
              Your gateway to career opportunities. Connecting talented professionals with world-class companies.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-6">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 group glass-panel"
                >
                  <Icon className="w-4 h-4 transition-colors" style={{ color: 'var(--fg-muted)' }} />
                </a>
              ))}
            </div>
          </div>

          {/* Product links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--fg)' }}>
              Product
            </h3>
            <ul className="space-y-3">
              {links.product.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm transition-colors duration-150"
                    style={{ color: 'var(--fg-muted)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--fg)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg-muted)' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--fg)' }}>
              Company
            </h3>
            <ul className="space-y-3">
              {links.company.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm transition-colors duration-150"
                    style={{ color: 'var(--fg-muted)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--fg)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg-muted)' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
            © {currentYear} JobPortal. All rights reserved.
          </p>
          <p className="text-sm flex items-center gap-1.5" style={{ color: 'var(--fg-muted)' }}>
            Built with <Heart className="w-3.5 h-3.5 text-primary fill-primary" /> for developers
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
