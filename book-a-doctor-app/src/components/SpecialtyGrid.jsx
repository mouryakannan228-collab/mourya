import React from 'react';
import { SPECIALTIES } from '../data/mockData';
import { Stethoscope, Heart, Sparkles, Brain, Baby, Activity, Smile } from 'lucide-react';

const ICON_MAP = {
  Stethoscope,
  Heart,
  Sparkles,
  Brain,
  Baby,
  Activity,
  Smile
};

export default function SpecialtyGrid({ selectedSpecialty, setSelectedSpecialty }) {
  return (
    <section style={{ marginBottom: '2.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Browse Medical Specialties</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-sub)' }}>Select a department to filter verified doctors</p>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
        gap: '1rem'
      }}>
        {SPECIALTIES.map(spec => {
          const IconComp = ICON_MAP[spec.icon] || Stethoscope;
          const isSelected = selectedSpecialty === spec.id;

          return (
            <div
              key={spec.id}
              onClick={() => setSelectedSpecialty(spec.id)}
              className="glass-panel"
              style={{
                padding: '1.2rem 1rem',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'var(--transition-fast)',
                border: isSelected ? '1px solid var(--primary-teal)' : '1px solid var(--border-light)',
                background: isSelected ? 'rgba(13, 148, 136, 0.15)' : 'var(--bg-card)',
                boxShadow: isSelected ? 'var(--shadow-glow-teal)' : 'none',
                transform: isSelected ? 'translateY(-3px)' : 'none'
              }}
            >
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '14px',
                margin: '0 auto 0.75rem auto',
                background: isSelected ? 'linear-gradient(135deg, #0d9488, #06b6d4)' : 'rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isSelected ? '#fff' : 'var(--primary-teal)',
                transition: 'var(--transition-fast)'
              }}>
                <IconComp size={22} />
              </div>

              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                {spec.name}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {spec.count} Specialists
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
