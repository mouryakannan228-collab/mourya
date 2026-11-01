import React, { useState } from 'react';
import { X, Printer, Plus, Trash2, CheckCircle2, FileText, Pill } from 'lucide-react';

export default function EPrescriptionModal({ appointment, onClose, onSavePrescription }) {
  const isViewOnly = !!appointment?.prescription;

  // Initial Form State
  const [medications, setMedications] = useState(
    appointment?.prescription?.medications || [
      { name: 'Amoxicillin 500mg', dosage: '1 Capsule after meals', duration: '7 Days' },
      { name: 'Paracetamol 650mg', dosage: '1 Tablet as needed for fever', duration: '5 Days' }
    ]
  );
  const [doctorAdvice, setDoctorAdvice] = useState(
    appointment?.prescription?.doctorAdvice || 'Take rest, maintain hydration (3L daily), and follow up in 7 days.'
  );

  const addMedicationRow = () => {
    setMedications([...medications, { name: '', dosage: '', duration: '5 Days' }]);
  };

  const updateMedication = (idx, field, value) => {
    const updated = [...medications];
    updated[idx][field] = value;
    setMedications(updated);
  };

  const removeMedication = (idx) => {
    setMedications(medications.filter((_, i) => i !== idx));
  };

  const handleSave = () => {
    onSavePrescription(appointment.id, { medications, doctorAdvice });
    onClose();
  };

  const handlePrint = () => {
    window.print();
  };

  if (!appointment) return null;

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <FileText size={20} style={{ color: 'var(--primary-teal)' }} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Official Digital E-Prescription</h3>
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

        {/* Printable Prescription Body */}
        <div style={{ padding: '1.75rem' }}>
          
          {/* Rx Document Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingBottom: '1.25rem',
            borderBottom: '2px solid var(--primary-teal)',
            marginBottom: '1.5rem'
          }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-teal)' }}>
                {appointment.doctorName}
              </h2>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-sub)' }}>{appointment.doctorTitle}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>License ID: #MED-994821</div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--primary-cyan)', lineHeight: 1 }}>
                ℞
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Date: {new Date().toLocaleDateString()}</div>
            </div>
          </div>

          {/* Patient Details Row */}
          <div style={{
            background: 'rgba(0,0,0,0.25)',
            padding: '1rem',
            borderRadius: '12px',
            marginBottom: '1.5rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '0.75rem',
            fontSize: '0.85rem'
          }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Patient Name:</span>
              <div style={{ fontWeight: 700 }}>{appointment.patientName}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Age / Gender:</span>
              <div style={{ fontWeight: 700 }}>{appointment.patientAge} Yrs / {appointment.patientGender}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Rx ID:</span>
              <div style={{ fontWeight: 700, color: '#38bdf8' }}>RX-{appointment.id}</div>
            </div>
          </div>

          {/* Medications Table / Form */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.75rem'
            }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Pill size={16} style={{ color: 'var(--primary-emerald)' }} /> Prescribed Medications
              </h4>

              {!isViewOnly && (
                <button className="btn btn-secondary btn-sm" onClick={addMedicationRow}>
                  <Plus size={14} /> Add Medicine
                </button>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {medications.map((med, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: isViewOnly ? '2fr 2fr 1fr' : '2fr 2fr 1fr 40px',
                    gap: '0.5rem',
                    alignItems: 'center',
                    background: 'rgba(255,255,255,0.03)',
                    padding: '0.6rem 0.85rem',
                    borderRadius: '8px'
                  }}
                >
                  {isViewOnly ? (
                    <>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{med.name}</div>
                      <div style={{ fontSize: '0.825rem', color: 'var(--text-sub)' }}>{med.dosage}</div>
                      <div style={{ fontSize: '0.825rem', color: '#34d399', fontWeight: 600 }}>{med.duration}</div>
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Medicine Name (e.g. Lipitor 10mg)"
                        value={med.name}
                        onChange={(e) => updateMedication(idx, 'name', e.target.value)}
                        style={{ fontSize: '0.85rem', padding: '0.4rem 0.6rem' }}
                      />
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Dosage (e.g. 1 tab after dinner)"
                        value={med.dosage}
                        onChange={(e) => updateMedication(idx, 'dosage', e.target.value)}
                        style={{ fontSize: '0.85rem', padding: '0.4rem 0.6rem' }}
                      />
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Duration"
                        value={med.duration}
                        onChange={(e) => updateMedication(idx, 'duration', e.target.value)}
                        style={{ fontSize: '0.85rem', padding: '0.4rem 0.6rem' }}
                      />
                      <button
                        type="button"
                        onClick={() => removeMedication(idx)}
                        style={{ background: 'none', border: 'none', color: 'var(--accent-rose)', cursor: 'pointer' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Doctor Advice & Instructions */}
          <div className="form-group">
            <label className="form-label">Doctor Advice & Dietary Instructions</label>
            {isViewOnly ? (
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.85rem', borderRadius: '8px', fontSize: '0.875rem' }}>
                {doctorAdvice}
              </div>
            ) : (
              <textarea
                className="form-textarea"
                rows={2}
                value={doctorAdvice}
                onChange={(e) => setDoctorAdvice(e.target.value)}
              />
            )}
          </div>

          {/* Digital Signature */}
          <div style={{
            marginTop: '1.5rem',
            paddingTop: '1rem',
            borderTop: '1px dashed var(--border-light)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Verified by HealthPulse Digital Health Network
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'cursive', fontSize: '1.2rem', color: 'var(--primary-cyan)' }}>
                {appointment.doctorName}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Authorized Medical Signature</div>
            </div>
          </div>

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
          <button className="btn btn-secondary btn-sm" onClick={handlePrint}>
            <Printer size={16} /> Print Prescription
          </button>

          {!isViewOnly && (
            <button className="btn btn-primary btn-sm" onClick={handleSave}>
              <CheckCircle2 size={16} /> Issue E-Prescription
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
