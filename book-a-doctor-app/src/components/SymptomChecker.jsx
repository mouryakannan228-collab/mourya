import React, { useState } from 'react';
import { X, Bot, Sparkles, AlertCircle, ArrowRight, Stethoscope, CheckCircle2, RefreshCw } from 'lucide-react';
import { SYMPTOMS_LIST } from '../data/mockData';

export default function SymptomChecker({ onClose, onSelectSpecialty, doctors }) {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const toggleSymptom = (sym) => {
    if (selectedSymptoms.find(s => s.id === sym.id)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s.id !== sym.id));
    } else {
      setSelectedSymptoms([...selectedSymptoms, sym]);
    }
  };

  const handleAnalyze = () => {
    if (selectedSymptoms.length === 0) return;

    setAnalyzing(true);
    setResult(null);

    setTimeout(() => {
      // Find top specialty by frequency
      const specialtyCounts = {};
      selectedSymptoms.forEach(s => {
        specialtyCounts[s.specialty] = (specialtyCounts[s.specialty] || 0) + 1;
      });

      let topSpecialty = Object.keys(specialtyCounts).reduce((a, b) =>
        specialtyCounts[a] > specialtyCounts[b] ? a : b
      );

      const recommendedDoctors = doctors.filter(d => d.specialty === topSpecialty);

      setResult({
        topSpecialty,
        specialtyName: topSpecialty.charAt(0).toUpperCase() + topSpecialty.slice(1),
        confidence: Math.min(85 + selectedSymptoms.length * 4, 98),
        recommendedDoctors
      });
      setAnalyzing(false);
    }, 900);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '650px' }}>
        
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(99, 102, 241, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
            }}>
              <Bot size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>AI Symptom Assistant</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-sub)' }}>Smart Clinical Triage & Specialist Matcher</p>
            </div>
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

        {/* Content */}
        <div style={{ padding: '1.5rem' }}>
          
          {!result ? (
            <div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-sub)', marginBottom: '1rem' }}>
                Select all symptoms you are currently experiencing to get an AI triage analysis and instant doctor recommendation:
              </p>

              {/* Symptoms Grid */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                {SYMPTOMS_LIST.map(sym => {
                  const isSel = !!selectedSymptoms.find(s => s.id === sym.id);
                  return (
                    <button
                      key={sym.id}
                      onClick={() => toggleSymptom(sym)}
                      style={{
                        padding: '0.5rem 0.9rem',
                        borderRadius: '12px',
                        border: `1px solid ${isSel ? 'var(--accent-indigo)' : 'var(--border-light)'}`,
                        background: isSel ? 'rgba(99, 102, 241, 0.2)' : 'rgba(0,0,0,0.2)',
                        color: isSel ? '#a78bfa' : 'var(--text-sub)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        transition: 'var(--transition-fast)'
                      }}
                    >
                      {isSel ? '✓' : '+'} {sym.label}
                    </button>
                  );
                })}
              </div>

              {/* Disclaimer */}
              <div style={{
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
                background: 'rgba(0,0,0,0.2)',
                padding: '0.75rem',
                borderRadius: '8px',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <AlertCircle size={16} style={{ color: 'var(--accent-amber)', shrink: 0 }} />
                <span>Note: This tool provides preliminary guidance and does not replace emergency medical care.</span>
              </div>

              <button
                className="btn btn-primary btn-lg"
                style={{ width: '100%', background: 'linear-gradient(135deg, #6366f1, #06b6d4)' }}
                disabled={selectedSymptoms.length === 0 || analyzing}
                onClick={handleAnalyze}
              >
                {analyzing ? (
                  <>
                    <RefreshCw size={18} className="spin" style={{ animation: 'spin 1s linear infinite' }} /> Analyzing Symptoms...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} /> Analyze & Match Specialist ({selectedSymptoms.length} Selected)
                  </>
                )}
              </button>

            </div>
          ) : (
            <div>
              {/* Results View */}
              <div style={{
                background: 'rgba(13, 148, 136, 0.12)',
                border: '1px solid rgba(13, 148, 136, 0.3)',
                padding: '1.25rem',
                borderRadius: '16px',
                textAlign: 'center',
                marginBottom: '1.5rem'
              }}>
                <span className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>
                  {result.confidence}% Match Confidence
                </span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Recommended Department: <span className="gradient-text">{result.specialtyName}</span>
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)', marginTop: '0.3rem' }}>
                  Based on your selected symptoms ({selectedSymptoms.map(s => s.label).join(', ')}), consulting a {result.specialtyName} specialist is highly advised.
                </p>
              </div>

              {/* Recommended Doctors */}
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                Top Matching Doctors Available:
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {result.recommendedDoctors.map(doc => (
                  <div
                    key={doc.id}
                    style={{
                      background: 'rgba(0,0,0,0.2)',
                      padding: '0.85rem 1rem',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img
                        src={doc.image || doc.avatarFallback}
                        alt={doc.name}
                        style={{ width: '42px', height: '42px', borderRadius: '10px', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{doc.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--primary-cyan)' }}>{doc.title}</div>
                      </div>
                    </div>

                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        onClose();
                        onSelectSpecialty(doc.specialty);
                      }}
                    >
                      Book Now <ArrowRight size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setResult(null)}
                style={{ width: '100%' }}
              >
                Reset & Try Other Symptoms
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
