import React, { useState } from 'react';
import { Calendar, Clock, Video, FileText, CheckCircle2, XCircle, AlertCircle, Eye, Printer } from 'lucide-react';

export default function PatientDashboard({
  appointments,
  onViewPass,
  onLaunchTelehealth,
  onCancelAppointment,
  onViewPrescription
}) {
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredAppointments = appointments.filter(app => {
    if (filterStatus === 'All') return true;
    return app.status === filterStatus;
  });

  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Patient Dashboard</h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-sub)' }}>Manage your active visits, telehealth passes, and medical records</p>
          </div>

          {/* Status Filters */}
          <div style={{ display: 'flex', gap: '0.4rem', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '12px' }}>
            {['All', 'Confirmed', 'Completed', 'Canceled'].map(st => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                style={{
                  border: 'none',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: filterStatus === st ? 'var(--primary-teal)' : 'transparent',
                  color: filterStatus === st ? '#fff' : 'var(--text-sub)'
                }}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Appointments List */}
        {filteredAppointments.length === 0 ? (
          <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
            <Calendar size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>No Appointments Found</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)', marginTop: '0.3rem' }}>
              You don't have any appointments matching the "{filterStatus}" filter.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredAppointments.map(app => (
              <div key={app.id} className="glass-panel" style={{
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                {/* Left Doctor Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img
                    src={app.doctorImage || app.avatarFallback}
                    alt={app.doctorName}
                    style={{ width: '58px', height: '58px', borderRadius: '14px', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>{app.doctorName}</span>
                      <span className={`badge ${app.status === 'Confirmed' ? 'badge-emerald' : app.status === 'Completed' ? 'badge-teal' : 'badge-rose'}`}>
                        {app.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.825rem', color: 'var(--primary-cyan)', marginTop: '0.1rem' }}>
                      {app.doctorTitle} • {app.specialty}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.3rem', display: 'flex', gap: '0.8rem' }}>
                      <span>📅 {app.date}</span>
                      <span>⏰ {app.timeSlot}</span>
                      <span>💻 {app.consultationType}</span>
                    </div>
                  </div>
                </div>

                {/* Right Action Bar */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => onViewPass(app)}
                  >
                    <Eye size={15} /> Digital Ticket Pass
                  </button>

                  {app.consultationType.includes('Video') && app.status === 'Confirmed' && (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => onLaunchTelehealth(app)}
                    >
                      <Video size={15} /> Join Video Lobby
                    </button>
                  )}

                  {app.prescription && (
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => onViewPrescription(app)}
                    >
                      <FileText size={15} /> View Prescription
                    </button>
                  )}

                  {app.status === 'Confirmed' && (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => onCancelAppointment(app.id)}
                    >
                      <XCircle size={15} /> Cancel
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
