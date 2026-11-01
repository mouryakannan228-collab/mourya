import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SpecialtyGrid from './components/SpecialtyGrid';
import DoctorCard from './components/DoctorCard';
import DoctorModal from './components/DoctorModal';
import BookingModal from './components/BookingModal';
import AppointmentPassModal from './components/AppointmentPassModal';
import SymptomChecker from './components/SymptomChecker';
import VideoConsultation from './components/VideoConsultation';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import EPrescriptionModal from './components/EPrescriptionModal';
import Footer from './components/Footer';

import { INITIAL_DOCTORS, INITIAL_APPOINTMENTS } from './data/mockData';

export default function App() {
  const [doctors, setDoctors] = useState(INITIAL_DOCTORS);
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  
  // UI Navigation & Mode State
  const [activeTab, setActiveTab] = useState('explore'); // 'explore' | 'appointments' | 'telehealth'
  const [appMode, setAppMode] = useState('patient'); // 'patient' | 'doctor'
  const [theme, setTheme] = useState('dark');

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [filterOptions, setFilterOptions] = useState({
    availableToday: false,
    telehealthOnly: false
  });

  // Modal Dialog States
  const [selectedDoctorModal, setSelectedDoctorModal] = useState(null);
  const [bookingDoctorModal, setBookingDoctorModal] = useState(null);
  const [passModalAppointment, setPassModalAppointment] = useState(null);
  const [isSymptomCheckerOpen, setIsSymptomCheckerOpen] = useState(false);
  const [activeTelehealthAppointment, setActiveTelehealthAppointment] = useState(null);
  const [ePrescriptionAppointment, setEPrescriptionAppointment] = useState(null);

  // Apply Theme Attribute to document body
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Doctor Filter Logic
  const filteredDoctors = doctors.filter(doc => {
    // 1. Specialty Filter
    if (selectedSpecialty !== 'all' && doc.specialty !== selectedSpecialty) {
      return false;
    }

    // 2. Search Query (Name, Title, Hospital)
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = doc.name.toLowerCase().includes(q);
      const matchTitle = doc.title.toLowerCase().includes(q);
      const matchHospital = doc.hospital.toLowerCase().includes(q);
      const matchSpecialty = doc.specialtyName.toLowerCase().includes(q);
      if (!matchName && !matchTitle && !matchHospital && !matchSpecialty) {
        return false;
      }
    }

    // 3. Available Today Filter
    if (filterOptions.availableToday && !doc.availableToday) {
      return false;
    }

    // 4. Telehealth Filter
    if (filterOptions.telehealthOnly && !doc.telehealth) {
      return false;
    }

    return true;
  });

  // Handle New Booking Creation
  const handleBookingSuccess = (newAppointment) => {
    setAppointments([newAppointment, ...appointments]);
    setBookingDoctorModal(null);
    setPassModalAppointment(newAppointment);
  };

  // Handle Appointment Cancel
  const handleCancelAppointment = (id) => {
    setAppointments(prev => prev.map(a => {
      if (a.id === id) {
        return { ...a, status: 'Canceled' };
      }
      return a;
    }));
  };

  // Handle Prescription Saving
  const handleSavePrescription = (appointmentId, prescriptionData) => {
    setAppointments(prev => prev.map(a => {
      if (a.id === appointmentId) {
        return { ...a, prescription: prescriptionData, status: 'Completed' };
      }
      return a;
    }));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Navbar Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        appointmentsCount={appointments.filter(a => a.status === 'Confirmed').length}
        onOpenSymptomChecker={() => setIsSymptomCheckerOpen(true)}
        appMode={appMode}
        setAppMode={setAppMode}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Body Switcher (Patient Mode vs Doctor Portal Mode) */}
      <main style={{ flex: 1 }}>
        {appMode === 'doctor' ? (
          /* Doctor Administrative Portal */
          <DoctorDashboard
            doctors={doctors}
            appointments={appointments}
            onLaunchTelehealth={(app) => {
              setActiveTelehealthAppointment(app);
              setActiveTab('telehealth');
            }}
            onOpenEPrescription={(app) => setEPrescriptionAppointment(app)}
          />
        ) : (
          /* Patient View Mode */
          <>
            {activeTab === 'telehealth' ? (
              /* Telehealth Video Room View */
              <VideoConsultation
                appointment={activeTelehealthAppointment || appointments[0]}
                onClose={() => setActiveTab('explore')}
                onIssuePrescription={(app) => setEPrescriptionAppointment(app)}
              />
            ) : activeTab === 'appointments' ? (
              /* My Appointments View */
              <PatientDashboard
                appointments={appointments}
                onViewPass={(app) => setPassModalAppointment(app)}
                onLaunchTelehealth={(app) => {
                  setActiveTelehealthAppointment(app);
                  setActiveTab('telehealth');
                }}
                onCancelAppointment={handleCancelAppointment}
                onViewPrescription={(app) => setEPrescriptionAppointment(app)}
              />
            ) : (
              /* Main Doctor Explore View */
              <>
                <HeroSection
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  selectedSpecialty={selectedSpecialty}
                  setSelectedSpecialty={setSelectedSpecialty}
                  onOpenSymptomChecker={() => setIsSymptomCheckerOpen(true)}
                  filterOptions={filterOptions}
                  setFilterOptions={setFilterOptions}
                />

                <div className="container">
                  {/* Specialty Department Selector */}
                  <SpecialtyGrid
                    selectedSpecialty={selectedSpecialty}
                    setSelectedSpecialty={setSelectedSpecialty}
                  />

                  {/* Doctors Section Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}>
                    <div>
                      <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                        {selectedSpecialty === 'all' ? 'All Verified Doctors' : `${selectedSpecialty.toUpperCase()} Specialists`}
                      </h2>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)' }}>
                        Showing {filteredDoctors.length} available specialist doctors
                      </p>
                    </div>

                    {/* Reset Filter Button */}
                    {(searchQuery || selectedSpecialty !== 'all' || filterOptions.availableToday || filterOptions.telehealthOnly) && (
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedSpecialty('all');
                          setFilterOptions({ availableToday: false, telehealthOnly: false });
                        }}
                      >
                        Reset All Filters
                      </button>
                    )}
                  </div>

                  {/* Doctors Grid */}
                  {filteredDoctors.length === 0 ? (
                    <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>No Doctors Match Your Search</h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)', marginTop: '0.4rem' }}>
                        Try clearing search keywords or choosing a different medical department.
                      </p>
                    </div>
                  ) : (
                    <div className="doctors-grid" style={{ marginBottom: '3rem' }}>
                      {filteredDoctors.map(doc => (
                        <DoctorCard
                          key={doc.id}
                          doctor={doc}
                          onSelectDoctor={(d) => setSelectedDoctorModal(d)}
                          onBookDoctor={(d) => setBookingDoctorModal(d)}
                          onStartTelehealth={(d) => {
                            const mockApp = appointments.find(a => a.doctorId === d.id) || {
                              doctorName: d.name,
                              doctorTitle: d.title,
                              patientName: 'Alex Morgan'
                            };
                            setActiveTelehealthAppointment(mockApp);
                            setActiveTab('telehealth');
                          }}
                        />
                      ))}
                    </div>
                  )}

                </div>
              </>
            )}
          </>
        )}
      </main>

      {/* Modals & Dialogs */}
      {selectedDoctorModal && (
        <DoctorModal
          doctor={selectedDoctorModal}
          onClose={() => setSelectedDoctorModal(null)}
          onBookDoctor={(d) => setBookingDoctorModal(d)}
        />
      )}

      {bookingDoctorModal && (
        <BookingModal
          doctor={bookingDoctorModal}
          onClose={() => setBookingDoctorModal(null)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {passModalAppointment && (
        <AppointmentPassModal
          appointment={passModalAppointment}
          onClose={() => setPassModalAppointment(null)}
          onLaunchTelehealth={(app) => {
            setActiveTelehealthAppointment(app);
            setActiveTab('telehealth');
          }}
        />
      )}

      {isSymptomCheckerOpen && (
        <SymptomChecker
          doctors={doctors}
          onClose={() => setIsSymptomCheckerOpen(false)}
          onSelectSpecialty={(spec) => {
            setSelectedSpecialty(spec);
            setActiveTab('explore');
          }}
        />
      )}

      {ePrescriptionAppointment && (
        <EPrescriptionModal
          appointment={ePrescriptionAppointment}
          onClose={() => setEPrescriptionAppointment(null)}
          onSavePrescription={handleSavePrescription}
        />
      )}

      {/* Footer */}
      <Footer
        onOpenSymptomChecker={() => setIsSymptomCheckerOpen(true)}
        setActiveTab={setActiveTab}
      />

    </div>
  );
}
