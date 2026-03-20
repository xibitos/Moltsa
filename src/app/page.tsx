'use client';

import {
  Monitor, Bot, DollarSign, Clock, Box, Terminal,
  Github, ArrowRight, Twitter, Copy, Check
} from 'lucide-react';
import { useState } from 'react';

function MoltsaLogo({ size = 32, className = '' }: { size?: number; className?: string }) {
  const w = size * 4.2;
  const h = size;
  return (
    <svg width={w} height={h} viewBox="0 0 168 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* M */}
      <path d="M4 32V8h4.5l8 14.5L24.5 8H29v24h-4V15.5l-7 12.5h-3l-7-12.5V32H4z" fill="currentColor"/>
      {/* o */}
      <path d="M36 23.5c0-5.2 3.8-9 8.5-9s8.5 3.8 8.5 9-3.8 9-8.5 9-8.5-3.8-8.5-9zm13 0c0-3.2-1.8-5.5-4.5-5.5S40 20.3 40 23.5s1.8 5.5 4.5 5.5 4.5-2.3 4.5-5.5z" fill="currentColor"/>
      {/* l */}
      <path d="M58 7h4v25h-4V7z" fill="currentColor"/>
      {/* t */}
      <path d="M67 10h4v5h5v3.5h-5V28c0 1.2.5 1.8 1.8 1.8H75V33h-3c-3 0-5-1.5-5-4.8V18.5h-3V15h3V10z" fill="currentColor"/>
      {/* s */}
      <path d="M80 28.5l2.5-2.8c1.5 1.5 3.5 2.5 5.5 2.5 2.2 0 3.2-.8 3.2-2.2 0-1.5-1.5-2-4-2.8-3.2-1-6.2-2.2-6.2-5.8 0-3.5 2.8-5.8 7-5.8 2.8 0 5.2 1 7 2.8L93 17.2c-1.5-1.2-3-2-4.8-2-1.8 0-2.8.8-2.8 2 0 1.5 1.5 2 4 2.8 3.2 1 6.2 2 6.2 5.8 0 3.5-2.8 6-7.2 6-3 0-5.8-1.2-8.4-3.3z" fill="currentColor"/>
      {/* a */}
      <path d="M102 23.5c0-5.5 3.5-9 8-9 2.5 0 4.2 1 5.5 2.5V15h4v17h-4v-2.2c-1.3 1.5-3 2.7-5.5 2.7-4.5 0-8-3.5-8-9zm13.5.2c0-3.2-2-5.5-5-5.5s-4.8 2.3-4.8 5.3 2 5.5 4.8 5.5 5-2.3 5-5.3z" fill="currentColor"/>
      {/* dot accent */}
      <circle cx="155" cy="12" r="5" fill="#FF3B30"/>
    </svg>
  );
}

function MoltsaAgent({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF3B30" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#FF3B30" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="core-grad" x1="30" y1="30" x2="70" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF5E54"/>
          <stop offset="1" stopColor="#CC2D24"/>
        </linearGradient>
        <linearGradient id="ring-grad" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF3B30" stopOpacity="0.6"/>
          <stop offset="1" stopColor="#FF3B30" stopOpacity="0.1"/>
        </linearGradient>
      </defs>
      <style>{`
        @keyframes m-breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.04); } }
        @keyframes m-orbit { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes m-ring-pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }
        @keyframes m-scan { 0% { transform: translateY(-6px); opacity: 0.8; } 50% { transform: translateY(6px); opacity: 0.3; } 100% { transform: translateY(-6px); opacity: 0.8; } }
        .m-core { animation: m-breathe 4s ease-in-out infinite; transform-origin: 50px 50px; }
        .m-orbit { animation: m-orbit 12s linear infinite; transform-origin: 50px 50px; }
        .m-ring { animation: m-ring-pulse 3s ease-in-out infinite; }
        .m-scan { animation: m-scan 2.5s ease-in-out infinite; }
      `}</style>

      {/* Ambient glow */}
      <circle cx="50" cy="50" r="48" fill="url(#core-glow)"/>

      {/* Outer orbit ring */}
      <g className="m-ring">
        <circle cx="50" cy="50" r="38" stroke="url(#ring-grad)" strokeWidth="1" fill="none"/>
      </g>

      {/* Orbiting dot */}
      <g className="m-orbit">
        <circle cx="50" cy="12" r="2.5" fill="#FF3B30" opacity="0.8"/>
      </g>

      {/* Inner ring */}
      <circle cx="50" cy="50" r="26" stroke="#FF3B30" strokeWidth="0.5" fill="none" opacity="0.2"/>

      {/* Core sphere */}
      <g className="m-core">
        <circle cx="50" cy="50" r="18" fill="url(#core-grad)"/>
        {/* Specular highlight */}
        <ellipse cx="44" cy="43" rx="6" ry="4" fill="white" opacity="0.15"/>
      </g>

      {/* Eye visor — horizontal slit */}
      <g className="m-core">
        <rect x="39" y="47" width="22" height="5" rx="2.5" fill="#0C0C0C" opacity="0.6"/>
        {/* Scanning light */}
        <g className="m-scan">
          <rect x="41" y="48.5" width="18" height="2" rx="1" fill="#FF8A80" opacity="0.9"/>
        </g>
        {/* Two pupil dots */}
        <circle cx="46" cy="49.5" r="1.5" fill="white" opacity="0.9"/>
        <circle cx="54" cy="49.5" r="1.5" fill="white" opacity="0.9"/>
      </g>

      {/* Data particles */}
      <g className="m-orbit" style={{ animationDuration: '8s', animationDirection: 'reverse' }}>
        <circle cx="50" cy="16" r="1" fill="#FF3B30" opacity="0.5"/>
        <circle cx="84" cy="50" r="1" fill="#FF3B30" opacity="0.3"/>
      </g>
    </svg>
  );
}

const features = [
  {
    icon: Monitor,
    title: 'Real-time Monitoring',
    description: 'Live dashboard with system metrics, activity feeds, and agent status at a glance.',
  },
  {
    icon: Bot,
    title: 'Agent Management',
    description: 'Discover, configure, and control multiple OpenClaw AI agents from a single interface.',
  },
  {
    icon: DollarSign,
    title: 'Cost Tracking',
    description: 'Track token usage and API costs across models with detailed breakdowns and analytics.',
  },
  {
    icon: Clock,
    title: 'Cron Jobs',
    description: 'Schedule and manage automated tasks with visual timelines and execution logs.',
  },
  {
    icon: Box,
    title: '3D Office',
    description: 'Interactive 3D workspace visualization of your agents powered by React Three Fiber.',
  },
  {
    icon: Terminal,
    title: 'Integrated Terminal',
    description: 'Execute commands directly from the dashboard with a sandboxed, allowlist-based terminal.',
  },
];

export default function LandingPage() {
  const [caCopied, setCaCopied] = useState(false);
  const CA_TOKEN = 'Coming soon';

  const handleCopyCa = () => {
    navigator.clipboard.writeText(CA_TOKEN);
    setCaCopied(true);
    setTimeout(() => setCaCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <MoltsaLogo size={28} />
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://x.com/xibitos"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm"
            style={{ color: 'var(--text-secondary)' }}
          >
            <Twitter size={18} />
          </a>
          <a
            href="https://github.com/xibitos/Moltsa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm"
            style={{ color: 'var(--text-secondary)' }}
          >
            <Github size={18} />
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 sm:py-32">
        <div className="mb-2">
          <MoltsaAgent size={96} />
        </div>

        <div className="mb-6">
          <MoltsaLogo size={64} />
        </div>

        <p
          className="text-lg sm:text-xl max-w-2xl mb-4"
          style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}
        >
          Real-time dashboard and control center for{' '}
          <span style={{ color: 'var(--accent)' }}>OpenClaw</span> AI agents.
          Monitor, manage, and control agent instances running on your VPS.
        </p>

        <p
          className="text-sm max-w-lg mb-10"
          style={{ color: 'var(--text-muted)' }}
        >
          Built with Next.js, React Three Fiber, and SQLite.
          Self-hosted, lightweight, and fully customizable.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href="https://github.com/xibitos/Moltsa"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <Github size={18} />
            Get Started
            <ArrowRight size={16} />
          </a>
          <a href="/agents" className="btn-outline">
            Live Demo
          </a>
        </div>

        <p
          className="text-xs mt-4 max-w-md"
          style={{ color: 'var(--text-muted)' }}
        >
          Clone the repo and run it locally to connect with your OpenClaw agents.
        </p>

        {/* CA Token */}
        <div className="mt-10 flex flex-col items-center gap-2">
          <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
            CA Token
          </span>
          <button
            onClick={handleCopyCa}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-mono transition-all"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
              cursor: CA_TOKEN === 'Coming soon' ? 'default' : 'pointer',
            }}
          >
            <span className="select-all">{CA_TOKEN}</span>
            {CA_TOKEN !== 'Coming soon' && (
              caCopied
                ? <Check size={14} style={{ color: 'var(--positive)' }} />
                : <Copy size={14} style={{ color: 'var(--text-muted)' }} />
            )}
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 max-w-6xl mx-auto w-full">
        <div className="text-center mb-14">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
          >
            Everything you need
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            A complete control center for your AI agent infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="card p-6 hover:border-[var(--border-strong)]"
              style={{ transition: 'border-color 150ms ease' }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
              >
                <feature.icon size={20} />
              </div>
              <h3
                className="text-base font-semibold mb-2"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
              >
                {feature.title}
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-6 py-8 text-center text-sm"
        style={{ borderTop: '1px solid var(--border)', color: 'var(--text-muted)' }}
      >
        © 2025 Moltsa
      </footer>
    </div>
  );
}
