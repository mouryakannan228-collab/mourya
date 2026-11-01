import React from 'react';
import { X, CheckCircle2, Printer, Download, Video, Calendar, Clock, MapPin, QrCode } from 'lucide-react';

export default function AppointmentPassModal({ appointment, onClose, onLaunchTelehealth }) {
  if (!appointment) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px' }}>
        
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            background: 'rgba(255,255,255,0.1)',
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

        {/* Digital Ticket Container */}
        <div style={{ padding: '2rem 1.75rem 1.5rem 1.75rem' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#34d399',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.75rem auto'
            }}>
              <CheckCircle2 size={32} />
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Booking Confirmed!</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)' }}>
              Your digital appointment pass has been generated.
            </p>
          </div>

          {/* Ticket Card */}
          <div style={{
            background: 'linear-gradient(145deg, rgba(15,23,42,0.9), rgba(30,41,59,0.9))',
            border: '2px solid var(--primary-teal)',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-glow-teal)',
            position: 'relative'
          }}>
            
            {/* Ticket Header */}
            <div style={{
              background: 'linear-gradient(135deg, #0d9488, #06b6d4)',
              color: '#fff',
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.85 }}>
                  HealthPulse Digital Pass
                </div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{appointment.id}</div>
              </div>
              <span className="badge" style={{ background: '#ffffff', color: '#0d9488', fontWeight: 800 }}>
                {appointment.status}
              </span>
            </div>

            {/* Ticket Body */}
            <div style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.2rem', alignItems: 'center' }}>
                <img
                  src={appointment.doctorImage || appointment.avatarFallback}
                  alt={appointment.doctorName}
                  style={{ width: '60px', height: '60px', borderRadius: '14px', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>{appointment.doctorName}</div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--primary-cyan)' }}>{appointment.doctorTitle}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-sub)' }}>{appointment.specialty}</div>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                padding: '1rem',
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '12px',
                fontSize: '0.85rem',
                marginBottom: '1.2rem'
              }}>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Patient Name</div>
                  <div style={{ fontWeight: 700 }}>{appointment.patientName}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Consultation Mode</div>
                  <div style={{ fontWeight: 700, color: '#38bdf8' }}>{appointment.consultationType}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Date</div>
                  <div style={{ fontWeight: 700 }}>{appointment.date}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Time Slot</div>
                  <div style={{ fontWeight: 700, color: '#34d399' }}>{appointment.timeSlot}</div>
                </div>
              </div>

              {/* QR Code & Barcode Simulator */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '0.75rem',
                borderTop: '1px dashed var(--border-light)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    padding: '0.5rem',
                    background: '#ffffff',
                    borderRadius: '8px',
                    color: '#0f172a'
                  }}>
                    <QrCode size={40} />
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Scan QR code upon arriving at hospital desk or video lobby
                  </div>
                </div>

                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--primary-emerald)' }}>
                  ${appointment.fee}
                </div>
              </div>

            </div>

          </div>

          {/* Action Footer */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button className="btn btn-secondary btn-sm" style={{ flex: 1 }} onClick={handlePrint}>
              <Printer size={16} /> Print Pass / Save PDF
            </button>

            {appointment.consultationType.includes('Video') && (
              <button
                className="btn btn-primary btn-sm"
                style={{ flex: 1 }}
                onClick={() => {
                  onClose();
                  onLaunchTelehealth(appointment);
                }}
              >
                <Video size={16} /> Enter Video Lobby
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
