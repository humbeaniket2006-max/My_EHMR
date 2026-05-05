const path = require('path');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const User = require('./models/User');
const Resident = require('./models/Resident');
const Hospital = require('./models/Hospital');
const Appointment = require('./models/Appointment');

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

const residents = [
  {
    residentId: 'R001',
    name: 'Ramesh Iyer',
    age: 78,
    room: '204-A',
    conditions: ['Type 2 Diabetes', 'Hypertension', 'Mild Arthritis'],
    allergies: ['Penicillin severe', 'Aspirin moderate'],
    vitals: [
      { date: new Date(), bp: '142/88', hr: 84, spo2: 93, temp: 36.9, weight: 67.8 },
      { date: new Date(Date.now() - 86400000), bp: '138/86', hr: 82, spo2: 94, temp: 36.8, weight: 67.9 }
    ],
    medications: [
      { name: 'Metformin', dose: '500mg', frequency: 'Twice daily', startDate: new Date() },
      { name: 'Amlodipine', dose: '5mg', frequency: 'Once daily', startDate: new Date() },
      { name: 'Calcium + Vit D3', dose: '1 tab', frequency: 'Once daily', startDate: new Date() }
    ],
    notes: [{ shift: 'Morning', date: new Date(), author: 'Sunita Rao', note: 'Mild fatigue, fasting sugar high', tasks: ['Repeat vitals'] }],
    labs: [
      { test: 'HbA1c', result: '7.8', unit: '%', ref: '< 7.0', status: 'high', date: new Date() },
      { test: 'Creatinine', result: '1.1', unit: 'mg/dL', ref: '0.7-1.2', status: 'normal', date: new Date() }
    ]
  },
  {
    residentId: 'R002',
    name: 'Saraswati Menon',
    age: 82,
    room: '108-B',
    conditions: ['CHF', 'Atrial Fibrillation', 'CKD Stage 2'],
    allergies: ['Sulfa drugs moderate'],
    vitals: [
      { date: new Date(), bp: '152/94', hr: 90, spo2: 93, temp: 36.9, weight: 54.4 },
      { date: new Date(Date.now() - 86400000), bp: '150/92', hr: 88, spo2: 94, temp: 36.9, weight: 54.2 }
    ],
    medications: [
      { name: 'Furosemide', dose: '40mg', frequency: 'Once daily', startDate: new Date() },
      { name: 'Warfarin', dose: '2mg', frequency: 'Once daily', startDate: new Date() },
      { name: 'Digoxin', dose: '0.125mg', frequency: 'Once daily', startDate: new Date() }
    ],
    notes: [{ shift: 'Morning', date: new Date(), author: 'Deepa Singh', note: 'BP elevated with mild ankle swelling', tasks: ['Repeat BP', 'Cardiology review'] }],
    labs: [
      { test: 'BNP', result: '680', unit: 'pg/mL', ref: '< 100', status: 'high', date: new Date() },
      { test: 'INR', result: '2.4', unit: '', ref: '2.0-3.0', status: 'normal', date: new Date() }
    ]
  },
  {
    residentId: 'R003',
    name: 'Gopal Krishnan',
    age: 71,
    room: '312-A',
    conditions: ['COPD', 'Osteoporosis'],
    allergies: ['Ibuprofen mild'],
    vitals: [
      { date: new Date(), bp: '120/78', hr: 72, spo2: 91, temp: 36.6, weight: 71.8 },
      { date: new Date(Date.now() - 86400000), bp: '118/76', hr: 70, spo2: 92, temp: 36.5, weight: 72 }
    ],
    medications: [
      { name: 'Tiotropium', dose: '18mcg', frequency: 'Once daily', startDate: new Date() },
      { name: 'Calcium', dose: '500mg', frequency: 'Twice daily', startDate: new Date() }
    ],
    notes: [{ shift: 'Morning', date: new Date(), author: 'Ravi Kumar', note: 'SpO2 lower after short walk', tasks: ['Breathing exercises', 'Repeat SpO2'] }],
    labs: [
      { test: 'Vitamin D', result: '22', unit: 'ng/mL', ref: '30-100', status: 'low', date: new Date() },
      { test: 'Calcium', result: '9.3', unit: 'mg/dL', ref: '8.5-10.5', status: 'normal', date: new Date() }
    ]
  },
  {
    residentId: 'R004',
    name: 'Anand Pillai',
    age: 76,
    room: '201-C',
    conditions: ['Post Hip Replacement', 'Hypertension'],
    allergies: ['Latex moderate'],
    vitals: [
      { date: new Date(), bp: '118/74', hr: 68, spo2: 98, temp: 36.6, weight: 62.1 },
      { date: new Date(Date.now() - 86400000), bp: '116/74', hr: 66, spo2: 98, temp: 36.6, weight: 62 }
    ],
    medications: [
      { name: 'Paracetamol', dose: '650mg', frequency: 'As needed', startDate: new Date() },
      { name: 'Telmisartan', dose: '40mg', frequency: 'Once daily', startDate: new Date() }
    ],
    notes: [{ shift: 'Morning', date: new Date(), author: 'Sunita Rao', note: 'Post-op mobility improving', tasks: ['Physio session', 'Pain score review'] }],
    labs: [
      { test: 'CRP', result: '4.2', unit: 'mg/L', ref: '< 5', status: 'normal', date: new Date() },
      { test: 'Haemoglobin', result: '12.4', unit: 'g/dL', ref: '13.5-17.5', status: 'low', date: new Date() }
    ]
  },
  {
    residentId: 'R005',
    name: 'Mohan Das',
    age: 69,
    room: '106-A',
    conditions: ["Parkinson's Disease", 'Mild Depression'],
    allergies: ['Codeine moderate'],
    vitals: [
      { date: new Date(), bp: '124/80', hr: 74, spo2: 97, temp: 36.7, weight: 65 }
    ],
    medications: [
      { name: 'Levodopa', dose: '100mg', frequency: 'Three times daily', startDate: new Date() },
      { name: 'Sertraline', dose: '50mg', frequency: 'Once daily', startDate: new Date() }
    ],
    notes: [],
    labs: [
      { test: 'Haemoglobin', result: '13.2', unit: 'g/dL', ref: '13.5-17.5', status: 'low', date: new Date() }
    ]
  }
];

const hospitals = [
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

function hospitalLoginEmail(name) {
  return `admin@${String(name).toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;
}

async function seed() {
  if (!MONGO_URI) throw new Error('MONGO_URI is required');
  await mongoose.connect(MONGO_URI);

  const passwordHash = await bcrypt.hash('Admin@123', 12);
  const adminUser = await User.findOneAndUpdate(
    { email: 'admin@ehmr.com' },
    { $setOnInsert: { name: 'EHMR Admin', email: 'admin@ehmr.com', passwordHash, role: 'admin' } },
    { upsert: true, new: true }
  );

  await User.updateOne(
    { email: 'doctor.deepa@ehmr.com' },
    { $setOnInsert: { name: 'Dr. Deepa Iyer', email: 'doctor.deepa@ehmr.com', passwordHash, role: 'staff' } },
    { upsert: true }
  );

  const patientPasswordHash = await bcrypt.hash('Patient@123', 12);
  const patientUser = await User.findOneAndUpdate(
    { email: 'patient@ehmr.com' },
    { $setOnInsert: { name: 'Demo Patient', email: 'patient@ehmr.com', passwordHash: patientPasswordHash, role: 'viewer' } },
    { upsert: true, new: true }
  );

  for (const resident of residents) {
    await Resident.updateOne({ residentId: resident.residentId }, { $set: resident }, { upsert: true });
  }

  await Resident.updateOne(
    { residentId: 'P-DEMO' },
    {
      $set: {
        residentId: 'P-DEMO',
        name: 'Ramesh Iyer',
        age: 78,
        room: '204-A',
        conditions: ['Type 2 Diabetes', 'Hypertension', 'Mild Arthritis'],
        allergies: ['Penicillin severe', 'Aspirin moderate'],
        vitals: [{ date: new Date(), bp: '142/88', hr: 84, spo2: 93, temp: 36.9, weight: 67.8 }],
        medications: [{ name: 'Metformin', dose: '500mg', frequency: 'Twice daily', startDate: new Date() }],
        notes: [{ shift: 'Morning', date: new Date(), author: 'Sunita Rao', note: 'Mild fatigue, fasting sugar high', tasks: ['Repeat vitals'] }],
        labs: [{ test: 'HbA1c', result: '7.8', unit: '%', ref: '< 7.0', status: 'high', date: new Date() }],
        createdBy: patientUser._id
      }
    },
    { upsert: true }
  );

  const hospitalPasswordHash = await bcrypt.hash('Hospital@123', 12);
  for (const hospital of hospitals) {
    const linkedUser = await User.findOneAndUpdate(
      { email: hospitalLoginEmail(hospital.name) },
      {
        $set: {
          name: hospital.doctors?.[0]?.name || `${hospital.name} Staff`,
          email: hospitalLoginEmail(hospital.name),
          passwordHash: hospitalPasswordHash,
          role: 'hospital',
          hospitalName: hospital.name
        }
      },
      { upsert: true, new: true }
    );
    const savedHospital = await Hospital.findOneAndUpdate(
      { name: hospital.name },
      { $set: { ...hospital, linkedUserId: linkedUser._id } },
      { upsert: true, new: true }
    );
    linkedUser.hospitalId = savedHospital._id;
    linkedUser.linkedHospitalId = savedHospital._id;
    linkedUser.hospitalName = savedHospital.name;
    await linkedUser.save();
  }

  const appointments = [
    { residentId: 'R001', doctor: 'Dr. Priya Nair', department: 'Diabetology',
      date: new Date(Date.now() + 2 * 86400000), time: '10:00',
      status: 'scheduled', notes: 'AI diabetes/BP review', createdBy: adminUser._id },
    { residentId: 'R002', doctor: 'Dr. Rajesh Kumar', department: 'Cardiology',
      date: new Date(Date.now() + 3 * 86400000), time: '11:30',
      status: 'scheduled', notes: 'CHF follow-up', createdBy: adminUser._id },
    { residentId: 'R004', doctor: 'Dr. Amit Shah', department: 'Orthopedics',
      date: new Date(Date.now() - 3 * 86400000), time: '09:30',
      status: 'completed', notes: 'Post-op mobility review', createdBy: adminUser._id }
  ];

  for (const appointment of appointments) {
    await Appointment.updateOne(
      { residentId: appointment.residentId, date: appointment.date, doctor: appointment.doctor },
      { $set: appointment },
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
