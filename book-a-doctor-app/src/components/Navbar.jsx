import React from 'react';
import { Stethoscope, Activity, Calendar, Video, Bot, UserCheck, Sun, Moon, ShieldAlert } from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  appointmentsCount,
  onOpenSymptomChecker,
  appMode,
  setAppMode,
  theme,
  toggleTheme
}) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--bg-glass)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-light)',
      padding: '0.85rem 0'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('explore')} 
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #0d9488, #06b6d4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: 'var(--shadow-glow-teal)'
          }}>
            <Activity size={24} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              HealthPulse <span style={{ fontSize: '0.75rem', padding: '0.1rem 0.4rem', borderRadius: '4px', background: 'rgba(6,182,212,0.2)', color: '#38bdf8' }}>PRO</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-sub)', marginTop: '-2px' }}>
              Advanced Healthcare & Telehealth
            </div>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            className={`btn ${activeTab === 'explore' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            onClick={() => setActiveTab('explore')}
          >
            <Stethoscope size={16} />
            <span>Find Doctors</span>
          </button>

          <button
            className="btn btn-secondary btn-sm"
            onClick={onOpenSymptomChecker}
            style={{ border: '1px dashed var(--primary-cyan)' }}
          >
            <Bot size={16} style={{ color: '#38bdf8' }} />
            <span>AI Symptom Checker</span>
          </button>

          <button
            className={`btn ${activeTab === 'appointments' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            onClick={() => setActiveTab('appointments')}
            style={{ position: 'relative' }}
          >
            <Calendar size={16} />
            <span>My Appointments</span>
            {appointmentsCount > 0 && (
              <span style={{
                background: 'var(--accent-indigo)',
                color: '#fff',
                borderRadius: '99px',
                fontSize: '0.7rem',
                padding: '0.1rem 0.45rem',
                fontWeight: 700,
                marginLeft: '0.2rem'
              }}>
                {appointmentsCount}
              </span>
            )}
          </button>

          <button
            className={`btn ${activeTab === 'telehealth' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            onClick={() => setActiveTab('telehealth')}
          >
            <Video size={16} style={{ color: '#34d399' }} />
            <span>Telehealth Room</span>
          </button>
        </nav>

        {/* Right Action Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          
          {/* Portal Switcher Toggle */}
          <div style={{
            display: 'flex',
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '999px',
            padding: '3px',
            border: '1px solid var(--border-light)'
          }}>
            <button
              onClick={() => setAppMode('patient')}
              style={{
                border: 'none',
                padding: '0.35rem 0.75rem',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                background: appMode === 'patient' ? 'var(--primary-teal)' : 'transparent',
                color: appMode === 'patient' ? '#fff' : 'var(--text-sub)',
                transition: 'var(--transition-fast)'
              }}
            >
              Patient
            </button>
            <button
              onClick={() => setAppMode('doctor')}
              style={{
                border: 'none',
                padding: '0.35rem 0.75rem',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                background: appMode === 'doctor' ? 'var(--accent-indigo)' : 'transparent',
                color: appMode === 'doctor' ? '#fff' : 'var(--text-sub)',
                transition: 'var(--transition-fast)'
              }}
            >
              Doctor Portal
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-secondary btn-sm"
            style={{ width: '38px', height: '38px', padding: 0 }}
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun size={18} color="#fbbf24" /> : <Moon size={18} color="#6366f1" />}
          </button>
        </div>

      </div>
    </header>
  );
}
