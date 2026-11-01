export const SPECIALTIES = [
  { id: 'all', name: 'All Specialties', icon: 'Stethoscope', count: 12 },
  { id: 'cardiology', name: 'Cardiology', icon: 'Heart', count: 3, desc: 'Heart & Cardiovascular Specialists' },
  { id: 'dermatology', name: 'Dermatology', icon: 'Sparkles', count: 2, desc: 'Skin, Hair & Cosmetic Care' },
  { id: 'neurology', name: 'Neurology', icon: 'Brain', count: 2, desc: 'Brain, Nerves & Spine Care' },
  { id: 'pediatrics', name: 'Pediatrics', icon: 'Baby', count: 2, desc: 'Child & Infant Care Specialists' },
  { id: 'orthopedics', name: 'Orthopedics', icon: 'Activity', count: 2, desc: 'Bones, Joints & Muscle Health' },
  { id: 'psychiatry', name: 'Psychiatry', icon: 'Smile', count: 1, desc: 'Mental Health & Wellness' },
];

export const SYMPTOMS_LIST = [
  { id: 'chest_pain', label: 'Chest Pain / Palpitations', specialty: 'cardiology', severity: 'High' },
  { id: 'shortness_breath', label: 'Shortness of Breath', specialty: 'cardiology', severity: 'High' },
  { id: 'skin_rash', label: 'Skin Rash or Acne', specialty: 'dermatology', severity: 'Medium' },
  { id: 'itching', label: 'Persistent Itching / Spots', specialty: 'dermatology', severity: 'Low' },
  { id: 'headache', label: 'Severe Headache / Migraine', specialty: 'neurology', severity: 'Medium' },
  { id: 'dizziness', label: 'Dizziness or Vertigo', specialty: 'neurology', severity: 'Medium' },
  { id: 'child_fever', label: 'Child Fever / Flu Symptoms', specialty: 'pediatrics', severity: 'High' },
  { id: 'joint_pain', label: 'Joint Stiffness / Back Pain', specialty: 'orthopedics', severity: 'Medium' },
  { id: 'anxiety', label: 'Anxiety / Sleep Disturbance', specialty: 'psychiatry', severity: 'Medium' },
];

export const INITIAL_DOCTORS = [
  {
    id: 'doc-1',
    name: 'Dr. Sarah Jenkins',
    title: 'Senior Consultant Cardiologist',
    specialty: 'cardiology',
    specialtyName: 'Cardiology',
    rating: 4.9,
    reviewsCount: 142,
    experience: '14+ Years Exp.',
    hospital: 'Apex Heart & Vascular Institute',
    location: 'Downtown Medical Center, Suite 402',
    fee: 120,
    image: 'doctor_cardiology_1785807522996.jpg',
    avatarFallback: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    availableToday: true,
    telehealth: true,
    languages: ['English', 'Spanish'],
    education: 'MD Cardiology (Harvard Medical), MBBS',
    about: 'Dr. Sarah Jenkins is a board-certified cardiologist specializing in preventive cardiology, coronary artery disease, and advanced heart failure management. She has performed over 1,500 successful procedures.',
    workingHours: 'Mon - Fri: 09:00 AM - 05:00 PM',
    slots: {
      morning: ['09:00 AM', '09:30 AM', '10:15 AM', '11:00 AM'],
      afternoon: ['01:30 PM', '02:15 PM', '03:00 PM'],
      evening: ['05:00 PM', '05:45 PM', '06:30 PM']
    },
    reviewsList: [
      { id: 'r1', patient: 'Robert Chen', rating: 5, date: '2 days ago', comment: 'Exceptionally patient doctor. Took time to explain my ECG report clearly.' },
      { id: 'r2', patient: 'Elena Rostova', rating: 5, date: '1 week ago', comment: 'The online video consultation was seamless. Highly recommended!' }
    ]
  },
  {
    id: 'doc-2',
    name: 'Dr. Marcus Vance',
    title: 'Cosmetic & Clinical Dermatologist',
    specialty: 'dermatology',
    specialtyName: 'Dermatology',
    rating: 4.8,
    reviewsCount: 98,
    experience: '10+ Years Exp.',
    hospital: 'Radiant Skin & Aesthetics Clinic',
    location: 'Westside Healthcare Complex',
    fee: 95,
    image: 'doctor_dermatology_1785807537543.jpg',
    avatarFallback: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    availableToday: true,
    telehealth: true,
    languages: ['English', 'French'],
    education: 'MD Dermatology (Johns Hopkins), Fellow AAD',
    about: 'Dr. Vance leads cutting-edge dermatological treatments ranging from severe eczema control to advanced laser therapy and anti-aging skincare protocols.',
    workingHours: 'Tue - Sat: 10:00 AM - 06:00 PM',
    slots: {
      morning: ['10:00 AM', '10:45 AM', '11:30 AM'],
      afternoon: ['02:00 PM', '02:45 PM', '03:30 PM'],
      evening: ['05:15 PM', '06:00 PM']
    },
    reviewsList: [
      { id: 'r3', patient: 'Samantha Miller', rating: 5, date: '3 days ago', comment: 'Dr. Vance solved my chronic skin condition within 2 weeks!' }
    ]
  },
  {
    id: 'doc-3',
    name: 'Dr. Elena Rostova',
    title: 'Lead Neurologist & Spine Specialist',
    specialty: 'neurology',
    specialtyName: 'Neurology',
    rating: 4.95,
    reviewsCount: 210,
    experience: '18+ Years Exp.',
    hospital: 'Neurology & Brain Health Center',
    location: 'Metro Science Park, Tower B',
    fee: 150,
    image: 'doctor_neurology_1785807550325.jpg',
    avatarFallback: 'https://images.unsplash.com/photo-1594824813566-88855ce7896c?auto=format&fit=crop&q=80&w=400',
    availableToday: false,
    telehealth: true,
    languages: ['English', 'German', 'Russian'],
    education: 'Ph.D Neuroscience (Oxford), MD Neurology',
    about: 'Internationally recognized for clinical research in migraine management, epilepsy diagnosis, and neuromuscular disorders.',
    workingHours: 'Mon - Thu: 08:30 AM - 04:30 PM',
    slots: {
      morning: ['08:30 AM', '09:15 AM', '11:00 AM'],
      afternoon: ['01:00 PM', '02:30 PM', '03:45 PM'],
      evening: []
    },
    reviewsList: [
      { id: 'r4', patient: 'David K.', rating: 5, date: 'Yesterday', comment: 'Life-changing diagnosis for my migraines. Forever grateful.' }
    ]
  },
  {
    id: 'doc-4',
    name: 'Dr. David Thorne',
    title: 'Pediatric Specialist & Child Health Specialist',
    specialty: 'pediatrics',
    specialtyName: 'Pediatrics',
    rating: 4.87,
    reviewsCount: 165,
    experience: '12+ Years Exp.',
    hospital: 'St. Jude Children Wellness Center',
    location: 'Oakridge Family Health Hub',
    fee: 85,
    image: 'doctor_pediatrics_1785807522996.jpg',
    avatarFallback: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    availableToday: true,
    telehealth: true,
    languages: ['English'],
    education: 'MD Pediatrics (Stanford Childrens)',
    about: 'Dedicated to compassionate pediatric care, newborn growth tracking, developmental milestones, and routine immunization guidance.',
    workingHours: 'Mon - Sat: 09:00 AM - 04:00 PM',
    slots: {
      morning: ['09:00 AM', '09:45 AM', '10:30 AM'],
      afternoon: ['01:15 PM', '02:00 PM', '03:15 PM'],
      evening: ['04:30 PM']
    },
    reviewsList: [
      { id: 'r5', patient: 'Jessica Alba', rating: 5, date: '4 days ago', comment: 'My toddler loved Dr. Thorne! So gentle and kind.' }
    ]
  },
  {
    id: 'doc-5',
    name: 'Dr. Aris Thorne',
    title: 'Orthopedic Surgeon & Joint Replacement Expert',
    specialty: 'orthopedics',
    specialtyName: 'Orthopedics',
    rating: 4.91,
    reviewsCount: 178,
    experience: '16+ Years Exp.',
    hospital: 'OrthoCare Joint & Spine Institute',
    location: 'Northside Medical Plaza',
    fee: 140,
    image: 'doctor_cardiology_1785807522996.jpg',
    avatarFallback: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    availableToday: true,
    telehealth: false,
    languages: ['English', 'German'],
    education: 'MD Orthopedics (Mayo Clinic), MS Surgery',
    about: 'Specialist in minimally invasive joint surgery, sports injury rehabilitation, and arthritis management.',
    workingHours: 'Mon - Fri: 08:00 AM - 05:00 PM',
    slots: {
      morning: ['08:30 AM', '10:00 AM', '11:15 AM'],
      afternoon: ['02:00 PM', '03:30 PM'],
      evening: ['05:00 PM']
    },
    reviewsList: [
      { id: 'r6', patient: 'George H.', rating: 5, date: '1 week ago', comment: 'Knee surgery rehabilitation was smooth and pain-free.' }
    ]
  },
  {
    id: 'doc-6',
    name: 'Dr. Maya Patel',
    title: 'Consultant Psychiatrist & Wellness Coach',
    specialty: 'psychiatry',
    specialtyName: 'Psychiatry',
    rating: 4.93,
    reviewsCount: 112,
    experience: '11+ Years Exp.',
    hospital: 'Mind & Balance Behavioral Health',
    location: 'Zenith Health Suites, 3rd Floor',
    fee: 110,
    image: 'doctor_neurology_1785807550325.jpg',
    avatarFallback: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    availableToday: true,
    telehealth: true,
    languages: ['English', 'Hindi'],
    education: 'MD Psychiatry (Columbia University), DPM',
    about: 'Specializes in stress management, anxiety treatment, adult ADHD, and cognitive behavioral therapy (CBT).',
    workingHours: 'Mon - Sat: 11:00 AM - 07:00 PM',
    slots: {
      morning: ['11:00 AM', '11:45 AM'],
      afternoon: ['01:30 PM', '02:45 PM', '04:00 PM'],
      evening: ['05:30 PM', '06:15 PM']
    },
    reviewsList: [
      { id: 'r7', patient: 'Anita S.', rating: 5, date: '5 days ago', comment: 'Very empathetic approach. Video session was super comfortable.' }
    ]
  }
];

export const INITIAL_APPOINTMENTS = [
  {
    id: 'HP-9042',
    doctorId: 'doc-1',
    doctorName: 'Dr. Sarah Jenkins',
    doctorTitle: 'Senior Consultant Cardiologist',
    specialty: 'Cardiology',
    doctorImage: 'doctor_cardiology_1785807522996.jpg',
    avatarFallback: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    patientName: 'Alex Morgan',
    patientAge: 34,
    patientGender: 'Male',
    patientEmail: 'alex.morgan@example.com',
    patientPhone: '+1 (555) 234-5678',
    date: '2026-08-06',
    timeSlot: '10:15 AM',
    consultationType: 'Video Telehealth',
    status: 'Confirmed',
    fee: 120,
    symptoms: ['Chest Pain / Palpitations', 'Routine Checkup'],
    notes: 'Experiencing mild palpitations after evening workouts.',
    createdAt: '2026-08-04T07:00:00.000Z'
  },
  {
    id: 'HP-8821',
    doctorId: 'doc-2',
    doctorName: 'Dr. Marcus Vance',
    doctorTitle: 'Cosmetic & Clinical Dermatologist',
    specialty: 'Dermatology',
    doctorImage: 'doctor_dermatology_1785807537543.jpg',
    avatarFallback: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    patientName: 'Sarah Jenkins (Self)',
    patientAge: 29,
    patientGender: 'Female',
    patientEmail: 'sarah.j@example.com',
    patientPhone: '+1 (555) 987-6543',
    date: '2026-08-08',
    timeSlot: '02:00 PM',
    consultationType: 'In-Clinic Visit',
    status: 'Completed',
    fee: 95,
    symptoms: ['Skin Rash or Acne'],
    notes: 'Follow-up consultation for acne treatment prescription.',
    prescription: {
      medications: [
        { name: 'Retin-A Gel 0.05%', dosage: 'Apply thin layer at night', duration: '30 Days' },
        { name: 'Cetaphil Gentle Cleanser', dosage: 'Twice daily', duration: 'Ongoing' }
      ],
      doctorAdvice: 'Avoid direct sunlight exposure. Drink 3L water daily.'
    },
    createdAt: '2026-08-01T14:30:00.000Z'
  }
];
