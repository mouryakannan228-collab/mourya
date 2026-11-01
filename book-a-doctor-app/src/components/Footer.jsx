import React from 'react';
import { Activity, ShieldCheck, Heart, PhoneCall, Mail } from 'lucide-react';

export default function Footer({ onOpenSymptomChecker, setActiveTab }) {
  return (
    <footer style={{
      background: 'rgba(5, 9, 18, 0.95)',
      borderTop: '1px solid var(--border-light)',
      padding: '3rem 0 1.5rem 0',
      marginTop: '4rem'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem',
          marginBottom: '2.5rem'
        }}>
          
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #0d9488, #06b6d4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}>
                <Activity size={20} />
              </div>
              <span style={{ fontWeight: 800, fontSize: '1.2rem' }}>HealthPulse PRO</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)', lineHeight: 1.6, marginBottom: '1rem' }}>
              Connecting patients with top certified doctor specialists worldwide for verified in-clinic appointments and HD video telehealth consultations.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--primary-emerald)' }}>
              <ShieldCheck size={16} /> 100% HIPAA & Medical Privacy Compliant
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem' }}>Patient Resources</h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>
                <button onClick={() => setActiveTab('explore')} style={{ background: 'none', border: 'none', color: 'var(--text-sub)', cursor: 'pointer' }}>
                  Find Doctor Specialists
                </button>
              </li>
              <li>
                <button onClick={onOpenSymptomChecker} style={{ background: 'none', border: 'none', color: 'var(--text-sub)', cursor: 'pointer' }}>
                  AI Symptom Triage Tool
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('appointments')} style={{ background: 'none', border: 'none', color: 'var(--text-sub)', cursor: 'pointer' }}>
                  Manage Appointments & Passes
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('telehealth')} style={{ background: 'none', border: 'none', color: 'var(--text-sub)', cursor: 'pointer' }}>
                  Virtual Telehealth Lobby
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency Contact */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem' }}>Emergency Support</h4>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-sub)', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-rose)', fontWeight: 700 }}>
                <PhoneCall size={16} /> 24/7 Helpline: 1-800-HEALTH-NOW
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={16} /> support@healthpulse.med
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                For life-threatening emergencies, please dial 911 or visit your nearest emergency room immediately.
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div style={{
          borderTop: '1px solid var(--border-light)',
          paddingTop: '1.25rem',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          © 2026 HealthPulse Pro. All rights reserved. Redesigned Doctor Booking Platform.
        </div>
      </div>
    </footer>
  );
}
