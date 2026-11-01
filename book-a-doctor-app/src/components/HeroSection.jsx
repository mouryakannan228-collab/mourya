import React from 'react';
import { Search, MapPin, Sparkles, ShieldCheck, Clock, Star, Zap, Video } from 'lucide-react';

export default function HeroSection({
  searchQuery,
  setSearchQuery,
  selectedSpecialty,
  setSelectedSpecialty,
  onOpenSymptomChecker,
  filterOptions,
  setFilterOptions
}) {
  return (
    <section style={{
      position: 'relative',
      padding: '4rem 0 3rem 0',
      overflow: 'hidden'
    }}>
      {/* Glow Effects */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(13, 148, 136, 0.18) 0%, rgba(6, 182, 212, 0.05) 50%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        
        {/* Top Highlight Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.4rem 1rem',
          borderRadius: '999px',
          background: 'rgba(13, 148, 136, 0.12)',
          border: '1px solid rgba(13, 148, 136, 0.3)',
          color: '#2dd4bf',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '1.5rem'
        }}>
          <Sparkles size={16} />
          <span>Next-Gen Doctor Appointments & Virtual Telehealth</span>
          <span className="pulse-dot" />
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: '-0.03em',
          maxWidth: '900px',
          margin: '0 auto 1.2rem auto'
        }}>
          Your Health, Priority #1. <br />
          <span className="gradient-text">Book Top Specialist Doctors</span> Instantly.
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '1.1rem',
          color: 'var(--text-sub)',
          maxWidth: '680px',
          margin: '0 auto 2.5rem auto'
        }}>
          Connect with certified medical specialists for in-clinic visits or live video consultations. Fast booking, zero waiting time, and digital prescription access.
        </p>

        {/* Search & Filter Bar Container */}
        <div className="glass-panel" style={{
          padding: '1.25rem',
          maxWidth: '850px',
          margin: '0 auto 2rem auto',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.8fr 1fr auto',
            gap: '0.75rem',
            alignItems: 'center'
          }}>
            {/* Search Input */}
            <div style={{ position: 'relative' }}>
              <Search size={20} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: '2.75rem', height: '48px', fontSize: '0.95rem' }}
                placeholder="Search by Doctor Name, Specialty, or Symptoms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Quick Location / Type */}
            <div style={{ position: 'relative' }}>
              <MapPin size={20} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: '2.75rem', height: '48px', fontSize: '0.95rem' }}
                placeholder="City / Zip Code"
                defaultValue="Downtown Medical Hub"
              />
            </div>

            {/* Search CTA */}
            <button className="btn btn-primary" style={{ height: '48px', padding: '0 1.75rem' }}>
              <Search size={18} />
              <span>Search</span>
            </button>
          </div>

          {/* Quick Filter Chips */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            marginTop: '1rem',
            flexWrap: 'wrap',
            fontSize: '0.85rem'
          }}>
            <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Quick Filters:</span>
            
            <button
              onClick={() => setFilterOptions(prev => ({ ...prev, availableToday: !prev.availableToday }))}
              style={{
                border: 'none',
                background: filterOptions.availableToday ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.05)',
                color: filterOptions.availableToday ? '#34d399' : 'var(--text-sub)',
                border: `1px solid ${filterOptions.availableToday ? 'var(--primary-emerald)' : 'var(--border-light)'}`,
                borderRadius: '999px',
                padding: '0.35rem 0.85rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <Clock size={14} /> Available Today
            </button>

            <button
              onClick={() => setFilterOptions(prev => ({ ...prev, telehealthOnly: !prev.telehealthOnly }))}
              style={{
                border: 'none',
                background: filterOptions.telehealthOnly ? 'rgba(6,182,212,0.2)' : 'rgba(255,255,255,0.05)',
                color: filterOptions.telehealthOnly ? '#38bdf8' : 'var(--text-sub)',
                border: `1px solid ${filterOptions.telehealthOnly ? 'var(--primary-cyan)' : 'var(--border-light)'}`,
                borderRadius: '999px',
                padding: '0.35rem 0.85rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <Video size={14} /> Telehealth Video Call
            </button>

            <button
              onClick={onOpenSymptomChecker}
              style={{
                border: 'none',
                background: 'rgba(99,102,241,0.15)',
                color: '#a78bfa',
                border: '1px solid rgba(99,102,241,0.3)',
                borderRadius: '999px',
                padding: '0.35rem 0.85rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontWeight: 600
              }}
            >
              <Zap size={14} /> Analyze Symptoms with AI
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '3rem',
          marginTop: '2.5rem',
          flexWrap: 'wrap'
        }}>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)' }}>500+</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-sub)' }}>Verified Specialists</div>
          </div>
          <div style={{ borderRight: '1px solid var(--border-light)', height: '40px', alignSelf: 'center' }} />
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-emerald)' }}>99.4%</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-sub)' }}>Patient Satisfaction</div>
          </div>
          <div style={{ borderRight: '1px solid var(--border-light)', height: '40px', alignSelf: 'center' }} />
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-cyan)' }}>15 Mins</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-sub)' }}>Avg Telehealth Response</div>
          </div>
        </div>

      </div>
    </section>
  );
}
