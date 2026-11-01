import React, { useState } from 'react';
import { Star, MapPin, Calendar, Clock, Video, Award, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function DoctorCard({ doctor, onSelectDoctor, onBookDoctor, onStartTelehealth }) {
  const [imgSrc, setImgSrc] = useState(doctor.image || doctor.avatarFallback);

  return (
    <div className="glass-panel" style={{
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      transition: 'var(--transition-normal)',
      overflow: 'hidden'
    }}>
      {/* Top Specialty Badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <span className="badge badge-teal">
          {doctor.specialtyName}
        </span>
        {doctor.availableToday ? (
          <span className="badge badge-emerald">
            <span className="pulse-dot" style={{ width: '6px', height: '6px' }} /> Today Available
          </span>
        ) : (
          <span className="badge badge-amber">
            <Clock size={12} /> Next: Tomorrow
          </span>
        )}
      </div>

      {/* Doctor Info Section */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.2rem' }}>
        <div style={{ position: 'relative' }}>
          <img
            src={imgSrc}
            onError={() => setImgSrc(doctor.avatarFallback)}
            alt={doctor.name}
            style={{
              width: '84px',
              height: '84px',
              borderRadius: '16px',
              objectFit: 'cover',
              border: '2px solid var(--border-light)'
            }}
          />
          {doctor.telehealth && (
            <div style={{
              position: 'absolute',
              bottom: '-4px',
              right: '-4px',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: '#0d9488',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid var(--bg-card)'
            }} title="Supports Telehealth Video">
              <Video size={12} />
            </div>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
            {doctor.name}
          </h3>
          <div style={{ fontSize: '0.825rem', color: 'var(--text-sub)', marginBottom: '0.4rem' }}>
            {doctor.title}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.825rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#fbbf24', fontWeight: 700 }}>
              <Star size={14} fill="#fbbf24" />
              <span>{doctor.rating}</span>
              <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({doctor.reviewsCount})</span>
            </div>
            <div style={{ color: 'var(--text-muted)' }}>•</div>
            <div style={{ color: 'var(--text-sub)', fontWeight: 600 }}>{doctor.experience}</div>
          </div>
        </div>
      </div>

      {/* Hospital Location & Fee */}
      <div style={{
        background: 'rgba(0,0,0,0.2)',
        borderRadius: '12px',
        padding: '0.75rem 1rem',
        marginBottom: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.85rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-sub)' }}>
          <MapPin size={15} style={{ color: 'var(--primary-cyan)', shrink: 0 }} />
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '170px' }}>
            {doctor.hospital}
          </span>
        </div>
        <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--primary-emerald)' }}>
          ${doctor.fee}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: doctor.telehealth ? '1fr 1fr' : '1fr', gap: '0.6rem' }}>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => onBookDoctor(doctor)}
        >
          <Calendar size={15} /> Book Visit
        </button>

        {doctor.telehealth && (
          <button
            className="btn btn-outline btn-sm"
            onClick={() => onStartTelehealth(doctor)}
          >
            <Video size={15} /> Telehealth
          </button>
        )}
      </div>

      {/* View Profile Link */}
      <button
        onClick={() => onSelectDoctor(doctor)}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-sub)',
          fontSize: '0.8rem',
          fontWeight: 600,
          marginTop: '0.8rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.2rem'
        }}
      >
        View Full Profile & Reviews <ChevronRight size={14} />
      </button>

    </div>
  );
}
