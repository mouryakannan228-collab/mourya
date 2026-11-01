import React, { useState } from 'react';
import { X, Star, MapPin, Award, BookOpen, Clock, Calendar, CheckCircle2, MessageSquare, Video } from 'lucide-react';

export default function DoctorModal({ doctor, onClose, onBookDoctor }) {
  const [imgSrc, setImgSrc] = useState(doctor.image || doctor.avatarFallback);

  if (!doctor) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '780px' }}>
        
        {/* Header */}
        <div style={{
          padding: '1.5rem 1.75rem',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(0,0,0,0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge badge-teal">{doctor.specialtyName}</span>
            <span className="badge badge-emerald"><CheckCircle2 size={12} /> Verified Medical License</span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: 'none',
              color: 'var(--text-sub)',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body Content */}
        <div style={{ padding: '1.75rem' }}>
          
          {/* Main Info Header */}
          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
            <img
              src={imgSrc}
              onError={() => setImgSrc(doctor.avatarFallback)}
              alt={doctor.name}
              style={{
                width: '110px',
                height: '110px',
                borderRadius: '20px',
                objectFit: 'cover',
                border: '3px solid var(--primary-teal)'
              }}
            />
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>{doctor.name}</h2>
              <p style={{ color: 'var(--primary-cyan)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                {doctor.title}
              </p>
              
              <div style={{ display: 'flex', gap: '1.2rem', fontSize: '0.875rem', flexWrap: 'wrap', color: 'var(--text-sub)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#fbbf24', fontWeight: 700 }}>
                  <Star size={16} fill="#fbbf24" /> {doctor.rating} ({doctor.reviewsCount} reviews)
                </div>
                <div>•</div>
                <div style={{ fontWeight: 600 }}>{doctor.experience}</div>
                <div>•</div>
                <div>Fee: <strong style={{ color: 'var(--primary-emerald)' }}>${doctor.fee}</strong></div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                {doctor.languages.map((lang, idx) => (
                  <span key={idx} style={{
                    fontSize: '0.75rem',
                    padding: '0.2rem 0.6rem',
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: '6px',
                    color: 'var(--text-sub)'
                  }}>
                    🗣️ {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* About & Credentials */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <BookOpen size={16} style={{ color: 'var(--primary-cyan)' }} /> Biography & Background
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-sub)', lineHeight: 1.6 }}>
              {doctor.about}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            marginBottom: '1.75rem'
          }}>
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Education & Qualification</div>
              <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{doctor.education}</div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Hospital & Location</div>
              <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{doctor.hospital}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-sub)' }}>{doctor.location}</div>
            </div>
          </div>

          {/* Available Slots Preview */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={16} style={{ color: 'var(--primary-emerald)' }} /> Available Time Slots (Today/Tomorrow)
            </h4>
            
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {Object.values(doctor.slots).flat().slice(0, 6).map((slot, idx) => (
                <span key={idx} style={{
                  padding: '0.4rem 0.8rem',
                  borderRadius: '8px',
                  background: 'rgba(13, 148, 136, 0.12)',
                  border: '1px solid rgba(13, 148, 136, 0.3)',
                  color: '#2dd4bf',
                  fontSize: '0.825rem',
                  fontWeight: 600
                }}>
                  {slot}
                </span>
              ))}
            </div>
          </div>

          {/* Patient Reviews Section */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <MessageSquare size={16} style={{ color: 'var(--accent-indigo)' }} /> Patient Reviews ({doctor.reviewsList.length})
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {doctor.reviewsList.map(rev => (
                <div key={rev.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '0.85rem', borderRadius: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', fontSize: '0.85rem' }}>
                    <span style={{ fontWeight: 700 }}>{rev.patient}</span>
                    <span style={{ color: '#fbbf24' }}>{'★'.repeat(rev.rating)}</span>
                  </div>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-sub)' }}>"{rev.comment}"</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer CTA */}
        <div style={{
          padding: '1.25rem 1.75rem',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(0,0,0,0.3)'
        }}>
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Consultation Fee</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary-emerald)' }}>${doctor.fee}</div>
          </div>

          <button
            className="btn btn-primary btn-lg"
            onClick={() => {
              onClose();
              onBookDoctor(doctor);
            }}
          >
            <Calendar size={18} /> Proceed to Book Appointment
          </button>
        </div>

      </div>
    </div>
  );
}
