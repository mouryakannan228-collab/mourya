import React, { useState } from 'react';
import { X, Calendar, Clock, Video, User, Phone, Mail, FileText, CheckCircle2, ChevronRight, ChevronLeft, ShieldCheck } from 'lucide-react';
import { SYMPTOMS_LIST } from '../data/mockData';

export default function BookingModal({ doctor, onClose, onBookingSuccess }) {
  const [step, setStep] = useState(1);

  // Form State
  const [consultationType, setConsultationType] = useState('Video Telehealth');
  const [selectedDate, setSelectedDate] = useState('2026-08-06');
  const [selectedSlot, setSelectedSlot] = useState(doctor.slots.morning[0] || '10:00 AM');
  
  const [patientName, setPatientName] = useState('Alex Morgan');
  const [patientAge, setPatientAge] = useState('32');
  const [patientGender, setPatientGender] = useState('Male');
  const [patientEmail, setPatientEmail] = useState('alex.morgan@healthmail.com');
  const [patientPhone, setPatientPhone] = useState('+1 (555) 349-8821');
  const [selectedSymptoms, setSelectedSymptoms] = useState(['General Checkup']);
  const [notes, setNotes] = useState('');

  if (!doctor) return null;

  const toggleSymptom = (label) => {
    if (selectedSymptoms.includes(label)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== label));
    } else {
      setSelectedSymptoms([...selectedSymptoms, label]);
    }
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    const newAppointment = {
      id: 'HP-' + Math.floor(1000 + Math.random() * 9000),
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorTitle: doctor.title,
      specialty: doctor.specialtyName,
      doctorImage: doctor.image,
      avatarFallback: doctor.avatarFallback,
      patientName,
      patientAge: parseInt(patientAge) || 30,
      patientGender,
      patientEmail,
      patientPhone,
      date: selectedDate,
      timeSlot: selectedSlot,
      consultationType,
      status: 'Confirmed',
      fee: doctor.fee,
      symptoms: selectedSymptoms,
      notes,
      createdAt: new Date().toISOString()
    };

    onBookingSuccess(newAppointment);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(0,0,0,0.2)'
        }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Book Appointment</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>
              Step {step} of 3 — {step === 1 ? 'Schedule & Slot' : step === 2 ? 'Patient Details' : 'Review & Confirm'}
            </p>
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

        {/* Doctor Summary Banner */}
        <div style={{
          padding: '1rem 1.5rem',
          background: 'rgba(13, 148, 136, 0.1)',
          borderBottom: '1px solid rgba(13, 148, 136, 0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <img
            src={doctor.image || doctor.avatarFallback}
            alt={doctor.name}
            style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover' }}
          />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{doctor.name}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--primary-cyan)' }}>{doctor.title} • ${doctor.fee} Fee</div>
          </div>
        </div>

        {/* Step Content */}
        <div style={{ padding: '1.5rem' }}>
          
          {/* STEP 1: Schedule & Type */}
          {step === 1 && (
            <div>
              {/* Consultation Type Selector */}
              <div className="form-group">
                <label className="form-label">Consultation Mode</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                  {[
                    { id: 'Video Telehealth', icon: Video, desc: 'HD Video Call' },
                    { id: 'In-Clinic Visit', icon: Calendar, desc: 'In-Person' },
                    { id: 'Audio Consultation', icon: Phone, desc: 'Voice Call' }
                  ].map(mode => {
                    const IconC = mode.icon;
                    const isSel = consultationType === mode.id;
                    return (
                      <div
                        key={mode.id}
                        onClick={() => setConsultationType(mode.id)}
                        style={{
                          padding: '0.85rem',
                          borderRadius: '12px',
                          border: `1px solid ${isSel ? 'var(--primary-teal)' : 'var(--border-light)'}`,
                          background: isSel ? 'rgba(13,148,136,0.15)' : 'rgba(0,0,0,0.2)',
                          cursor: 'pointer',
                          textAlign: 'center',
                          transition: 'var(--transition-fast)'
                        }}
                      >
                        <IconC size={20} style={{ color: isSel ? '#2dd4bf' : 'var(--text-sub)', marginBottom: '0.3rem' }} />
                        <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{mode.id}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{mode.desc}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Date Selection */}
              <div className="form-group" style={{ marginTop: '1.2rem' }}>
                <label className="form-label">Select Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={selectedDate}
                  min="2026-08-04"
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

              {/* Slot Selector */}
              <div className="form-group" style={{ marginTop: '1.2rem' }}>
                <label className="form-label">Select Available Time Slot</label>
                
                {/* Morning Slots */}
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Morning Slots</div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  {doctor.slots.morning.map(slot => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      style={{
                        padding: '0.4rem 0.85rem',
                        borderRadius: '8px',
                        border: selectedSlot === slot ? '1px solid var(--primary-teal)' : '1px solid var(--border-light)',
                        background: selectedSlot === slot ? 'var(--primary-teal)' : 'rgba(0,0,0,0.2)',
                        color: selectedSlot === slot ? '#fff' : 'var(--text-sub)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {slot}
                    </button>
                  ))}
                </div>

                {/* Afternoon Slots */}
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Afternoon Slots</div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {doctor.slots.afternoon.map(slot => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      style={{
                        padding: '0.4rem 0.85rem',
                        borderRadius: '8px',
                        border: selectedSlot === slot ? '1px solid var(--primary-teal)' : '1px solid var(--border-light)',
                        background: selectedSlot === slot ? 'var(--primary-teal)' : 'rgba(0,0,0,0.2)',
                        color: selectedSlot === slot ? '#fff' : 'var(--text-sub)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* STEP 2: Patient Details */}
          {step === 2 && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Patient Full Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Age & Gender</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="number"
                      className="form-input"
                      style={{ width: '80px' }}
                      value={patientAge}
                      onChange={(e) => setPatientAge(e.target.value)}
                    />
                    <select
                      className="form-select"
                      value={patientGender}
                      onChange={(e) => setPatientGender(e.target.value)}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-input"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-input"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Symptoms Selector */}
              <div className="form-group">
                <label className="form-label">Select Experienced Symptoms</label>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {['Chest Pain', 'Fever', 'Skin Rash', 'Headache', 'Joint Pain', 'General Checkup'].map(symptom => {
                    const active = selectedSymptoms.includes(symptom);
                    return (
                      <button
                        key={symptom}
                        type="button"
                        onClick={() => toggleSymptom(symptom)}
                        style={{
                          padding: '0.35rem 0.75rem',
                          borderRadius: '999px',
                          border: `1px solid ${active ? 'var(--primary-teal)' : 'var(--border-light)'}`,
                          background: active ? 'rgba(13,148,136,0.2)' : 'rgba(0,0,0,0.2)',
                          color: active ? '#2dd4bf' : 'var(--text-sub)',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        {active ? '✓ ' : '+ '}{symptom}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Additional Medical Notes / Reason for Visit</label>
                <textarea
                  className="form-textarea"
                  rows={2}
                  placeholder="Describe your health concern briefly..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

            </div>
          )}

          {/* STEP 3: Review & Summary */}
          {step === 3 && (
            <div>
              <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.8rem', color: 'var(--primary-cyan)' }}>
                  Appointment Summary
                </h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.875rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Doctor:</span>
                    <div style={{ fontWeight: 700 }}>{doctor.name}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Consultation Mode:</span>
                    <div style={{ fontWeight: 700, color: '#38bdf8' }}>{consultationType}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Date & Time:</span>
                    <div style={{ fontWeight: 700 }}>{selectedDate} at {selectedSlot}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Patient Name:</span>
                    <div style={{ fontWeight: 700 }}>{patientName} ({patientAge} yrs, {patientGender})</div>
                  </div>
                </div>

                <div style={{ marginTop: '0.8rem', paddingTop: '0.8rem', borderTop: '1px dashed var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-sub)' }}>Total Consultation Fee:</span>
                  <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary-emerald)' }}>${doctor.fee}</span>
                </div>
              </div>

              <div style={{
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                padding: '0.85rem 1rem',
                borderRadius: '12px',
                fontSize: '0.825rem',
                color: '#34d399',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <ShieldCheck size={18} /> Instant digital appointment ticket pass will be generated upon confirmation!
              </div>

            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(0,0,0,0.2)'
        }}>
          {step > 1 ? (
            <button className="btn btn-secondary btn-sm" onClick={() => setStep(step - 1)}>
              <ChevronLeft size={16} /> Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button className="btn btn-primary btn-sm" onClick={() => setStep(step + 1)}>
              Continue <ChevronRight size={16} />
            </button>
          ) : (
            <button className="btn btn-primary btn-lg" onClick={handleConfirmBooking}>
              <CheckCircle2 size={18} /> Confirm & Generate Pass
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
