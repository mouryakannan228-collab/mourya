import React from 'react';
import { Users, Calendar, Clock, Video, FileText, CheckCircle2, AlertCircle, Plus } from 'lucide-react';

export default function DoctorDashboard({
  appointments,
  onLaunchTelehealth,
  onOpenEPrescription,
  doctors
}) {
  const currentDoc = doctors[0]; // Logged in doctor simulation (Dr. Sarah Jenkins)

  const docAppointments = appointments.filter(a => a.doctorId === currentDoc.id || a.doctorName.includes('Sarah'));

  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="container">
        
        {/* Doctor Header Banner */}
        <div className="glass-panel" style={{
          padding: '1.5rem 2rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.9))',
          border: '1px solid var(--border-active)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <img
              src={currentDoc.image || currentDoc.avatarFallback}
              alt={currentDoc.name}
              style={{ width: '70px', height: '70px', borderRadius: '18px', objectFit: 'cover', border: '2px solid var(--primary-cyan)' }}
            />
            <div>
              <div className="badge badge-indigo" style={{ marginBottom: '0.3rem' }}>Physician Portal Mode</div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Welcome back, {currentDoc.name}</h1>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)' }}>
                {currentDoc.title} • {currentDoc.hospital}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', textAlign: 'right' }}>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-emerald)' }}>
                {docAppointments.length}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-sub)' }}>Total Patients Scheduled</div>
            </div>
          </div>
        </div>

        {/* Patient Queue */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users size={20} style={{ color: 'var(--primary-cyan)' }} /> Today's Patient Queue
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {docAppointments.map(app => (
              <div key={app.id} className="glass-panel" style={{
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>{app.patientName}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      ({app.patientAge} yrs, {app.patientGender})
                    </span>
                    <span className="badge badge-emerald">{app.consultationType}</span>
                  </div>

                  <div style={{ fontSize: '0.825rem', color: 'var(--text-sub)', marginTop: '0.25rem' }}>
                    <strong>Time:</strong> {app.timeSlot} | <strong>Symptoms:</strong> {app.symptoms.join(', ')}
                  </div>
                  {app.notes && (
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      <em>Note: "{app.notes}"</em>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {app.consultationType.includes('Video') && (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => onLaunchTelehealth(app)}
                    >
                      <Video size={15} /> Start Telehealth
                    </button>
                  )}

                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => onOpenEPrescription(app)}
                  >
                    <Plus size={15} /> Issue E-Prescription
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
