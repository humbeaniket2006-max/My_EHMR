const path = require('path');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const User = require('./models/User');
const Resident = require('./models/Resident');
const Hospital = require('./models/Hospital');
const Appointment = require('./models/Appointment');
const Booking = require('./models/Booking');

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;
const DAY_MS = 24 * 60 * 60 * 1000;

function dateWithOffset(days, time = '08:00') {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setTime(date.getTime() + (days * DAY_MS));
  const [hours, minutes] = String(time).split(':').map(Number);
  date.setHours(hours || 0, minutes || 0, 0, 0);
  return date;
}

function isoDate(days) {
  return dateWithOffset(days, '00:00').toISOString().slice(0, 10);
}

function buildResident(ownerId, resident) {
  return {
    ...resident,
    createdBy: ownerId
  };
}

const residentSeeds = [
  {
    residentId: 'R001',
    name: 'Ramesh Iyer',
    age: 78,
    room: '204-A',
    blood: 'B+',
    condition: 'Stable',
    admitted: '2024-01-15',
    doctor: 'Dr. Priya Nair',
    caregiver: 'Sunita Rao',
    phone: '919876543210',
    emergencyContact: { name: 'Anand Iyer', relation: 'Son', phone: '9876501234' },
    conditions: ['Type 2 Diabetes', 'Hypertension', 'Mild Arthritis'],
    allergies: [{ drug: 'Penicillin', severity: 'severe' }, { drug: 'Aspirin', severity: 'moderate' }],
    vitals: [
      { date: dateWithOffset(0, '08:00'), bp: '142/88', hr: 84, spo2: 93, temp: 36.9, glucose: 184, weight: 67.8, by: 'Sunita Rao', notes: 'Morning check - mild fatigue; fasting sugar high' },
      { date: dateWithOffset(-1, '08:00'), bp: '138/86', hr: 82, spo2: 94, temp: 36.8, glucose: 176, weight: 67.9, by: 'Sunita Rao', notes: 'Morning - appetite normal; oxygen slightly low' },
      { date: dateWithOffset(-2, '08:00'), bp: '136/84', hr: 80, spo2: 95, temp: 36.7, glucose: 169, weight: 68.0, by: 'Ravi Kumar', notes: 'Stable, short walk completed' },
      { date: dateWithOffset(-3, '08:00'), bp: '134/84', hr: 78, spo2: 95, temp: 36.8, glucose: 162, weight: 68.0, by: 'Sunita Rao', notes: 'Morning - mild post-breakfast glucose rise' },
      { date: dateWithOffset(-4, '08:00'), bp: '132/82', hr: 76, spo2: 96, temp: 36.6, glucose: 154, weight: 68.1, by: 'Sunita Rao', notes: 'Morning - stable and cooperative' },
      { date: dateWithOffset(-5, '08:00'), bp: '130/82', hr: 75, spo2: 96, temp: 36.7, glucose: 148, weight: 68.1, by: 'Ravi Kumar', notes: 'Morning - good sleep reported' },
      { date: dateWithOffset(-6, '08:00'), bp: '128/82', hr: 74, spo2: 97, temp: 36.8, glucose: 142, weight: 68.2, by: 'Sunita Rao', notes: 'Morning check - alert, cooperative' },
      { date: dateWithOffset(-7, '08:00'), bp: '130/84', hr: 76, spo2: 97, temp: 36.7, glucose: 145, weight: 68.2, by: 'Sunita Rao' },
      { date: dateWithOffset(-8, '15:00'), bp: '126/80', hr: 72, spo2: 98, temp: 36.6, glucose: 134, weight: 68.3, by: 'Ravi Kumar', notes: 'Afternoon - stable' },
      { date: dateWithOffset(-9, '08:00'), bp: '124/78', hr: 70, spo2: 98, temp: 36.5, glucose: 132, weight: 68.4, by: 'Sunita Rao', notes: 'Good activity tolerance' }
    ],
    medications: [
      { name: 'Metformin', dose: '500mg', frequency: 'Twice daily', indication: 'Diabetes', prescribedBy: 'Dr. Priya Nair', startDate: dateWithOffset(-30) },
      { name: 'Amlodipine', dose: '5mg', frequency: 'Once daily', indication: 'Hypertension', prescribedBy: 'Dr. Priya Nair', startDate: dateWithOffset(-30) },
      { name: 'Pantoprazole', dose: '40mg', frequency: 'Once daily', indication: 'Gastric protection', prescribedBy: 'Dr. Priya Nair', startDate: dateWithOffset(-30) },
      { name: 'Glimepiride', dose: '1mg', frequency: 'Once daily', indication: 'Diabetes', prescribedBy: 'Dr. Priya Nair', startDate: dateWithOffset(-30) },
      { name: 'Calcium + Vit D3', dose: '1 tab', frequency: 'Once daily', indication: 'Bone health', prescribedBy: 'Dr. Priya Nair', startDate: dateWithOffset(-30) }
    ],
    notes: [
      { shift: 'Evening', date: dateWithOffset(-5, '19:30'), author: 'Sunita Rao', role: 'Caregiver', note: 'Good day overall. Physiotherapy completed. Glucose 168 post-lunch - Dr. Nair informed. Evening Calcium pending. Mood: Cheerful.', tasks: ['Evening Calcium + Vit D3 at 20:00', 'Morning vitals 08:00'] },
      { shift: 'Afternoon', date: dateWithOffset(-5, '14:00'), author: 'Dr. Priya Nair', role: 'Doctor', note: 'Reviewed vitals. Glucose 168 mg/dL post-lunch concerning. Dietary modification advised - reduce refined carbs. No medication change at this time.', tasks: [] },
      { shift: 'Morning', date: dateWithOffset(-5, '08:30'), author: 'Deepa Singh', role: 'Nurse', note: 'Morning vitals stable. All medications administered. Breakfast well - 80% eaten. Requested physio session at 10:00.', tasks: [] }
    ],
    labs: [
      { test: 'HbA1c', result: '7.8', unit: '%', ref: '<7.0', status: 'high', date: new Date('2026-03-20T09:00:00.000Z'), by: 'Dr. Priya Nair' },
      { test: 'Fasting Glucose', result: '138', unit: 'mg/dL', ref: '70-100', status: 'high', date: new Date('2026-03-20T09:00:00.000Z'), by: 'Dr. Priya Nair' },
      { test: 'Creatinine', result: '1.1', unit: 'mg/dL', ref: '0.7-1.2', status: 'normal', date: new Date('2026-03-20T09:00:00.000Z'), by: 'Dr. Priya Nair' },
      { test: 'Haemoglobin', result: '12.8', unit: 'g/dL', ref: '13.5-17.5', status: 'low', date: new Date('2026-03-20T09:00:00.000Z'), by: 'Dr. Priya Nair' },
      { test: 'Total Cholesterol', result: '212', unit: 'mg/dL', ref: '<200', status: 'high', date: new Date('2026-03-20T09:00:00.000Z'), by: 'Dr. Priya Nair' }
    ]
  },
  {
    residentId: 'R002',
    name: 'Saraswati Menon',
    age: 82,
    room: '108-B',
    blood: 'O+',
    condition: 'Monitor',
    admitted: '2023-09-10',
    doctor: 'Dr. Rajesh Kumar',
    caregiver: 'Deepa Singh',
    phone: '919845123456',
    emergencyContact: { name: 'Meena Menon', relation: 'Daughter', phone: '9876502345' },
    conditions: ['CHF', 'Atrial Fibrillation', 'CKD Stage 2'],
    allergies: [{ drug: 'Sulfa drugs', severity: 'moderate' }],
    vitals: [
      { date: dateWithOffset(0, '08:00'), bp: '152/94', hr: 90, spo2: 93, temp: 36.9, weight: 54.4, by: 'Deepa Singh', notes: 'BP elevated; mild ankle swelling' },
      { date: dateWithOffset(-1, '08:00'), bp: '150/92', hr: 88, spo2: 94, temp: 36.9, weight: 54.2, by: 'Deepa Singh', notes: 'BP elevated - monitoring' },
      { date: dateWithOffset(-2, '08:00'), bp: '148/92', hr: 88, spo2: 94, temp: 36.9, weight: 54.0, by: 'Deepa Singh' },
      { date: dateWithOffset(-3, '15:00'), bp: '144/90', hr: 86, spo2: 94, temp: 37.1, by: 'Deepa Singh', notes: 'Afternoon check' },
      { date: dateWithOffset(-4, '08:00'), bp: '140/88', hr: 84, spo2: 95, temp: 36.8, weight: 53.9, by: 'Deepa Singh', notes: 'No breathlessness reported' }
    ],
    medications: [
      { name: 'Furosemide', dose: '40mg', frequency: 'Once daily', indication: 'CHF', prescribedBy: 'Dr. Rajesh Kumar', startDate: dateWithOffset(-45) },
      { name: 'Warfarin', dose: '2mg', frequency: 'Once daily', indication: 'Atrial Fibrillation', prescribedBy: 'Dr. Rajesh Kumar', startDate: dateWithOffset(-45) },
      { name: 'Digoxin', dose: '0.125mg', frequency: 'Once daily', indication: 'CHF', prescribedBy: 'Dr. Rajesh Kumar', startDate: dateWithOffset(-45) }
    ],
    notes: [],
    labs: [
      { test: 'BNP', result: '680', unit: 'pg/mL', ref: '<100', status: 'high', date: new Date('2026-03-25T09:00:00.000Z'), by: 'Dr. Rajesh Kumar' },
      { test: 'Creatinine', result: '1.6', unit: 'mg/dL', ref: '0.5-1.1', status: 'high', date: new Date('2026-03-25T09:00:00.000Z'), by: 'Dr. Rajesh Kumar' },
      { test: 'INR', result: '2.4', unit: '', ref: '2.0-3.0', status: 'normal', date: new Date('2026-03-25T09:00:00.000Z'), by: 'Dr. Rajesh Kumar' }
    ]
  },
  {
    residentId: 'R003',
    name: 'Gopal Krishnan',
    age: 71,
    room: '312-A',
    blood: 'A+',
    condition: 'Stable',
    admitted: '2024-03-01',
    doctor: 'Dr. Priya Nair',
    caregiver: 'Ravi Kumar',
    phone: '919844112233',
    emergencyContact: { name: 'Lakshmi Krishnan', relation: 'Wife', phone: '9876503456' },
    conditions: ['COPD', 'Osteoporosis'],
    allergies: [{ drug: 'Ibuprofen', severity: 'mild' }],
    vitals: [
      { date: dateWithOffset(0, '08:00'), bp: '120/78', hr: 72, spo2: 91, temp: 36.6, glucose: 140, weight: 71.8, by: 'Ravi Kumar', notes: 'SpO2 lower than usual after short walk' },
      { date: dateWithOffset(-1, '08:00'), bp: '118/76', hr: 70, spo2: 92, temp: 36.5, glucose: 138, weight: 72.0, by: 'Ravi Kumar' },
      { date: dateWithOffset(-2, '08:00'), bp: '116/74', hr: 68, spo2: 93, temp: 36.5, glucose: 136, weight: 72.1, by: 'Ravi Kumar', notes: 'Breathing comfortable at rest' },
      { date: dateWithOffset(-3, '08:00'), bp: '118/76', hr: 68, spo2: 94, temp: 36.4, glucose: 132, weight: 72.1, by: 'Ravi Kumar', notes: 'Stable' }
    ],
    medications: [],
    notes: [],
    labs: []
  },
  {
    residentId: 'R004',
    name: 'Anand Pillai',
    age: 76,
    room: '201-C',
    blood: 'AB+',
    condition: 'Recovery',
    admitted: '2024-02-20',
    doctor: 'Dr. Amit Shah',
    caregiver: 'Sunita Rao',
    phone: '919833221144',
    emergencyContact: { name: 'Vijaya Pillai', relation: 'Spouse', phone: '9876504567' },
    conditions: ['Post Hip Replacement', 'Hypertension'],
    allergies: [{ drug: 'Latex', severity: 'moderate' }],
    vitals: [
      { date: dateWithOffset(0, '08:00'), bp: '118/74', hr: 68, spo2: 98, temp: 36.6, glucose: 112, weight: 62.1, by: 'Sunita Rao', notes: 'Post-op mobility improving' },
      { date: dateWithOffset(-1, '08:00'), bp: '116/74', hr: 66, spo2: 98, temp: 36.6, glucose: 108, weight: 62.0, by: 'Sunita Rao' },
      { date: dateWithOffset(-2, '08:00'), bp: '116/72', hr: 66, spo2: 99, temp: 36.5, glucose: 106, weight: 62.0, by: 'Sunita Rao', notes: 'Physio completed' }
    ],
    medications: [],
    notes: [],
    labs: []
  },
  {
    residentId: 'R005',
    name: 'Mohan Das',
    age: 80,
    room: '106-A',
    blood: 'O-',
    condition: 'Stable',
    admitted: '2023-11-05',
    doctor: 'Dr. Rajesh Kumar',
    caregiver: 'Deepa Singh',
    phone: '919822334455',
    emergencyContact: { name: 'Arun Das', relation: 'Son', phone: '9876505678' },
    conditions: ["Parkinson's Disease", 'Depression'],
    allergies: [{ drug: 'Codeine', severity: 'severe' }],
    vitals: [
      { date: dateWithOffset(0, '08:00'), bp: '124/80', hr: 74, spo2: 97, temp: 36.7, glucose: 118, weight: 65.0, by: 'Deepa Singh', notes: 'Stable; tremor unchanged' },
      { date: dateWithOffset(-1, '08:00'), bp: '122/80', hr: 72, spo2: 97, temp: 36.7, glucose: 115, weight: 65.0, by: 'Deepa Singh' },
      { date: dateWithOffset(-2, '08:00'), bp: '120/78', hr: 72, spo2: 98, temp: 36.6, glucose: 112, weight: 65.1, by: 'Deepa Singh', notes: 'Good medication adherence' }
    ],
    medications: [],
    notes: [],
    labs: []
  }
];

const hospitalSeeds = [
  {
    name: 'Apollo Hospitals Greams Road',
    address: 'Greams Road, Chennai, Tamil Nadu',
    location: { type: 'Point', coordinates: [80.2518, 13.0635] },
    phone: '+91 44 2829 3333',
    email: 'care@apollochennai.example',
    website: 'https://www.apollohospitals.com',
    departments: ['General', 'Cardiology', 'Orthopedics', 'Pediatrics', 'Neurology'],
    beds: { general: { total: 120, available: 38 }, icu: { total: 40, available: 8 }, private: { total: 90, available: 21 } },
    doctors: [{ name: 'Dr. Priya Nair', dept: 'General', available: true, fee: 900 }, { name: 'Dr. Rajesh Kumar', dept: 'Cardiology', available: true, fee: 1200 }],
    status: 'available',
    rating: 4.8
  },
  {
    name: 'MIOT International',
    address: 'Manapakkam, Chennai, Tamil Nadu',
    location: { type: 'Point', coordinates: [80.1754, 13.0212] },
    departments: ['Orthopedics', 'Cardiology', 'General'],
    beds: { general: { total: 95, available: 12 }, icu: { total: 25, available: 3 }, private: { total: 60, available: 8 } },
    doctors: [{ name: 'Dr. Amit Shah', dept: 'Orthopedics', available: true, fee: 1000 }],
    status: 'available',
    rating: 4.6
  },
  {
    name: 'Kauvery Hospital',
    address: 'Alwarpet, Chennai, Tamil Nadu',
    location: { type: 'Point', coordinates: [80.2550, 13.0339] },
    departments: ['General', 'Neurology', 'Geriatrics'],
    beds: { general: { total: 75, available: 9 }, icu: { total: 20, available: 0 }, private: { total: 40, available: 5 } },
    doctors: [{ name: 'Dr. Kavita Mehra', dept: 'Geriatrics', available: true, fee: 850 }],
    status: 'available',
    rating: 4.5
  },
  {
    name: 'PSG Hospitals',
    address: 'Peelamedu, Coimbatore, Tamil Nadu',
    location: { type: 'Point', coordinates: [77.0246, 11.0243] },
    departments: ['General', 'Pediatrics', 'Cardiology'],
    beds: { general: { total: 140, available: 0 }, icu: { total: 35, available: 0 }, private: { total: 55, available: 0 } },
    doctors: [{ name: 'Dr. Anil Rao', dept: 'General', available: false, fee: 700 }],
    status: 'full',
    rating: 4.4
  },
  {
    name: 'Meenakshi Mission Hospital',
    address: 'Lake Area, Madurai, Tamil Nadu',
    location: { type: 'Point', coordinates: [78.1460, 9.9252] },
    departments: ['General', 'ICU', 'Emergency', 'Neurology'],
    beds: { general: { total: 110, available: 24 }, icu: { total: 30, available: 6 }, private: { total: 45, available: 10 } },
    doctors: [{ name: 'Dr. Priya Nair', dept: 'General', available: true, fee: 750 }],
    status: 'available',
    rating: 4.3
  }
];

async function seed() {
  if (!MONGO_URI) throw new Error('MONGO_URI is required');
  await mongoose.connect(MONGO_URI);

  const adminPasswordHash = await bcrypt.hash('Admin@123', 12);
  const doctorPasswordHash = await bcrypt.hash('Deepa@123', 12);
  const patientPasswordHash = await bcrypt.hash('Patient@123', 12);

  const adminUser = await User.findOneAndUpdate(
    { email: 'admin@ehmr.com' },
    {
      $set: {
        name: 'EHMR Admin',
        email: 'admin@ehmr.com',
        passwordHash: adminPasswordHash,
        role: 'admin'
      }
    },
    { upsert: true, new: true }
  );

  const doctorUser = await User.findOneAndUpdate(
    { email: 'doctor.deepa@ehmr.com' },
    {
      $set: {
        name: 'Dr. Deepa Iyer',
        email: 'doctor.deepa@ehmr.com',
        passwordHash: doctorPasswordHash,
        role: 'staff',
        hospitalName: '',
        hospitalId: null,
        linkedHospitalId: null
      }
    },
    { upsert: true, new: true }
  );

  const patientUser = await User.findOneAndUpdate(
    { email: 'patient@ehmr.com' },
    {
      $set: {
        name: 'Demo Patient',
        email: 'patient@ehmr.com',
        passwordHash: patientPasswordHash,
        role: 'viewer',
        hospitalName: '',
        hospitalId: null,
        linkedHospitalId: null
      }
    },
    { upsert: true, new: true }
  );

  for (const resident of residentSeeds) {
    await Resident.updateOne(
      { residentId: resident.residentId },
      { $set: buildResident(doctorUser._id, resident) },
      { upsert: true }
    );
  }

  await Resident.updateOne(
    { residentId: 'P-DEMO' },
    { $set: buildResident(patientUser._id, { ...residentSeeds[0], residentId: 'P-DEMO' }) },
    { upsert: true }
  );

  for (const hospital of hospitalSeeds) {
    await Hospital.updateOne(
      { name: hospital.name },
      { $set: hospital },
      { upsert: true }
    );
  }

  const apolloHospital = await Hospital.findOne({ name: 'Apollo Hospitals Greams Road' }).select('_id name');
  const miotHospital = await Hospital.findOne({ name: 'MIOT International' }).select('_id name');

  const appointmentSeeds = [
    { residentId: 'R001', doctor: 'Dr. Priya Nair', department: 'Diabetology', date: isoDate(2), time: '10:00', status: 'scheduled', notes: 'AI diabetes/BP review', createdBy: doctorUser._id, hospitalId: apolloHospital?._id, hospitalName: apolloHospital?.name || '' },
    { residentId: 'R002', doctor: 'Dr. Rajesh Kumar', department: 'Cardiology', date: isoDate(3), time: '11:30', status: 'scheduled', notes: 'CHF follow-up', createdBy: doctorUser._id, hospitalId: apolloHospital?._id, hospitalName: apolloHospital?.name || '' },
    { residentId: 'R004', doctor: 'Dr. Amit Shah', department: 'Orthopedics', date: isoDate(-3), time: '09:30', status: 'completed', notes: 'Post-op mobility review', createdBy: doctorUser._id, hospitalId: miotHospital?._id, hospitalName: miotHospital?.name || '' },
    { residentId: 'R003', doctor: 'Dr. Priya Nair', department: 'General', date: isoDate(-4), time: '15:00', status: 'missed', notes: 'COPD oxygen trend', createdBy: doctorUser._id, hospitalId: apolloHospital?._id, hospitalName: apolloHospital?.name || '' },
    { residentId: 'R001', doctor: 'Dr. Priya Nair', department: 'Diabetology', date: isoDate(2), time: '10:00', status: 'scheduled', notes: 'AI diabetes/BP review', createdBy: patientUser._id, hospitalId: apolloHospital?._id, hospitalName: apolloHospital?.name || '' }
  ];

  for (const appointment of appointmentSeeds) {
    await Appointment.updateOne(
      { residentId: appointment.residentId, doctor: appointment.doctor, time: appointment.time, createdBy: appointment.createdBy },
      {
        $set: {
          residentId: appointment.residentId,
          type: 'doctor',
          doctor: appointment.doctor,
          department: appointment.department,
          hospitalId: appointment.hospitalId,
          hospitalName: appointment.hospitalName,
          date: new Date(`${appointment.date}T${appointment.time}:00`),
          time: appointment.time,
          status: appointment.status,
          notes: appointment.notes,
          createdBy: appointment.createdBy
        }
      },
      { upsert: true }
    );
  }

  const bookingSeeds = [
    { bookingId: 'SRV-DEMO-1001', type: 'Home Lab Collection', date: dateWithOffset(1, '07:30'), timeSlot: '07:30', status: 'pending', hospitalId: apolloHospital?._id, hospitalName: apolloHospital?.name || '', department: 'Diagnostics' },
    { bookingId: 'SRV-DEMO-1002', type: 'Physiotherapy Session', date: dateWithOffset(0, '16:00'), timeSlot: '16:00', status: 'confirmed', hospitalId: miotHospital?._id, hospitalName: miotHospital?.name || '', department: 'Physiotherapy' },
    { bookingId: 'SRV-DEMO-1003', type: 'Home Visit', date: dateWithOffset(0, '18:00'), timeSlot: '18:00', status: 'pending', hospitalId: apolloHospital?._id, hospitalName: apolloHospital?.name || '', department: 'General Care' }
  ];

  for (const booking of bookingSeeds) {
    await Booking.updateOne(
      { bookingId: booking.bookingId },
      {
        $set: {
          userId: patientUser._id,
          hospitalId: booking.hospitalId,
          type: booking.type,
          department: booking.department,
          doctor: '',
          bedType: '',
          date: booking.date,
          timeSlot: booking.timeSlot,
          status: booking.status,
          bookingId: booking.bookingId,
          estimatedCost: 0
        }
      },
      { upsert: true }
    );
  }

  await mongoose.disconnect();
  console.log('Seed completed');
}

seed().catch(error => {
  console.error(error);
  process.exit(1);
});
