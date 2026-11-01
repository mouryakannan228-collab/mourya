import React, { useState } from 'react';
import { Video, Mic, MicOff, VideoOff, PhoneOff, MessageSquare, Send, FileText, Shield, User, Activity } from 'lucide-react';

export default function VideoConsultation({ appointment, onClose, onIssuePrescription }) {
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'notes'
  
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Doctor', text: 'Hello Alex! I am Dr. Jenkins. How are you feeling today?', time: '10:16 AM' },
    { id: 2, sender: 'You', text: 'Hi Doctor! I have been having occasional chest tightness after evening cardio.', time: '10:17 AM' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const docName = appointment ? appointment.doctorName : 'Dr. Sarah Jenkins';
  const docTitle = appointment ? appointment.doctorTitle : 'Senior Consultant Cardiologist';
  const patientName = appointment ? appointment.patientName : 'Alex Morgan';

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'You',
      text: inputMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setInputMsg('');

    // Mock Doctor reply
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'Doctor',
        text: 'Thank you for sharing. Let me check your blood pressure history and ECG notes.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1200);
  };

  return (
    <div style={{ padding: '1.5rem 0' }}>
      <div className="container">
        
        {/* Top Header Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.25rem',
          background: 'var(--bg-card)',
          padding: '0.85rem 1.25rem',
          borderRadius: '16px',
          border: '1px solid var(--border-light)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="pulse-dot" style={{ width: '10px', height: '10px' }} />
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Encrypted Telehealth Session <span className="badge badge-emerald">Live HD 1080p</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-sub)' }}>
                Consulting with {docName} ({docTitle})
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {onIssuePrescription && (
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => onIssuePrescription(appointment)}
              >
                <FileText size={16} style={{ color: '#38bdf8' }} /> Doctor E-Prescription Drawer
              </button>
            )}
            <button className="btn btn-danger btn-sm" onClick={onClose}>
              <PhoneOff size={16} /> Exit Room
            </button>
          </div>
        </div>

        {/* Video & Sidebar Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2.5fr 1fr',
          gap: '1.25rem',
          minHeight: '520px'
        }}>
          
          {/* Main Video Screen */}
          <div style={{
            background: '#040711',
            borderRadius: '20px',
            border: '1px solid var(--border-light)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: 'var(--shadow-md)'
          }}>
            
            {/* Top Overlay Badge */}
            <div style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              zIndex: 5,
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(8px)',
              padding: '0.4rem 0.8rem',
              borderRadius: '999px',
              color: '#fff',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              <Shield size={14} color="#34d399" /> HIPAA Compliant Video Encryption
            </div>

            {/* Main Video View (Doctor Frame) */}
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              background: 'radial-gradient(circle at center, #1e293b 0%, #090d16 100%)'
            }}>
              {cameraOn ? (
                <div style={{ textAlign: 'center' }}>
                  <img
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600"
                    alt="Doctor Live"
                    style={{
                      width: '260px',
                      height: '260px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '4px solid var(--primary-teal)',
                      boxShadow: 'var(--shadow-glow-teal)',
                      marginBottom: '1rem'
                    }}
                  />
                  <div style={{ fontWeight: 700, fontSize: '1.2rem', color: '#fff' }}>{docName}</div>
                  <div style={{ fontSize: '0.85rem', color: '#2dd4bf' }}>Speaking...</div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                  <VideoOff size={48} style={{ marginBottom: '0.5rem' }} />
                  <div>Doctor Video Stream Off</div>
                </div>
              )}

              {/* Patient Self-View Picture-in-Picture */}
              <div style={{
                position: 'absolute',
                bottom: '80px',
                right: '20px',
                width: '140px',
                height: '100px',
                borderRadius: '12px',
                background: '#0f172a',
                border: '2px solid var(--primary-cyan)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-md)'
              }}>
                <div style={{ textAlign: 'center', color: '#fff', fontSize: '0.75rem' }}>
                  <User size={24} style={{ color: '#38bdf8' }} />
                  <div>{patientName} (You)</div>
                </div>
              </div>

            </div>

            {/* Video Controls Bar */}
            <div style={{
              background: 'rgba(15,23,42,0.95)',
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.25rem',
              borderTop: '1px solid var(--border-light)'
            }}>
              <button
                onClick={() => setMicOn(!micOn)}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: 'none',
                  background: micOn ? 'rgba(255,255,255,0.1)' : 'rgba(244,63,94,0.2)',
                  color: micOn ? '#fff' : 'var(--accent-rose)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title={micOn ? 'Mute Mic' : 'Unmute Mic'}
              >
                {micOn ? <Mic size={20} /> : <MicOff size={20} />}
              </button>

              <button
                onClick={() => setCameraOn(!cameraOn)}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: 'none',
                  background: cameraOn ? 'rgba(255,255,255,0.1)' : 'rgba(244,63,94,0.2)',
                  color: cameraOn ? '#fff' : 'var(--accent-rose)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title={cameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
              >
                {cameraOn ? <Video size={20} /> : <VideoOff size={20} />}
              </button>

              <button
                onClick={onClose}
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  border: 'none',
                  background: 'var(--accent-rose)',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 15px rgba(244,63,94,0.4)'
                }}
                title="End Consultation"
              >
                <PhoneOff size={24} />
              </button>
            </div>

          </div>

          {/* Right Sidebar (Chat & Notes) */}
          <div className="glass-panel" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden'
          }}>
            
            {/* Sidebar Tabs */}
            <div style={{
              display: 'flex',
              borderBottom: '1px solid var(--border-light)',
              background: 'rgba(0,0,0,0.2)'
            }}>
              <button
                onClick={() => setActiveTab('chat')}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: 'none',
                  background: activeTab === 'chat' ? 'var(--bg-card)' : 'transparent',
                  color: activeTab === 'chat' ? 'var(--primary-cyan)' : 'var(--text-sub)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem'
                }}
              >
                <MessageSquare size={16} /> Live Chat
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: 'none',
                  background: activeTab === 'notes' ? 'var(--bg-card)' : 'transparent',
                  color: activeTab === 'notes' ? 'var(--primary-cyan)' : 'var(--text-sub)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem'
                }}
              >
                <FileText size={16} /> Clinical Notes
              </button>
            </div>

            {/* Chat Body */}
            {activeTab === 'chat' ? (
              <div style={{
                flex: 1,
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', overflowY: 'auto', maxHeight: '380px' }}>
                  {messages.map(msg => (
                    <div
                      key={msg.id}
                      style={{
                        alignSelf: msg.sender === 'You' ? 'flex-end' : 'flex-start',
                        maxWidth: '85%',
                        background: msg.sender === 'You' ? 'var(--primary-teal)' : 'rgba(255,255,255,0.08)',
                        color: '#fff',
                        padding: '0.6rem 0.85rem',
                        borderRadius: '12px',
                        fontSize: '0.825rem'
                      }}
                    >
                      <div style={{ fontSize: '0.7rem', opacity: 0.8, marginBottom: '0.2rem' }}>
                        {msg.sender} • {msg.time}
                      </div>
                      <div>{msg.text}</div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Type message..."
                    value={inputMsg}
                    onChange={(e) => setInputMsg(e.target.value)}
                    style={{ fontSize: '0.85rem', padding: '0.5rem 0.75rem' }}
                  />
                  <button type="submit" className="btn btn-primary btn-sm" style={{ padding: '0 0.85rem' }}>
                    <Send size={16} />
                  </button>
                </form>
              </div>
            ) : (
              /* Clinical Notes View */
              <div style={{ padding: '1rem', fontSize: '0.85rem', color: 'var(--text-sub)' }}>
                <div style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Doctor Diagnostic Notes</div>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.85rem', borderRadius: '8px', lineHeight: 1.6 }}>
                  • Blood Pressure: 120/80 mmHg (Normal)<br />
                  • Heart Rate: 74 bpm<br />
                  • Preliminary Assessment: Mild exertion palpitations.<br />
                  • Recommended: Routine Resting ECG + Daily Hydration protocol.
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
