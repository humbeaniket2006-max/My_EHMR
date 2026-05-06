// ===== DATA =====
let RESIDENTS = [
  {id:'R001',name:'Ramesh Iyer',age:78,room:'204-A',color:'#00897B',initials:'RI',conditions:['Type 2 Diabetes','Hypertension','Mild Arthritis'],allergies:['Penicillin severe','Aspirin moderate'],risk:'High',status:'Monitor',blood:'B+',condition:'Monitor',admitted:'15 Jan 2024',doctor:'Dr. Priya Nair',caregiver:'Sunita Rao',phone:'919876543210',emergency:{name:'Anand Iyer',relation:'Son',phone:'9876501234'},diagnoses:['Type 2 Diabetes (E11.9)','Hypertension (I10)','Mild Arthritis (M19.9)'],allergyObjects:[{drug:'Penicillin',severity:'severe'},{drug:'Aspirin',severity:'moderate'}]},
  {id:'R002',name:'Saraswati Menon',age:82,room:'108-B',color:'#1565C0',initials:'SM',conditions:['CHF','Atrial Fibrillation','CKD Stage 2'],allergies:['Sulfa drugs moderate'],risk:'High',status:'Critical',blood:'O+',condition:'Critical',admitted:'10 Sep 2023',doctor:'Dr. Rajesh Kumar',caregiver:'Deepa Singh',phone:'919845123456',emergency:{name:'Meena Menon',relation:'Daughter',phone:'9876502345'},diagnoses:['CHF (I50.9)','Atrial Fibrillation (I48.91)','CKD Stage 2 (N18.2)'],allergyObjects:[{drug:'Sulfa drugs',severity:'moderate'}]},
  {id:'R003',name:'Gopal Krishnan',age:71,room:'312-A',color:'#6A1B9A',initials:'GK',conditions:['COPD','Osteoporosis'],allergies:['Ibuprofen mild'],risk:'Medium',status:'Stable',blood:'A+',condition:'Stable',admitted:'01 Mar 2024',doctor:'Dr. Priya Nair',caregiver:'Ravi Kumar',phone:'919933445566',emergency:{name:'Rekha Krishnan',relation:'Wife',phone:'9876503456'},diagnoses:['COPD (J44.1)','Osteoporosis (M81.0)'],allergyObjects:[{drug:'Ibuprofen',severity:'mild'}]},
  {id:'R004',name:'Anand Pillai',age:76,room:'201-C',color:'#C62828',initials:'AP',conditions:['Post Hip Replacement','Hypertension'],allergies:['Latex moderate'],risk:'Low',status:'Recovery',blood:'AB+',condition:'Recovery',admitted:'20 Feb 2024',doctor:'Dr. Amit Shah',caregiver:'Sunita Rao',phone:'919900112233',emergency:{name:'Suresh Pillai',relation:'Son',phone:'9876504567'},diagnoses:['Post Hip Replacement (Z96.641)','Hypertension (I10)'],allergyObjects:[{drug:'Latex',severity:'moderate'}]},
  {id:'R005',name:'Mohan Das',age:69,room:'106-A',color:'#2E7D32',initials:'MD',conditions:["Parkinson's Disease",'Mild Depression'],allergies:['Codeine moderate'],risk:'Medium',status:'Stable',blood:'O-',condition:'Stable',admitted:'05 Nov 2023',doctor:'Dr. Rajesh Kumar',caregiver:'Deepa Singh',phone:'919900445566',emergency:{name:'Priya Das',relation:'Daughter',phone:'9876505678'},diagnoses:["Parkinson's Disease (G20)",'Mild Depression (F32.9)'],allergyObjects:[{drug:'Codeine',severity:'moderate'}]},
];
RESIDENTS.forEach(r => { r.allergyObjects = r.allergyObjects || []; });

const DOCTORS = [
  {id:'DR001',name:'Dr. Priya Nair',specialty:'Diabetology',hospitalId:'H001',color:'#00897B',start:'09:00',end:'17:00',breaks:[{start:'13:00',end:'14:00'}]},
  {id:'DR002',name:'Dr. Rajesh Kumar',specialty:'Cardiology',hospitalId:'H001',color:'#1565C0',start:'10:00',end:'18:00',breaks:[{start:'13:30',end:'14:30'}]},
  {id:'DR003',name:'Dr. Amit Shah',specialty:'Orthopedics',hospitalId:'H002',color:'#6A1B9A',start:'08:00',end:'16:00',breaks:[{start:'12:00',end:'13:00'}]},
  {id:'DR004',name:'Dr. Deepa Iyer',specialty:'Pediatrics',hospitalId:'H003',color:'#C62828',start:'09:00',end:'15:00',breaks:[]},
  {id:'DR005',name:'Dr. Kavita Mehra',specialty:'Geriatrics',hospitalId:'H003',color:'#2E7D32',start:'09:00',end:'17:00',breaks:[{start:'13:00',end:'14:00'}]}
];
const DOCTORS_LOCAL = [
  { id:'DR001', name:'Dr. Priya Nair',    specialty:'Diabetology', hospitalId:'H001', password:'Priya@123' },
  { id:'DR002', name:'Dr. Rajesh Kumar',  specialty:'Cardiology',  hospitalId:'H001', password:'Rajesh@123' },
  { id:'DR003', name:'Dr. Amit Shah',     specialty:'Orthopedics', hospitalId:'H002', password:'Amit@1234' },
  { id:'DR004', name:'Dr. Deepa Iyer',    specialty:'Pediatrics',  hospitalId:'H003', password:'Deepa@123' },
  { id:'DR005', name:'Dr. Kavita Mehra',  specialty:'Geriatrics',  hospitalId:'H003', password:'Kavita@12' }
];
const HOSPITAL_NAME_TO_ID = {
  'Apollo Hospitals Greams Road':'H001',
  'MIOT International':'H002',
  'Kauvery Hospital':'H003',
  'PSG Hospitals':'H004',
  'Meenakshi Mission Hospital':'H005'
};
const DOCTOR_LOGIN_HOSPITALS = [
  {id:'H001', name:'Apollo Hospitals Greams Road'},
  {id:'H002', name:'MIOT International'},
  {id:'H003', name:'Kauvery Hospital'},
  {id:'H004', name:'PSG Hospitals'},
  {id:'H005', name:'Meenakshi Mission Hospital'}
];

let appointmentsData = [];
let selectedAppointmentSlot = '';
let bookingContext = {patientId:'R001', urgency:'Routine', reason:'Doctor review'};

let vitalsData = {
  R001:[
    {t:'2026-04-07T08:00:00',bp_s:142,bp_d:88,pulse:84,spo2:93,temp:36.9,glucose:184,weight:67.8,by:'Sunita Rao',notes:'Morning check — mild fatigue; fasting sugar high',ai:{riskLevel:'High',insight:'Blood sugar and blood pressure are elevated while oxygen is trending lower than baseline.',recommendation:'Repeat vitals after rest and schedule diabetes/BP review within 48 hours.'}},
    {t:'2026-04-06T08:00:00',bp_s:138,bp_d:86,pulse:82,spo2:94,temp:36.8,glucose:176,weight:67.9,by:'Sunita Rao',notes:'Morning — appetite normal; oxygen slightly low',ai:{riskLevel:'Medium',insight:'Glucose remains above target and SpO₂ is mildly reduced.',recommendation:'Continue close monitoring and review meal log.'}},
    {t:'2026-04-05T08:00:00',bp_s:136,bp_d:84,pulse:80,spo2:95,temp:36.7,glucose:169,weight:68.0,by:'Ravi Kumar',notes:'Stable, short walk completed'},
    {t:'2026-04-04T08:00:00',bp_s:134,bp_d:84,pulse:78,spo2:95,temp:36.8,glucose:162,weight:68.0,by:'Sunita Rao',notes:'Morning — mild post-breakfast glucose rise'},
    {t:'2026-04-03T08:00:00',bp_s:132,bp_d:82,pulse:76,spo2:96,temp:36.6,glucose:154,weight:68.1,by:'Sunita Rao',notes:'Morning — stable and cooperative'},
    {t:'2026-04-02T08:00:00',bp_s:130,bp_d:82,pulse:75,spo2:96,temp:36.7,glucose:148,weight:68.1,by:'Ravi Kumar',notes:'Morning — good sleep reported'},
    {t:'2026-04-01T08:00:00',bp_s:128,bp_d:82,pulse:74,spo2:97,temp:36.8,glucose:142,weight:68.2,by:'Sunita Rao',notes:'Morning check — alert, cooperative'},
    {t:'2026-03-31T08:00:00',bp_s:130,bp_d:84,pulse:76,spo2:97,temp:36.7,glucose:145,weight:68.2,by:'Sunita Rao',notes:'Morning'},
    {t:'2026-03-30T08:00:00',bp_s:126,bp_d:80,pulse:72,spo2:98,temp:36.6,glucose:134,weight:68.3,by:'Ravi Kumar',notes:'Afternoon — stable'},
    {t:'2026-03-29T08:00:00',bp_s:124,bp_d:78,pulse:70,spo2:98,temp:36.5,glucose:132,weight:68.4,by:'Sunita Rao',notes:'Good activity tolerance'},
  ],
  R002:[
    {t:'2026-04-07T08:00:00',bp_s:152,bp_d:94,pulse:90,spo2:93,temp:36.9,glucose:null,weight:54.4,by:'Deepa Singh',notes:'BP elevated; mild ankle swelling'},
    {t:'2026-04-06T08:00:00',bp_s:150,bp_d:92,pulse:88,spo2:94,temp:36.9,glucose:null,weight:54.2,by:'Deepa Singh',notes:'BP elevated — monitoring'},
    {t:'2026-04-05T08:00:00',bp_s:148,bp_d:92,pulse:88,spo2:94,temp:36.9,glucose:null,weight:54,by:'Deepa Singh',notes:'BP elevated — monitoring'},
    {t:'2026-04-04T08:00:00',bp_s:144,bp_d:90,pulse:86,spo2:94,temp:37.1,glucose:null,weight:null,by:'Deepa Singh',notes:'Afternoon check'},
    {t:'2026-04-03T08:00:00',bp_s:140,bp_d:88,pulse:84,spo2:95,temp:36.8,glucose:null,weight:53.9,by:'Deepa Singh',notes:'No breathlessness reported'},
  ],
  R003:[
    {t:'2026-04-07T08:00:00',bp_s:120,bp_d:78,pulse:72,spo2:91,temp:36.6,glucose:140,weight:71.8,by:'Ravi Kumar',notes:'COPD; SpO₂ lower than usual after short walk'},
    {t:'2026-04-06T08:00:00',bp_s:118,bp_d:76,pulse:70,spo2:92,temp:36.5,glucose:138,weight:72,by:'Ravi Kumar',notes:'SpO₂ on lower side — COPD'},
    {t:'2026-04-05T08:00:00',bp_s:116,bp_d:74,pulse:68,spo2:93,temp:36.5,glucose:136,weight:72.1,by:'Ravi Kumar',notes:'Breathing comfortable at rest'},
    {t:'2026-04-04T08:00:00',bp_s:118,bp_d:76,pulse:68,spo2:94,temp:36.4,glucose:132,weight:72.1,by:'Ravi Kumar',notes:'Stable'},
  ],
  R004:[
    {t:'2026-04-07T08:00:00',bp_s:118,bp_d:74,pulse:68,spo2:98,temp:36.6,glucose:112,weight:62.1,by:'Sunita Rao',notes:'Post-op mobility improving'},
    {t:'2026-04-06T08:00:00',bp_s:116,bp_d:74,pulse:66,spo2:98,temp:36.6,glucose:108,weight:62,by:'Sunita Rao',notes:'Post-op vitals good'},
    {t:'2026-04-05T08:00:00',bp_s:116,bp_d:72,pulse:66,spo2:99,temp:36.5,glucose:106,weight:62,by:'Sunita Rao',notes:'Physio completed'},
  ],
  R005:[
    {t:'2026-04-07T08:00:00',bp_s:124,bp_d:80,pulse:74,spo2:97,temp:36.7,glucose:118,weight:65,by:'Deepa Singh',notes:'Stable; tremor unchanged'},
    {t:'2026-04-06T08:00:00',bp_s:122,bp_d:80,pulse:72,spo2:97,temp:36.7,glucose:115,weight:65,by:'Deepa Singh',notes:'Stable'},
    {t:'2026-04-05T08:00:00',bp_s:120,bp_d:78,pulse:72,spo2:98,temp:36.6,glucose:112,weight:65.1,by:'Deepa Singh',notes:'Good medication adherence'},
  ],
};

let medsData = {
  R001:[
    {id:'M1',name:'Metformin 500mg',route:'Oral',freq:'Twice daily',indication:'Type 2 Diabetes',by:'Dr. Priya Nair',times:[{id:'E1',t:'08:00',status:'given',adm:'Sunita Rao'},{id:'E2',t:'20:00',status:'pending'}]},
    {id:'M2',name:'Amlodipine 5mg',route:'Oral',freq:'Once daily',indication:'Hypertension',by:'Dr. Priya Nair',times:[{id:'E3',t:'08:00',status:'given',adm:'Sunita Rao'}]},
    {id:'M3',name:'Pantoprazole 40mg',route:'Oral',freq:'Once daily',indication:'Gastric protection',by:'Dr. Priya Nair',times:[{id:'E4',t:'08:00',status:'given',adm:'Sunita Rao'}]},
    {id:'M4',name:'Glimepiride 1mg',route:'Oral',freq:'Once daily',indication:'Type 2 Diabetes',by:'Dr. Priya Nair',times:[{id:'E5',t:'08:00',status:'given',adm:'Sunita Rao'}]},
    {id:'M5',name:'Calcium + Vit D3',route:'Oral',freq:'Once daily',indication:'Bone health',by:'Dr. Priya Nair',times:[{id:'E6',t:'20:00',status:'overdue'}]},
  ],
  R002:[
    {id:'M1',name:'Furosemide 40mg',route:'Oral',freq:'Once daily',indication:'CHF',by:'Dr. Rajesh Kumar',times:[{id:'E7',t:'08:00',status:'given',adm:'Deepa Singh'}]},
    {id:'M2',name:'Warfarin 2mg',route:'Oral',freq:'Once daily',indication:'Atrial Fibrillation',by:'Dr. Rajesh Kumar',times:[{id:'E8',t:'18:00',status:'pending'}]},
    {id:'M3',name:'Digoxin 0.125mg',route:'Oral',freq:'Once daily',indication:'CHF',by:'Dr. Rajesh Kumar',times:[{id:'E9',t:'08:00',status:'given',adm:'Deepa Singh'}]},
  ],
};

let labsData = {
  R001:[
    {id:'L1',test:'HbA1c',result:'7.8',unit:'%',ref:'< 7.0',status:'high',date:'2026-03-20',by:'Dr. Priya Nair'},
    {id:'L2',test:'Fasting Glucose',result:'138',unit:'mg/dL',ref:'70–100',status:'high',date:'2026-03-20',by:'Dr. Priya Nair'},
    {id:'L3',test:'Creatinine',result:'1.1',unit:'mg/dL',ref:'0.7–1.2',status:'normal',date:'2026-03-20',by:'Dr. Priya Nair'},
    {id:'L4',test:'Haemoglobin',result:'12.8',unit:'g/dL',ref:'13.5–17.5',status:'low',date:'2026-03-20',by:'Dr. Priya Nair'},
    {id:'L5',test:'Total Cholesterol',result:'212',unit:'mg/dL',ref:'< 200',status:'high',date:'2026-03-20',by:'Dr. Priya Nair'},
  ],
  R002:[
    {id:'L1',test:'BNP',result:'680',unit:'pg/mL',ref:'< 100',status:'high',date:'2026-03-25',by:'Dr. Rajesh Kumar'},
    {id:'L2',test:'Creatinine',result:'1.6',unit:'mg/dL',ref:'0.5–1.1',status:'high',date:'2026-03-25',by:'Dr. Rajesh Kumar'},
    {id:'L3',test:'INR',result:'2.4',unit:'',ref:'2.0–3.0',status:'normal',date:'2026-03-25',by:'Dr. Rajesh Kumar'},
  ],
};

let notesData = {
  R001:[
    {shift:'Evening',date:'2026-04-01',author:'Sunita Rao',role:'Caregiver',note:'Good day overall. Physiotherapy completed. Glucose 168 post-lunch — Dr. Nair informed. Evening Calcium pending. Mood: Cheerful.',tasks:['Evening Calcium + Vit D3 at 20:00','Morning vitals 08:00'],t:'2026-04-01T21:00:00'},
    {shift:'Afternoon',date:'2026-04-01',author:'Dr. Priya Nair',role:'Doctor',note:'Reviewed vitals. Glucose 168 mg/dL post-lunch concerning. Dietary modification advised — reduce refined carbs. No medication change at this time.',tasks:[],t:'2026-04-01T13:30:00'},
    {shift:'Morning',date:'2026-04-01',author:'Deepa Singh',role:'Nurse',note:'Morning vitals stable. All medications administered. Breakfast well — 80% eaten. Requested physio session at 10:00.',tasks:[],t:'2026-04-01T09:30:00'},
  ]
};

let ALERTS = [
  {id:'A1',res:'Saraswati Menon',room:'108-B',type:'vital',sev:'critical',msg:'BP 148/92 — elevated, monitoring required',acked:false,t:'2026-04-01T08:05:00'},
  {id:'A2',res:'Gopal Krishnan',room:'312-A',type:'vital',sev:'warning',msg:'SpO₂ 92% — COPD patient, check oxygen therapy',acked:false,t:'2026-04-01T08:10:00'},
  {id:'A3',res:'Ramesh Iyer',room:'204-A',type:'med',sev:'warning',msg:'Calcium + Vit D3 — overdue at 20:00',acked:false,t:'2026-04-01T20:00:00'},
  {id:'A4',res:'Mohan Das',room:'106-A',type:'lab',sev:'info',msg:'Lab panel due — last drawn 30 days ago',acked:true,t:'2026-04-01T06:00:00'},
];

let auditLog = [];
let selVitals = 'R001', selEmar = 'R001', selLabs = 'R001', selTl = 'R001', selCare = 'R001', resFilter = 'All';
let sidebarCollapsed = false;
let currentRole = localStorage.getItem('ehmr-role') || '';
const AI_STORAGE_KEY = 'ehmr-ai-groq-config';
const DEFAULT_AI_MODEL = 'llama-3.3-70b-versatile';
const AI_PROXY_URL = '/api/ai-insight';
let authMode = 'login';
let currentUser = JSON.parse(localStorage.getItem('ehmr-user') || 'null');
let hospitalPollInterval = null;
let HOSPITALS = [
  {
    id:'HSP-1001', name:'CityCare Multi Speciality Hospital', area:'MG Road, Bengaluru',
    lat:12.9716, lng:77.5946, rating:4.7, status:'Available',
    departments:['General','Cardiology','Orthopedics','Pediatrics'],
    beds:{'General Ward':{available:14,total:42}, ICU:{available:3,total:12}, 'Private Room':{available:6,total:18}},
    doctors:['Dr. Priya Nair','Dr. Rajesh Kumar']
  },
  {
    id:'HSP-1002', name:'Apollo North Clinic', area:'Hebbal Main Road, Bengaluru',
    lat:13.0358, lng:77.5970, rating:4.5, status:'Limited',
    departments:['General','Neurology','Dermatology'],
    beds:{'General Ward':{available:2,total:24}, ICU:{available:0,total:6}, 'Private Room':{available:1,total:10}},
    doctors:['Dr. Kavita Mehra','Dr. Anil Rao']
  },
  {
    id:'HSP-1003', name:'Greenline Children and Family Hospital', area:'Indiranagar 100 Feet Road, Bengaluru',
    lat:12.9784, lng:77.6408, rating:4.8, status:'Available',
    departments:['Pediatrics','General','Gynecology'],
    beds:{'General Ward':{available:9,total:34}, ICU:{available:4,total:8}, 'Private Room':{available:5,total:16}},
    doctors:['Dr. Priya Nair','Dr. Kavita Mehra']
  }
];
let hospitalMapInstance = null;
let hospitalMarkers = [];
let selectedHospitalId = localStorage.getItem('ehmr-patient-hospital') || HOSPITALS[0].id;

function selectedHospital() {
  return HOSPITALS.find(h => h.id === selectedHospitalId) || HOSPITALS[0];
}

// ===== HELPERS =====
function fmt(t) {
  if (!t) return '';
  const d = new Date(t);
  return d.toLocaleDateString('en-IN', {day:'2-digit',month:'short'}) + ' ' +
         d.toLocaleTimeString('en-IN', {hour:'2-digit',minute:'2-digit',hour12:false});
}
function todayISO(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}
function displayDate(date) {
  return new Date(date + 'T00:00:00').toLocaleDateString('en-IN', {day:'2-digit',month:'short',year:'numeric'});
}
function displayTime(time) {
  const [h, m] = time.split(':').map(Number);
  return new Date(2026, 0, 1, h, m).toLocaleTimeString('en-IN', {hour:'numeric',minute:'2-digit',hour12:true});
}
function timeMinutes(time) {
  const [h, m] = String(time || '00:00').split(':').map(Number);
  return h * 60 + m;
}
function minuteTime(minutes) {
  return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
}
function patientName(id) {
  return RESIDENTS.find(r => r.id === id)?.name || id;
}
function allergiesFor(resident) {
  return (resident.allergyObjects || resident.allergies || []).map(item => {
    if (typeof item === 'string') {
      const parts = item.split(' ');
      const severity = parts.pop() || '';
      return { drug: parts.join(' ') || item, severity };
    }
    return item;
  });
}
function getToken() { return localStorage.getItem('ehmr-token'); }
function setToken(t) { localStorage.setItem('ehmr-token', t); }
function clearToken() { localStorage.removeItem('ehmr-token'); }
function authToken() {
  return getToken() || '';
}
async function apiFetch(url, options = {}) {
  const requestPath = String(url);
  const isAuthEndpoint = ['/api/auth/login', '/api/auth/register', '/api/auth/forgot-password', '/api/auth/reset-password']
    .some(path => requestPath.includes(path));
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(!isAuthEndpoint && authToken() ? {'Authorization':'Bearer ' + authToken()} : {}),
      ...(options.headers || {})
    }
  });
  const json = await res.json().catch(() => ({}));
  if (res.status === 401) {
    if (authToken() || currentRole !== 'doctor') {
      clearToken();
      localStorage.removeItem('ehmr-user');
      currentRole = '';
      document.getElementById('role-gate').classList.remove('hidden');
    }
    throw new Error(json.message || 'Session expired');
  }
  if (!res.ok || json.success === false) throw new Error(json.message || 'Request failed');
  return json.data ?? json;
}
async function runAI(context, elementId) {
  try {
    const data = await apiFetch('/api/ai-insight', {
      method:'POST',
      body:JSON.stringify({
        featureContext:context.feature,
        residentId:context.residentId,
        vitals:context.vitals,
        conditions:context.conditions,
        message:context.prompt || 'Analyze and give clinical insight.'
      })
    });
    const text = data.data?.text || data.insight || data.response || 'Analysis complete.';
    if (elementId) document.getElementById(elementId).textContent = text;
    return text;
  } catch (e) {
    return 'AI analysis unavailable - using local assessment.';
  }
}
function roleScopedResidents() {
  return currentRole === 'resident' ? RESIDENTS.filter(r => r.id === 'R001') : RESIDENTS;
}
function isDemoPatientAccount() {
  return currentRole === 'resident' && String(currentUser?.email || '').toLowerCase() === 'patient@ehmr.com';
}
function clearPatientClinicalDemoData() {
  vitalsData = {};
  medsData = {};
  labsData = {};
  notesData = {};
}
function hasClinicalData(resId = 'R001') {
  return Boolean(
    (vitalsData[resId] || []).length ||
    (medsData[resId] || []).length ||
    (labsData[resId] || []).length ||
    (notesData[resId] || []).length
  );
}
function statusBadge(status) {
  const normalized = String(status || 'Scheduled');
  const cls = normalized === 'Completed' ? 'badge-stable' : normalized === 'Missed' ? 'badge-critical' : 'badge-teal';
  return `<span class="badge ${cls}">${normalized}</span>`;
}
function localAppointmentSeed() {
  return [
    {id:'APT-1001', patientId:'R001', doctorName:'Dr. Priya Nair', date:todayISO(2), time:'10:00', status:'Scheduled', reason:'AI diabetes/BP review', risk:'High'},
    {id:'APT-1002', patientId:'R002', doctorName:'Dr. Rajesh Kumar', date:todayISO(3), time:'11:30', status:'Scheduled', reason:'CHF follow-up', risk:'Medium'},
    {id:'APT-1003', patientId:'R004', doctorName:'Dr. Amit Shah', date:todayISO(-3), time:'09:30', status:'Completed', reason:'Post-op mobility review', risk:'Low'},
    {id:'APT-1004', patientId:'R003', doctorName:'Dr. Priya Nair', date:todayISO(-4), time:'15:00', status:'Missed', reason:'COPD oxygen trend', risk:'Medium'}
  ];
}
function slotAvailability(date, doctorName) {
  const doctor = DOCTORS.find(d => d.name === doctorName) || DOCTORS[0];
  const booked = appointmentsData.filter(a => a.doctorName === doctor.name && a.date === date && a.status === 'Scheduled').map(a => a.time);
  const slots = [];
  for (let m = timeMinutes(doctor.start); m < timeMinutes(doctor.end); m += 30) {
    const inBreak = (doctor.breaks || []).some(b => m >= timeMinutes(b.start) && m < timeMinutes(b.end));
    const time = minuteTime(m);
    slots.push({time, available: !booked.includes(time) && !inBreak, booked: booked.includes(time), break: inBreak});
  }
  return {date, doctors:DOCTORS, availability:[{...doctor, slots}]};
}
async function fetchAppointments() {
  const fallback = localAppointmentSeed();
  appointmentsData = authToken() ? [] : fallback;
  try {
    const data = await apiFetch('/api/appointments');
    appointmentsData = data.appointments || [];
  } catch (e) {
    appointmentsData = authToken() ? [] : fallback;
  }
  return appointmentsData;
}
async function fetchAvailability(date, doctorName) {
  const fallback = slotAvailability(date, doctorName);
  try {
    const data = await apiFetch(`/api/availability?date=${encodeURIComponent(date)}&doctorName=${encodeURIComponent(doctorName || '')}`);
    const doctor = (data.availability || [])[0];
    const hasUsableSlots = Array.isArray(doctor?.slots) && doctor.slots.length;
    return hasUsableSlots ? data : fallback;
  } catch (e) {
    return fallback;
  }
}
function condBadge(c) {
  const m = {Stable:'badge-stable',Monitor:'badge-monitor',Critical:'badge-critical',Recovery:'badge-recovery'};
  return `<span class="badge ${m[c]||'badge-gray'}">${c}</span>`;
}
function labBadge(s) {
  const m = {high:'badge-critical',low:'badge-monitor',normal:'badge-stable'};
  return `<span class="badge ${m[s]||'badge-gray'}">${s.toUpperCase()}</span>`;
}
function renderSVGTrend(data, width = 520, height = 260) {
  const rows = data || [];
  if (!rows.length) return `<svg class="trend-chart" viewBox="0 0 ${width} ${height}"></svg>`;
  const pad = {left:42,right:16,top:24,bottom:30};
  const values = rows.flatMap(d => [d.spo2, d.pulse || d.hr, d.glucose].filter(v => v !== null && v !== undefined));
  const min = Math.min(...values, 80), max = Math.max(...values, 200);
  const x = i => pad.left + ((width - pad.left - pad.right) / Math.max(1, rows.length - 1)) * i;
  const y = v => pad.top + (height - pad.top - pad.bottom) - ((v - min) / Math.max(1, max - min)) * (height - pad.top - pad.bottom);
  const path = key => rows.map((d, i) => `${i ? 'L' : 'M'} ${x(i).toFixed(1)} ${y(d[key] ?? d.hr ?? min).toFixed(1)}`).join(' ');
  return `<svg class="trend-chart" viewBox="0 0 ${width} ${height}">
    <path class="trend-line" d="${path('spo2')}" stroke="var(--accent)"></path>
    <path class="trend-line" d="${path('pulse')}" stroke="var(--sky)"></path>
    <path class="trend-line" d="${path('glucose')}" stroke="var(--amber)"></path>
    ${rows.map((d, i) => `<text class="trend-label" x="${x(i).toFixed(1)}" y="${height - 8}" text-anchor="middle">${fmt(d.t || d.date).split(' ')[0]}</text>`).join('')}
  </svg>`;
}
function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}
function normalizeAIResult(raw) {
  let result = raw;
  if (typeof result === 'string') {
    try { result = JSON.parse(result); } catch (e) { return {insight:result}; }
  }
  return result?.data || result || {};
}
function aiRiskBadgeClass(riskLevel) {
  const risk = String(riskLevel || 'Medium').toLowerCase();
  if (risk === 'low') return 'badge-stable';
  if (risk === 'high' || risk === 'critical') return 'badge-critical';
  return 'badge-monitor';
}
function aiExplanationHTML(raw, defaults = {}) {
  const result = {...defaults, ...normalizeAIResult(raw)};
  const riskLevel = result.riskLevel || 'Medium';
  const score = Number(result.score);
  const actions = Array.isArray(result.actions) ? result.actions : [];
  return `<div class="card">
    <div class="card-hdr">
      <div class="card-ttl">AI Explanation</div>
      <span class="badge ${aiRiskBadgeClass(riskLevel)}">${escapeHTML(riskLevel)} Risk</span>
    </div>
    <div class="info-row"><div class="info-lbl">Insight</div><div class="info-val">${escapeHTML(result.insight || 'No insight returned')}</div></div>
    <div class="info-row"><div class="info-lbl">Recommendation</div><div class="info-val">${escapeHTML(result.recommendation || 'No recommendation returned')}</div></div>
    <div class="info-row"><div class="info-lbl">Score</div><div class="info-val">${Number.isFinite(score) ? `${score} / 100` : 'Not scored'}</div></div>
    <div class="info-row"><div class="info-lbl">Visit Window</div><div class="info-val">${escapeHTML(result.visitWindow || 'Routine review within 7 days')}</div></div>
    <div style="margin-top:12px">
      <div class="info-lbl" style="margin-bottom:8px">Actions</div>
      ${actions.length
        ? actions.map(action => `<div class="list-item"><strong>${escapeHTML(action.title || action.name || 'Action')}</strong><span>${escapeHTML(action.text || action.description || action)}</span></div>`).join('')
        : '<div class="list-item"><strong>No immediate actions required</strong><span>Continue routine monitoring unless symptoms change.</span></div>'}
    </div>
  </div>`;
}
function unacked() {
  const activeNames = new Set(RESIDENTS.map(r => r.name));
  return ALERTS.filter(a => !a.acked && activeNames.has(a.res));
}
function updateAlertBadge() {
  const count = unacked().length;
  const badge = document.getElementById('sb-alert-badge');
  if (badge) {
    badge.dataset.clinicalCount = count;
    badge.textContent = count;
  }
  const dot = document.getElementById('tb-dot');
  if (dot) dot.style.display = count ? '' : 'none';
}
function updateNewPatientBadge() {
  const badge = document.getElementById('sb-newpatient-badge');
  if (!badge) return;
  const count = Number(badge.textContent || 0);
  badge.style.display = count ? '' : 'none';
}
let toastTmr;
function toast(msg, type = 'success') {
  const el = document.getElementById('toast');
  const toastType = type || 'success';
  const icon = toastType === 'error' ? '!' : toastType === 'warning' ? '!' : '✓';
  const title = toastType === 'error' ? 'Action Required' : toastType === 'warning' ? 'Please Review' : 'Success';
  el.innerHTML = `<div class="toast-item" role="alert" aria-live="assertive">
    <div class="toast-icon">${icon}</div>
    <div class="toast-copy">
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${msg}</div>
    </div>
  </div>`;
  el.className = 'show ' + toastType;
  clearTimeout(toastTmr);
  toastTmr = setTimeout(() => {
    el.className = toastType;
    el.innerHTML = '';
  }, 2800);
}
function addAudit(action, res, detail) {
  auditLog.unshift({t: new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'}), name:'Dr. Priya Nair', role:'Doctor', action, resource:res, detail});
}
function toggleForm(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle('open');
}
function resChipsHTML(selId, callback) {
  return roleScopedResidents().map(r =>
    `<div class="res-chip ${r.id === selId ? 'selected' : ''}" onclick="${callback}('${r.id}')">
      <div class="res-chip-av" style="background:${r.color}">${r.initials}</div>${r.name.split(' ')[0]}
    </div>`
  ).join('');
}
function latestVitals(id = 'R001') { return (vitalsData[id] || [])[0] || {}; }
function aiConfig() {
  return {proxyUrl:AI_PROXY_URL, apiKey:'', model:DEFAULT_AI_MODEL};
}
function loadAIConfig() {
  const source = document.getElementById('ai-source');
  if (source) source.textContent = 'Local Groq proxy configured';
}
function saveAIConfig() {
  loadAIConfig();
}
function clearAIConfig() {
  localStorage.removeItem(AI_STORAGE_KEY);
  loadAIConfig();
}
function bindAuthControls() {
  document.getElementById('login-tab')?.addEventListener('click', event => {
    event.preventDefault();
    setAuthMode('login');
  });
  document.getElementById('register-tab')?.addEventListener('click', event => {
    event.preventDefault();
    setAuthMode('register');
  });
  document.getElementById('auth-submit')?.addEventListener('click', event => {
    event.preventDefault();
    submitAuth();
  });
  document.getElementById('patient-demo')?.addEventListener('click', event => {
    event.preventDefault();
    fillDemoPatient();
  });
  document.querySelectorAll('.auth-role-option').forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();
      selectAuthRole(button.dataset.authRole || 'viewer');
    });
  });
  document.getElementById('auth-role')?.addEventListener('change', toggleHospitalRegisterFields);
  document.getElementById('hospital-location-btn')?.addEventListener('click', event => {
    event.preventDefault();
    fillHospitalPinFromLocation();
  });
  ['auth-email','auth-password'].forEach(id => {
    document.getElementById(id)?.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        submitAuth();
      }
    });
  });
}
function closeStepModal(backdrop) {
  backdrop?.remove();
}
function stepDotsHTML(step, total = 3) {
  return `<div class="step-dots">
    ${Array.from({length:total}, (_, i) => `<span class="step-dot ${i + 1 === step ? 'active' : ''}"></span>`).join('')}
    <span class="step-label">Step ${step} of ${total}</span>
  </div>`;
}
async function doctorLoginHospitals() {
  try {
    const res = await fetch('/api/hospitals');
    const json = await res.json();
    const hospitals = json.data?.hospitals || json.hospitals || json.data || [];
    const normalized = hospitals.map(h => ({id:HOSPITAL_NAME_TO_ID[h.name] || h.id || '', name:h.name})).filter(h => h.name);
    return normalized.length ? normalized : DOCTOR_LOGIN_HOSPITALS;
  } catch (error) {
    return DOCTOR_LOGIN_HOSPITALS;
  }
}
async function openDoctorLoginModal() {
  document.querySelector('.step-modal-backdrop')?.remove();
  const state = {step:1, selectedHospitalId:'', selectedHospitalName:'', selectedDoctor:null, hospitals:await doctorLoginHospitals()};
  const backdrop = document.createElement('div');
  backdrop.className = 'step-modal-backdrop';
  backdrop.addEventListener('click', event => {
    if (event.target === backdrop) closeStepModal(backdrop);
  });
  document.body.appendChild(backdrop);

  const render = () => {
    const hospitalId = state.selectedHospitalId || HOSPITAL_NAME_TO_ID[state.selectedHospitalName] || '';
    const doctors = DOCTORS_LOCAL.filter(doctor => doctor.hospitalId === hospitalId);
    if (state.step === 1) {
      backdrop.innerHTML = `<div class="step-modal" role="dialog" aria-modal="true">
        ${stepDotsHTML(1)}
        <h2>Select Your Hospital</h2>
        <select id="doc-step1-hospital">
          <option value="">Choose hospital...</option>
          ${state.hospitals.map(h => `<option value="${escapeHTML(h.id || HOSPITAL_NAME_TO_ID[h.name] || '')}" data-name="${escapeHTML(h.name)}">${escapeHTML(h.name)}</option>`).join('')}
        </select>
        <div class="step-modal-btns">
          <button type="button" class="btn btn-primary" id="doc-step1-next" disabled>Continue</button>
          <button type="button" class="btn btn-outline" id="doc-step1-cancel">Cancel</button>
        </div>
      </div>`;
      const select = document.getElementById('doc-step1-hospital');
      const next = document.getElementById('doc-step1-next');
      select.value = state.selectedHospitalId;
      next.disabled = !select.value;
      select.addEventListener('change', () => {
        state.selectedHospitalId = select.value;
        state.selectedHospitalName = select.selectedOptions[0]?.dataset.name || '';
        next.disabled = !select.value;
        next.style.opacity = select.value ? '1' : '0.5';
      });
      next.style.opacity = select.value ? '1' : '0.5';
      next.addEventListener('click', () => {
        if (!state.selectedHospitalId) return;
        state.selectedDoctor = null;
        state.step = 2;
        render();
      });
      document.getElementById('doc-step1-cancel').addEventListener('click', () => closeStepModal(backdrop));
      return;
    }
    if (state.step === 2) {
      backdrop.innerHTML = `<div class="step-modal" role="dialog" aria-modal="true">
        ${stepDotsHTML(2)}
        <h2>Select Your Name</h2>
        <select id="doc-step2-doctor">
          <option value="">Choose doctor...</option>
          ${doctors.map(doctor => `<option value="${doctor.id}">${escapeHTML(doctor.name)} · ${escapeHTML(doctor.specialty)}</option>`).join('')}
        </select>
        <div class="step-modal-btns">
          <button type="button" class="btn btn-primary" id="doc-step2-next" disabled>Continue</button>
          <button type="button" class="btn btn-outline" id="doc-step2-back">Back</button>
        </div>
      </div>`;
      const select = document.getElementById('doc-step2-doctor');
      const next = document.getElementById('doc-step2-next');
      select.addEventListener('change', () => {
        state.selectedDoctor = DOCTORS_LOCAL.find(doctor => doctor.id === select.value) || null;
        next.disabled = !state.selectedDoctor;
        next.style.opacity = state.selectedDoctor ? '1' : '0.5';
      });
      next.style.opacity = '0.5';
      next.addEventListener('click', () => {
        if (!state.selectedDoctor) return;
        state.step = 3;
        render();
      });
      document.getElementById('doc-step2-back').addEventListener('click', () => {
        state.step = 1;
        render();
      });
      return;
    }
    backdrop.innerHTML = `<div class="step-modal" role="dialog" aria-modal="true">
      ${stepDotsHTML(3)}
      <h2>Verify Your Identity — ${escapeHTML(state.selectedDoctor.name)}</h2>
      <input type="password" id="doc-step3-password" placeholder="Enter your 8-character password" autocomplete="current-password"/>
      <details>
        <summary>▶ Demo Credentials</summary>
        <table>
          <thead><tr><th>Doctor</th><th>Hospital</th><th>Password</th></tr></thead>
          <tbody>
            <tr><td>Dr. Priya Nair</td><td>Apollo Hospitals Greams Road</td><td>Priya@123</td></tr>
            <tr><td>Dr. Rajesh Kumar</td><td>Apollo Hospitals Greams Road</td><td>Rajesh@123</td></tr>
            <tr><td>Dr. Amit Shah</td><td>MIOT International</td><td>Amit@1234</td></tr>
            <tr><td>Dr. Deepa Iyer</td><td>Kauvery Hospital</td><td>Deepa@123</td></tr>
            <tr><td>Dr. Kavita Mehra</td><td>Kauvery Hospital</td><td>Kavita@12</td></tr>
          </tbody>
        </table>
      </details>
      <div class="step-error" id="doc-login-error" hidden></div>
      <div class="step-modal-btns">
        <button type="button" class="btn btn-primary" id="doc-step3-login">Login</button>
        <button type="button" class="btn btn-outline" id="doc-step3-back">Back</button>
      </div>
    </div>`;
    const passwordInput = document.getElementById('doc-step3-password');
    const errorEl = document.getElementById('doc-login-error');
    const login = async () => {
      if (passwordInput.value === state.selectedDoctor.password) {
        clearToken();
        localStorage.removeItem('ehmr-user');
        localStorage.setItem('ehmr-doctor-id', state.selectedDoctor.id);
        localStorage.setItem('ehmr-doctor-name', state.selectedDoctor.name);
        localStorage.setItem('ehmr-doctor-specialty', state.selectedDoctor.specialty);
        localStorage.setItem('ehmr-hospital-name', state.selectedHospitalName);
        localStorage.setItem('ehmr-role', 'doctor');
        currentRole = 'doctor';
        currentUser = {name:state.selectedDoctor.name, role:'doctor'};
        closeStepModal(backdrop);
        await selectRole('doctor');
        return;
      }
      errorEl.hidden = false;
      errorEl.textContent = 'Incorrect password. Please try again.';
      passwordInput.value = '';
      passwordInput.classList.remove('shake');
      void passwordInput.offsetWidth;
      passwordInput.classList.add('shake');
      passwordInput.focus();
    };
    document.getElementById('doc-step3-login').addEventListener('click', login);
    passwordInput.addEventListener('keydown', event => {
      if (event.key === 'Enter') login();
    });
    document.getElementById('doc-step3-back').addEventListener('click', () => {
      state.step = 2;
      render();
    });
    passwordInput.focus();
  };
  render();
}
function openPatientLoginModal() {
  document.querySelector('.step-modal-backdrop')?.remove();
  const backdrop = document.createElement('div');
  backdrop.className = 'step-modal-backdrop';
  let tab = 'login';
  backdrop.addEventListener('click', event => {
    if (event.target === backdrop) closeStepModal(backdrop);
  });
  document.body.appendChild(backdrop);
  const switchTab = nextTab => {
    tab = nextTab;
    render();
  };
  const render = () => {
    backdrop.innerHTML = `<div class="step-modal" role="dialog" aria-modal="true">
      <div class="pt-modal-tabs">
        <button type="button" class="pt-modal-tab ${tab === 'login' ? 'active' : ''}" id="pt-tab-login">Login</button>
        <button type="button" class="pt-modal-tab ${tab === 'register' ? 'active' : ''}" id="pt-tab-register">Register</button>
      </div>
      ${tab === 'login' ? patientLoginHTML() : patientRegisterHTML()}
    </div>`;
    document.getElementById('pt-tab-login').addEventListener('click', () => switchTab('login'));
    document.getElementById('pt-tab-register').addEventListener('click', () => switchTab('register'));
    if (tab === 'login') bindPatientLogin(backdrop);
    else bindPatientRegister(backdrop);
  };
  render();
}
function patientLoginHTML() {
  return `<h2>Welcome Back</h2>
    <div class="step-sub">Sign in to your patient account</div>
    <label class="step-field-label" for="pt-login-email">Email Address</label>
    <input type="email" id="pt-login-email" placeholder="your@email.com"/>
    <label class="step-field-label" for="pt-login-password">Password</label>
    <input type="password" id="pt-login-password" placeholder="Enter your password"/>
    <div class="step-error" id="pt-login-error" hidden></div>
    <div class="pt-demo-hint" id="pt-demo-hint">Demo: patient@ehmr.com / Patient@123</div>
    <button type="button" class="btn btn-primary step-full-btn" id="pt-login-submit">Sign In →</button>
    <button type="button" class="step-link-btn" id="pt-forgot-password">Forgot password?</button>
    <button type="button" class="step-link-btn" id="pt-go-register">Don't have an account? Register →</button>`;
}
function patientRegisterHTML() {
  return `<h2>Create Patient Account</h2>
    <div class="step-sub">Register to access your health dashboard</div>
    <div class="form-grid pt-form-grid">
      <div class="form-full">
        <label class="step-field-label" for="pt-reg-name">Full Name</label>
        <input id="pt-reg-name" placeholder="Your full name"/>
      </div>
      <div>
        <label class="step-field-label" for="pt-reg-email">Email Address</label>
        <input id="pt-reg-email" type="email" placeholder="your@email.com"/>
      </div>
      <div>
        <label class="step-field-label" for="pt-reg-mobile">Mobile Number</label>
        <input id="pt-reg-mobile" type="tel" placeholder="+91 98765 43210" pattern="[0-9+\\s\\-]{10,15}"/>
      </div>
      <div class="form-full">
        <label class="step-field-label" for="pt-reg-age">Age</label>
        <input id="pt-reg-age" type="number" min="1" max="120" placeholder="Your age"/>
      </div>
      <div>
        <label class="step-field-label" for="pt-reg-password">Password</label>
        <input id="pt-reg-password" type="password" placeholder="Min 8 characters"/>
        <div class="pw-strength-bar"><div class="pw-strength-fill" id="pw-strength-fill"></div></div>
        <div class="pw-strength-label" id="pw-strength-label">Weak</div>
      </div>
      <div>
        <label class="step-field-label" for="pt-reg-confirm">Confirm Password</label>
        <input id="pt-reg-confirm" type="password" placeholder="Confirm password"/>
      </div>
    </div>
    <div class="step-error" id="pt-reg-error" hidden></div>
    <button type="button" class="btn btn-primary step-full-btn" id="pt-reg-submit">Create Account →</button>
    <button type="button" class="step-link-btn" id="pt-go-login">Already have an account? Sign In →</button>`;
}
function bindPatientLogin(backdrop) {
  const email = document.getElementById('pt-login-email');
  const password = document.getElementById('pt-login-password');
  const errorEl = document.getElementById('pt-login-error');
  document.getElementById('pt-demo-hint').addEventListener('click', () => {
    email.value = 'patient@ehmr.com';
    password.value = 'Patient@123';
  });
  document.getElementById('pt-go-register').addEventListener('click', event => {
    event.preventDefault();
    closeStepModal(backdrop);
    openPatientRegisterModal();
  });
  document.getElementById('pt-forgot-password').addEventListener('click', event => {
    event.preventDefault();
    closeStepModal(backdrop);
    openForgotPasswordModal(email.value);
  });
  const submit = async () => {
    errorEl.hidden = true;
    try {
      const data = await apiFetch('/api/auth/login', {method:'POST', body:JSON.stringify({email:email.value, password:password.value})});
      localStorage.removeItem('ehmr-doctor-id');
      localStorage.removeItem('ehmr-doctor-name');
      localStorage.removeItem('ehmr-doctor-specialty');
      localStorage.removeItem('ehmr-hospital-name');
      setToken(data.token);
      localStorage.setItem('ehmr-user', JSON.stringify(data.user));
      currentUser = data.user;
      closeStepModal(backdrop);
      await selectRole('resident');
    } catch (error) {
      errorEl.hidden = false;
      errorEl.textContent = error.message;
      toast(error.message, 'error');
    }
  };
  document.getElementById('pt-login-submit').addEventListener('click', submit);
  [email, password].forEach(input => input.addEventListener('keydown', event => {
    if (event.key === 'Enter') submit();
  }));
}
function openForgotPasswordModal(prefillEmail = '') {
  document.querySelector('.step-modal-backdrop')?.remove();
  const backdrop = document.createElement('div');
  backdrop.className = 'step-modal-backdrop';
  backdrop.addEventListener('click', event => {
    if (event.target === backdrop) closeStepModal(backdrop);
  });
  document.body.appendChild(backdrop);
  backdrop.innerHTML = `<div class="step-modal" role="dialog" aria-modal="true">
    <h2>Reset Password</h2>
    <div class="step-sub" id="forgot-sub">Enter your account email to receive a reset link</div>
    <label class="step-field-label" for="forgot-email">Email Address</label>
    <input type="email" id="forgot-email" placeholder="your@email.com"/>
    <div class="step-success" id="forgot-success" hidden></div>
    <div class="step-error" id="forgot-error" hidden></div>
    <button type="button" class="btn btn-primary step-full-btn" id="forgot-submit">Send Reset Link</button>
    <button type="button" class="step-link-btn" id="forgot-go-login">Back to Sign In</button>
  </div>`;
  const email = document.getElementById('forgot-email');
  const errorEl = document.getElementById('forgot-error');
  const successEl = document.getElementById('forgot-success');
  const subEl = document.getElementById('forgot-sub');
  const submitBtn = document.getElementById('forgot-submit');
  email.value = prefillEmail || '';
  document.getElementById('forgot-go-login').addEventListener('click', event => {
    event.preventDefault();
    closeStepModal(backdrop);
    openPatientLoginModal();
  });
  const submit = async () => {
    errorEl.hidden = true;
    successEl.hidden = true;
    try {
      const data = await apiFetch('/api/auth/forgot-password', {method:'POST', body:JSON.stringify({email:email.value})});
      toast(data.message || 'If an account exists, a reset link has been sent.');
      subEl.textContent = 'Reset link shared successfully. Please check your email inbox.';
      successEl.hidden = false;
      successEl.textContent = data.message || 'Reset link shared successfully.';
      email.disabled = true;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Reset Link Sent';
    } catch (error) {
      errorEl.hidden = false;
      errorEl.textContent = error.message;
    }
  };
  submitBtn.addEventListener('click', submit);
  email.addEventListener('keydown', event => {
    if (event.key === 'Enter') submit();
  });
  email.focus();
}
function openResetPasswordModal(token, emailValue = '') {
  document.querySelector('.step-modal-backdrop')?.remove();
  const backdrop = document.createElement('div');
  backdrop.className = 'step-modal-backdrop';
  document.body.appendChild(backdrop);
  backdrop.innerHTML = `<div class="step-modal" role="dialog" aria-modal="true">
    <h2>Create New Password</h2>
    <div class="step-sub">${emailValue ? `Resetting password for ${escapeHTML(emailValue)}` : 'Choose a new password for your account'}</div>
    <label class="step-field-label" for="reset-password">New Password</label>
    <input type="password" id="reset-password" placeholder="Min 8 characters"/>
    <label class="step-field-label" for="reset-confirm">Confirm Password</label>
    <input type="password" id="reset-confirm" placeholder="Confirm password"/>
    <div class="step-error" id="reset-error" hidden></div>
    <button type="button" class="btn btn-primary step-full-btn" id="reset-submit">Update Password</button>
    <button type="button" class="step-link-btn" id="reset-go-login">Back to Sign In</button>
  </div>`;
  const password = document.getElementById('reset-password');
  const confirm = document.getElementById('reset-confirm');
  const errorEl = document.getElementById('reset-error');
  document.getElementById('reset-go-login').addEventListener('click', event => {
    event.preventDefault();
    closeStepModal(backdrop);
    openPatientLoginModal();
  });
  const submit = async () => {
    errorEl.hidden = true;
    if (password.value.length < 8) {
      errorEl.hidden = false;
      errorEl.textContent = 'Password must be at least 8 characters';
      return;
    }
    if (password.value !== confirm.value) {
      errorEl.hidden = false;
      errorEl.textContent = 'Passwords must match';
      return;
    }
    try {
      const data = await apiFetch('/api/auth/reset-password', {method:'POST', body:JSON.stringify({token, password:password.value})});
      toast(data.message || 'Password updated. Please sign in.');
      window.history.replaceState({}, document.title, window.location.pathname);
      closeStepModal(backdrop);
      openPatientLoginModal();
    } catch (error) {
      errorEl.hidden = false;
      errorEl.textContent = error.message;
    }
  };
  document.getElementById('reset-submit').addEventListener('click', submit);
  [password, confirm].forEach(input => input.addEventListener('keydown', event => {
    if (event.key === 'Enter') submit();
  }));
  password.focus();
}
function openResetModalFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('resetToken');
  if (!token) return false;
  document.getElementById('app').style.display = 'none';
  document.getElementById('role-gate').style.display = '';
  openResetPasswordModal(token, params.get('email') || '');
  return true;
}
function openPatientRegisterModal() {
  openPatientLoginModal();
  document.getElementById('pt-tab-register')?.click();
}
function passwordStrength(password) {
  if (password.length < 8) return {width:'0%', color:'var(--surface-3)', label:'Weak'};
  const hasLetters = /[A-Za-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  if (hasLetters && hasNumbers && hasSpecial) return {width:'100%', color:'var(--green)', label:'Strong'};
  if (hasLetters && hasNumbers) return {width:'66%', color:'var(--amber)', label:'Fair'};
  return {width:'33%', color:'var(--amber)', label:'Weak'};
}
function bindPatientRegister(backdrop) {
  const errorEl = document.getElementById('pt-reg-error');
  const password = document.getElementById('pt-reg-password');
  const fill = document.getElementById('pw-strength-fill');
  const label = document.getElementById('pw-strength-label');
  document.getElementById('pt-go-login').addEventListener('click', event => {
    event.preventDefault();
    closeStepModal(backdrop);
    openPatientLoginModal();
  });
  password.addEventListener('input', () => {
    const strength = passwordStrength(password.value);
    fill.style.width = strength.width;
    fill.style.background = strength.color;
    label.textContent = strength.label;
  });
  document.getElementById('pt-reg-submit').addEventListener('click', async () => {
    errorEl.hidden = true;
    const payload = {
      name:document.getElementById('pt-reg-name').value.trim(),
      email:document.getElementById('pt-reg-email').value.trim(),
      mobile:document.getElementById('pt-reg-mobile').value.trim(),
      age:document.getElementById('pt-reg-age').value.trim(),
      password:document.getElementById('pt-reg-password').value,
      confirm:document.getElementById('pt-reg-confirm').value
    };
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email);
    const mobileValid = /^[0-9+\s-]{10,15}$/.test(payload.mobile);
    const ageNumber = Number(payload.age);
    let message = '';
    if (!payload.name || !payload.email || !payload.mobile || !payload.age || !payload.password || !payload.confirm) message = 'All fields required';
    else if (!emailValid) message = 'Email valid format';
    else if (!mobileValid) message = 'Mobile must be 10-15 chars, digits/+/space/dash only';
    else if (!Number.isInteger(ageNumber) || ageNumber < 1 || ageNumber > 120) message = 'Age must be a 1-120 integer';
    else if (payload.password.length < 8) message = 'Password must be at least 8 characters';
    else if (payload.password !== payload.confirm) message = 'Passwords must match';
    if (message) {
      errorEl.hidden = false;
      errorEl.textContent = message;
      return;
    }
    try {
      const data = await apiFetch('/api/auth/register', {
        method:'POST',
        body:JSON.stringify({name:payload.name, email:payload.email, password:payload.password, role:'viewer', age:payload.age, mobile:payload.mobile})
      });
      localStorage.removeItem('ehmr-doctor-id');
      localStorage.removeItem('ehmr-doctor-name');
      localStorage.removeItem('ehmr-doctor-specialty');
      localStorage.removeItem('ehmr-hospital-name');
      setToken(data.token);
      localStorage.setItem('ehmr-user', JSON.stringify(data.user));
      localStorage.setItem('ehmr-patient-profile', JSON.stringify({name:payload.name, email:payload.email, age:payload.age, mobile:payload.mobile}));
      currentUser = data.user;
      closeStepModal(backdrop);
      await selectRole('resident');
    } catch (error) {
      errorEl.hidden = false;
      errorEl.textContent = error.message;
    }
  });
}
function toggleAIConfig() { document.getElementById('ai-config')?.classList.toggle('open'); }
function healthScore(v) {
  if (!v.bp_s) return 0;
  let s = 100;
  if (v.spo2 && v.spo2 < 95) s -= (95 - v.spo2) * 5;
  if (v.spo2 && v.spo2 < 92) s -= 12;
  if (v.glucose && v.glucose > 140) s -= Math.min(24, Math.round((v.glucose - 140) / 5));
  if (v.bp_s > 130) s -= Math.min(22, Math.round((v.bp_s - 130) / 3));
  if (v.bp_d > 85) s -= Math.min(10, Math.round((v.bp_d - 85) / 2));
  if (v.pulse > 100 || v.pulse < 55) s -= 12;
  return Math.max(34, Math.min(98, s));
}
function healthAssessment(resId = 'R001') {
  const r = RESIDENTS.find(x => x.id === resId);
  const v = latestVitals(resId);
  const score = healthScore(v);
  const actions = [];
  const reasons = [];
  let visitWindow = 'Routine doctor review as scheduled';
  let visitNeeded = false;
  let urgency = 'Routine';

  if (!v.bp_s) {
    return {
      score:0,
      urgency:'Add Data',
      visitNeeded,
      visitWindow: 'Add vitals to calculate a health score',
      reasons: ['No current vitals available'],
      actions: [
        {icon:'💓', title:'Record vitals today', text:'Add BP, pulse, SpO2, temperature, glucose if relevant, and any symptoms.'},
        {icon:'🔬', title:'Upload reports', text:'Add lab reports when available so EHMR AI can build your health summary.'}
      ]
    };
  }

  if (v.spo2 && v.spo2 < 90) {
    reasons.push(`SpO2 ${v.spo2}% is critically low`);
    actions.push({icon:'🚨', title:'Urgent respiratory review', text:'Recheck SpO2 immediately and contact the doctor or emergency service if breathlessness, chest pain, confusion, or bluish lips are present.'});
    urgency = 'Urgent';
    visitWindow = 'Same-day urgent doctor review';
    visitNeeded = true;
  } else if (v.spo2 && v.spo2 < 92) {
    reasons.push(`SpO2 ${v.spo2}% is below the safe monitoring threshold`);
    actions.push({icon:'🫁', title:'Repeat oxygen check', text:'Repeat SpO2 after rest, check breathing effort, and keep oxygen/support history ready for the clinician.'});
    urgency = 'Priority';
    visitWindow = 'Doctor visit within 24 to 48 hours';
    visitNeeded = true;
  } else if (v.spo2 && v.spo2 < 95) {
    reasons.push(`SpO2 ${v.spo2}% is mildly reduced`);
    actions.push({icon:'🫁', title:'Watch oxygen trend', text:'Repeat SpO2 later today and report persistent readings below 95%, especially with COPD or breathlessness.'});
    urgency = 'Monitor';
    visitWindow = 'Doctor review within 3 days if it persists';
    visitNeeded = true;
  }

  if (v.bp_s >= 180 || v.bp_d >= 110) {
    reasons.push(`BP ${v.bp_s}/${v.bp_d} is in a crisis range`);
    actions.push({icon:'🚨', title:'Escalate blood pressure', text:'Repeat BP after 5 minutes of rest and seek urgent medical advice for severe headache, chest pain, weakness, or confusion.'});
    urgency = 'Urgent';
    visitWindow = 'Same-day urgent doctor review';
    visitNeeded = true;
  } else if (v.bp_s >= 160 || v.bp_d >= 100) {
    reasons.push(`BP ${v.bp_s}/${v.bp_d} is very elevated`);
    actions.push({icon:'❤️', title:'Priority BP review', text:'Repeat BP after rest, review salt intake and medication timing, and share the last 3 readings with the doctor.'});
    if (urgency !== 'Urgent') urgency = 'Priority';
    if (visitWindow !== 'Same-day urgent doctor review') visitWindow = 'Doctor visit within 24 to 48 hours';
    visitNeeded = true;
  } else if (v.bp_s >= 140 || v.bp_d >= 90) {
    reasons.push(`BP ${v.bp_s}/${v.bp_d} is elevated`);
    actions.push({icon:'❤️', title:'Monitor BP closely', text:'Repeat BP after rest and record morning/evening values for medication review.'});
    if (!visitNeeded) visitWindow = 'Doctor review within 7 days if repeated';
    urgency = urgency === 'Routine' ? 'Monitor' : urgency;
    visitNeeded = true;
  }

  if (v.glucose >= 250) {
    reasons.push(`Glucose ${v.glucose} mg/dL is very high`);
    actions.push({icon:'🩸', title:'Priority diabetes review', text:'Check hydration, confirm medication timing, and contact the doctor urgently if vomiting, drowsiness, abdominal pain, or very frequent urination occurs.'});
    if (urgency !== 'Urgent') urgency = 'Priority';
    if (visitWindow !== 'Same-day urgent doctor review') visitWindow = 'Doctor visit within 24 to 48 hours';
    visitNeeded = true;
  } else if (v.glucose >= 180) {
    reasons.push(`Glucose ${v.glucose} mg/dL is above target`);
    actions.push({icon:'🩸', title:'Review glucose control', text:'Log meals and medication timing, reduce refined carbs today, and arrange a diabetes review if repeated.'});
    if (!visitNeeded) visitWindow = 'Doctor review within 7 days if repeated';
    urgency = urgency === 'Routine' ? 'Monitor' : urgency;
    visitNeeded = true;
  } else if (r.diagnoses.some(d => d.toLowerCase().includes('diabetes')) && v.glucose > 140) {
    reasons.push(`Glucose ${v.glucose} mg/dL is mildly high for diabetes history`);
    actions.push({icon:'🥗', title:'Tighten diet log', text:'Track meals and repeat glucose as ordered before the next medication review.'});
  }

  if (v.pulse > 110 || v.pulse < 50) {
    reasons.push(`Pulse ${v.pulse} bpm is outside the preferred range`);
    actions.push({icon:'💗', title:'Recheck pulse', text:'Repeat pulse after rest and report dizziness, palpitations, chest discomfort, or fainting immediately.'});
    if (urgency === 'Routine') urgency = 'Monitor';
    if (!visitNeeded) visitWindow = 'Doctor review within 3 days if repeated';
    visitNeeded = true;
  }

  if (v.temp >= 38) {
    reasons.push(`Temperature ${v.temp}C suggests fever`);
    actions.push({icon:'🌡️', title:'Fever watch', text:'Encourage fluids if allowed, repeat temperature, and report fever with cough, urinary symptoms, confusion, or weakness.'});
    if (urgency === 'Routine') urgency = 'Monitor';
    if (!visitNeeded) visitWindow = 'Doctor review within 24 to 48 hours if fever persists';
    visitNeeded = true;
  }

  if (!actions.length) {
    actions.push({icon:'✅', title:'Continue routine monitoring', text:'Vitals are within the current care-plan range. Keep daily vitals and medications on schedule.'});
    actions.push({icon:'📅', title:'Next review', text:'Keep the planned doctor review unless new symptoms or abnormal readings appear.'});
  }

  if (score < 55 && urgency !== 'Urgent') {
    urgency = 'Priority';
    visitNeeded = true;
    visitWindow = 'Doctor visit within 24 to 48 hours';
  } else if (score < 70 && urgency === 'Routine') {
    urgency = 'Monitor';
    visitNeeded = true;
    visitWindow = 'Doctor review within 7 days if score stays below 70';
  }

  return {score, urgency, visitNeeded, visitWindow, reasons, actions: actions.slice(0, 4)};
}
function localAIInsight(resId = 'R001') {
  const r = RESIDENTS.find(x => x.id === resId);
  if (!r) {
    const assessment = healthAssessment(resId);
    return {
      riskLevel:'Low',
      score:assessment.score,
      insight:'No patient record is available for this account yet.',
      recommendation:'Add a resident or complete the patient profile before clinical insights are generated.',
      actions:assessment.actions
    };
  }
  const v = latestVitals(resId);
  const assessment = healthAssessment(resId);
  if (!v.bp_s && !hasClinicalData(resId)) {
    return {
      ...assessment,
      score:0,
      riskLevel:'Low',
      insight:'No health data has been added to this account yet.',
      recommendation:'Add your first vitals or lab report to generate a personalized EHMR AI insight.',
      actions:[
        {icon:'💓', title:'Add vitals', text:'Record BP, pulse, SpO2, temperature, and any notes when ready.'},
        {icon:'🔬', title:'Upload labs', text:'Add lab reports after tests are available for doctor review.'}
      ]
    };
  }
  const flags = [];
  if (v.spo2 && v.spo2 < 92) flags.push('Possible lung weakening');
  else if (v.spo2 && v.spo2 < 95) flags.push('Oxygen needs monitoring');
  if (v.glucose && v.glucose > 180) flags.push('Diabetes not controlled');
  else if (v.glucose && v.glucose > 150) flags.push('Glucose trending high');
  if (v.bp_s >= 140 || v.bp_d >= 90) flags.push('Cardiac risk');
  if (v.pulse > 105 || v.pulse < 55) flags.push('Heart rate abnormality');

  let risk = 'Low';
  if (flags.length || v.bp_s >= 130 || (v.glucose && v.glucose > 150) || (v.spo2 && v.spo2 < 95)) risk = 'Medium';
  if (flags.length >= 2 || v.bp_s >= 160 || (v.glucose && v.glucose > 220) || (v.spo2 && v.spo2 < 90)) risk = 'High';

  let insight = 'Vitals stable. Current readings are consistent with the active care plan.';
  let recommendation = `${assessment.visitWindow}. Continue daily manual vitals and medication adherence.`;
  if (flags.includes('Possible lung weakening')) {
    insight = 'Possible lung weakening. Oxygen saturation is below the preferred range for this senior patient.';
    recommendation = assessment.visitWindow + '. Repeat SpO2 check and assess breathlessness.';
  } else if (flags.includes('Diabetes not controlled')) {
    insight = 'Blood sugar is elevated against diabetes history, suggesting control needs review.';
    recommendation = assessment.visitWindow + '. Review meals and medication timing.';
  } else if (flags.includes('Cardiac risk')) {
    insight = 'Blood pressure is elevated for a patient with cardiovascular risk factors.';
    recommendation = assessment.visitWindow + '. Share readings with the doctor and repeat BP after rest.';
  } else if (r.condition === 'Recovery') {
    insight = 'Recovery improving. Vitals are stable and no major anomaly is detected.';
    recommendation = assessment.visitWindow + '. Continue physiotherapy, pain review, and routine vitals.';
  } else if (flags.length) {
    insight = `${flags.join(' · ')} detected from current vitals.`;
    recommendation = assessment.visitWindow + '. Increase observation frequency and notify the care team if the pattern persists.';
  }
  if (risk === 'High') {
    insight = `${flags.join(' · ')} detected. EHMR AI sees a combined high-risk pattern that needs faster clinical review.`;
    recommendation = assessment.visitWindow + '. Keep today’s vitals, glucose log, and medication list ready.';
  }
  return {...assessment, riskLevel:risk, insight, recommendation};
}
function doctorHistoryInsight(resId = 'R001') {
  const r = RESIDENTS.find(x => x.id === resId);
  const v = latestVitals(resId);
  const labs = (labsData[resId] || []).filter(l => l.status !== 'normal').slice(0, 3);
  const meds = (medsData[resId] || []).map(m => m.name).slice(0, 4);
  const active = localAIInsight(resId);
  const history = r.diagnoses.map(d => d.replace(/\s*\([^)]*\)/g, '')).join(', ');
  const labText = labs.length ? ` Abnormal labs: ${labs.map(l => `${l.test} ${l.result}${l.unit}`).join(', ')}.` : '';
  const medText = meds.length ? ` Current medicines include ${meds.join(', ')}.` : '';
  const trendText = v.bp_s ? ` Latest vitals show BP ${v.bp_s}/${v.bp_d}, pulse ${v.pulse}, SpO2 ${v.spo2}%, and glucose ${v.glucose || 'not recorded'}.` : '';
  return `${r.name} is a ${r.age}-year-old resident with history of ${history}.${medText}${labText}${trendText} Clinical interpretation: ${active.insight}`;
}
function normalizeRisk(x) {
  const v = String(x || '').toLowerCase();
  if (v.includes('high')) return 'High';
  if (v.includes('low')) return 'Low';
  return 'Medium';
}
function actionListHTML(actions = []) {
  return actions.map(a => `
    <div class="health-action">
      <span>${a.icon || '•'}</span>
      <div><strong>${a.title}</strong><div>${a.text}</div></div>
    </div>`).join('');
}
function renderAI(result, source = 'Rule engine insight') {
  const risk = normalizeRisk(result.riskLevel);
  const assessment = {...healthAssessment('R001'), ...result};
  const badge = document.getElementById('dash-ai-risk');
  if (!badge) return;
  badge.className = 'ai-risk ' + risk.toLowerCase();
  badge.textContent = risk.toUpperCase() + ' RISK';
  document.getElementById('dash-ai-insight').textContent = result.insight;
  document.getElementById('dash-ai-rec').textContent = result.recommendation;
  document.getElementById('dash-ai-score').textContent = assessment.score;
  document.getElementById('dash-ai-score-ring').style.setProperty('--score', assessment.score);
  const actionsEl = document.getElementById('dash-health-actions');
  if (actionsEl) {
    actionsEl.innerHTML = actionListHTML([
      {icon:assessment.visitNeeded ? '📅' : '✅', title:assessment.visitNeeded ? 'Doctor visit guidance' : 'Doctor visit status', text:assessment.visitWindow},
      ...(assessment.actions || []).slice(0, 2)
    ]) + (assessment.visitNeeded ? `<button class="btn btn-primary btn-sm" onclick="openAppointmentModal('R001','${assessment.urgency}','${assessment.visitWindow.replace(/'/g, "\\'")}')">Book Appointment</button>` : '');
  }
  document.getElementById('ai-source').textContent = source;
}
function trendPayload(resId = 'R001') {
  return (vitalsData[resId] || []).slice(0, 7).reverse();
}
function renderTrends(resId = 'R001') {
  const data = trendPayload(resId);
  const target = document.getElementById('dash-ai-trends');
  if (!target) return;
  if (!data.length) {
    target.innerHTML = `<div class="empty-state"><span class="empty-ico">💓</span><div class="empty-txt">No vitals trend yet</div><div class="empty-sub">Add vitals to build your 7-day chart.</div></div>`;
    return;
  }
  const latest = data[data.length - 1] || {};
  const width = 520, height = 260;
  const pad = {left: 52, right: 16, top: 34, bottom: 38};
  const minY = 80, maxY = 220;
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const x = i => pad.left + (data.length <= 1 ? plotW : (plotW / (data.length - 1)) * i);
  const y = value => pad.top + plotH - ((Math.max(minY, Math.min(maxY, value)) - minY) / (maxY - minY)) * plotH;
  const series = [
    {key:'spo2', label:'SpO₂ %', color:'#00897B'},
    {key:'pulse', label:'Pulse bpm', color:'#0288D1'},
    {key:'glucose', label:'Glucose mg/dL', color:'#FFB300'}
  ];
  const pathFor = key => data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${y(d[key] || minY).toFixed(1)}`).join(' ');
  const gridValues = [80, 110, 140, 170, 200, 220];
  target.innerHTML = `
    <svg class="trend-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="7-day vitals line chart">
      ${gridValues.map(v => `
        <line class="trend-grid" x1="${pad.left}" y1="${y(v).toFixed(1)}" x2="${width - pad.right}" y2="${y(v).toFixed(1)}"></line>
        <text class="trend-y-label" x="${pad.left - 10}" y="${(y(v) + 4).toFixed(1)}" text-anchor="end">${v}</text>
      `).join('')}
      <line class="trend-axis-line" x1="${pad.left}" y1="${pad.top}" x2="${pad.left}" y2="${height - pad.bottom}"></line>
      <line class="trend-axis-line" x1="${pad.left}" y1="${height - pad.bottom}" x2="${width - pad.right}" y2="${height - pad.bottom}"></line>
      <text class="trend-y-label" x="8" y="18">Value scale</text>
      ${data.map((d, i) => `<text class="trend-label" x="${x(i).toFixed(1)}" y="${height - 12}" text-anchor="middle">${fmt(d.t).split(' ')[0]}</text>`).join('')}
      ${series.map(s => `<path class="trend-line" d="${pathFor(s.key)}" stroke="${s.color}"></path>`).join('')}
      ${series.map(s => data.map((d, i) => `
        <circle class="trend-dot" cx="${x(i).toFixed(1)}" cy="${y(d[s.key] || minY).toFixed(1)}" r="4" fill="${s.color}">
          <title>${s.label}: ${d[s.key] || '-'}</title>
        </circle>
      `).join('')).join('')}
      ${series.map((s, i) => `
        <circle cx="${96 + i * 138}" cy="17" r="4" fill="${s.color}"></circle>
        <text class="trend-label" x="${105 + i * 138}" y="21">${s.label}</text>
      `).join('')}
    </svg>
    <div class="trend-summary">
      <div class="list-item"><strong style="color:var(--teal)">${latest.spo2 || '-'}%</strong><span>Latest SpO₂</span></div>
      <div class="list-item"><strong style="color:var(--sky)">${latest.pulse || '-'}</strong><span>Latest pulse bpm</span></div>
      <div class="list-item"><strong style="color:var(--amber)">${latest.glucose || '-'}</strong><span>Latest glucose mg/dL</span></div>
    </div>`;
}
function aiPatientPayload(resId = 'R001') {
  const r = RESIDENTS.find(x => x.id === resId);
  if (!r) return {name:'No resident selected', age:0, room:'', conditions:[], allergies:[], medications:[]};
  return {name:r.name, age:r.age, room:r.room, conditions:r.diagnoses, allergies:r.allergies, medications:(medsData[resId] || []).map(m => m.name)};
}
async function requestGroqInsight(resId = 'R001') {
  const c = aiConfig();
  const baseline = localAIInsight(resId);
  if (!c.proxyUrl && !c.apiKey) return null;
  const payload = {patient:aiPatientPayload(resId), vitals:trendPayload(resId), baseline};
  if (c.proxyUrl) {
    const res = await fetch(c.proxyUrl, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    if (!res.ok) throw new Error('Proxy failed: ' + res.status);
    return res.json();
  }
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method:'POST',
    headers:{'Content-Type':'application/json','Authorization':'Bearer ' + c.apiKey},
    body:JSON.stringify({
      model:c.model || DEFAULT_AI_MODEL,
      messages:[
        {role:'system', content:'You are an EHMR clinical decision-support assistant. Return only JSON with riskLevel, insight, recommendation, score, visitWindow, actions. score must be 0-100. actions must be an array of up to 4 objects with icon, title, text. Do not diagnose; provide cautious monitoring guidance for elderly care and clearly say when a doctor visit is needed.'},
        {role:'user', content:'Analyze these manual vitals and conditions for a senior dashboard demo:\n' + JSON.stringify(payload)}
      ],
      temperature:.2,
      max_completion_tokens:350
    })
  });
  if (!res.ok) throw new Error('Groq failed: ' + res.status);
  const data = await res.json();
  const text = data.choices?.[0]?.message?.content || '';
  const match = text.match(/\{[\s\S]*\}/);
  return JSON.parse(match ? match[0] : text);
}
async function runDashboardAI() {
  const base = localAIInsight('R001');
  renderAI(base, 'Analyzing...');
  try {
    const ai = await requestGroqInsight('R001');
    if (ai) renderAI({...base, ...ai, riskLevel:normalizeRisk(ai.riskLevel || ai.risk)}, 'Live Groq insight');
    else renderAI(base, 'Rule engine insight');
  } catch (e) {
    console.warn(e);
    renderAI({...base, insight:base.insight + ' Live AI is not connected, so EHMR used the local safety rules.'}, 'Rule engine fallback');
  }
}
function residentAIHTML(resId, result, source = 'Local insight') {
  const risk = normalizeRisk(result.riskLevel);
  const assessment = {...healthAssessment(resId), ...result};
  const riskClass = risk === 'High' ? 'badge-critical' : risk === 'Medium' ? 'badge-monitor' : 'badge-stable';
  return `<div class="card resident-ai-card">
    <div class="resident-ai-top">
      <div>
        <div class="resident-ai-title">AI Insight</div>
        <div style="font-size:11px;color:var(--g500);margin-top:2px">${source}</div>
      </div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <span class="badge ${riskClass}">${risk.toUpperCase()} RISK</span>
        <span class="resident-ai-score">Health Score ${assessment.score}/100</span>
      </div>
    </div>
    <div class="resident-ai-text">${result.insight}</div>
    <div class="resident-ai-rec"><strong>Recommendation:</strong> ${result.recommendation}</div>
    <div class="resident-ai-actions">
      ${actionListHTML([
        {icon:assessment.visitNeeded ? '📅' : '✅', title:assessment.visitNeeded ? 'Doctor visit guidance' : 'Doctor visit status', text:assessment.visitWindow},
        ...(assessment.actions || []).slice(0, 3)
      ])}
      ${assessment.visitNeeded ? `<button class="btn btn-primary btn-sm" onclick="openAppointmentModal('${resId}','${assessment.urgency}','${assessment.visitWindow.replace(/'/g, "\\'")}')">Book Appointment</button>` : ''}
    </div>
  </div>`;
}
async function loadResidentsFromApi() {
  try {
    const data = await apiFetch('/api/residents');
    const apiResidents = data.residents || [];
    if (currentRole === 'resident' && !isDemoPatientAccount()) {
      clearPatientClinicalDemoData();
      appointmentsData = [];
    }
    if (!apiResidents.length) {
      RESIDENTS = currentRole === 'resident' && currentUser ? [{
        id:'R001',
        name:currentUser.name || 'My Profile',
        initials:(currentUser.name || 'MP').split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase(),
        age:0,
        room:'Personal',
        blood:'',
        condition:'Stable',
        admitted:'',
        doctor:'Not assigned',
        caregiver:'Family',
        phone:'',
        emergency:{name:'Family',relation:'Emergency Contact',phone:''},
        diagnoses:[],
        allergies:[],
        color:'#00897B'
      }] : [];
      if (currentRole !== 'resident' || !isDemoPatientAccount()) clearPatientClinicalDemoData();
      return;
    }
    RESIDENTS = apiResidents.map((r, index) => ({
      id:currentRole === 'resident' && index === 0 ? 'R001' : r.residentId,
      apiId:r.residentId,
      name:r.name,
      initials:r.name.split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase(),
      age:r.age,
      room:r.room,
      blood:'',
      condition:'Stable',
      admitted:'',
      doctor:'Dr. Priya Nair',
      caregiver:'Sunita Rao',
      phone:'919876543210',
      emergency:{name:'Family',relation:'Emergency Contact',phone:''},
      diagnoses:r.conditions || [],
      allergies:(r.allergies || []).map(item => ({drug:item,severity:'moderate'})),
      color:'#00897B'
    }));
    apiResidents.forEach((r, index) => {
      const residentKey = currentRole === 'resident' && index === 0 ? 'R001' : r.residentId;
      if (r.vitals?.length) {
        vitalsData[residentKey] = r.vitals.map(v => ({
          t:v.date || new Date().toISOString(),
          bp_s:Number(String(v.bp || '').split('/')[0]) || 120,
          bp_d:Number(String(v.bp || '').split('/')[1]) || 80,
          pulse:v.hr,
          spo2:v.spo2,
          temp:v.temp,
          weight:v.weight,
          by:'MongoDB',
          notes:'Loaded from API'
        }));
      }
      if (r.medications?.length) medsData[residentKey] = r.medications.map((m, idx) => ({id:'M'+idx,name:`${m.name} ${m.dose || ''}`.trim(),route:'Oral',freq:m.frequency,indication:'',by:'API',times:[]}));
      if (r.labs?.length) labsData[residentKey] = r.labs.map((l, idx) => ({id:'L'+idx,test:l.test,result:l.result,unit:l.unit,ref:l.ref,status:l.status,date:(l.date || '').slice(0,10),by:'API'}));
      if (r.notes?.length) notesData[residentKey] = r.notes.map(n => ({shift:n.shift,date:(n.date || '').slice(0,10),author:n.author,role:'Staff',note:n.note,t:n.date || new Date().toISOString(),tasks:n.tasks || []}));
    });
  } catch (error) {
    console.warn(error);
    if (currentRole === 'resident' && !isDemoPatientAccount()) {
      clearPatientClinicalDemoData();
      appointmentsData = [];
    }
  }
}
async function loadHospitalsFromApi() {
  try {
    const data = await apiFetch('/api/hospitals');
    const apiHospitals = data.hospitals || [];
    HOSPITALS = apiHospitals.map(h => ({
      id:h.id,
      name:h.name,
      area:h.address || h.area,
      lat:h.lat,
      lng:h.lng,
      rating:h.rating,
      status:h.status === 'available' ? 'Available' : h.status === 'full' ? 'Full' : 'Unavailable',
      departments:h.departments || [],
      beds:{
        'General Ward':h.beds?.general || {total:0,available:0},
        ICU:h.beds?.icu || {total:0,available:0},
        'Private Room':h.beds?.private || {total:0,available:0}
      },
      doctors:(h.doctors || []).map(d => d.name)
    }));
    if (!HOSPITALS.find(h => h.id === selectedHospitalId) && HOSPITALS[0]) {
      selectedHospitalId = HOSPITALS[0].id;
      localStorage.setItem('ehmr-patient-hospital', selectedHospitalId);
    }
  } catch (error) {
    console.warn(error);
  }
}
async function runResidentAI(resId) {
  const slot = document.getElementById('resident-ai-' + resId);
  if (!slot) return;
  const base = localAIInsight(resId);
  slot.innerHTML = `<div class="card resident-ai-card"><div class="resident-ai-loading">Analyzing ${aiPatientPayload(resId).name}'s vitals with Groq...</div></div>`;
  try {
    const ai = await requestGroqInsight(resId);
    const result = ai ? {...base, ...ai, riskLevel:normalizeRisk(ai.riskLevel || ai.risk)} : base;
    slot.innerHTML = residentAIHTML(resId, result, ai ? 'Live Groq insight' : 'Local baseline insight');
    addAudit('AI', 'resident_insight', aiPatientPayload(resId).name);
  } catch (e) {
    console.warn(e);
    slot.innerHTML = residentAIHTML(resId, {...base, insight:base.insight + ' Live Groq is not connected, so EHMR used local safety rules.'}, 'Rule engine fallback');
    toast('AI insight used local fallback. Start server.js for Groq.', 'warning');
  }
}

// ===== PATIENT HOSPITAL MAP =====
function filteredHospitals() {
  const q = String(document.getElementById('hospital-search')?.value || '').toLowerCase();
  const dept = document.getElementById('hospital-dept')?.value || '';
  const bedType = document.getElementById('hospital-bed')?.value || '';
  const availableOnly = document.getElementById('hospital-available')?.checked;
  return HOSPITALS.filter(h => {
    const matchesText = !q || `${h.name} ${h.area}`.toLowerCase().includes(q);
    const matchesDept = !dept || h.departments.includes(dept);
    const matchesBed = !bedType || Boolean(h.beds[bedType]);
    const hasAvailability = !availableOnly || Object.values(h.beds).some(b => b.available > 0);
    return matchesText && matchesDept && matchesBed && hasAvailability;
  });
}
function loadHospitalMap() {
  const mapEl = document.getElementById('hospital-map');
  const listEl = document.getElementById('hospital-list');
  if (!mapEl || !listEl) return;
  const hospitals = filteredHospitals();
  document.getElementById('hospital-count').textContent = `${hospitals.length} result${hospitals.length === 1 ? '' : 's'}`;
  listEl.innerHTML = hospitals.map(h => hospitalCardHTML(h)).join('') || `<div class="empty-state"><span class="empty-ico">🏥</span><div class="empty-txt">No hospitals match these filters</div></div>`;

  if (window.L && !hospitalMapInstance) {
    hospitalMapInstance = L.map('hospital-map').setView([12.9716, 77.5946], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    }).addTo(hospitalMapInstance);
  }
  if (!hospitalMapInstance) return;
  setTimeout(() => hospitalMapInstance.invalidateSize(), 60);
  hospitalMarkers.forEach(marker => marker.remove());
  hospitalMarkers = hospitals.map(h => {
    const statusClass = h.status === 'Available' ? 'available' : h.status === 'Full' ? 'full' : 'unavailable';
    const marker = L.marker([h.lat, h.lng], {
      icon:L.divIcon({className:'', html:`<div class="hospital-marker ${statusClass}"></div>`, iconSize:[18,18], iconAnchor:[9,9]})
    }).addTo(hospitalMapInstance);
    marker.bindPopup(`<strong>${h.name}</strong><br>${h.area}<br>${h.status}<br><button onclick="selectHospital('${h.id}')">Select hospital</button>`);
    marker.on('click', () => selectHospital(h.id, false));
    return marker;
  });
  if (hospitalMarkers.length) {
    hospitalMapInstance.fitBounds(L.featureGroup(hospitalMarkers).getBounds().pad(0.18));
  }
  highlightSelectedHospital();
}
function useMyLocation() {
  if (!navigator.geolocation) {
    toast('Location is not supported in this browser', 'warning');
    return;
  }
  navigator.geolocation.getCurrentPosition(pos => {
    if (!hospitalMapInstance) loadHospitalMap();
    hospitalMapInstance?.setView([pos.coords.latitude, pos.coords.longitude], 13);
    L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(hospitalMapInstance).bindPopup('You are here').openPopup();
  }, () => toast('Unable to access your location', 'warning'));
}
function hospitalCardHTML(h) {
  const bedHtml = Object.entries(h.beds).map(([name, bed]) => `<span class="badge badge-gray">${name}: ${bed.available}/${bed.total}</span>`).join(' ');
  const deptHtml = h.departments.map(d => `<span class="badge badge-teal">${d}</span>`).join(' ');
  return `<div class="hospital-card" id="hospital-card-${h.id}">
    <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start">
      <div><h3>${h.name}</h3><div class="hospital-meta">${h.area} · Rating ${h.rating}</div></div>
      <span class="badge ${h.status === 'Available' ? 'badge-green' : 'badge-amber'}">${h.status}</span>
    </div>
    <div class="hospital-beds">${deptHtml}</div>
    <div class="hospital-beds">${bedHtml}</div>
    <div class="form-actions" style="margin-top:12px">
      <button class="btn btn-primary btn-sm" onclick="selectHospital('${h.id}')">Select Hospital</button>
      <button class="btn btn-outline btn-sm" onclick="bookHospitalAppointment('${h.id}')">Book Visit</button>
      <button class="btn btn-outline btn-sm" onclick="reserveHospitalBed('${h.id}')">Reserve Bed</button>
    </div>
  </div>`;
}
function selectHospital(id, showToast = true) {
  selectedHospitalId = id;
  localStorage.setItem('ehmr-patient-hospital', id);
  highlightSelectedHospital();
  const hospital = HOSPITALS.find(h => h.id === id);
  if (showToast && hospital) toast(`${hospital.name} selected`);
  if (document.querySelector('.hospital-finder') && hospitalMapInstance) {
    hospitalMapInstance.remove();
    hospitalMapInstance = null;
    hospitalMarkers = [];
  }
  document.querySelector('.hospital-finder')?.remove();
  if (hospital && authToken()) {
    apiFetch('/api/notifications/hospital', {
      method:'POST',
      body:JSON.stringify({
        hospitalId:id,
        type:'patient_registration',
        title:'New Patient Registration',
        message:`${currentUser?.name || 'A patient'} selected ${hospital.name} as their care hospital.`
      })
    }).catch(console.warn);
  }
  if (_currentPage === 'dashboard') loadDash();
  if (_currentPage === 'services') loadServices();
  if (currentRole === 'resident') nav('dashboard');
}
function highlightSelectedHospital() {
  document.querySelectorAll('.hospital-card').forEach(card => card.classList.remove('active'));
  const active = document.getElementById('hospital-card-' + selectedHospitalId);
  if (active) active.classList.add('active');
}
function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
async function showHospitalFinder() {
  await loadHospitalsFromApi();
  document.querySelector('.hospital-finder')?.remove();
  const overlay = document.createElement('div');
  overlay.className = 'hospital-finder';
  overlay.innerHTML = `
    <div class="finder-filters">
      <input id="hospital-search" placeholder="Search hospital, city, or area" oninput="loadHospitalMap()"/>
      <select id="hospital-dept" onchange="loadHospitalMap()">
        <option value="">All departments</option><option>General</option><option>Cardiology</option><option>Orthopedics</option><option>Pediatrics</option><option>Neurology</option><option>Geriatrics</option>
      </select>
      <select id="hospital-bed" onchange="loadHospitalMap()">
        <option value="">All bed types</option><option>General Ward</option><option>ICU</option><option>Private Room</option>
      </select>
      <label><input id="hospital-available" type="checkbox" onchange="loadHospitalMap()"/> Available only</label>
    </div>
    <div class="hospital-finder-shell">
      <div class="map-wrap"><div id="hospital-map"></div></div>
      <div class="hospital-finder-list">
        <div class="card" style="margin-bottom:12px">
          <div class="card-hdr" style="margin-bottom:0"><div><div class="card-ttl">Choose your hospital</div><div class="page-sub">This links appointments, services, and hospital notifications.</div></div><span class="badge badge-teal" id="hospital-count">0 results</span></div>
        </div>
        <div id="hospital-list"></div>
      </div>
    </div>`;
  document.body.insertBefore(overlay, document.getElementById('app'));
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      HOSPITALS.forEach(h => { h.distance = haversine(pos.coords.latitude, pos.coords.longitude, h.lat, h.lng); });
      HOSPITALS.sort((a, b) => (a.distance || 9999) - (b.distance || 9999));
      loadHospitalMap();
    }, () => {});
  }
  setTimeout(loadHospitalMap, 0);
}
function bookHospitalAppointment(id) {
  selectHospital(id, false);
  const hospital = HOSPITALS.find(h => h.id === id);
  openAppointmentModal('R001', 'Routine', `Doctor visit at ${hospital?.name || 'selected hospital'}`, id);
}
async function reserveHospitalBed(id) {
  selectHospital(id, false);
  const hospital = HOSPITALS.find(h => h.id === id);
  const bedLabel = prompt('Choose bed type: General Ward, ICU, or Private Room', 'General Ward');
  if (!bedLabel) return;
  const bedType = {'General Ward':'general', ICU:'icu', 'Private Room':'private'}[bedLabel] || 'general';
  try {
    const data = await apiFetch('/api/bookings', {
      method:'POST',
      body:JSON.stringify({
        hospitalId:id,
        type:'bed',
        bedType,
        date:todayISO(1),
        timeSlot:'09:00'
      })
    });
    toast(`Bed reserved. Booking ID: ${data.booking.bookingId}`);
    await loadHospitalsFromApi();
    loadHospitalMap();
  } catch (error) {
    toast(error.message, 'error');
  }
}

// ===== HOSPITAL BOOKING ALERTS =====
function hospitalBookingStatusBadge(status) {
  const normalized = String(status || 'confirmed').toLowerCase();
  const cls = normalized === 'completed' ? 'badge-stable'
    : normalized === 'cancelled' ? 'badge-critical'
    : normalized === 'rescheduled' ? 'badge-monitor'
    : 'badge-teal';
  return `<span class="badge ${cls}">${normalized.toUpperCase()}</span>`;
}
function hospitalBookingDate(booking) {
  return booking.date ? new Date(booking.date).toLocaleDateString('en-IN', {day:'2-digit',month:'short',year:'numeric'}) : '-';
}
function hospitalBookingPatient(booking) {
  return booking.userId?.name || booking.userId?.email || 'Patient';
}
function stopHospitalPolling() {
  if (hospitalPollInterval) clearInterval(hospitalPollInterval);
  hospitalPollInterval = null;
}
function startHospitalPolling() {
  stopHospitalPolling();
  hospitalPollInterval = setInterval(loadHospitalBookingAlerts, 30000);
  loadHospitalBookingAlerts();
}
function isHospitalScopedUser() {
  return Boolean(currentUser?.hospitalName || currentUser?.linkedHospitalId || currentUser?.hospitalId || currentUser?.role === 'hospital');
}
async function loadHospitalBookingAlerts() {
  if (!isHospitalScopedUser() || !authToken()) return {notifications:[], bookings:[]};
  try {
    const [notificationData, bookingData] = await Promise.all([
      apiFetch('/api/notifications/mine?unreadOnly=true'),
      apiFetch('/api/bookings')
    ]);
    const notifications = notificationData.notifications || [];
    const bookings = bookingData.bookings || [];
    const badge = document.getElementById('sb-alert-badge');
    if (badge) {
      const clinicalCount = Number(badge.dataset.clinicalCount || badge.textContent || 0);
      const total = clinicalCount + notifications.length;
      badge.textContent = total;
      const dot = document.getElementById('tb-dot');
      if (dot) dot.style.display = total ? '' : 'none';
    }
    return {notifications, bookings};
  } catch (error) {
    console.warn(error);
    return {notifications:[], bookings:[]};
  }
}
function removeHospitalDashboardExtras() {
  document.querySelectorAll('#hospital-incoming-bookings-card').forEach(el => el.remove());
}
function hospitalIncomingBookingsCardHTML(bookings) {
  return `<div class="card" id="hospital-incoming-bookings-card" data-roles="doctor">
    <div class="card-hdr">
      <div><div class="card-ttl">Incoming Bookings</div><div class="page-sub">${currentUser?.hospitalName || 'Linked hospital'} appointments and requests</div></div>
      <span class="badge badge-teal">${bookings.length} total</span>
    </div>
    <div class="tbl-wrap"><table>
      <thead><tr><th>Booking ID</th><th>Patient</th><th>Type</th><th>Dept</th><th>Date</th><th>Time</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>${bookings.map(hospitalBookingRowHTML).join('') || '<tr><td colspan="8">No incoming bookings yet</td></tr>'}</tbody>
    </table></div>
  </div>`;
}
async function loadHospitalBookingExtras(clinicalCount = 0) {
  removeHospitalDashboardExtras();
  if (!isHospitalScopedUser()) return;
  const {notifications, bookings} = await loadHospitalBookingAlerts();
  const badge = document.getElementById('sb-alert-badge');
  const totalAlerts = clinicalCount + notifications.length;
  if (badge) {
    badge.dataset.clinicalCount = clinicalCount;
    badge.textContent = totalAlerts;
  }
  const dot = document.getElementById('tb-dot');
  if (dot) dot.style.display = totalAlerts ? '' : 'none';
  const alertsEl = document.getElementById('dash-alerts');
  if (alertsEl && notifications.length) {
    const bookingRows = notifications.map(hospitalNotificationHTML).join('');
    if (clinicalCount) alertsEl.insertAdjacentHTML('beforeend', bookingRows);
    else alertsEl.innerHTML = bookingRows;
  }
  const alertCard = alertsEl?.closest('.card');
  if (alertCard) alertCard.insertAdjacentHTML('afterend', hospitalIncomingBookingsCardHTML(bookings));
  applyRoleAccess();
}
async function appendHospitalAlertsPage() {
  if (!isHospitalScopedUser() || _currentPage !== 'alerts') return;
  const {notifications} = await loadHospitalBookingAlerts();
  if (!notifications.length) return;
  const list = document.getElementById('alerts-list');
  if (list) list.insertAdjacentHTML('afterbegin', notifications.map(hospitalNotificationHTML).join(''));
  const sub = document.getElementById('alerts-sub');
  if (sub) sub.textContent = `${unacked().length + notifications.length} active · ${ALERTS.filter(a=>a.acked).length} acknowledged`;
}
function hospitalNotificationHTML(notification) {
  const booking = notification.bookingId || {};
  return `<div class="alert-row alert-info">
    <div class="alert-ico">🏥</div>
    <div class="alert-body">
      <div class="alert-title">New Booking · ${booking.bookingId || notification.title}</div>
      <div class="alert-msg">${notification.message}</div>
      <div class="alert-time">${fmt(notification.createdAt)}</div>
    </div>
    <button class="ack-btn" onclick="markHospitalNotificationRead('${notification._id}')">READ</button>
  </div>`;
}
function hospitalBookingRowHTML(booking) {
  return `<tr onclick="openSharedRecordDrawer('${booking._id}')" style="cursor:pointer">
    <td style="font-family:var(--mono);font-weight:900">${booking.bookingId}</td>
    <td>${hospitalBookingPatient(booking)}</td>
    <td>${booking.type}</td>
    <td>${booking.department || 'General'}</td>
    <td>${hospitalBookingDate(booking)}</td>
    <td>${booking.timeSlot || '-'}</td>
    <td>${hospitalBookingStatusBadge(booking.status)}</td>
    <td onclick="event.stopPropagation()">
      <div class="hospital-actions">
        <button class="btn btn-outline btn-sm" onclick="updateHospitalBookingStatus('${booking._id}','confirmed')">Confirm</button>
        <button class="btn btn-outline btn-sm" onclick="updateHospitalBookingStatus('${booking._id}','rescheduled')">Reschedule</button>
        <button class="btn btn-danger btn-sm" onclick="updateHospitalBookingStatus('${booking._id}','cancelled')">Cancel</button>
      </div>
    </td>
  </tr>`;
}
async function markHospitalNotificationRead(id) {
  await apiFetch(`/api/notifications/${id}/read`, {method:'PATCH'});
  toast('Notification marked as read');
  if (_currentPage === 'dashboard') loadDash();
  else loadAlerts();
}
async function updateHospitalBookingStatus(id, status) {
  await apiFetch(`/api/bookings/${id}/status`, {method:'PATCH', body:JSON.stringify({status})});
  toast(`Booking ${status}`);
  if (_currentPage === 'dashboard') loadDash();
}
async function completeHospitalBooking(id) {
  await updateHospitalBookingStatus(id, 'completed');
  closeDrawer();
}
async function openSharedRecordDrawer(bookingId) {
  try {
    const data = await apiFetch(`/api/shared-records/${bookingId}`);
    const record = data.record;
    const shared = record.sharedData || {};
    const booking = record.bookingId || {};
    openDrawer('Shared Patient Record', `${shared.name || record.patientUserId?.name || 'Patient'} · ${booking.bookingId || ''}`, `
      <div class="alert-row alert-info"><div class="alert-ico">🧾</div><div class="alert-body"><div class="alert-title">Read-only snapshot</div><div class="alert-msg">This record was shared for this booking only. Access expires when the appointment is completed.</div></div></div>
      <div class="card"><div class="card-ttl" style="margin-bottom:12px">Clinical Summary</div>
        <div class="info-row"><div class="info-lbl">Name</div><div class="info-val">${shared.name || '-'}</div></div>
        <div class="info-row"><div class="info-lbl">Age</div><div class="info-val">${shared.age || '-'}</div></div>
        <div class="info-row"><div class="info-lbl">Conditions</div><div class="info-val">${(shared.conditions || []).join(', ') || '-'}</div></div>
        <div class="info-row"><div class="info-lbl">Allergies</div><div class="info-val">${(shared.allergies || []).join(', ') || '-'}</div></div>
      </div>
      <div class="card"><div class="card-ttl" style="margin-bottom:12px">Current Medications</div>${(shared.currentMedications || []).map(m => `<div class="info-row"><div class="info-lbl">${m.name || 'Medicine'}</div><div class="info-val">${[m.dose, m.frequency].filter(Boolean).join(' · ') || 'As advised'}</div></div>`).join('') || '<div class="empty-state"><span class="empty-ico">💊</span><div class="empty-txt">No medications shared</div></div>'}</div>
      <div class="card"><div class="card-ttl" style="margin-bottom:12px">Recent Vitals</div>${(shared.recentVitals || []).map(v => `<div class="info-row"><div class="info-lbl">${v.date ? new Date(v.date).toLocaleDateString('en-IN') : 'Vitals'}</div><div class="info-val">BP ${v.bp || '-'} · Pulse ${v.hr || '-'} · SpO2 ${v.spo2 || '-'} · Temp ${v.temp || '-'}</div></div>`).join('') || '<div class="empty-state"><span class="empty-ico">💓</span><div class="empty-txt">No vitals shared</div></div>'}</div>
      <div class="card"><div class="card-ttl" style="margin-bottom:12px">Recent Labs</div>${(shared.recentLabs || []).map(l => `<div class="info-row"><div class="info-lbl">${l.test || 'Lab'}</div><div class="info-val">${l.result || '-'} ${l.unit || ''} · ${l.status || ''}</div></div>`).join('') || '<div class="empty-state"><span class="empty-ico">🔬</span><div class="empty-txt">No labs shared</div></div>'}</div>
      <button class="btn btn-primary" onclick="completeHospitalBooking('${booking._id}')">Mark Appointment Complete</button>`);
  } catch (error) {
    openDrawer('Shared Patient Record', 'Unavailable', `<div class="alert-row alert-warning"><div class="alert-ico">🔒</div><div class="alert-body"><div class="alert-title">Record unavailable</div><div class="alert-msg">${error.message}</div></div></div>`);
  }
}
function setAuthMode(mode) {
  authMode = mode;
  document.getElementById('login-tab').classList.toggle('active', mode === 'login');
  document.getElementById('register-tab').classList.toggle('active', mode === 'register');
  document.getElementById('auth-title').textContent = mode === 'login' ? 'Sign in to EHMR AI' : 'Create EHMR AI account';
  document.getElementById('auth-name').style.display = mode === 'register' ? '' : 'none';
  document.getElementById('auth-role').style.display = 'none';
  toggleHospitalRegisterFields();
}
function selectAuthRole(role) {
  const nextRole = role === 'admin' ? 'admin' : 'viewer';
  const roleInput = document.getElementById('auth-role');
  if (roleInput) roleInput.value = nextRole;
  document.querySelectorAll('.auth-role-option').forEach(button => {
    button.classList.toggle('active', button.dataset.authRole === nextRole);
  });
  toggleHospitalRegisterFields();
}
function toggleHospitalRegisterFields() {
  const fields = document.getElementById('hospital-register-fields');
  const role = document.getElementById('auth-role')?.value;
  const show = authMode === 'register' && ['admin','staff'].includes(role);
  fields?.classList.toggle('open', show);
}
function fillHospitalPinFromLocation() {
  const errorEl = document.getElementById('auth-error');
  if (!navigator.geolocation) {
    if (errorEl) errorEl.textContent = 'Location is not available in this browser.';
    return;
  }
  navigator.geolocation.getCurrentPosition(pos => {
    document.getElementById('hospital-lat').value = pos.coords.latitude.toFixed(6);
    document.getElementById('hospital-lng').value = pos.coords.longitude.toFixed(6);
    if (errorEl) errorEl.textContent = '';
  }, () => {
    if (errorEl) errorEl.textContent = 'Allow location access or enter latitude and longitude manually.';
  });
}
function fillDemoPatient() {
  setAuthMode('login');
  document.getElementById('auth-name').value = 'Demo Patient';
  document.getElementById('auth-email').value = 'patient@ehmr.com';
  document.getElementById('auth-password').value = 'Patient@123';
  selectAuthRole('viewer');
}
async function submitAuth() {
  const errorEl = document.getElementById('auth-error');
  errorEl.textContent = '';
  const payload = {
    name:document.getElementById('auth-name').value,
    email:document.getElementById('auth-email').value,
    password:document.getElementById('auth-password').value,
    role:document.getElementById('auth-role').value
  };
  if (authMode === 'register' && ['admin','staff'].includes(payload.role)) {
    Object.assign(payload, {
      hospitalName:document.getElementById('hospital-name').value,
      hospitalAddress:document.getElementById('hospital-address').value,
      hospitalDepartments:document.getElementById('hospital-departments').value,
      hospitalPhone:document.getElementById('hospital-phone').value,
      hospitalLat:document.getElementById('hospital-lat').value,
      hospitalLng:document.getElementById('hospital-lng').value
    });
  }
  try {
    const data = await apiFetch('/api/auth/' + authMode, {method:'POST', body:JSON.stringify(payload)});
    setToken(data.token);
    localStorage.setItem('ehmr-user', JSON.stringify(data.user));
    currentUser = data.user;
    RESIDENTS = [];
    appointmentsData = [];
    await selectRole(appRoleForUser(data.user.role));
  } catch (error) {
    errorEl.textContent = error.message;
  }
}
function appRoleForUser(role) {
  return role === 'viewer' ? 'resident' : 'doctor';
}
async function restoreSession() {
  const savedRole = localStorage.getItem('ehmr-role');
  if (savedRole === 'doctor' && localStorage.getItem('ehmr-doctor-name')) {
    await selectRole('doctor');
    return true;
  }
  if (savedRole !== 'resident' || !getToken()) return false;
  try {
    const json = await apiFetch('/api/auth/me');
    currentUser = json.data?.user || json.user;
    localStorage.setItem('ehmr-user', JSON.stringify(currentUser));
    RESIDENTS = [];
    appointmentsData = [];
    await selectRole('resident');
    return true;
  } catch (error) {
    clearToken();
    localStorage.removeItem('ehmr-role');
    return false;
  }
}
async function selectRole(role) {
  currentRole = role;
  localStorage.setItem('ehmr-role', role);

  if (role === 'doctor') {
    currentUser = {
      name:localStorage.getItem('ehmr-doctor-name') || 'Dr. Priya Nair',
      role:'doctor',
      specialty:localStorage.getItem('ehmr-doctor-specialty') || 'Physician',
      hospitalName:localStorage.getItem('ehmr-hospital-name') || ''
    };
  } else {
    currentUser = JSON.parse(localStorage.getItem('ehmr-user') || '{}');
  }

  document.body.classList.toggle('role-doctor', role === 'doctor');
  document.body.classList.toggle('role-resident', role === 'resident');
  document.getElementById('role-gate').style.display = 'none';
  document.getElementById('role-gate').classList.add('hidden');
  document.getElementById('app').style.display = 'flex';
  document.querySelector('.sb-uname').textContent = currentUser.name || '';
  document.querySelector('.sb-urole').textContent = role === 'doctor' ? (currentUser.specialty || 'Physician') : 'Patient';
  const hospitalLine = document.querySelector('.sb-uhospital');
  if (hospitalLine) hospitalLine.textContent = currentUser.hospitalName || '';
  applyRoleSidebar(role);
  updateAlertBadge();
  updateNewPatientBadge();
  await Promise.all([loadResidentsFromApi(), loadHospitalsFromApi(), fetchAppointments()]);
  loadDash();
  if (role === 'resident' && !localStorage.getItem('ehmr-patient-hospital')) {
    await showHospitalFinder();
    return;
  }
  nav('dashboard');
}
function resetRole() {
  clearToken();
  localStorage.removeItem('ehmr-doctor-id');
  localStorage.removeItem('ehmr-doctor-name');
  localStorage.removeItem('ehmr-doctor-specialty');
  localStorage.removeItem('ehmr-hospital-name');
  localStorage.removeItem('ehmr-user');
  localStorage.removeItem('ehmr-role');
  localStorage.removeItem('ehmr-patient-hospital');
  currentRole = '';
  currentUser = null;
  stopHospitalPolling();
  document.body.classList.remove('role-doctor', 'role-resident', 'role-hospital');
  document.getElementById('profile-menu')?.classList.remove('open');
  document.getElementById('app').style.display = 'none';
  document.querySelector('.hospital-finder')?.remove();
  document.getElementById('role-gate').style.display = '';
  document.getElementById('role-gate').classList.remove('hidden');
}
function logout() {
  resetRole();
  toast('Logged out');
}
function doLogout() {
  logout();
}
function toggleProfileMenu(event) {
  event?.stopPropagation();
  document.getElementById('profile-menu')?.classList.toggle('open');
}
document.addEventListener('click', event => {
  if (!event.target.closest('.tb-profile')) {
    document.getElementById('profile-menu')?.classList.remove('open');
  }
});
function roleAllows(el) {
  const roles = (el.dataset.roles || 'doctor,resident').split(',');
  return roles.includes(currentRole);
}
function applyRoleAccess() {
  if (!currentRole) return;
  const isDoctor = currentRole === 'doctor';
  document.body.classList.toggle('role-doctor', isDoctor);
  document.body.classList.toggle('role-resident', currentRole === 'resident');
  document.body.classList.toggle('role-hospital', Boolean(currentUser?.hospitalName));
  const displayName = currentUser?.name || (isDoctor ? 'Hospital Admin' : 'Patient');
  const initials = displayName.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase();
  document.querySelector('.sb-uname').textContent = displayName;
  document.querySelector('.sb-urole').textContent = isDoctor ? (currentUser?.specialty || currentUser?.hospitalName || 'Senior Physician') : 'Patient';
  const hospitalLine = document.querySelector('.sb-uhospital');
  if (hospitalLine) hospitalLine.textContent = isDoctor ? (currentUser?.hospitalName || '') : '';
  document.querySelector('.sb-av').textContent = initials;
  document.getElementById('tb-avatar').textContent = initials;
  document.querySelector('.tb-search input').placeholder = isDoctor ? 'Search patients, beds, meds...' : 'Search my records or hospitals...';
  document.getElementById('top-alert-btn').classList.toggle('role-hidden', !isDoctor);

  document.querySelectorAll('[data-roles]').forEach(el => {
    el.classList.toggle('role-hidden', !roleAllows(el));
  });
  document.querySelectorAll('.sb-item[data-page]').forEach(item => {
    const label = item.querySelector('.sb-item-txt');
    if (label && currentRole === 'resident' && item.dataset.residentLabel) label.textContent = item.dataset.residentLabel;
    if (label && currentRole === 'doctor' && item.dataset.doctorLabel) label.textContent = item.dataset.doctorLabel;
  });
}
function applyRoleSidebar(role) {
  currentRole = role || currentRole;
  applyRoleAccess();
}

// ===== NAVIGATION =====
const PAGE_TITLES = {
  dashboard:'Dashboard', residents:'Residents', alerts:'Alerts', 'new-patients':'New Patients',
  critical:'Doctor Critical Review', vitals:'Vitals Monitor', emar:'eMAR', notes:'Shift Notes',
  labs:'Lab Reports', timeline:'Clinical Timeline', careplan:'Care Plan',
  appointments:'Appointments', hospitals:'Find Hospitals', book:'Book & Schedule', ledger:'Ledger & Resources', services:'Services',
  insurance:'Insurance + ABHA', audit:'Audit Log'
};

let navHistory = [];
let _currentPage = 'dashboard';

function nav(page) {
  const navItem = document.querySelector(`.sb-item[data-page="${page}"]`);
  if (navItem && !roleAllows(navItem)) {
    toast('This section is not available in the selected role', 'warning');
    page = 'dashboard';
  }
  if (_currentPage && _currentPage !== page) navHistory.push(_currentPage);
  _currentPage = page;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById('page-' + page);
  if (el) el.classList.add('active');
  document.getElementById('tb-title').textContent = PAGE_TITLES[page] || page;
  document.querySelectorAll('.sb-item[data-page]').forEach(i =>
    i.classList.toggle('active', i.dataset.page === page)
  );
  const loaders = {
    dashboard: loadDash, residents: loadResidents, alerts: loadAlerts, 'new-patients': loadNewPatients, critical: loadCriticalReview,
    vitals: () => loadVitals(selVitals), emar: () => loadEmar(selEmar),
    notes: loadNotes, labs: () => loadLabs(selLabs),
    timeline: () => loadTimeline(selTl), careplan: loadCarePlan,
    appointments: loadAppts, hospitals: loadHospitalMap, book: loadBookSchedule, ledger: loadLedgerResources, services: loadServices,
    insurance: loadInsurance, audit: loadAudit
  };
  if (loaders[page]) loaders[page]();
}

function navBack() {
  // Special case: if resident detail is visible, close it instead
  const resDetail = document.getElementById('res-detail');
  if (resDetail && resDetail.style.display !== 'none' && _currentPage === 'residents') {
    closeResDetail();
    return;
  }
  const prev = navHistory.length ? navHistory.pop() : 'dashboard';
  // Don't push to history when going back
  _currentPage = prev;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById('page-' + prev);
  if (el) el.classList.add('active');
  document.getElementById('tb-title').textContent = PAGE_TITLES[prev] || prev;
  document.querySelectorAll('.sb-item[data-page]').forEach(i =>
    i.classList.toggle('active', i.dataset.page === prev)
  );
  const loaders = {
    dashboard: loadDash, residents: loadResidents, alerts: loadAlerts, 'new-patients': loadNewPatients, critical: loadCriticalReview,
    vitals: () => loadVitals(selVitals), emar: () => loadEmar(selEmar),
    notes: loadNotes, labs: () => loadLabs(selLabs),
    timeline: () => loadTimeline(selTl), careplan: loadCarePlan,
    appointments: loadAppts, book: loadBookSchedule, ledger: loadLedgerResources, services: loadServices,
    insurance: loadInsurance, audit: loadAudit
  };
  if (loaders[prev]) loaders[prev]();
}

function closeResDetail() {
  document.getElementById('res-detail').style.display = 'none';
  document.getElementById('res-list-view').style.display = '';
}

function toggleSidebar() {
  sidebarCollapsed = !sidebarCollapsed;
  document.getElementById('sidebar').classList.toggle('collapsed', sidebarCollapsed);
}

// ===== DASHBOARD =====
function loadDash() {
  document.getElementById('page-dashboard')?.classList.toggle('patient-dashboard', currentRole === 'resident');
  document.getElementById('dash-greeting').textContent = currentRole === 'resident' ? 'My EHMR AI Health Dashboard' : 'EHMR Admin Dashboard';
  if (_currentPage === 'dashboard') document.getElementById('tb-title').textContent = 'Dashboard';
  document.getElementById('dash-date').textContent =
    new Date().toLocaleDateString('en-IN', {weekday:'long',day:'numeric',month:'long',year:'numeric'});
  const isPatient = currentRole === 'resident';
  const heroTitle = document.getElementById('dash-ai-title');
  const heroSub = document.getElementById('dash-ai-sub');
  const trendTitle = document.getElementById('dash-trends-title');
  const trendBadge = document.getElementById('dash-trends-badge');
  const primaryId = isPatient ? 'R001' : (RESIDENTS[0]?.id || 'R001');
  const primaryName = RESIDENTS.find(r => r.id === primaryId)?.name || 'No resident selected';
  if (heroTitle) heroTitle.textContent = isPatient ? `✨ My AI Health Summary · ${primaryName}` : `✨ Clinical AI Insight Engine · ${primaryName}`;
  if (heroSub) heroSub.textContent = isPatient
    ? 'Simple explanation from my latest vitals, medicines, and care history'
    : 'Groq-powered risk interpretation from manual vitals and EHMR history';
  if (trendTitle) trendTitle.textContent = isPatient ? 'My 7-Day Vitals Trend' : '7-Day Vitals Trend';
  if (trendBadge) trendBadge.textContent = isPatient ? 'My records' : 'Manual records';
  loadAIConfig();
  renderTrends(primaryId);
  renderAI(localAIInsight(primaryId));
  const activeNames = new Set(RESIDENTS.map(r => r.name));
  const ua = unacked().filter(a => activeNames.has(a.res));
  const sidebarAlertBadge = document.getElementById('sb-alert-badge');
  if (sidebarAlertBadge) {
    sidebarAlertBadge.dataset.clinicalCount = ua.length;
    sidebarAlertBadge.textContent = ua.length;
  }
  document.getElementById('tb-dot').style.display = ua.length ? '' : 'none';
  let given = 0, total = 0;
  const medsScope = isPatient ? (medsData[primaryId] || []) : RESIDENTS.flatMap(r => medsData[r.id] || []);
  medsScope.forEach(m => {
    total += m.times.length;
    given += m.times.filter(t => t.status === 'given').length;
  });
  const primaryAssessment = healthAssessment(primaryId);
  const avgHealthScore = RESIDENTS.length
    ? Math.round(RESIDENTS.reduce((sum, r) => sum + healthAssessment(r.id).score, 0) / RESIDENTS.length)
    : 0;
  const nextAppt = appointmentsData
    .filter(a => a.patientId === primaryId && appointmentStatus(a) === 'Scheduled')
    .sort((a,b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`))[0];
  const readiness = coverageReadiness(primaryId);
  document.getElementById('dash-stats').innerHTML = isPatient ? `
    <div class="stat-card" onclick="nav('appointments')">
      <span class="stat-ico">📅</span>
      <div class="stat-val" style="color:var(--teal-d)">${nextAppt ? displayDate(nextAppt.date).split(' ').slice(0,2).join(' ') : 'None'}</div>
      <div class="stat-lbl">Next Doctor Visit</div><div class="stat-sub">${nextAppt ? `${displayTime(nextAppt.time)} · ${nextAppt.doctorName}` : 'No appointment scheduled'}</div>
    </div>
    <div class="stat-card" onclick="nav('careplan')">
      <span class="stat-ico">🧭</span>
      <div class="stat-val" style="color:${primaryAssessment.score < 70 ? 'var(--coral)' : primaryAssessment.score < 85 ? 'var(--amber)' : 'var(--green)'}">${primaryAssessment.score}</div>
      <div class="stat-lbl">My Health Score</div><div class="stat-sub">${primaryAssessment.visitWindow}</div>
    </div>
    <div class="stat-card" onclick="nav('residents')">
      <span class="stat-ico">💊</span>
      <div class="stat-val" style="color:var(--amber)">${given}/${total}</div>
      <div class="stat-lbl">My Medicines</div><div class="stat-sub">Doses completed today</div>
    </div>
    <div class="stat-card" onclick="nav('insurance')">
      <span class="stat-ico">🛡️</span>
      <div class="stat-val" style="color:${readiness.score >= 80 ? 'var(--green)' : readiness.score >= 60 ? 'var(--amber)' : 'var(--coral)'}">${readiness.score}%</div>
      <div class="stat-lbl">ABHA + Insurance</div><div class="stat-sub">Visit readiness file</div>
    </div>` : `
    <div class="stat-card" onclick="nav('residents')">
      <span class="stat-ico">👥</span>
      <div class="stat-val" style="color:var(--teal-d)">${RESIDENTS.length}</div>
      <div class="stat-lbl">Active Residents</div><div class="stat-sub">${isHospitalScopedUser() ? 'At this hospital' : 'All facilities'}</div>
    </div>
    <div class="stat-card" onclick="nav('alerts')">
      <span class="stat-ico">🔔</span>
      <div class="stat-val" style="color:var(--coral)">${ua.length}</div>
      <div class="stat-lbl">Pending Alerts</div><div class="stat-sub">${ua.filter(a=>a.sev==='critical').length} critical</div>
    </div>
    <div class="stat-card" onclick="nav('emar')">
      <span class="stat-ico">💊</span>
      <div class="stat-val" style="color:var(--amber)">${given}/${total}</div>
      <div class="stat-lbl">Meds Given</div><div class="stat-sub">Today · ${isHospitalScopedUser() ? 'hospital patients' : 'all patients'}</div>
    </div>
    <div class="stat-card" onclick="nav('critical')">
      <span class="stat-ico">🧭</span>
      <div class="stat-val" style="color:${avgHealthScore < 70 ? 'var(--coral)' : avgHealthScore < 85 ? 'var(--amber)' : 'var(--green)'}">${avgHealthScore}</div>
      <div class="stat-lbl">Avg Health Score</div><div class="stat-sub">Across monitored residents</div>
    </div>`;
  document.getElementById('dash-alerts').innerHTML = ua.slice(0, 3).map(a => `
    <div class="alert-row alert-${a.sev==='critical'?'critical':a.sev==='warning'?'warning':'info'}">
      <div class="alert-ico">${a.sev==='critical'?'🚨':a.sev==='warning'?'⚠️':'ℹ️'}</div>
      <div class="alert-body">
        <div class="alert-title">${a.res} · ${a.room}</div>
        <div class="alert-msg">${a.msg}</div>
        <div class="alert-time">${fmt(a.t)}</div>
      </div>
      <button class="ack-btn" onclick="ackAlert('${a.id}');loadDash()">ACK</button>
    </div>`).join('') || `<div class="empty-state"><span class="empty-ico">✅</span><div class="empty-txt">No active alerts</div></div>`;
  const dashResidents = currentRole === 'resident' ? RESIDENTS.filter(r => r.id === primaryId) : RESIDENTS;
  const titleEl = document.getElementById('dash-residents-title');
  const btnEl = document.getElementById('dash-residents-btn');
  if (titleEl) titleEl.textContent = currentRole === 'resident' ? 'My Health Profile' : 'Residents';
  if (btnEl) btnEl.textContent = currentRole === 'resident' ? 'Open Profile' : 'View All';
  document.getElementById('dash-residents').innerHTML = dashResidents.map(r => `
    <div class="r-row" onclick="nav('residents');setTimeout(()=>viewRes('${r.id}'),80)">
      <div class="r-av" style="background:${r.color}">${r.initials}</div>
      <div style="flex:1"><div class="r-name">${r.name}</div><div class="r-meta">Room ${r.room} · Age ${r.age}</div></div>
      ${condBadge(r.condition)}<span class="r-chevron">›</span>
    </div>`).join('') || `<div class="empty-state"><span class="empty-ico">SR</span><div class="empty-txt">No resident records yet</div></div>`;
  const medRows = (isPatient ? dashResidents : RESIDENTS).map(r => {
    const meds = medsData[r.id] || [];
    const medTotal = meds.reduce((sum, m) => sum + m.times.length, 0);
    const medGiven = meds.reduce((sum, m) => sum + m.times.filter(t => t.status === 'given').length, 0);
    const pct = medTotal ? Math.round((medGiven / medTotal) * 100) : 0;
    return {name:r.name.split(' ')[0], pct, value:`${medGiven}/${medTotal}`};
  });
  document.getElementById('dash-meds').innerHTML = medRows.map(row => `
    <div class="chart-row">
      <div class="chart-lbl">${row.name}</div>
      <div class="bar-track"><div class="bar-fill" style="width:${row.pct}%;background:${row.pct===100?'var(--green)':'var(--amber)'}"></div></div>
      <div class="chart-val" style="color:${row.pct===100?'var(--green)':'var(--amber)'}">${row.value}</div>
    </div>`).join('') || `<div class="empty-state"><span class="empty-ico">RX</span><div class="empty-txt">No medication records yet</div></div>`;
  applyRoleAccess();
  if (currentRole === 'doctor' && isHospitalScopedUser()) {
    loadHospitalBookingExtras(ua.length);
    if (!hospitalPollInterval) startHospitalPolling();
  } else {
    removeHospitalDashboardExtras();
    stopHospitalPolling();
  }
  addAudit('VIEW', 'dashboard', 'Dashboard loaded');
}

// ===== RESIDENTS =====
function loadResidents() {
  document.getElementById('res-detail').style.display = 'none';
  document.getElementById('res-list-view').style.display = '';
  if (currentRole === 'resident') {
    viewRes('R001');
    return;
  }
  renderResList();
}
function filterRes(f, el) {
  resFilter = f;
  document.querySelectorAll('#cond-filters button').forEach(b => b.className = 'btn btn-outline btn-sm');
  el.className = 'btn btn-primary btn-sm';
  renderResList();
}
function renderResList() {
  const filtered = resFilter === 'All' ? RESIDENTS : RESIDENTS.filter(r => r.condition === resFilter);
  document.getElementById('res-list').innerHTML = filtered.map(r => `
    <div class="card" style="cursor:pointer" onclick="viewRes('${r.id}')">
      <div style="display:flex;align-items:center;gap:12px">
        <div class="r-av" style="background:${r.color};width:50px;height:50px;border-radius:14px;font-size:15px">${r.initials}</div>
        <div style="flex:1">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px">
            <span style="font-size:16px;font-weight:900;color:var(--g800)">${r.name}</span>
            ${condBadge(r.condition)}
            <span class="badge ${healthAssessment(r.id).score < 70 ? 'badge-critical' : healthAssessment(r.id).score < 85 ? 'badge-monitor' : 'badge-stable'}">Score ${healthAssessment(r.id).score}</span>
            ${unacked().find(a=>a.res===r.name)?'<span class="badge badge-critical">Alert</span>':''}
          </div>
          <div style="font-size:12px;color:var(--g500)">Room ${r.room} · Age ${r.age} · ${r.blood}</div>
          <div style="font-size:11px;color:var(--g400);margin-top:3px">${r.diagnoses[0]}${r.diagnoses.length>1?` +${r.diagnoses.length-1} more`:''}</div>
        </div>
        <span style="font-size:22px;color:var(--g300)">›</span>
      </div>
    </div>`).join('') || `<div class="empty-state"><span class="empty-ico">SR</span><div class="empty-txt">No residents match filter</div></div>`;
}
function viewRes(id) {
  const r = RESIDENTS.find(x => x.id === id);
  const v = (vitalsData[id] || [])[0] || {};
  document.getElementById('res-list-view').style.display = 'none';
  const dv = document.getElementById('res-detail'); dv.style.display = '';
  const pa = unacked().filter(a => a.res === r.name).length;
  dv.innerHTML = `
    <button class="btn btn-outline btn-sm" onclick="closeResDetail()" style="margin-bottom:14px;min-height:38px;gap:4px">← Back to list</button>
    <div class="res-detail-hdr">
      <div class="res-detail-av">${r.initials}</div>
      <div>
        <div class="res-detail-name">${r.name}</div>
        <div class="res-detail-meta">Room ${r.room} · Age ${r.age} · ${r.blood} · Admitted ${r.admitted}</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px">${condBadge(r.condition)}${pa?`<span class="badge badge-critical">${pa} Alert${pa>1?'s':''}</span>`:''}</div>
      </div>
    </div>
    <div class="res-actions">
      <button class="btn btn-primary btn-sm" onclick="runResidentAI('${id}')">AI Insight</button>
      <button class="btn btn-outline btn-sm" onclick="selVitals='${id}';nav('vitals')">Vitals</button>
      <button class="btn btn-outline btn-sm" onclick="selEmar='${id}';nav('emar')">eMAR</button>
      <button class="btn btn-outline btn-sm" onclick="selLabs='${id}';nav('labs')">Labs</button>
      <button class="btn btn-outline btn-sm" onclick="selTl='${id}';nav('timeline')">Timeline</button>
      <button class="btn btn-primary btn-sm" onclick="openAppointmentModal('${id}','${localAIInsight(id).urgency}','${localAIInsight(id).visitWindow.replace(/'/g, "\\'")}')">Book Appointment</button>
    </div>
    <div id="resident-ai-${id}">${residentAIHTML(id, localAIInsight(id), 'Local baseline insight')}</div>
    <div class="card">
      <div class="card-ttl" style="margin-bottom:12px">Clinical Info</div>
      <div class="info-row"><div class="info-lbl">Attending Doctor</div><div class="info-val">${r.doctor}</div></div>
      <div class="info-row"><div class="info-lbl">Primary Caregiver</div><div class="info-val">🤝 ${r.caregiver}</div></div>
      <div class="info-row"><div class="info-lbl">Diagnoses</div><div><div class="pill-wrap">${r.diagnoses.map(d=>`<span class="pill">${d}</span>`).join('')}</div></div></div>
      <div class="info-row"><div class="info-lbl">Allergies</div><div><div class="pill-wrap">${allergiesFor(r).map(a=>`<span class="pill pill-allergy">${a.drug} (${a.severity})</span>`).join('')}</div></div></div>
    </div>
    ${v.bp_s ? `<div class="card">
      <div class="card-ttl" style="margin-bottom:12px">Latest Vitals · ${fmt(v.t)}</div>
      <div class="vitals-grid">
        <div class="vital-box"><div class="vital-lbl">Blood Pressure</div><div class="vital-val ${v.bp_s>=140?'vital-warn':'vital-ok'}">${v.bp_s}/${v.bp_d}</div><div class="vital-unit">mmHg</div></div>
        <div class="vital-box"><div class="vital-lbl">Pulse</div><div class="vital-val ${v.pulse>100?'vital-warn':'vital-ok'}">${v.pulse}</div><div class="vital-unit">bpm</div></div>
        <div class="vital-box"><div class="vital-lbl">SpO₂</div><div class="vital-val ${v.spo2<94?'vital-crit':v.spo2<96?'vital-warn':'vital-ok'}">${v.spo2}%</div><div class="vital-unit">Oxygen</div></div>
        ${v.glucose?`<div class="vital-box"><div class="vital-lbl">Glucose</div><div class="vital-val ${v.glucose>150?'vital-warn':'vital-ok'}">${v.glucose}</div><div class="vital-unit">mg/dL</div></div>`:''}
        ${v.temp?`<div class="vital-box"><div class="vital-lbl">Temp</div><div class="vital-val ${v.temp>37.5?'vital-warn':'vital-ok'}">${v.temp}°C</div><div class="vital-unit">Celsius</div></div>`:''}
        ${v.weight?`<div class="vital-box"><div class="vital-lbl">Weight</div><div class="vital-val vital-ok">${v.weight} kg</div><div class="vital-unit">Body weight</div></div>`:''}
      </div>
    </div>` : ''}
    <div class="card">
      <div class="card-ttl" style="margin-bottom:12px">Emergency Contact</div>
      <div class="info-row"><div class="info-lbl">Name</div><div class="info-val">${r.emergency.name} (${r.emergency.relation})</div></div>
      <div class="info-row"><div class="info-lbl">Phone</div><div class="info-val">${r.emergency.phone}</div></div>
    </div>`;
  addAudit('VIEW', 'residents', r.name);
}

// ===== ALERTS =====
function loadAlerts() {
  const ua = unacked();
  document.getElementById('alerts-sub').textContent = `${ua.length} active · ${ALERTS.filter(a=>a.acked).length} acknowledged`;
  const badge = document.getElementById('sb-alert-badge');
  if (badge) {
    badge.dataset.clinicalCount = ua.length;
    badge.textContent = ua.length;
  }
  document.getElementById('tb-dot').style.display = ua.length ? '' : 'none';
  document.getElementById('alerts-list').innerHTML = ALERTS.map(a => `
    <div class="alert-row alert-${a.sev==='critical'?'critical':a.sev==='warning'?'warning':'info'}" style="opacity:${a.acked?.55:1}">
      <div class="alert-ico">${a.sev==='critical'?'🚨':a.sev==='warning'?'⚠️':'ℹ️'}</div>
      <div class="alert-body">
        <div class="alert-title">${a.res} · Room ${a.room}</div>
        <div class="alert-msg">${a.msg}</div>
        <div class="alert-time">${fmt(a.t)} · ${a.type.toUpperCase()}</div>
      </div>
      ${!a.acked
        ? `<button class="ack-btn" onclick="ackAlert('${a.id}');loadAlerts()">ACK</button>`
        : `<span style="font-size:11px;color:var(--green);font-weight:800">✓ Acked</span>`}
    </div>`).join('');
}
function ackAlert(id) {
  const a = ALERTS.find(x => x.id === id);
  if (a) { a.acked = true; addAudit('UPDATE', 'alerts', `Acked: ${a.msg.slice(0, 50)}`); }
  document.getElementById('sb-alert-badge').textContent = unacked().length;
  toast('Alert acknowledged');
}
function ackAll() { ALERTS.forEach(a => a.acked = true); loadAlerts(); toast('All alerts acknowledged'); }
async function loadNewPatients() {
  const target = document.getElementById('new-patients-content');
  if (!target) return;
  target.innerHTML = `<div class="card"><div class="page-sub">Loading registration requests...</div></div>`;
  try {
    const [notificationsData, bookingsData] = await Promise.all([
      apiFetch('/api/notifications/mine'),
      apiFetch('/api/bookings')
    ]);
    const notifications = (notificationsData.notifications || []).filter(n =>
      /patient|registration|booking/i.test(`${n.type} ${n.title} ${n.message}`)
    );
    const bookings = bookingsData.bookings || [];
    document.getElementById('sb-newpatient-badge').style.display = notifications.filter(n => !n.read).length ? '' : 'none';
    document.getElementById('sb-newpatient-badge').textContent = notifications.filter(n => !n.read).length;
    target.innerHTML = `
      <div class="grid-2">
        <div class="card"><div class="card-hdr"><div class="card-ttl">Registration Notifications</div><span class="badge badge-teal">${notifications.length}</span></div>
          ${notifications.map(n => `<div class="alert-row ${n.read ? 'alert-info' : 'alert-success'}"><div class="alert-ico">🆕</div><div class="alert-body"><div class="alert-title">${n.title}</div><div class="alert-msg">${n.message}</div><div class="alert-time">${fmt(n.createdAt)}</div></div>${!n.read ? `<button class="ack-btn" onclick="markHospitalNotificationRead('${n._id}')">ACK</button>` : ''}</div>`).join('') || '<div class="empty-state"><div class="empty-txt">No new patient notifications</div></div>'}
        </div>
        <div class="card"><div class="card-hdr"><div class="card-ttl">Recent Bookings</div><span class="badge badge-sky">${bookings.length}</span></div>
          ${bookings.slice(0, 8).map(b => `<div class="list-item"><strong>${b.userId?.name || 'Patient'} · ${b.type}</strong><span>${b.department || 'General'} · ${b.status} · ${b.bookingId || ''}</span></div>`).join('') || '<div class="empty-state"><div class="empty-txt">No bookings yet</div></div>'}
        </div>
      </div>`;
  } catch (error) {
    target.innerHTML = `<div class="card"><div class="alert-row alert-warning"><div class="alert-ico">!</div><div class="alert-body"><div class="alert-title">Using local mode</div><div class="alert-msg">New patient notifications appear here when the backend is running.</div></div></div></div>`;
  }
}

// ===== CRITICAL REVIEW =====
function loadCriticalReview() {
  const rows = RESIDENTS.map(r => {
    const insight = localAIInsight(r.id);
    const v = latestVitals(r.id);
    const activeAlerts = unacked().filter(a => a.res === r.name);
    return {r, insight, v, activeAlerts};
  }).filter(x => x.insight.riskLevel !== 'Low' || x.activeAlerts.length);

  document.getElementById('critical-content').innerHTML = `
    <div class="grid-3" style="margin-bottom:14px">
      <div class="stat-card"><span class="stat-ico">🚨</span><div class="stat-val" style="color:var(--coral)">${rows.filter(x=>x.insight.riskLevel==='High').length}</div><div class="stat-lbl">High Risk</div><div class="stat-sub">Doctor-only escalation list</div></div>
      <div class="stat-card"><span class="stat-ico">⚠️</span><div class="stat-val" style="color:var(--amber)">${rows.filter(x=>x.insight.riskLevel==='Medium').length}</div><div class="stat-lbl">Needs Review</div><div class="stat-sub">Vitals or alerts need attention</div></div>
      <div class="stat-card"><span class="stat-ico">🧠</span><div class="stat-val" style="color:var(--teal-d)">AI</div><div class="stat-lbl">Clinical Context</div><div class="stat-sub">Sensitive doctor view</div></div>
    </div>
    ${rows.map(({r, insight, v, activeAlerts}) => `
      <div class="card">
        <div class="card-hdr">
          <div class="card-ttl">${r.name} · Room ${r.room}</div>
          <span class="badge ${insight.riskLevel==='High'?'badge-critical':'badge-monitor'}">${insight.riskLevel.toUpperCase()} RISK</span>
        </div>
        <div class="vitals-grid" style="margin-bottom:12px">
          <div class="vital-box"><div class="vital-lbl">BP</div><div class="vital-val ${v.bp_s>=140?'vital-warn':'vital-ok'}">${v.bp_s || '—'}/${v.bp_d || '—'}</div><div class="vital-unit">mmHg</div></div>
          <div class="vital-box"><div class="vital-lbl">Pulse</div><div class="vital-val ${v.pulse>100?'vital-warn':'vital-ok'}">${v.pulse || '—'}</div><div class="vital-unit">bpm</div></div>
          <div class="vital-box"><div class="vital-lbl">SpO2</div><div class="vital-val ${v.spo2<94?'vital-crit':'vital-ok'}">${v.spo2 || '—'}%</div><div class="vital-unit">oxygen</div></div>
          <div class="vital-box"><div class="vital-lbl">Glucose</div><div class="vital-val ${v.glucose>180?'vital-crit':v.glucose>150?'vital-warn':'vital-ok'}">${v.glucose || '—'}</div><div class="vital-unit">mg/dL</div></div>
        </div>
        <div class="alert-row ${insight.riskLevel==='High'?'alert-critical':'alert-warning'}" style="margin-bottom:10px">
          <div class="alert-ico">✨</div>
          <div class="alert-body"><div class="alert-title">Doctor-only AI clinical note from patient history</div><div class="alert-msg">${doctorHistoryInsight(r.id)} Recommendation: ${insight.recommendation}</div></div>
        </div>
        ${activeAlerts.map(a => `<div class="alert-row alert-${a.sev==='critical'?'critical':'warning'}"><div class="alert-ico">${a.sev==='critical'?'🚨':'⚠️'}</div><div class="alert-body"><div class="alert-title">${a.type.toUpperCase()} alert</div><div class="alert-msg">${a.msg}</div><div class="alert-time">${fmt(a.t)}</div></div></div>`).join('')}
        <button class="btn btn-primary btn-sm" onclick="nav('residents');setTimeout(()=>viewRes('${r.id}'),80)">Open Resident Profile</button>
      </div>`).join('') || `<div class="empty-state"><span class="empty-ico">✅</span><div class="empty-txt">No critical residents right now</div></div>`}`;
  addAudit('VIEW', 'critical_review', 'Doctor critical review');
}

// ===== VITALS =====
function loadVitals(id) {
  selVitals = currentRole === 'resident' ? 'R001' : (id || 'R001');
  document.getElementById('vitals-chips').innerHTML = resChipsHTML(selVitals, 'loadVitals');
  const r = RESIDENTS.find(x => x.id === selVitals);
  const data = vitalsData[selVitals] || [];
  const v = data[0] || {};
  const assessment = healthAssessment(selVitals);
  const insight = localAIInsight(selVitals);
  const glData = data.filter(x => x.glucose).slice(0, 6).reverse();
  document.getElementById('vitals-content').innerHTML = `
    <div class="card">
      <div class="card-hdr"><div class="card-ttl">Current Vitals · ${r.name}</div><span class="badge ${assessment.score < 70 ? 'badge-critical' : assessment.score < 85 ? 'badge-monitor' : 'badge-stable'}">Health Score ${assessment.score}/100</span></div>
      <div style="font-size:12px;color:var(--g400);margin-top:-8px;margin-bottom:10px">${v.by ? 'By ' + v.by : ''}</div>
      ${v.bp_s ? `<div class="vitals-grid">
        <div class="vital-box"><div class="vital-lbl">Blood Pressure</div><div class="vital-val ${v.bp_s>=140?'vital-warn':'vital-ok'}">${v.bp_s}/${v.bp_d}</div><div class="vital-unit">mmHg</div></div>
        <div class="vital-box"><div class="vital-lbl">Pulse</div><div class="vital-val ${v.pulse>100?'vital-warn':'vital-ok'}">${v.pulse}</div><div class="vital-unit">bpm</div></div>
        <div class="vital-box"><div class="vital-lbl">SpO₂</div><div class="vital-val ${v.spo2<94?'vital-crit':v.spo2<96?'vital-warn':'vital-ok'}">${v.spo2}%</div><div class="vital-unit">Oxygen Sat</div></div>
        <div class="vital-box"><div class="vital-lbl">Temperature</div><div class="vital-val ${v.temp>37.5?'vital-warn':'vital-ok'}">${v.temp}°C</div><div class="vital-unit">Celsius</div></div>
        ${v.glucose?`<div class="vital-box"><div class="vital-lbl">Glucose</div><div class="vital-val ${v.glucose>150?'vital-warn':'vital-ok'}">${v.glucose}</div><div class="vital-unit">mg/dL</div></div>`:''}
        ${v.weight?`<div class="vital-box"><div class="vital-lbl">Weight</div><div class="vital-val vital-ok">${v.weight} kg</div><div class="vital-unit">Body weight</div></div>`:''}
      </div><div style="font-size:11px;color:var(--g400);margin-top:8px">${v.notes||''}</div>
      <div class="alert-row alert-info" style="margin-top:12px;margin-bottom:0">
        <div class="alert-ico">✨</div>
        <div class="alert-body">
          <div class="alert-title">AI insight · ${insight.riskLevel} risk · ${assessment.urgency} action</div>
          <div class="alert-msg">${insight.insight} <strong>Recommendation:</strong> ${insight.recommendation}</div>
          <div class="resident-ai-actions">
            ${actionListHTML([
              {icon:assessment.visitNeeded ? '📅' : '✅', title:assessment.visitNeeded ? 'Doctor visit guidance' : 'Doctor visit status', text:assessment.visitWindow},
              ...(assessment.actions || []).slice(0, 3)
            ])}
          </div>
        </div>
      </div>`
      : `<div class="empty-state"><span class="empty-ico">💓</span><div class="empty-txt">No vitals recorded today</div></div>`}
    </div>
    ${glData.length ? `<div class="card"><div class="card-hdr"><div class="card-ttl">Glucose Trend</div></div>
      ${glData.map(x=>`<div class="chart-row">
        <div class="chart-lbl">${fmt(x.t).split(' ').slice(0,2).join(' ')}</div>
        <div class="bar-track"><div class="bar-fill" style="width:${Math.min((x.glucose/200)*100,100)}%;background:${x.glucose>150?'var(--amber)':'var(--teal)'}"></div></div>
        <div class="chart-val" style="color:${x.glucose>150?'var(--amber)':'var(--teal)'}">${x.glucose}</div>
      </div>`).join('')}</div>` : ''}
    <div class="card"><div class="card-hdr"><div class="card-ttl">Vitals History</div></div>
      <div class="tbl-wrap"><table>
        <thead><tr><th>Date/Time</th><th>BP</th><th>Pulse</th><th>SpO₂</th><th>Temp</th><th>Glucose</th><th>By</th></tr></thead>
        <tbody>${data.map(x=>`<tr>
          <td style="font-family:var(--mono);font-size:11px">${fmt(x.t)}</td>
          <td style="font-weight:800;color:${x.bp_s>=140?'var(--amber)':'var(--g700)'}">${x.bp_s}/${x.bp_d}</td>
          <td>${x.pulse}</td>
          <td style="color:${x.spo2<94?'var(--coral)':'var(--green)'}"><strong>${x.spo2}%</strong></td>
          <td>${x.temp}°C</td>
          <td style="color:${x.glucose&&x.glucose>150?'var(--amber)':'var(--g700)'}">${x.glucose||'—'}</td>
          <td style="font-size:11px;color:var(--g400)">${x.by}</td>
        </tr>`).join('')}</tbody>
      </table></div>
    </div>`;
  addAudit('VIEW', 'vitals', r.name);
}
function saveVitals() {
  const bp = document.getElementById('v-bp').value;
  const pulse = parseInt(document.getElementById('v-pulse').value);
  if (!bp || !pulse) { toast('BP and pulse are required', 'error'); return; }
  const [s, d] = bp.split('/').map(Number);
  const glucose = parseInt(document.getElementById('v-glucose').value) || null;
  const nv = {
    t: new Date().toISOString(), bp_s:s, bp_d:d, pulse,
    spo2: parseFloat(document.getElementById('v-spo2').value) || null,
    temp: parseFloat(document.getElementById('v-temp').value) || null,
    glucose, weight: parseFloat(document.getElementById('v-weight').value) || null,
    by: currentRole === 'resident' ? 'Patient / Family' : 'Dr. Priya Nair', notes: document.getElementById('v-notes').value
  };
  if (!vitalsData[selVitals]) vitalsData[selVitals] = [];
  vitalsData[selVitals].unshift(nv);
  const aiPreview = localAIInsight(selVitals);
  nv.ai = {
    riskLevel:aiPreview.riskLevel,
    insight:aiPreview.insight,
    recommendation:aiPreview.recommendation,
    score:aiPreview.score,
    visitWindow:aiPreview.visitWindow,
    actions:aiPreview.actions
  };
  let triggered = 0;
  const r = RESIDENTS.find(x => x.id === selVitals);
  if (s >= 160) { ALERTS.unshift({id:'A'+Date.now(),res:r.name,room:r.room,type:'vital',sev:'critical',msg:`BP ${bp} — CRITICAL hypertension`,acked:false,t:new Date().toISOString()}); triggered++; }
  else if (s >= 140) { ALERTS.unshift({id:'A'+Date.now(),res:r.name,room:r.room,type:'vital',sev:'warning',msg:`BP ${bp} — elevated`,acked:false,t:new Date().toISOString()}); triggered++; }
  if (glucose >= 200) { ALERTS.unshift({id:'A'+Date.now(),res:r.name,room:r.room,type:'vital',sev:'critical',msg:`Glucose ${glucose} mg/dL — critical`,acked:false,t:new Date().toISOString()}); triggered++; }
  else if (glucose > 180) { ALERTS.unshift({id:'A'+Date.now(),res:r.name,room:r.room,type:'vital',sev:'warning',msg:`Glucose ${glucose} mg/dL — diabetes control review`,acked:false,t:new Date().toISOString()}); triggered++; }
  if (nv.spo2 && nv.spo2 < 92) { ALERTS.unshift({id:'A'+Date.now(),res:r.name,room:r.room,type:'vital',sev:'critical',msg:`SpO₂ ${nv.spo2}% — respiratory risk`,acked:false,t:new Date().toISOString()}); triggered++; }
  if (pulse < 55 || pulse > 105) { ALERTS.unshift({id:'A'+Date.now(),res:r.name,room:r.room,type:'vital',sev:'warning',msg:`Pulse ${pulse} bpm — abnormal heart rate`,acked:false,t:new Date().toISOString()}); triggered++; }
  document.getElementById('vform').classList.remove('open');
  ['v-bp','v-pulse','v-spo2','v-temp','v-glucose','v-weight','v-notes'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  loadVitals(selVitals);
  apiFetch('/api/residents/' + selVitals, {
    method:'PUT',
    body:JSON.stringify({
      vitals:(vitalsData[selVitals] || []).map(v => ({
        date:v.t,
        bp:`${v.bp_s}/${v.bp_d}`,
        hr:v.pulse,
        spo2:v.spo2,
        temp:v.temp,
        weight:v.weight
      }))
    })
  }).catch(console.warn);
  toast(triggered ? `Vitals saved · ${triggered} alert(s) triggered` : 'Vitals saved successfully', triggered ? 'warning' : 'success');
  addAudit('CREATE', 'vitals', `Recorded for ${r.name}`);
}

// ===== eMAR =====
function loadEmar(id) {
  selEmar = id || 'R001';
  document.getElementById('emar-chips').innerHTML = resChipsHTML(selEmar, 'loadEmar');
  const r = RESIDENTS.find(x => x.id === selEmar);
  const meds = medsData[selEmar] || [];
  let given = 0, total = 0;
  meds.forEach(m => { total += m.times.length; given += m.times.filter(t => t.status === 'given').length; });
  const alg = allergiesFor(r).map(a => a.drug.toLowerCase());
  document.getElementById('emar-content').innerHTML = `
    ${allergiesFor(r).length ? `<div class="alert-row alert-critical" style="margin-bottom:14px">
      <div class="alert-ico">🚨</div>
      <div class="alert-body"><div class="alert-title">Allergy Alert — ${r.name}</div>
      <div class="alert-msg">${allergiesFor(r).map(a=>`${a.drug} (${a.severity})`).join(' · ')}</div></div>
    </div>` : ''}
    <div class="card">
      <div class="card-hdr">
        <div class="card-ttl">💊 ${r.name} · Medication Schedule</div>
        <div style="font-size:13px;font-weight:800;color:${given===total?'var(--green)':'var(--amber)'}">${given}/${total} given</div>
      </div>
      <div class="prog-bar"><div class="prog-fill" style="width:${total?Math.round(given/total*100):0}%;background:${given===total?'var(--green)':'var(--amber)'}"></div></div>
      <div style="margin-top:14px">
        ${meds.map(m => {
          const conflict = alg.some(a => m.name.toLowerCase().includes(a));
          return `<div class="med-row">
            <div class="med-name">${m.name}${conflict?` <span style="color:var(--coral);font-size:10px;font-weight:900">⚠ ALLERGY RISK</span>`:''}</div>
            <div class="med-detail">${m.route} · ${m.freq} · ${m.indication}</div>
            <div class="med-detail">Rx: ${m.by}</div>
            <div class="med-chips">${m.times.map(dose=>`
              <span class="dose-chip ${dose.status}" onclick="adminDose('${selEmar}','${m.id}','${dose.id}',this,'${dose.status}')">
                ${dose.status==='given'?'✓ '+dose.t+' given':dose.status==='overdue'?'⚠ '+dose.t+' overdue':'⏰ '+dose.t+' pending'}
              </span>`).join('')}
            </div>
          </div>`;
        }).join('')}
        ${!meds.length ? `<div class="empty-state"><span class="empty-ico">💊</span><div class="empty-txt">No medications on file</div></div>` : ''}
      </div>
    </div>`;
  addAudit('VIEW', 'emar', r.name);
}
function adminDose(resId, medId, doseId, el, status) {
  if (status === 'given') return;
  const med = medsData[resId].find(m => m.id === medId);
  const dose = med.times.find(t => t.id === doseId);
  if (dose) { dose.status = 'given'; dose.adm = 'Dr. Priya Nair'; }
  el.className = 'dose-chip given';
  el.textContent = '✓ ' + dose.t + ' given';
  addAudit('UPDATE', 'emar', `${med.name} administered for ${RESIDENTS.find(r=>r.id===resId).name}`);
  toast('Dose recorded — eMAR updated');
}

// ===== NOTES =====
function loadNotes() {
  const data = notesData['R001'] || [];
  document.getElementById('notes-list').innerHTML = data.map(n => `
    <div class="note-card ${n.role==='Doctor'?'doctor':''}">
      <div class="note-meta">
        <div>
          <div class="note-author">${n.author} <span class="note-role">(${n.role})</span></div>
          <div style="font-size:10px;color:var(--teal-d);font-weight:700;margin-top:2px">${n.shift} Shift</div>
        </div>
        <div class="note-time">${fmt(n.t)}</div>
      </div>
      <div class="note-body">${n.note}</div>
      ${n.tasks && n.tasks.length ? `<div class="note-tasks">⏰ ${n.tasks.map(t=>`<span class="task-chip">${t}</span>`).join('')}</div>` : ''}
    </div>`).join('') || `<div class="empty-state"><span class="empty-ico">📝</span><div class="empty-txt">No notes yet</div></div>`;
}
function saveNote() {
  const note = document.getElementById('n-note').value.trim();
  if (!note) { toast('Please enter a note', 'error'); return; }
  const tasks = document.getElementById('n-tasks').value.split(',').map(t => t.trim()).filter(Boolean);
  const nn = {shift: document.getElementById('n-shift').value, date:'2026-04-13', author:'Dr. Priya Nair', role:'Doctor', note, tasks, t: new Date().toISOString()};
  if (!notesData['R001']) notesData['R001'] = [];
  notesData['R001'].unshift(nn);
  addAudit('CREATE', 'shift_notes', `${nn.shift} note by ${nn.author}`);
  document.getElementById('n-note').value = '';
  document.getElementById('n-tasks').value = '';
  document.getElementById('nform').classList.remove('open');
  apiFetch('/api/residents/R001', {
    method:'PUT',
    body:JSON.stringify({
      notes:(notesData.R001 || []).map(n => ({
        shift:n.shift,
        date:n.t || n.date,
        author:n.author,
        note:n.note,
        tasks:n.tasks || []
      }))
    })
  }).catch(console.warn);
  loadNotes();
  toast('Shift note saved');
}

// ===== LABS =====
function loadLabs(id) {
  selLabs = id || 'R001';
  document.getElementById('labs-chips').innerHTML = resChipsHTML(selLabs, 'loadLabs');
  const r = RESIDENTS.find(x => x.id === selLabs);
  const data = labsData[selLabs] || [];
  const abnormal = data.filter(l => l.status !== 'normal');
  document.getElementById('labs-content').innerHTML = `
    ${abnormal.length ? `<div class="alert-row alert-warning" style="margin-bottom:14px">
      <div class="alert-ico">⚠️</div>
      <div class="alert-body">
        <div class="alert-title">${abnormal.length} Abnormal Result${abnormal.length>1?'s':''}</div>
        <div class="alert-msg">${abnormal.map(l=>`${l.test}: ${l.result} ${l.unit}`).join(' · ')}</div>
      </div>
    </div>` : ''}
    <div class="card">
      <div class="card-hdr">
        <div class="card-ttl">🔬 ${r.name} · Lab Results</div>
        <button class="btn btn-outline btn-sm" onclick="toggleForm('lform')">+ Add</button>
      </div>
      <div class="form-section" id="lform">
        <div class="form-grid">
          <div class="form-group"><label>Test Name</label><input id="lab-test" placeholder="HbA1c"/></div>
          <div class="form-group"><label>Result</label><input id="lab-result" placeholder="7.8"/></div>
          <div class="form-group"><label>Unit</label><input id="lab-unit" placeholder="%"/></div>
          <div class="form-group"><label>Reference Range</label><input id="lab-ref" placeholder="< 7.0"/></div>
          <div class="form-group"><label>Status</label><select id="lab-status"><option>normal</option><option>high</option><option>low</option></select></div>
          <div class="form-group"><label>Date</label><input id="lab-date" type="date" value="2026-04-13"/></div>
        </div>
        <div class="form-actions">
          <button class="btn btn-primary" onclick="saveLabResult()">💾 Save</button>
          <button class="btn btn-outline" onclick="toggleForm('lform')">Cancel</button>
        </div>
      </div>
      ${data.map(l => `<div class="lab-row">
        <div class="lab-test">${l.test}</div>
        <div class="lab-val" style="color:${l.status==='high'?'var(--coral)':l.status==='low'?'var(--sky)':'var(--green)'}">${l.result} ${l.unit}</div>
        <div class="lab-ref">Ref: ${l.ref}</div>
        ${labBadge(l.status)}
        <div style="font-size:10px;color:var(--g400);margin-left:auto;font-family:var(--mono)">${l.date}</div>
      </div>`).join('')}
      ${!data.length ? `<div class="empty-state"><span class="empty-ico">🔬</span><div class="empty-txt">No lab results on file</div></div>` : ''}
    </div>`;
  addAudit('VIEW', 'labs', r.name);
}
function saveLabResult() {
  const test = document.getElementById('lab-test').value;
  const result = document.getElementById('lab-result').value;
  const status = document.getElementById('lab-status').value;
  if (!test || !result) { toast('Test name and result are required', 'error'); return; }
  const nl = {id:'L'+Date.now(), test, result, unit:document.getElementById('lab-unit').value, ref:document.getElementById('lab-ref').value, status, date:document.getElementById('lab-date').value, by:'Dr. Priya Nair'};
  if (!labsData[selLabs]) labsData[selLabs] = [];
  labsData[selLabs].unshift(nl);
  if (status !== 'normal') {
    const r = RESIDENTS.find(x => x.id === selLabs);
    ALERTS.unshift({id:'A'+Date.now(), res:r.name, room:r.room, type:'lab', sev:'warning', msg:`Lab: ${test} ${result} — ${status}`, acked:false, t:new Date().toISOString()});
  }
  addAudit('CREATE', 'labs', `${test} for ${RESIDENTS.find(r=>r.id===selLabs).name}`);
  loadLabs(selLabs);
  toast('Lab result saved' + (status !== 'normal' ? ' — alert triggered' : ''));
}

// ===== TIMELINE =====
function loadTimeline(id) {
  selTl = id || 'R001';
  document.getElementById('tl-chips').innerHTML = resChipsHTML(selTl, 'loadTimeline');
  const r = RESIDENTS.find(x => x.id === selTl);
  const events = [];
  (vitalsData[selTl] || []).forEach(v => events.push({icon:'💓', t:v.t, title:'Vitals Recorded', body:`BP ${v.bp_s}/${v.bp_d} · Pulse ${v.pulse} · SpO₂ ${v.spo2}%${v.glucose?' · Glucose '+v.glucose+' mg/dL':''}${v.ai?`<div class="tl-card timeline-ai" style="margin:10px 0 0"><div class="tl-title">✨ AI Insight · ${v.ai.riskLevel} Risk${v.ai.score ? ' · Score ' + v.ai.score : ''}</div><div class="tl-body">${v.ai.insight}<br><strong>Recommendation:</strong> ${v.ai.recommendation}${v.ai.visitWindow ? '<br><strong>Doctor visit:</strong> ' + v.ai.visitWindow : ''}</div></div>`:''}`, color:'#00897B', by:v.by}));
  (notesData[selTl] || []).forEach(n => events.push({icon:n.role==='Doctor'?'👨‍⚕️':'📝', t:n.t, title:`${n.role} Note — ${n.shift} Shift`, body:n.note, color:n.role==='Doctor'?'#2E7D32':'#00897B', by:n.author}));
  (labsData[selTl] || []).forEach(l => events.push({icon:'🔬', t:l.date+'T12:00:00', title:`Lab: ${l.test}`, body:`${l.result} ${l.unit} (Ref: ${l.ref}) — ${l.status}`, color:l.status==='normal'?'#2E7D32':'#E53935', by:l.by}));
  events.sort((a, b) => new Date(b.t) - new Date(a.t));
  document.getElementById('tl-content').innerHTML = `<div class="card">
    <div class="card-hdr"><div class="card-ttl">Clinical Timeline · ${r.name}</div><span style="font-size:12px;color:var(--g400)">${events.length} events</span></div>
    ${events.slice(0, 20).map((e, i) => `
      <div class="tl-item">
        <div class="tl-left">
          <div class="tl-dot" style="background:${e.color}"></div>
          ${i < events.length - 1 ? '<div class="tl-line"></div>' : ''}
        </div>
        <div class="tl-card">
          <div class="tl-hdr">
            <div class="tl-icon">${e.icon}</div>
            <div><div class="tl-title">${e.title}</div><div class="tl-time">${fmt(e.t)} · ${e.by}</div></div>
          </div>
          <div class="tl-body">${e.body}</div>
        </div>
      </div>`).join('')}
    ${!events.length ? `<div class="empty-state"><span class="empty-ico">📈</span><div class="empty-txt">No events recorded</div></div>` : ''}
  </div>`;
  addAudit('VIEW', 'timeline', r.name);
}

// ===== CARE PLAN =====
function loadCarePlan() {
  selCare = currentRole === 'resident' ? 'R001' : (selCare || 'R001');
  const r = RESIDENTS.find(x => x.id === selCare);
  const activeMeds = medsData[selCare] || [];
  const prescriptions = prescriptionsData.filter(p => p.resId === selCare);
  document.getElementById('careplan-content').innerHTML = `
    <div class="res-chips" data-roles="doctor">${resChipsHTML(selCare, 'loadCarePlanFor')}</div>
    <div class="card" data-roles="doctor">
      <div class="card-hdr"><div><div class="card-ttl">Write Doctor Prescription · ${r.name}</div><div class="page-sub">Medicines, dietary plan, activity plan, and follow-up are sent to the selected patient dashboard.</div></div><button class="btn btn-primary btn-sm" onclick="toggleForm('care-rx-form')">+ New Prescription</button></div>
      <div class="form-section" id="care-rx-form">
        <div class="form-grid">
          <div class="form-group"><label>Medicines</label><textarea id="care-rx-meds" placeholder="Metformin 500mg | 1 tablet | Twice daily | 30 days"></textarea></div>
          <div class="form-group"><label>Dietary Plan</label><textarea id="care-rx-diet" placeholder="Low sugar, low salt, high fibre meals. Avoid refined carbohydrates."></textarea></div>
          <div class="form-group"><label>Activity / Therapy</label><textarea id="care-rx-activity" placeholder="15 minute walk after lunch. Physiotherapy Mon/Wed/Fri."></textarea></div>
          <div class="form-group"><label>Follow-up / Instructions</label><textarea id="care-rx-followup" placeholder="Review glucose log in 2 weeks. Return earlier if dizziness or breathlessness."></textarea></div>
        </div>
        <div class="card" style="padding:14px;margin-top:12px">
          <div class="card-hdr" style="margin-bottom:8px"><div><div class="card-ttl">Voice Prescription</div><div class="page-sub">Speak medicines, diet, activity, and follow-up. The transcript can fill the prescription form.</div></div><span class="badge badge-teal" id="care-voice-status">Ready</span></div>
          <div class="form-group"><label>Voice Transcript</label><textarea id="care-rx-voice" placeholder="Example: Medicine Metformin 500mg one tablet twice daily for 30 days. Diet low sugar low salt. Activity walk 15 minutes daily. Follow up after 2 weeks."></textarea></div>
          <div class="form-actions"><button class="btn btn-primary btn-sm" onclick="startCareVoice()">Record Voice</button><button class="btn btn-outline btn-sm" onclick="stopCareVoice()">Stop</button><button class="btn btn-outline btn-sm" onclick="applyCareVoiceTranscript()">Use Transcript</button></div>
        </div>
        <div class="form-actions"><button class="btn btn-primary" onclick="saveCarePrescription()">Send to Patient</button><button class="btn btn-outline" onclick="toggleForm('care-rx-form')">Cancel</button></div>
      </div>
    </div>
    <div class="card">
      <div class="card-hdr"><div><div class="card-ttl">Doctor Prescription · ${r.name}</div><div class="page-sub">Attending doctor: ${r.doctor}</div></div><span class="badge badge-teal">Patient visible</span></div>
      <div class="tbl-wrap"><table><thead><tr><th>Medicine</th><th>Dose</th><th>Frequency</th><th>Duration</th></tr></thead><tbody>${activeMeds.map(m=>`<tr><td>${m.name}</td><td>${m.route || 'Oral'}</td><td>${m.freq}</td><td>${m.indication || 'As advised'}</td></tr>`).join('') || '<tr><td colspan="4">No active medicines</td></tr>'}</tbody></table></div>
    </div>
    <div class="card">
      <div class="card-ttl" style="margin-bottom:12px">Treatment Goals</div>
      ${['Reduce HbA1c below 7.0%','Maintain BP below 130/80 mmHg','Continue physiotherapy for arthritis 3× per week','Monitor glucose twice daily','Improve dietary compliance — low-carb, low-salt'].map(g=>`
        <div class="goal-item"><div class="goal-check">✓</div><span style="font-size:13px;color:var(--g700)">${g}</span></div>`).join('')}
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-ttl" style="margin-bottom:10px">Dietary Plan</div>
        <div style="font-size:13px;line-height:1.8;color:var(--g700)">Low-carbohydrate diabetic diet. Avoid refined sugar and white rice. 1.5L fluid intake daily. High-fibre breakfast. Low-salt meals for BP management.</div>
      </div>
      <div class="card">
        <div class="card-ttl" style="margin-bottom:10px">Activity / Therapy Plan</div>
        <div style="font-size:13px;line-height:1.8;color:var(--g700)">Physiotherapy 3× per week — Mon, Wed, Fri. Daily 15-min walk post-lunch. Range-of-motion exercises for knees. No high-impact activity.</div>
      </div>
    </div>
    <div class="card">
      <div class="card-hdr"><div class="card-ttl">Recent Prescriptions Sent by Doctor</div><span class="badge badge-gray">${prescriptions.length} record${prescriptions.length===1?'':'s'}</span></div>
      ${prescriptions.map(p=>`<div class="list-item"><strong>${p.date} · ${p.doctor}</strong><span>${(p.meds || []).map(m=>`${m.name || m.drug} ${m.dose || ''} ${m.frequency || ''}`).join('; ') || 'Care plan update'}${p.rx?.diet ? '<br><b>Diet:</b> ' + p.rx.diet : ''}${p.rx?.activity ? '<br><b>Activity:</b> ' + p.rx.activity : ''}${p.rx?.followUp ? '<br><b>Follow-up:</b> ' + p.rx.followUp : ''}</span></div>`).join('') || '<div class="empty-state"><span class="empty-ico">RX</span><div class="empty-txt">No doctor prescriptions sent yet</div></div>'}
    </div>
    <div class="card">
      <div class="card-ttl" style="margin-bottom:12px">🏥 Diagnoses & Allergies</div>
      <div style="font-size:11px;font-weight:700;color:var(--g500);text-transform:uppercase;letter-spacing:0.3px;margin-bottom:6px">Diagnoses</div>
      <div class="pill-wrap" style="margin-bottom:12px">${r.diagnoses.map(d=>`<span class="pill">${d}</span>`).join('')}</div>
      <div style="font-size:11px;font-weight:700;color:var(--g500);text-transform:uppercase;letter-spacing:0.3px;margin-bottom:6px">Allergies</div>
      <div class="pill-wrap">${allergiesFor(r).map(a=>`<span class="pill pill-allergy">⚠ ${a.drug} (${a.severity})</span>`).join('')}</div>
    </div>
    <div class="card" style="background:linear-gradient(135deg,#FFFFFF,#EAF8F5);border-color:var(--border-accent)">
      <div style="font-size:12px;font-weight:700;color:var(--text-muted);margin-bottom:4px">NEXT REVIEW</div>
      <div style="font-size:22px;font-weight:900">Next doctor review</div>
      <div style="font-size:13px;color:var(--text-sub);margin-top:4px">Attending: ${r.doctor} · Room ${r.room}</div>
    </div>`;
  applyRoleAccess();
}
function loadCarePlanFor(id) {
  selCare = currentRole === 'resident' ? 'R001' : id;
  loadCarePlan();
}
function parseCareMedLine(line) {
  const parts = line.split('|').map(x => x.trim());
  return {name:parts[0] || line.trim(), dose:parts[1] || '', frequency:parts[2] || '', duration:parts[3] || ''};
}
let careVoiceRecognition = null;
function setCareVoiceStatus(text) {
  const el = document.getElementById('care-voice-status');
  if (el) el.textContent = text;
}
function startCareVoice() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const transcript = document.getElementById('care-rx-voice');
  if (!transcript) return;
  if (!SpeechRecognition) {
    transcript.focus();
    setCareVoiceStatus('Type fallback');
    toast('Voice recognition is not available in this browser. Type transcript here.', 'warning');
    return;
  }
  careVoiceRecognition = new SpeechRecognition();
  careVoiceRecognition.continuous = true;
  careVoiceRecognition.interimResults = true;
  careVoiceRecognition.lang = 'en-IN';
  let finalText = transcript.value ? transcript.value + ' ' : '';
  careVoiceRecognition.onresult = event => {
    let interim = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const phrase = event.results[i][0].transcript;
      if (event.results[i].isFinal) finalText += phrase + ' ';
      else interim += phrase;
    }
    transcript.value = (finalText + interim).trim();
  };
  careVoiceRecognition.onerror = () => {
    setCareVoiceStatus('Type fallback');
    toast('Voice capture stopped. You can edit the transcript manually.', 'warning');
  };
  careVoiceRecognition.onend = () => setCareVoiceStatus('Stopped');
  careVoiceRecognition.start();
  setCareVoiceStatus('Recording');
  toast('Recording doctor prescription');
}
function stopCareVoice() {
  if (careVoiceRecognition) careVoiceRecognition.stop();
  setCareVoiceStatus('Stopped');
}
function extractSection(text, labels, stopLabels) {
  const allStops = stopLabels.join('|');
  for (const label of labels) {
    const re = new RegExp(`${label}\\s*[:\\-]?\\s*([\\s\\S]*?)(?=\\b(?:${allStops})\\b\\s*[:\\-]?|$)`, 'i');
    const match = text.match(re);
    if (match && match[1].trim()) return match[1].trim().replace(/[.;]\s*$/, '');
  }
  return '';
}
function applyCareVoiceTranscript() {
  const text = (document.getElementById('care-rx-voice')?.value || '').trim();
  if (!text) { toast('Record or type a transcript first', 'error'); return; }
  const stops = ['medicine','medicines','medication','diet','dietary','activity','therapy','exercise','follow up','follow-up','instructions'];
  const meds = extractSection(text, ['medicine','medicines','medication'], stops) || text.split(/diet|dietary|activity|therapy|exercise|follow up|follow-up|instructions/i)[0].trim();
  const diet = extractSection(text, ['diet','dietary'], stops);
  const activity = extractSection(text, ['activity','therapy','exercise'], stops);
  const follow = extractSection(text, ['follow up','follow-up','instructions'], stops);
  if (meds) document.getElementById('care-rx-meds').value = meds.split(/\band\b|,|;/i).map(x => x.trim()).filter(Boolean).join('\n');
  if (diet) document.getElementById('care-rx-diet').value = diet;
  if (activity) document.getElementById('care-rx-activity').value = activity;
  if (follow) document.getElementById('care-rx-followup').value = follow;
  setCareVoiceStatus('Applied');
  toast('Voice transcript added to prescription');
}
function saveCarePrescription() {
  const resId = selCare || 'R001';
  const meds = (document.getElementById('care-rx-meds').value || '').split('\n').map(x => x.trim()).filter(Boolean).map(parseCareMedLine);
  const diet = document.getElementById('care-rx-diet').value.trim();
  const activity = document.getElementById('care-rx-activity').value.trim();
  const followUp = document.getElementById('care-rx-followup').value.trim();
  if (!meds.length && !diet && !activity && !followUp) { toast('Add medicines or plan instructions first', 'error'); return; }
  const rx = {chiefComplaint:'Doctor care plan prescription',diagnosis:'Care plan update',medications:meds,diet,activity,followUp};
  prescriptionsData.unshift({id:'RX-'+Date.now(),resId,date:todayISO(),doctor:'Dr. Priya Nair',meds,rx});
  if (!medsData[resId]) medsData[resId] = [];
  meds.forEach(m => {
    if (!m.name) return;
    medsData[resId].unshift({id:'M'+Date.now()+Math.floor(Math.random()*1000),name:m.name,route:'Oral',freq:m.frequency || m.dose || 'As advised',indication:m.duration || 'Doctor prescription',by:'Dr. Priya Nair',times:[{id:'E'+Date.now()+Math.floor(Math.random()*1000),t:'08:00',status:'pending'}]});
  });
  if (!notesData[resId]) notesData[resId] = [];
  notesData[resId].unshift({shift:'Doctor',date:todayISO(),author:'Dr. Priya Nair',role:'Doctor',note:'Prescription sent to patient: ' + rxText(resId, rx),tasks:[diet, activity, followUp].filter(Boolean),t:new Date().toISOString(),type:'Prescription'});
  saveStore('ehmr_prescriptions', prescriptionsData);
  addAudit('CREATE','care_prescription',`${patientName(resId)} prescription sent`);
  loadCarePlan();
  toast('Prescription sent to patient dashboard');
}

// ===== APPOINTMENTS =====
function appointmentStatus(appt) {
  if (appt.status && appt.status !== 'Scheduled') return appt.status;
  return new Date(`${appt.date}T${appt.time || '00:00'}:00`) < new Date() ? 'Completed' : 'Scheduled';
}
function apptRiskBadge(appt) {
  const risk = appt.risk || localAIInsight(appt.patientId || 'R001').riskLevel;
  const cls = risk === 'High' ? 'badge-critical' : risk === 'Medium' ? 'badge-monitor' : 'badge-stable';
  return `<span class="badge ${cls}">${risk} Risk</span>`;
}
function appointmentCard(appt) {
  const date = new Date(appt.date + 'T00:00:00');
  const month = date.toLocaleDateString('en-IN', {month:'short'});
  const day = date.toLocaleDateString('en-IN', {day:'2-digit'});
  const status = appointmentStatus(appt);
  return `<div class="appt-card">
    <div class="appt-datebox"><strong>${day}</strong><span>${month}</span></div>
    <div style="flex:1;min-width:0">
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
        <div style="font-size:14px;font-weight:900;color:var(--g800)">${patientName(appt.patientId)}</div>
        ${statusBadge(status)}
        ${apptRiskBadge(appt)}
      </div>
      <div class="appt-meta">${appt.doctorName} · ${appt.hospitalName || HOSPITALS.find(h => h.id === appt.hospitalId)?.name || 'Selected hospital'} · ${displayDate(appt.date)} at ${displayTime(appt.time)}</div>
      <div style="font-size:12px;color:var(--g600);margin-top:5px">${appt.reason || 'Doctor review'}</div>
      ${currentRole === 'resident' ? `<div class="record-share-note">${appt.recordsShared ? `📋 Records shared with ${appt.hospitalName || 'this hospital'}` : '🔒 Records not shared'}</div>` : ''}
    </div>
  </div>`;
}
function calendarHTML(appts) {
  const days = Array.from({length:14}, (_, i) => todayISO(i));
  return `<div class="appt-calendar">${days.map(day => {
    const dayAppts = appts.filter(a => a.date === day && appointmentStatus(a) === 'Scheduled');
    return `<div class="cal-day ${dayAppts.length ? 'has-appt' : ''}">
      <div class="cal-date">${new Date(day + 'T00:00:00').toLocaleDateString('en-IN', {day:'2-digit',month:'short'})}</div>
      ${dayAppts.slice(0, 2).map(a => `<div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis"><span class="cal-dot"></span>${displayTime(a.time)} ${patientName(a.patientId).split(' ')[0]}</div>`).join('')}
      ${dayAppts.length > 2 ? `<div>+${dayAppts.length - 2} more</div>` : ''}
    </div>`;
  }).join('')}</div>`;
}
async function loadAppts() {
  const insight = localAIInsight('R001');
  document.getElementById('appt-content').innerHTML = `<div class="card"><div class="resident-ai-loading">Loading schedule...</div></div>`;
  await fetchAppointments();
  const scoped = currentRole === 'resident' ? appointmentsData.filter(a => a.patientId === 'R001') : appointmentsData;
  const upcoming = scoped.filter(a => appointmentStatus(a) === 'Scheduled').sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));
  const past = scoped.filter(a => appointmentStatus(a) !== 'Scheduled').sort((a, b) => new Date(`${b.date}T${b.time}`) - new Date(`${a.date}T${a.time}`));
  const highRisk = upcoming.filter(a => (a.risk || localAIInsight(a.patientId).riskLevel) === 'High').length;
  document.getElementById('appt-content').innerHTML = `
  <div class="alert-row ${insight.riskLevel==='High'?'alert-critical':insight.riskLevel==='Medium'?'alert-warning':'alert-info'}" style="margin-bottom:14px">
    <div class="alert-ico">✨</div>
    <div class="alert-body">
      <div class="alert-title" id="visit-ai-title">AI Suggested Visit · ${insight.riskLevel} risk</div>
      <div class="alert-msg" id="visit-ai-msg">${insight.recommendation}</div>
    </div>
    <div class="appt-toolbar">
      <button class="ack-btn" onclick="runVisitSuggestion()">REFRESH AI</button>
      <button class="ack-btn" onclick="openAppointmentModal('R001','${insight.urgency}','${insight.visitWindow.replace(/'/g, "\\'")}')">BOOK</button>
    </div>
  </div>
  <div class="grid-4" style="margin-bottom:14px">
    <div class="stat-card"><span class="stat-ico">📅</span><div class="stat-val" style="color:var(--teal-d)">${upcoming.length}</div><div class="stat-lbl">Upcoming</div><div class="stat-sub">Scheduled visits</div></div>
    <div class="stat-card"><span class="stat-ico">✓</span><div class="stat-val" style="color:var(--green)">${past.filter(a=>appointmentStatus(a)==='Completed').length}</div><div class="stat-lbl">Completed</div><div class="stat-sub">Past doctor visits</div></div>
    <div class="stat-card"><span class="stat-ico">!</span><div class="stat-val" style="color:var(--coral)">${past.filter(a=>appointmentStatus(a)==='Missed').length}</div><div class="stat-lbl">Missed</div><div class="stat-sub">Needs follow-up</div></div>
    <div class="stat-card"><span class="stat-ico">⚕</span><div class="stat-val" style="color:${highRisk ? 'var(--coral)' : 'var(--green)'}">${highRisk}</div><div class="stat-lbl">High-Risk Slots</div><div class="stat-sub">Highlighted by AI</div></div>
  </div>
  <div class="appt-layout">
    <div>
      <div class="card">
        <div class="card-hdr"><div class="card-ttl">Upcoming Appointments</div><button class="btn btn-primary btn-sm" onclick="openAppointmentModal()">+ Book</button></div>
        <div class="appt-list">${upcoming.map(appointmentCard).join('') || `<div class="empty-state"><span class="empty-ico">📅</span><div class="empty-txt">No upcoming appointments</div></div>`}</div>
      </div>
      <div class="card">
        <div class="card-hdr"><div class="card-ttl">Past Appointments</div><span class="badge badge-gray">${past.length} records</span></div>
        <div class="appt-list">${past.map(appointmentCard).join('') || `<div class="empty-state"><span class="empty-ico">✓</span><div class="empty-txt">No past appointments</div></div>`}</div>
      </div>
    </div>
    <div>
      <div class="card">
        <div class="card-hdr"><div class="card-ttl">14-Day Calendar</div><span class="badge badge-teal">List + grid</span></div>
        ${calendarHTML(scoped)}
      </div>
      <div class="card">
        <div class="card-hdr"><div class="card-ttl">Doctor Availability</div></div>
        ${DOCTORS.map(d => `<div class="info-row"><div class="info-lbl">${d.name.replace('Dr. ','')}</div><div class="info-val">${d.specialty}<br><span style="font-size:12px;color:var(--g500)">${displayTime(d.start)} to ${displayTime(d.end)} · Break ${d.breaks.map(b=>displayTime(b.start)+'-'+displayTime(b.end)).join(', ')}</span></div></div>`).join('')}
      </div>
    </div>
  </div>`;
  addAudit('VIEW', 'appointments', 'Schedule dashboard loaded');
}
async function runVisitSuggestion() {
  const title = document.getElementById('visit-ai-title');
  const msg = document.getElementById('visit-ai-msg');
  if (!title || !msg) return;
  const base = localAIInsight('R001');
  title.textContent = 'AI Suggested Visit · analyzing';
  msg.textContent = 'Checking latest vitals trend and resident history with Groq...';
  try {
    const ai = await requestGroqInsight('R001');
    const result = ai ? {...base, ...ai, riskLevel:normalizeRisk(ai.riskLevel || ai.risk)} : base;
    title.textContent = `AI Suggested Visit · ${result.riskLevel} risk`;
    msg.textContent = result.riskLevel === 'High'
      ? 'Priority visit recommended within 24 to 48 hours. ' + result.recommendation
      : result.recommendation;
    bookingContext = {patientId:'R001', urgency:result.urgency || 'Priority', reason:result.visitWindow || result.recommendation};
    toast('Doctor visit suggestion refreshed');
  } catch (e) {
    console.warn(e);
    title.textContent = `AI Suggested Visit · ${base.riskLevel} risk`;
    msg.textContent = base.recommendation;
    toast('Using local visit suggestion. Start server.js for Groq.', 'warning');
  }
}
function openAppointmentModal(patientId = 'R001', urgency = 'Routine', reason = 'Doctor review', hospitalId = selectedHospitalId) {
  bookingContext = {patientId, urgency, reason, hospitalId};
  selectedAppointmentSlot = '';
  document.getElementById('appointment-modal').classList.add('open');
  document.getElementById('appt-patient').innerHTML = RESIDENTS.map(r => `<option value="${r.id}">${r.name} · Room ${r.room}</option>`).join('');
  document.getElementById('appt-hospital').innerHTML = HOSPITALS.map(h => `<option value="${h.id}">${h.name} · ${h.area}</option>`).join('');
  document.getElementById('appt-hospital').value = hospitalId || selectedHospitalId;
  const hospitalDoctors = HOSPITALS.find(h => h.id === (hospitalId || selectedHospitalId))?.doctors || [];
  document.getElementById('appt-doctor').innerHTML = (hospitalDoctors.length ? hospitalDoctors : DOCTORS.map(d => d.name))
    .map(name => `<option value="${name}">${name}</option>`).join('');
  document.getElementById('appt-patient').value = currentRole === 'resident' ? 'R001' : patientId;
  document.getElementById('appt-doctor').value = RESIDENTS.find(r => r.id === document.getElementById('appt-patient').value)?.doctor || DOCTORS[0].name;
  document.getElementById('appt-date').min = todayISO();
  document.getElementById('appt-date').value = urgency === 'Urgent' || String(reason).includes('24') || String(reason).includes('48') ? todayISO(1) : todayISO(2);
  document.getElementById('appt-reason').value = reason || 'Doctor review';
  document.getElementById('appt-urgency-badge').textContent = urgency || 'Routine';
  const shareBox = document.getElementById('appt-share-records');
  if (shareBox) shareBox.checked = true;
  refreshSlots();
}
function closeAppointmentModal() {
  document.getElementById('appointment-modal').classList.remove('open');
}
function onAppointmentPatientChange() {
  const patientId = document.getElementById('appt-patient').value;
  const doctor = RESIDENTS.find(r => r.id === patientId)?.doctor || DOCTORS[0].name;
  document.getElementById('appt-doctor').value = doctor;
  const insight = localAIInsight(patientId);
  document.getElementById('appt-urgency-badge').textContent = insight.urgency;
  document.getElementById('appt-reason').value = insight.visitWindow;
  refreshSlots();
}
function onAppointmentHospitalChange() {
  const hospitalId = document.getElementById('appt-hospital').value;
  const hospitalDoctors = HOSPITALS.find(h => h.id === hospitalId)?.doctors || [];
  const doctorEl = document.getElementById('appt-doctor');
  doctorEl.innerHTML = (hospitalDoctors.length ? hospitalDoctors : DOCTORS.map(d => d.name))
    .map(name => `<option value="${name}">${name}</option>`).join('');
  if (currentRole === 'resident') selectHospital(hospitalId, false);
  refreshSlots();
}
async function refreshSlots() {
  const date = document.getElementById('appt-date').value;
  const doctorName = document.getElementById('appt-doctor').value;
  if (!date || !doctorName) return;
  await fetchAppointments();
  const data = await fetchAvailability(date, doctorName);
  let doctor = (data.availability || [])[0];
  if (!doctor?.slots?.length) doctor = slotAvailability(date, doctorName).availability[0];
  const slotEl = document.getElementById('appt-slots');
  const available = (doctor?.slots || []).filter(s => s.available).length;
  const firstOpen = (doctor?.slots || []).find(s => s.available);
  document.getElementById('slot-summary').textContent = `${available} available`;
  selectedAppointmentSlot = firstOpen?.time || '';
  slotEl.innerHTML = (doctor?.slots || []).map(s => `
    <button class="slot-btn ${s.time === selectedAppointmentSlot ? 'selected' : ''}" ${s.available ? '' : 'disabled'} onclick="selectAppointmentSlot('${s.time}', this)" title="${s.break ? 'Doctor break' : s.booked ? 'Already booked' : 'Available'}">
      ${displayTime(s.time)}
    </button>`).join('') || `<div class="empty-state" style="grid-column:1/-1"><span class="empty-ico">📅</span><div class="empty-txt">No slots for this doctor</div></div>`;
}
function selectAppointmentSlot(time, el) {
  selectedAppointmentSlot = time;
  document.querySelectorAll('#appt-slots .slot-btn').forEach(btn => btn.classList.remove('selected'));
  el.classList.add('selected');
}
async function suggestNearestSlot() {
  const dateInput = document.getElementById('appt-date');
  const doctorName = document.getElementById('appt-doctor').value;
  for (let i = 0; i < 7; i++) {
    const day = todayISO(i);
    const data = await fetchAvailability(day, doctorName);
    const slot = (data.availability?.[0]?.slots || []).find(s => s.available);
    if (slot) {
      dateInput.value = day;
      await refreshSlots();
      const btn = Array.from(document.querySelectorAll('#appt-slots .slot-btn')).find(b => b.textContent.trim() === displayTime(slot.time));
      if (btn) selectAppointmentSlot(slot.time, btn);
      toast(`Nearest slot: ${displayDate(day)} at ${displayTime(slot.time)}`);
      return;
    }
  }
  toast('No open slots in the next 7 days', 'warning');
}
async function saveAppointment() {
  const shareHealthSummary = document.getElementById('appt-share-records')?.checked !== false;
  const payload = {
    patientId: document.getElementById('appt-patient').value,
    hospitalId: document.getElementById('appt-hospital').value,
    hospitalName: HOSPITALS.find(h => h.id === document.getElementById('appt-hospital').value)?.name || '',
    doctorName: document.getElementById('appt-doctor').value,
    date: document.getElementById('appt-date').value,
    time: selectedAppointmentSlot,
    reason: document.getElementById('appt-reason').value || 'Doctor review',
    risk: localAIInsight(document.getElementById('appt-patient').value).riskLevel,
    recordsShared: false
  };
  if (!payload.patientId || !payload.doctorName || !payload.date || !payload.time) {
    toast('Please choose patient, doctor, date, and slot', 'error');
    return;
  }
  try {
    if (currentRole === 'resident') {
      const bookingData = await apiFetch('/api/bookings', {
        method:'POST',
        body:JSON.stringify({
          hospitalId:payload.hospitalId,
          type:'appointment',
          department:payload.reason,
          doctorName:payload.doctorName,
          date:payload.date,
          timeSlot:payload.time,
          shareHealthSummary
        })
      });
      payload.bookingId = bookingData.booking?._id;
      payload.recordsShared = Boolean(bookingData.recordsShared);
    }
    const data = await apiFetch('/api/appointments', {method:'POST',body:JSON.stringify(payload)});
    appointmentsData.push(data.appointment);
  } catch (e) {
    if (appointmentsData.some(a => a.doctorName === payload.doctorName && a.date === payload.date && a.time === payload.time && a.status === 'Scheduled')) {
      toast('That slot was just booked. Choose another time.', 'error');
      refreshSlots();
      return;
    }
    const created = {...payload, id:'APT-' + Date.now(), status:'Scheduled'};
    appointmentsData.push(created);
  }
  addAudit('CREATE', 'appointments', `${patientName(payload.patientId)} with ${payload.doctorName}`);
  closeAppointmentModal();
  if (_currentPage === 'book') loadBookSchedule();
  else if (_currentPage === 'appointments') loadAppts();
  else loadDash();
  showAppointmentConfirmation(appointmentsData[appointmentsData.length - 1] || payload);
  toast('Appointment booked successfully');
}

// ===== INSURANCE + ABHA =====
function coverageStorageKey() {
  const userKey = currentUser?.id || currentUser?.email || 'guest';
  return `ehmr-coverage-profile-${userKey}`;
}
function readCoverageState() {
  if (isDemoPatientAccount()) return {};
  try {
    return JSON.parse(localStorage.getItem(coverageStorageKey()) || '{}') || {};
  } catch (error) {
    return {};
  }
}
function writeCoverageState(next) {
  localStorage.setItem(coverageStorageKey(), JSON.stringify(next));
}
function patientCoverageProfile(resId = 'R001') {
  const demo = isDemoPatientAccount();
  const state = readCoverageState();
  const policy = state.policy || null;
  const abha = state.abha || null;
  const schemes = state.schemes || null;
  const uploadedDocs = demo ? [] : (state.documents || []);
  return {
    hasPolicy: demo || Boolean(policy?.provider || policy?.policyNumber),
    policyName: demo ? 'Senior Secure Plus' : (policy?.provider || 'No policy added'),
    coverage: demo ? '₹8,00,000 annual family floater' : (policy?.coverage ? `₹${Number(policy.coverage).toLocaleString('en-IN')} coverage` : 'Not added'),
    claimStatus: demo ? 'No active claims' : (policy?.claimStatus || 'No claims available'),
    renewal: demo ? '14 Sep 2026' : (policy?.renewal || 'Not available'),
    policyNumber: demo ? 'SSP-DEMO-8821' : (policy?.policyNumber || ''),
    hasAbha: demo || Boolean(abha?.id),
    abhaId: demo ? '91-2478-6631-8821' : (abha?.id || 'Not linked'),
    records: demo ? '27 prescriptions · 8 lab reports · 5 summaries' : `${uploadedDocs.length} documents uploaded`,
    consent: demo ? 'Shared with care team until 30 May 2026' : (abha?.consentUntil ? `Shared until ${displayDate(abha.consentUntil)}` : 'No consent shared'),
    hasSchemeReview: demo || Boolean(schemes?.pmjay || schemes?.elderlyCare || schemes?.stateCard),
    pmjay: demo ? 'Eligibility review required' : (schemes?.pmjay || 'Not checked'),
    elderlyCare: demo ? 'Geriatric outpatient benefits available' : (schemes?.elderlyCare || 'Not checked'),
    stateCard: demo ? 'Diagnostics and pharmacy discounts' : (schemes?.stateCard || 'Not checked'),
    policy,
    abha,
    schemes,
    uploadedDocs
  };
}
function coverageFormsHTML(coverage) {
  if (isDemoPatientAccount()) return '';
  const policy = coverage.policy || {};
  const abha = coverage.abha || {};
  const schemes = coverage.schemes || {};
  return `<div class="card" style="margin-top:14px">
    <div class="card-hdr"><div><div class="card-ttl">Add / Link Coverage Details</div><div class="page-sub">Saved on this device for the patient account</div></div></div>
    <div class="coverage-action-grid">
      <div class="coverage-action-panel">
        <div class="card-ttl">🛡️ Insurance Card</div>
        <div class="form-group"><label>Provider / Policy Name</label><input id="cov-policy-provider" placeholder="Senior Secure Plus" value="${escapeHTML(policy.provider || '')}"/></div>
        <div class="form-group"><label>Policy Number</label><input id="cov-policy-number" placeholder="POL123456" value="${escapeHTML(policy.policyNumber || '')}"/></div>
        <div class="form-grid">
          <div class="form-group"><label>Coverage Amount</label><input id="cov-policy-coverage" type="number" min="0" placeholder="800000" value="${escapeHTML(policy.coverage || '')}"/></div>
          <div class="form-group"><label>Renewal Date</label><input id="cov-policy-renewal" type="date" value="${escapeHTML(policy.renewal || '')}"/></div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="saveInsurancePolicy()">Save Insurance</button>
      </div>
      <div class="coverage-action-panel">
        <div class="card-ttl">🪪 ABHA Link</div>
        <div class="form-group"><label>ABHA ID</label><input id="cov-abha-id" placeholder="91-0000-0000-0000" value="${escapeHTML(abha.id || '')}"/></div>
        <div class="form-group"><label>Consent Shared Until</label><input id="cov-abha-consent" type="date" value="${escapeHTML(abha.consentUntil || '')}"/></div>
        <button class="btn btn-primary btn-sm" onclick="saveAbhaLink()">Link ABHA</button>
      </div>
      <div class="coverage-action-panel">
        <div class="card-ttl">🏥 Scheme Check</div>
        <div class="form-group"><label>PM-JAY</label><select id="cov-scheme-pmjay"><option ${!schemes.pmjay?'selected':''}>Not checked</option><option ${schemes.pmjay==='Eligible'?'selected':''}>Eligible</option><option ${schemes.pmjay==='Not eligible'?'selected':''}>Not eligible</option><option ${schemes.pmjay==='Eligibility review required'?'selected':''}>Eligibility review required</option></select></div>
        <div class="form-group"><label>Elderly Care</label><select id="cov-scheme-elderly"><option ${!schemes.elderlyCare?'selected':''}>Not checked</option><option ${schemes.elderlyCare==='Benefits available'?'selected':''}>Benefits available</option><option ${schemes.elderlyCare==='Review required'?'selected':''}>Review required</option></select></div>
        <div class="form-group"><label>State Card</label><select id="cov-scheme-state"><option ${!schemes.stateCard?'selected':''}>Not checked</option><option ${schemes.stateCard==='Linked'?'selected':''}>Linked</option><option ${schemes.stateCard==='Not linked'?'selected':''}>Not linked</option><option ${schemes.stateCard==='Review required'?'selected':''}>Review required</option></select></div>
        <button class="btn btn-primary btn-sm" onclick="saveSchemeReview()">Save Scheme Status</button>
      </div>
    </div>
    <div class="coverage-doc-panel">
      <div class="card-ttl">📎 Supporting Documents</div>
      <div class="form-grid">
        <div class="form-group"><label>Document Type</label><select id="cov-doc-type"><option>Insurance card</option><option>ABHA card</option><option>Lab report</option><option>Prescription</option><option>Discharge summary</option><option>Government scheme card</option></select></div>
        <div class="form-group"><label>Document Name</label><input id="cov-doc-name" placeholder="Front side policy card"/></div>
      </div>
      <button class="btn btn-outline btn-sm" onclick="addCoverageDocument()">Add Document Record</button>
      <div class="item-list" style="margin-top:12px">${coverage.uploadedDocs.map(doc => `<div class="list-item"><strong>${escapeHTML(doc.type)} · ${escapeHTML(doc.name)}</strong><span>Added ${displayDate(doc.date)}</span><button class="btn btn-outline btn-sm" style="margin-top:8px" onclick="removeCoverageDocument('${doc.id}')">Remove</button></div>`).join('') || '<div class="empty-state"><span class="empty-ico">📎</span><div class="empty-txt">No supporting documents added yet</div></div>'}</div>
    </div>
  </div>`;
}
function loadInsurance() {
  const readiness = coverageReadiness('R001');
  const coverage = patientCoverageProfile('R001');
  document.getElementById('insurance-content').innerHTML = `
    <div class="ins-policy-grid">
      <div class="card">
        <div class="card-ttl" style="margin-bottom:12px">🛡️ ${coverage.policyName}</div>
        <div class="info-row"><div class="info-lbl">Coverage</div><div class="info-val">${coverage.coverage}</div></div>
        <div class="info-row"><div class="info-lbl">Claim Status</div><div class="info-val">${coverage.claimStatus}</div></div>
        <div class="info-row"><div class="info-lbl">Renewal</div><div class="info-val">${coverage.renewal}</div></div>
      </div>
      <div class="card">
        <div class="card-ttl" style="margin-bottom:12px">🪪 ABHA Health ID</div>
        <div class="info-row"><div class="info-lbl">ABHA ID</div><div class="info-val">${coverage.abhaId}</div></div>
        <div class="info-row"><div class="info-lbl">Records</div><div class="info-val">${coverage.records}</div></div>
        <div class="info-row"><div class="info-lbl">Consent</div><div class="info-val">${coverage.consent}</div></div>
      </div>
      <div class="card">
        <div class="card-ttl" style="margin-bottom:12px">🏥 Government Schemes</div>
        <div class="info-row"><div class="info-lbl">PM-JAY</div><div class="info-val">${coverage.pmjay}</div></div>
        <div class="info-row"><div class="info-lbl">Elderly Care</div><div class="info-val">${coverage.elderlyCare}</div></div>
        <div class="info-row"><div class="info-lbl">State Card</div><div class="info-val">${coverage.stateCard}</div></div>
      </div>
    </div>
    <div class="card" style="margin-top:14px">
      <div class="card-hdr"><div class="card-ttl">✨ AI Coverage Readiness</div><span id="coverage-badge" class="badge ${readiness.score >= 80 ? 'badge-stable' : readiness.score >= 60 ? 'badge-monitor' : 'badge-critical'}">${readiness.score}% READY</span></div>
      <div class="alert-row alert-info" style="margin-bottom:0">
        <div class="alert-ico">ℹ️</div>
        <div class="alert-body">
          <div class="alert-title" id="coverage-title">${readiness.title}</div>
          <div class="alert-msg" id="coverage-msg">${readiness.message}</div>
        </div>
      </div>
      <div class="prog-bar"><div class="prog-fill" id="coverage-progress" style="width:${readiness.score}%;background:${readiness.score >= 80 ? 'var(--green)' : readiness.score >= 60 ? 'var(--amber)' : 'var(--coral)'}"></div></div>
      <div id="coverage-checklist" class="item-list" style="margin-top:12px">
        ${readiness.items.map(i => `<div class="list-item"><strong>${i.ok ? '✓' : '•'} ${i.label}</strong><span>${i.detail}</span></div>`).join('')}
      </div>
      <button class="btn btn-primary btn-sm" style="margin-top:12px" onclick="runCoverageReadiness()">Refresh Readiness</button>
    </div>
    ${coverageFormsHTML(coverage)}`;
  addAudit('VIEW', 'insurance', 'Insurance + ABHA');
}
function coverageReadiness(resId = 'R001') {
  const insight = localAIInsight(resId);
  const coverage = patientCoverageProfile(resId);
  const abnormalLabs = (labsData[resId] || []).filter(l => l.status !== 'normal');
  const recentVitals = (vitalsData[resId] || []).length >= 7;
  const meds = (medsData[resId] || []).length >= 3;
  const hasLabs = (labsData[resId] || []).length > 0;
  const hasClinicalDataForCoverage = hasClinicalData(resId);
  const hasPolicy = coverage.hasPolicy;
  const hasAbha = coverage.hasAbha;
  const hasDocuments = coverage.uploadedDocs.length > 0 || hasLabs || meds || recentVitals;
  let score = 0;
  if (hasPolicy) score += 20;
  if (hasAbha) score += 20;
  if (hasDocuments) score += 10;
  if (recentVitals) score += 15;
  if (meds) score += 10;
  if (hasLabs) score += abnormalLabs.length <= 2 ? 10 : 4;
  if (coverage.hasSchemeReview) score += 5;
  if (insight.riskLevel === 'High') score -= 12;
  if (insight.riskLevel === 'Medium') score -= 5;
  if (!hasPolicy && !hasAbha && !hasDocuments && !hasClinicalDataForCoverage) score = 0;
  score = Math.max(0, Math.min(98, score));
  return {
    score,
    title: score >= 80 ? 'Coverage file is visit-ready' : score === 0 ? 'No coverage file added yet' : 'Coverage file needs a quick update',
    message: score >= 80
      ? 'ABHA records, policy details, prescriptions, and recent vitals are ready for the next doctor visit or claim support.'
      : score === 0
        ? 'Add policy details, ABHA ID, and supporting documents before EHMR AI can calculate coverage readiness.'
      : 'Sync the latest clinical summary, abnormal lab notes, and current vitals before using records for visit or claim support.',
    items: [
      {ok: hasPolicy, label: 'Policy active', detail: hasPolicy ? `${coverage.policyName} coverage is available.` : 'No insurance policy has been added.'},
      {ok: hasAbha, label: 'ABHA linked', detail: hasAbha ? 'Digital health identity and consent are available.' : 'No ABHA ID has been linked.'},
      {ok: hasDocuments, label: 'Supporting documents', detail: hasDocuments ? 'Some health or coverage documents are available.' : 'No policy, ABHA, lab, prescription, or summary documents uploaded.'},
      {ok: recentVitals, label: 'Recent vitals trend', detail: recentVitals ? 'Seven or more readings are available for review.' : 'Add more recent vitals for stronger readiness.'},
      {ok: meds, label: 'Medication record', detail: 'Medication schedule is available for claim and doctor context.'},
      {ok: hasLabs && abnormalLabs.length <= 2, label: 'Lab summary', detail: hasLabs ? (abnormalLabs.length ? `${abnormalLabs.length} abnormal lab value(s) should be reviewed.` : 'Lab reports are available with no major abnormal values.') : 'No lab reports uploaded.'},
      {ok: hasClinicalDataForCoverage && insight.riskLevel !== 'High', label: 'Current clinical risk', detail: hasClinicalDataForCoverage ? `${insight.riskLevel} risk based on latest EHMR AI analysis.` : 'Add health records before risk can support coverage readiness.'}
    ]
  };
}
function runCoverageReadiness() {
  const readiness = coverageReadiness('R001');
  document.getElementById('coverage-title').textContent = readiness.title;
  document.getElementById('coverage-msg').textContent = readiness.message;
  const progress = document.getElementById('coverage-progress');
  progress.style.width = readiness.score + '%';
  progress.style.background = readiness.score >= 80 ? 'var(--green)' : readiness.score >= 60 ? 'var(--amber)' : 'var(--coral)';
  const badge = document.getElementById('coverage-badge');
  if (badge) {
    badge.className = `badge ${readiness.score >= 80 ? 'badge-stable' : readiness.score >= 60 ? 'badge-monitor' : 'badge-critical'}`;
    badge.textContent = `${readiness.score}% READY`;
  }
  document.getElementById('coverage-checklist').innerHTML = readiness.items.map(i => `<div class="list-item"><strong>${i.ok ? '✓' : '•'} ${i.label}</strong><span>${i.detail}</span></div>`).join('');
  toast(`Coverage readiness updated: ${readiness.score}%`);
}
function saveInsurancePolicy() {
  const state = readCoverageState();
  const provider = document.getElementById('cov-policy-provider').value.trim();
  const policyNumber = document.getElementById('cov-policy-number').value.trim();
  const coverage = document.getElementById('cov-policy-coverage').value;
  const renewal = document.getElementById('cov-policy-renewal').value;
  if (!provider || !policyNumber || !coverage) {
    toast('Enter provider, policy number, and coverage amount', 'error');
    return;
  }
  state.policy = {provider, policyNumber, coverage, renewal, claimStatus:'No active claims'};
  writeCoverageState(state);
  loadInsurance();
  toast('Insurance card saved');
}
function saveAbhaLink() {
  const state = readCoverageState();
  const id = document.getElementById('cov-abha-id').value.trim();
  const consentUntil = document.getElementById('cov-abha-consent').value;
  if (!id) {
    toast('Enter ABHA ID', 'error');
    return;
  }
  state.abha = {id, consentUntil};
  writeCoverageState(state);
  loadInsurance();
  toast('ABHA linked');
}
function saveSchemeReview() {
  const state = readCoverageState();
  state.schemes = {
    pmjay:document.getElementById('cov-scheme-pmjay').value,
    elderlyCare:document.getElementById('cov-scheme-elderly').value,
    stateCard:document.getElementById('cov-scheme-state').value
  };
  writeCoverageState(state);
  loadInsurance();
  toast('Scheme status saved');
}
function addCoverageDocument() {
  const state = readCoverageState();
  const type = document.getElementById('cov-doc-type').value;
  const name = document.getElementById('cov-doc-name').value.trim();
  if (!name) {
    toast('Enter document name', 'error');
    return;
  }
  state.documents = state.documents || [];
  state.documents.unshift({id:'DOC-' + Date.now(), type, name, date:todayISO()});
  writeCoverageState(state);
  loadInsurance();
  toast('Document record added');
}
function removeCoverageDocument(id) {
  const state = readCoverageState();
  state.documents = (state.documents || []).filter(doc => doc.id !== id);
  writeCoverageState(state);
  loadInsurance();
  toast('Document removed');
}

// ===== AUDIT LOG =====
function loadAudit() {
  const seed = [
    {t:'21:30', name:'Dr. Priya Nair', role:'Doctor', action:'VIEW', resource:'dashboard', detail:'Dashboard loaded'},
    {t:'21:00', name:'Sunita Rao', role:'Caregiver', action:'CREATE', resource:'vitals', detail:'Recorded for Ramesh Iyer'},
    {t:'20:15', name:'Sunita Rao', role:'Caregiver', action:'UPDATE', resource:'emar', detail:'Metformin 500mg marked given'},
    {t:'13:30', name:'Dr. Priya Nair', role:'Doctor', action:'VIEW', resource:'labs', detail:'Lab results reviewed'},
    {t:'08:10', name:'Deepa Singh', role:'Nurse', action:'CREATE', resource:'vitals', detail:'Recorded for Saraswati Menon'},
    {t:'08:05', name:'System', role:'Admin', action:'ALERT', resource:'alerts', detail:'BP alert generated for Saraswati Menon'},
  ];
  const all = [...auditLog, ...seed];
  document.getElementById('audit-tbody').innerHTML = all.map(l => `<tr>
    <td style="font-family:var(--mono);font-size:11px">${l.t}</td>
    <td style="font-weight:700">${l.name}</td>
    <td><span class="badge ${l.role==='Doctor'?'badge-teal':'badge-gray'}">${l.role}</span></td>
    <td><span class="badge ${l.action==='CREATE'?'badge-stable':l.action==='UPDATE'?'badge-monitor':l.action==='ALERT'?'badge-critical':'badge-gray'}">${l.action}</span></td>
    <td style="color:var(--g600)">${l.resource}</td>
    <td style="font-size:11px;color:var(--g500)">${l.detail}</td>
  </tr>`).join('');
}

// ===== FEATURE EXPANSION =====
const CAREGIVERS = [
  {name:'Sunita Rao', phone:'919811223344'},
  {name:'Deepa Singh', phone:'919822334455'},
  {name:'Ravi Kumar', phone:'919833445566'}
];
function loadStore(key, fallback) {
  return fallback;
}
function saveStore(key, value) {
  if (!authToken()) return;
  const record = {
    type:key,
    title:key.replace(/^ehmr_/, '').replace(/_/g, ' '),
    details:JSON.stringify(value).slice(0, 1800),
    source:'EHMR UI state'
  };
  apiFetch('/api/records', {method:'POST', body:JSON.stringify(record)}).catch(console.warn);
}
let medicationOrders = loadStore('ehmr_med_orders', [
  {id:'MO-1001',resId:'R001',med:'Metformin 500mg',qty:'60 tablets',date:todayISO(2),notes:'Monthly refill',status:'Confirmed'},
  {id:'MO-1002',resId:'R002',med:'Warfarin 2mg',qty:'30 tablets',date:todayISO(1),notes:'INR follow-up pack',status:'Pending'}
]);
let healthLedger = loadStore('ehmr_ledger', [
  {id:'HL-1',resId:'R001',date:todayISO(-2),type:'Visit',item:'Diabetes/BP review',cost:1200},
  {id:'HL-2',resId:'R001',date:todayISO(-1),type:'Medication',item:'Metformin batch MTF-0426',cost:420},
  {id:'HL-3',resId:'R002',date:todayISO(-3),type:'Lab',item:'BNP + renal panel',cost:2100},
  {id:'HL-4',resId:'R003',date:todayISO(-5),type:'Procedure',item:'Nebulization support',cost:650},
  {id:'HL-5',resId:'R004',date:todayISO(-4),type:'Visit',item:'Orthopedic review',cost:1500}
]);
let resourceState = loadStore('ehmr_resources', {
  beds:[
    {id:'B1',label:'204-A',status:'Occupied',resId:'R001'}, {id:'B2',label:'108-B',status:'Occupied',resId:'R002'},
    {id:'B3',label:'312-A',status:'Occupied',resId:'R003'}, {id:'B4',label:'201-C',status:'Occupied',resId:'R004'},
    {id:'B5',label:'106-A',status:'Occupied',resId:'R005'}, {id:'B6',label:'205-B',status:'Sanitizing',resId:''}
  ],
  equipment:[
    {name:'Wheelchair',status:'In Use'}, {name:'Oxygen Concentrator',status:'Available'}, {name:'BP Monitor',status:'Available'}
  ]
});
let caregiverRoster = loadStore('ehmr_schedule', {
  slots:{
    [`${todayISO(0)}|Morning`]:{caregiver:'Sunita Rao',resId:'R001'},
    [`${todayISO(0)}|Evening`]:{caregiver:'Deepa Singh',resId:'R002'},
    [`${todayISO(1)}|Night`]:{caregiver:'Sunita Rao',resId:'R004'}
  }
});
let serviceBookings = loadStore('ehmr_service_bookings', [
  {id:'SRV-1001',type:'Home Lab Collection',resId:'R001',date:todayISO(),time:'11:30',urgency:'Routine',notes:'HbA1c and lipid panel',status:'Pending'},
  {id:'SRV-1002',type:'Physiotherapy Session',resId:'R004',date:todayISO(),time:'16:00',urgency:'Routine',notes:'Post-op gait training',status:'Confirmed'}
]);
let prescriptionsData = loadStore('ehmr_prescriptions', []);
let reminderInterval = null, remindedDoses = new Set();

function sendWhatsApp(phone, text) {
  if (!phone) { toast('No phone number on file', 'error'); return; }
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
}
function waNote() { return `<div class="wa-note">Opens WhatsApp Web or your WhatsApp app.</div>`; }
function showAppointmentConfirmation(appt) {
  const r = RESIDENTS.find(x => x.id === appt.patientId) || RESIDENTS[0];
  const reminder = `Reminder: ${r.name} has an appointment with ${appt.doctorName} on ${displayDate(appt.date)} at ${displayTime(appt.time)}. Please confirm attendance.`;
  const summary = `EHMR AI Appointment ${appt.id || 'APT'}\nPatient: ${r.name}\nDoctor: ${appt.doctorName}\nDate: ${displayDate(appt.date)}\nTime: ${displayTime(appt.time)}\nReason: ${appt.reason || 'Doctor review'}`;
  openDrawer('Appointment Confirmed', appt.id || 'APT', `<div class="rx-card"><div style="font-size:18px;font-weight:900">${appt.id || 'APT-' + Date.now()}</div><div class="info-row"><div class="info-lbl">Patient</div><div class="info-val">${r.name}</div></div><div class="info-row"><div class="info-lbl">Doctor</div><div class="info-val">${appt.doctorName}</div></div><div class="info-row"><div class="info-lbl">When</div><div class="info-val">${displayDate(appt.date)} at ${displayTime(appt.time)}</div></div><div class="form-actions"><button class="btn btn-primary" onclick="sendWhatsApp('${r.phone}','${reminder.replace(/'/g,"\\'")}')">Set Reminder</button><button class="btn btn-outline" onclick="sendWhatsApp('${r.phone}','${summary.replace(/'/g,"\\'")}')">Send to WhatsApp</button></div>${waNote()}</div>`);
}
async function featureAI(featureContext, context, fallback) {
  try {
    const res = await fetch(AI_PROXY_URL, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({featureContext, context})});
    if (!res.ok) throw new Error('AI unavailable');
    return await res.json();
  } catch (e) {
    console.warn(e);
    return typeof fallback === 'function' ? fallback() : fallback;
  }
}

function baselineFor(resId) {
  const rows = (vitalsData[resId] || []).slice(0, 14);
  const keys = [
    ['BP Sys','bp_s','mmHg'], ['BP Dia','bp_d','mmHg'], ['SpO2','spo2','%'],
    ['Pulse','pulse','bpm'], ['Glucose','glucose','mg/dL'], ['Weight','weight','kg']
  ];
  const latest = rows[0] || {};
  return keys.map(([label,key,unit]) => {
    const vals = rows.map(v => v[key]).filter(v => Number.isFinite(v));
    if (!vals.length) return null;
    const avg = vals.reduce((a,b)=>a+b,0) / vals.length;
    const sd = Math.sqrt(vals.reduce((a,b)=>a + Math.pow(b - avg, 2),0) / vals.length) || avg * .04;
    const low = Math.round((avg - sd * 1.25) * 10) / 10;
    const high = Math.round((avg + sd * 1.25) * 10) / 10;
    const today = latest[key];
    return {label,key,unit,low,high,today,inside:today >= low && today <= high,drift:today > high ? '↑ outside' : today < low ? '↓ outside' : 'within'};
  }).filter(Boolean);
}
const DEMO_ANOMALY_TIMELINE = [
  {date:'2026-04-28', metric:'BP Sys', value:'158 mmHg', deviation:'+12%', severity:'medium', note:'Above personal baseline'},
  {date:'2026-04-15', metric:'SpO2', value:'91%', deviation:'-3%', severity:'low', note:'Slight dip, self-resolved'},
  {date:'2026-03-30', metric:'Weight', value:'73.2 kg', deviation:'+8%', severity:'low', note:'Gradual increase noted'}
];
function demoAnomaliesFor(resId) {
  try {
    const stored = JSON.parse(localStorage.getItem(`ehmr_anomalies_${resId}`) || '[]');
    if (Array.isArray(stored) && stored.length) return stored;
  } catch (e) {}
  return resId === 'R001' ? DEMO_ANOMALY_TIMELINE : [];
}
function anomalySeverityClass(severity) {
  const value = String(severity || 'low').toLowerCase();
  if (value === 'severe' || value === 'high') return 'badge-critical';
  if (value === 'medium' || value === 'moderate') return 'badge-monitor';
  return 'badge-teal';
}
function anomalyTimeline(resId) {
  const data = (vitalsData[resId] || []).slice(0, 14);
  const out = [];
  const units = {spo2:'%', pulse:'bpm', glucose:'mg/dL', bp_s:'mmHg', weight:'kg'};
  const add = (metric, note, severity, key, t, deviation) => {
    const latest = data[0] || {};
    const value = Number.isFinite(latest[key]) ? `${latest[key]} ${units[key] || ''}`.trim() : 'Review';
    out.push({id:'AN-' + out.length, date:(t || latest.t || new Date().toISOString()).slice(0,10), metric, value, deviation:deviation || 'trend', severity:String(severity || 'low').toLowerCase(), note});
  };
  [['SpO2','spo2','down'],['Pulse','pulse','up'],['Glucose','glucose','up'],['BP Sys','bp_s','up'],['Weight','weight','up']].forEach(([label,key,dir]) => {
    const vals = data.slice(0,3).map(v => v[key]).filter(v => Number.isFinite(v));
    if (vals.length === 3 && ((dir === 'up' && vals[0] > vals[1] && vals[1] > vals[2]) || (dir === 'down' && vals[0] < vals[1] && vals[1] < vals[2]))) {
      const pct = vals[2] ? Math.round(((vals[0] - vals[2]) / vals[2]) * 100) : 0;
      add(label, `${label} ${dir === 'up' ? 'rising' : 'declining'} 3 days in a row`, key === 'spo2' ? 'medium' : 'low', key, data[0]?.t, `${pct > 0 ? '+' : ''}${pct}%`);
    }
  });
  const night = data.filter(v => new Date(v.t).getHours() >= 18).map(v=>v.bp_s).filter(Boolean);
  const day = data.filter(v => new Date(v.t).getHours() < 18).map(v=>v.bp_s).filter(Boolean);
  if (night.length >= 2 && day.length >= 2 && night.reduce((a,b)=>a+b,0)/night.length > day.reduce((a,b)=>a+b,0)/day.length + 8) add('BP', 'Night BP consistently higher than daytime', 'medium', 'bp_s');
  const postMeal = data.filter(v => /post|lunch|breakfast|meal/i.test(v.notes || '')).map(v=>v.glucose).filter(Boolean);
  const fasting = data.filter(v => /fasting|morning/i.test(v.notes || '')).map(v=>v.glucose).filter(Boolean);
  if (postMeal.length && fasting.length && Math.max(...postMeal) > Math.max(...fasting) + 35) add('Glucose', 'Post-meal glucose spike compared with fasting readings', 'medium', 'glucose');
  if (data[0] && data[1] && data[0].spo2 < data[1].spo2 && data[0].pulse > data[1].pulse) add('SpO2 + Pulse', 'SpO2 dropping alongside rising pulse', 'severe', 'spo2');
  return out.length ? out : demoAnomaliesFor(resId);
}
function baselineHTML(resId) {
  return `<div class="card"><div class="card-hdr"><div class="card-ttl">Personal Baseline</div><span class="badge badge-teal">Last 14 vitals</span></div>
    ${baselineFor(resId).map(b => `<div class="baseline-row"><div><strong>${b.label}</strong><div style="font-size:11px;color:var(--g500)">Normal ${b.low}-${b.high} ${b.unit}</div></div><div style="font-family:var(--mono);font-weight:900">${b.today ?? '—'} ${b.unit}</div><span class="badge ${b.inside ? 'badge-stable' : 'badge-critical'}">${b.drift}</span></div>`).join('') || '<div class="empty-state"><span class="empty-ico">🔍</span><div class="empty-txt">Add vitals to compute baseline</div></div>'}
  </div>`;
}
function anomalyHTML(resId) {
  const rows = anomalyTimeline(resId);
  return `<div class="card"><div class="card-hdr"><div class="card-ttl">Anomaly Timeline</div><button class="btn btn-outline btn-sm" onclick="explainAnomalies('${resId}')">Get AI Explanation</button></div>
    <div class="timeline-compact">${rows.map(a => `<div class="anomaly-row">
      <div class="anomaly-date">${displayDate(a.date)}</div>
      <span class="pill">${escapeHTML(a.metric)}</span>
      <strong>${escapeHTML(a.value)}</strong>
      <span class="badge ${anomalySeverityClass(a.severity)}">${escapeHTML(a.deviation)}</span>
      <span>${escapeHTML(a.note)}</span>
    </div>`).join('') || '<div class="empty-state"><span class="empty-ico">✓</span><div class="empty-txt">No pattern anomalies detected</div></div>'}</div>
  </div>`;
}
async function explainAnomalies(resId) {
  const fallback = () => ({riskLevel:'Medium', score:78, visitWindow:'Routine review within 7 days', insight:'Pattern review: compare these findings with symptoms, medication timing, meals, and activity before changing care.', recommendation:'Continue monitoring and arrange a routine clinician review if the pattern persists.', actions:[]});
  const result = await featureAI('anomaly_explanation', {resident:aiPatientPayload(resId), anomalies:anomalyTimeline(resId), baseline:baselineFor(resId)}, fallback);
  openDrawer('AI Anomaly Explanation', patientName(resId), aiExplanationHTML(result, {riskLevel:'Medium', score:78, visitWindow:'Routine review within 7 days'}));
}
function labSummaryHTML(resId) {
  const rows = (labsData[resId] || []).filter(l => (l.workflow || 'Published') === 'Published').slice(0, 3);
  return `<div class="card"><div class="card-hdr"><div class="card-ttl">Lab Summary</div><button class="btn btn-outline btn-sm" onclick="openLabLedgerList('${resId}')">View Full Ledger</button></div>${rows.map(l=>`<div class="lab-row"><div class="lab-test">${l.test}</div><div class="lab-val">${l.result} ${l.unit}</div>${labBadge(l.status)}</div>`).join('') || '<div class="empty-state"><span class="empty-ico">🔬</span><div class="empty-txt">No published labs</div></div>'}</div>`;
}
function medHistoryHTML(resId) {
  const rows = prescriptionsData.filter(p => p.resId === resId);
  return `<div class="card"><div class="card-hdr"><div class="card-ttl">Medication History Match</div></div><div class="tbl-wrap"><table><thead><tr><th>Date</th><th>Drug/Class</th><th>Dose</th><th>Status</th></tr></thead><tbody>${rows.map(p => (p.meds || []).map(m => `<tr><td>${p.date}</td><td>${m.name || m.drug}</td><td>${m.dose || ''} ${m.frequency || ''}</td><td><span class="badge badge-stable">Completed</span></td></tr>`).join('')).join('') || '<tr><td colspan="4">No saved prescriptions yet</td></tr>'}</tbody></table></div></div>`;
}
function openDrawer(title, sub, html) {
  document.getElementById('drawer-title').textContent = title;
  document.getElementById('drawer-sub').textContent = sub || '';
  document.getElementById('drawer-body').innerHTML = html;
  document.getElementById('feature-drawer').classList.add('open');
}
function closeDrawer() { document.getElementById('feature-drawer').classList.remove('open'); }
function clinicalActionAllowed() {
  return ['doctor', 'admin', 'staff'].includes(currentRole);
}
function clinicalActionClass() {
  return clinicalActionAllowed() ? '' : 'hidden';
}

const _viewResBase = viewRes;
viewRes = function(id) {
  _viewResBase(id);
  const dv = document.getElementById('res-detail');
  const r = RESIDENTS.find(x => x.id === id);
  if (!dv || !r) return;
  const active = unacked().find(a => a.res === r.name);
  const extras = `
    <div class="res-actions">
      <button class="btn btn-outline btn-sm ${clinicalActionClass()}" onclick="openConsultation('${id}')">🎙️ Record Consultation</button>
      <button class="btn btn-outline btn-sm" onclick="openMedOrderModal('${id}')">📦 Book Medication Delivery</button>
      <button class="btn btn-primary btn-sm ${clinicalActionClass()} ${active ? '' : 'hidden'}" onclick="openCaregiverAssign('${id}','${active?.type || 'care'}')">Assign Caregiver</button>
    </div>
    ${baselineHTML(id)}
    <div class="feature-tabs"><button class="tab-btn active">🔍 Anomalies</button><button class="tab-btn">Medication History</button></div>
    ${anomalyHTML(id)}
    ${medHistoryHTML(id)}
    ${labSummaryHTML(id)}`;
  dv.insertAdjacentHTML('beforeend', extras);
};

function miniCalendarStrip() {
  const days = Array.from({length:5}, (_, i) => todayISO(i));
  return `<div class="card"><div class="card-hdr"><div class="card-ttl">Upcoming Appointments</div><button class="btn btn-outline btn-sm" onclick="nav('book')">Book</button></div><div class="appt-calendar">${days.map(d => {
    const count = appointmentsData.filter(a => a.date === d && appointmentStatus(a) === 'Scheduled').length;
    return `<div class="cal-day ${count?'has-appt':''}"><div class="cal-date">${new Date(d+'T00:00:00').toLocaleDateString('en-IN',{day:'2-digit',month:'short'})}</div>${count ? count + ' appointment' + (count>1?'s':'') : 'Free'}</div>`;
  }).join('')}</div></div>`;
}
function doctorPriorityTasks() {
  const today = todayISO();
  const todayAppointments = appointmentsData
    .filter(a => a.date === today && appointmentStatus(a) === 'Scheduled')
    .map(a => ({
      time:a.time,
      priority:(a.risk || localAIInsight(a.patientId).riskLevel) === 'High' ? 1 : 2,
      title:`Visit ${patientName(a.patientId)}`,
      detail:`${a.reason || 'Doctor review'} · ${a.doctorName}`,
      badge:a.risk || localAIInsight(a.patientId).riskLevel,
      action:`openAppointmentModal('${a.patientId}','${a.risk || 'Routine'}','${(a.reason || 'Doctor review').replace(/'/g, "\\'")}')`
    }));
  const alertTasks = unacked().map(a => ({
    time:'',
    priority:a.sev === 'critical' ? 1 : a.sev === 'warning' ? 2 : 3,
    title:`Review alert: ${a.res}`,
    detail:`${a.room} · ${a.msg}`,
    badge:a.sev === 'critical' ? 'Critical' : a.sev === 'warning' ? 'Warning' : 'Info',
    action:`nav('alerts')`
  }));
  const riskTasks = RESIDENTS.map(r => ({r, assessment:healthAssessment(r.id)}))
    .filter(x => x.assessment.riskLevel === 'High' || x.assessment.visitNeeded || x.assessment.score < 75)
    .map(x => ({
      time:'',
      priority:x.assessment.riskLevel === 'High' ? 1 : 2,
      title:`Clinical review: ${x.r.name}`,
      detail:`Room ${x.r.room} · ${x.assessment.visitWindow}`,
      badge:`${x.assessment.riskLevel} · ${x.assessment.score}`,
      action:`nav('residents');setTimeout(()=>viewRes('${x.r.id}'),80)`
    }));
  const medicationTasks = Object.entries(medsData).flatMap(([resId, meds]) => meds.flatMap(m => m.times
    .filter(d => d.status === 'overdue' || d.status === 'pending')
    .map(d => ({
      time:d.t,
      priority:d.status === 'overdue' ? 1 : 3,
      title:`Medication follow-up: ${patientName(resId)}`,
      detail:`${m.name} · ${d.status}`,
      badge:d.status === 'overdue' ? 'Overdue' : 'Pending',
      action:`nav('emar')`
    }))));
  const labTasks = Object.entries(labsData).flatMap(([resId, labs]) => labs
    .filter(l => l.status !== 'normal')
    .slice(0, 1)
    .map(l => ({
      time:'',
      priority:l.status === 'high' || l.status === 'low' ? 2 : 3,
      title:`Lab review: ${patientName(resId)}`,
      detail:`${l.test} ${l.result}${l.unit || ''} · ${l.status}`,
      badge:'Lab',
      action:`nav('labs')`
    })));
  const rows = [...todayAppointments, ...alertTasks, ...riskTasks, ...medicationTasks, ...labTasks]
    .sort((a, b) => (a.priority - b.priority) || timeMinutes(a.time || '23:59') - timeMinutes(b.time || '23:59'))
    .slice(0, 8)
    .map((item, index) => ({...item, time:item.time || minuteTime(9 * 60 + index * 30)}));
  return {rows, todayAppointments};
}
function doctorDayScheduleHTML() {
  const {rows, todayAppointments} = doctorPriorityTasks();
  const criticalCount = rows.filter(r => r.priority === 1).length;
  const top = rows[0];
  const appointmentsCount = todayAppointments.length;
  const patientsCount = new Set(rows.map(item => item.title.split(': ').pop().replace('Visit ', '').replace('Review alert: ', '').replace('Medication follow-up: ', '').replace('Lab review: ', ''))).size;
  const brief = top
    ? `You have <strong>${criticalCount || rows.length} priority action${(criticalCount || rows.length) === 1 ? '' : 's'}</strong> across ${patientsCount} patient${patientsCount === 1 ? '' : 's'} today${appointmentsCount ? `, including ${appointmentsCount} appointment${appointmentsCount === 1 ? '' : 's'}` : ''}. I recommend starting with <strong>${top.title.replace(/^[^:]+: /, '').replace('Visit ', '')}</strong>, because ${top.detail.toLowerCase()}.`
    : `You have <strong>no urgent clinical actions</strong> flagged today. I recommend doing a quick resident round, then checking labs and medication adherence before new appointments are added.`;
  return `<div class="card dash-extra doctor-day-schedule copilot-brief">
    <div class="copilot-title"><span class="copilot-icon">✣</span><span>Daily Copilot Brief</span></div>
    <div class="copilot-copy">"${brief}"</div>
    <button class="copilot-link" onclick="generateDoctorActionPlan()">Generate action plan →</button>
    <div class="copilot-plan" id="doctor-action-plan"></div>
  </div>`;
}
function generateDoctorActionPlan() {
  const slot = document.getElementById('doctor-action-plan');
  if (!slot) return;
  const {rows} = doctorPriorityTasks();
  const steps = rows.slice(0, 4);
  slot.innerHTML = steps.length ? steps.map((item, index) => `
    <div class="copilot-step">
      <div class="copilot-step-num">${index + 1}</div>
      <div><strong>${displayTime(item.time)} · ${item.title}</strong>${item.detail}<br><button class="copilot-link" style="margin-top:6px;font-size:13px" onclick="${item.action}">Open task →</button></div>
    </div>`).join('') : `
    <div class="copilot-step">
      <div class="copilot-step-num">1</div>
      <div><strong>Start routine clinical round</strong>No urgent AI actions are currently flagged. Review stable residents, medication adherence, and lab queue.</div>
    </div>`;
  slot.classList.add('open');
}
function reminderQueueHTML() {
  const now = new Date(), start = now.getHours()*60 + now.getMinutes(), end = start + 120;
  const rows = [];
  Object.entries(medsData).forEach(([resId, meds]) => meds.forEach(m => m.times.forEach(d => {
    const mins = timeMinutes(d.t);
    if (mins >= start && mins <= end) rows.push({resId, med:m, dose:d, mins});
  })));
  rows.sort((a,b)=>a.mins-b.mins);
  return `<div class="card"><div class="card-hdr"><div class="card-ttl">Reminder Queue</div><span class="badge badge-teal">Next 2 hours</span></div>${rows.map(x => `<div class="queue-row"><div style="font-family:var(--mono);font-weight:900">${x.dose.t}</div><div><strong>${patientName(x.resId)}</strong><div style="font-size:11px;color:var(--g500)">${x.med.name}</div></div><button class="btn btn-outline btn-sm" onclick="markDoseGiven('${x.resId}','${x.med.id}','${x.dose.id}')">Mark Given</button></div>`).join('') || '<div class="empty-state"><span class="empty-ico">💊</span><div class="empty-txt">No doses due soon</div></div>'}</div>`;
}
function servicesTodayHTML() {
  const rows = serviceBookings.filter(s => s.date === todayISO());
  return `<div class="card"><div class="card-hdr"><div class="card-ttl">Services Today</div><button class="btn btn-outline btn-sm" onclick="nav('ledger')">Ledger</button></div>${rows.map(s => `<div class="queue-row"><div>${s.time}</div><div><strong>${s.type}</strong><div style="font-size:11px;color:var(--g500)">${patientName(s.resId)} · ${s.status}</div></div><button class="btn btn-outline btn-sm" onclick="completeService('${s.id}')">Mark Accessed</button></div>`).join('') || '<div class="empty-state"><span class="empty-ico">🛎️</span><div class="empty-txt">No services booked today</div></div>'}</div>`;
}
function patientNextStepsHTML() {
  const assessment = healthAssessment('R001');
  const hospital = selectedHospital();
  const upcoming = appointmentsData
    .filter(a => a.patientId === 'R001' && appointmentStatus(a) === 'Scheduled')
    .sort((a,b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`))[0];
  const due = [];
  (medsData.R001 || []).forEach(m => m.times
    .filter(d => d.status !== 'given')
    .forEach(d => due.push({time:d.t, name:m.name, status:d.status})));
  due.sort((a,b) => timeMinutes(a.time) - timeMinutes(b.time));
  return `<div class="card dash-extra">
    <div class="card-hdr"><div class="card-ttl">My Next Steps</div><button class="btn btn-outline btn-sm" onclick="nav('careplan')">Care Plan</button></div>
    <div class="alert-row ${assessment.visitNeeded ? 'alert-warning' : 'alert-success'}" style="margin-bottom:10px">
      <div class="alert-ico">${assessment.visitNeeded ? '📅' : '✅'}</div>
      <div class="alert-body">
        <div class="alert-title">${assessment.visitNeeded ? 'Doctor review suggested' : 'Plan looks steady'}</div>
        <div class="alert-msg">${assessment.visitWindow}</div>
      </div>
    </div>
    <div class="info-row"><div class="info-lbl">Next Visit</div><div class="info-val">${upcoming ? `${displayDate(upcoming.date)} at ${displayTime(upcoming.time)} with ${upcoming.doctorName}` : 'No visit scheduled yet'}</div></div>
    <div class="info-row"><div class="info-lbl">Next Dose</div><div class="info-val">${due[0] ? `${due[0].name} at ${due[0].time}` : 'All doses completed for today'}</div></div>
    <div class="info-row"><div class="info-lbl">Selected Hospital</div><div class="info-val">${hospital?.name || 'Choose a hospital'}${hospital?.area ? ' · ' + hospital.area : ''}</div></div>
    <div class="form-actions" style="margin-top:12px">
      <button class="btn btn-primary btn-sm" onclick="openAppointmentModal('R001','${assessment.urgency}','${assessment.visitWindow.replace(/'/g, "\\'")}')">Book Doctor Visit</button>
      <button class="btn btn-outline btn-sm" onclick="nav('vitals');setTimeout(()=>toggleForm('vform'),80)">Add Vitals</button>
      <button class="btn btn-outline btn-sm" onclick="openLabSubmitForm('R001')">Add Lab Report</button>
      <button class="btn btn-outline btn-sm" onclick="nav('insurance')">Open ABHA</button>
    </div>
  </div>`;
}
function patientHospitalHTML() {
  const hospital = selectedHospital();
  if (!hospital) return '';
  const firstBed = Object.entries(hospital.beds || {})[0];
  const bedsText = firstBed ? `${firstBed[0]} ${firstBed[1].available}/${firstBed[1].total}` : 'Beds by availability';
  return `<div class="card dash-extra selected-hospital-card">
    <div class="card-hdr"><div class="card-ttl">Selected Hospital</div><button class="btn btn-outline btn-sm" onclick="nav('hospitals')">Change</button></div>
    <div class="selected-hospital-name">${hospital.name}</div>
    <div class="selected-hospital-meta">${hospital.area || 'Hospital network'} · Rating ${hospital.rating || '4.5'} · ${hospital.status || 'Available'}</div>
    <div class="hospital-beds">${(hospital.departments || []).slice(0, 4).map(d => `<span class="badge badge-teal">${d}</span>`).join('')}</div>
    <div class="info-row"><div class="info-lbl">Services from</div><div class="info-val">${hospital.name}</div></div>
    <div class="info-row"><div class="info-lbl">Bed snapshot</div><div class="info-val">${bedsText}</div></div>
    <div class="form-actions" style="margin-top:12px">
      <button class="btn btn-primary btn-sm" onclick="openAppointmentModal('R001','Routine','Doctor visit at ${hospital.name.replace(/'/g, "\\'")}','${hospital.id}')">Book Visit</button>
      <button class="btn btn-outline btn-sm" onclick="nav('services')">View Services</button>
    </div>
  </div>`;
}
function patientServicesHTML() {
  const rows = serviceBookings.filter(s => s.resId === 'R001').slice(0, 3);
  return `<div class="card dash-extra"><div class="card-hdr"><div class="card-ttl">My Service Requests</div><button class="btn btn-outline btn-sm" onclick="nav('services')">Open</button></div>${rows.map(s => `<div class="queue-row"><div>${s.time}</div><div><strong>${s.type}</strong><div style="font-size:11px;color:var(--g500)">${s.date} · ${s.status}</div></div><span class="badge ${s.status==='Completed'?'badge-stable':s.status==='Pending'?'badge-monitor':'badge-teal'}">${s.status}</span></div>`).join('') || '<div class="empty-state"><span class="empty-ico">🛎️</span><div class="empty-txt">No service requests yet</div></div>'}</div>`;
}
const _loadDashBase = loadDash;
loadDash = function() {
  _loadDashBase();
  document.querySelectorAll('#page-dashboard .dash-extra').forEach(el => el.remove());
  const aiGrid = document.querySelector('#page-dashboard .ai-grid');
  if (aiGrid) {
    aiGrid.style.display = currentRole === 'doctor' ? 'none' : '';
    if (currentRole === 'doctor') aiGrid.insertAdjacentHTML('beforebegin', doctorDayScheduleHTML());
  }
  const rightCol = document.querySelector('#page-dashboard .grid-2 > div:last-child');
  if (rightCol) {
    if (currentRole === 'resident') rightCol.insertAdjacentHTML('afterbegin', patientNextStepsHTML() + patientHospitalHTML());
    else rightCol.insertAdjacentHTML('afterbegin', servicesTodayHTML().replace('<div class="card">', '<div class="card dash-extra">'));
  }
  const leftCol = document.querySelector('#page-dashboard .grid-2 > div:first-child');
  if (leftCol) {
    if (currentRole === 'resident') leftCol.insertAdjacentHTML('beforeend', patientServicesHTML());
    else leftCol.insertAdjacentHTML('beforeend', reminderQueueHTML().replace('<div class="card">', '<div class="card dash-extra">'));
  }
  startReminderEngine();
};

function loadBookSchedule() {
  const days = Array.from({length:7},(_,i)=>todayISO(i));
  document.getElementById('book-content').innerHTML = `${miniCalendarStrip()}<div class="card"><div class="card-hdr"><div class="card-ttl">Weekly Schedule Board</div><span class="badge badge-teal">7 days × 3 shifts</span></div><div class="schedule-grid"><div class="schedule-cell schedule-head">Shift</div>${days.map(d=>`<div class="schedule-cell schedule-head">${new Date(d+'T00:00:00').toLocaleDateString('en-IN',{weekday:'short',day:'2-digit'})}</div>`).join('')}${['Morning','Evening','Night'].map(shift => `<div class="schedule-cell schedule-head">${shift}</div>${days.map(day => { const slot = caregiverRoster.slots[`${day}|${shift}`]; return `<div class="schedule-cell" onclick="quickAssignSchedule('${day}','${shift}')"><strong>${slot?.caregiver || 'Unassigned'}</strong><br>${slot?.resId ? patientName(slot.resId) : 'Click to assign'}</div>`; }).join('')}`).join('')}</div></div>`;
  addAudit('VIEW','schedule','Weekly schedule board');
}
function quickAssignSchedule(day, shift) {
  const caregiver = prompt('Caregiver name', 'Sunita Rao');
  if (!caregiver) return;
  const resId = prompt('Resident ID', 'R001') || 'R001';
  caregiverRoster.slots[`${day}|${shift}`] = {caregiver,resId};
  saveStore('ehmr_schedule', caregiverRoster);
  addAudit('UPDATE','schedule',`${caregiver} assigned to ${patientName(resId)} on ${day} ${shift}`);
  loadBookSchedule();
  toast('Schedule updated');
}
function loadLedgerResources() {
  const totals = RESIDENTS.map(r => ({r,total:healthLedger.filter(x=>x.resId===r.id && x.date.slice(0,7)===todayISO().slice(0,7)).reduce((a,b)=>a+Number(b.cost||0),0)}));
  const facility = totals.reduce((a,b)=>a+b.total,0);
  const serviceRows = serviceBookings.map(s => ({...s, accessed:['Confirmed','Completed'].includes(s.status)}));
  const medicineRows = [
    ...Object.entries(medsData).flatMap(([resId, meds]) => meds.map(m => ({date:todayISO(),resId,type:'Active Rx',medicine:m.name,qty:m.freq || 'As advised',status:'On chart'}))),
    ...medicationOrders.map(o => ({date:o.date,resId:o.resId,type:'Medicine Order',medicine:o.med,qty:o.qty,status:o.status})),
    ...prescriptionsData.flatMap(p => (p.meds || []).map(m => ({date:p.date,resId:p.resId,type:'Doctor Prescription',medicine:m.name || m.drug,qty:[m.dose,m.frequency,m.duration].filter(Boolean).join(' '),status:'Sent to patient'})))
  ].slice(0, 30);
  document.getElementById('ledger-content').innerHTML = `<div class="grid-3" style="margin-bottom:14px"><div class="stat-card"><span class="stat-ico">₹</span><div class="stat-val" style="color:var(--teal-d)">${facility}</div><div class="stat-lbl">Monthly Facility Total</div></div><div class="stat-card"><span class="stat-ico">🛏️</span><div class="stat-val" style="color:var(--green)">${resourceState.beds.filter(b=>b.status==='Occupied').length}/6</div><div class="stat-lbl">Bed Occupancy</div></div><div class="stat-card"><span class="stat-ico">🧰</span><div class="stat-val" style="color:var(--sky)">${resourceState.equipment.filter(e=>e.status==='Available').length}</div><div class="stat-lbl">Equipment Available</div></div></div>
  <div class="grid-2"><div class="card"><div class="card-hdr"><div class="card-ttl">Health Ledger</div></div><div class="tbl-wrap"><table><thead><tr><th>Date</th><th>Resident</th><th>Type</th><th>Item</th><th>Cost</th></tr></thead><tbody>${healthLedger.map(x=>`<tr><td>${x.date}</td><td>${patientName(x.resId)}</td><td>${x.type}</td><td>${x.item}</td><td>₹${x.cost}</td></tr>`).join('')}</tbody></table></div></div>
  <div><div class="card"><div class="card-hdr"><div class="card-ttl">Monthly Totals</div></div>${totals.map(x=>`<div class="chart-row"><div class="chart-lbl">${x.r.name.split(' ')[0]}</div><div class="bar-track"><div class="bar-fill" style="width:${Math.min(x.total/3000*100,100)}%;background:var(--teal)"></div></div><div class="chart-val">₹${x.total}</div></div>`).join('')}</div>
  <div class="card"><div class="card-hdr"><div class="card-ttl">Resources</div></div>${resourceState.beds.map(b=>`<div class="info-row"><div class="info-lbl">${b.label}</div><div class="info-val">${b.status}${b.resId?' · '+patientName(b.resId):''}</div></div>`).join('')}${resourceState.equipment.map(e=>`<div class="info-row"><div class="info-lbl">${e.name}</div><div class="info-val">${e.status}</div></div>`).join('')}</div></div></div>
  <div class="grid-2" style="margin-top:14px">
    <div class="card"><div class="card-hdr"><div><div class="card-ttl">Patient Service Access</div><div class="page-sub">Shows services patients have requested or accessed</div></div></div><div class="tbl-wrap"><table><thead><tr><th>Ref</th><th>Resident</th><th>Service</th><th>Date</th><th>Access Mark</th><th>Status</th></tr></thead><tbody>${serviceRows.map(s=>`<tr><td>${s.id}</td><td>${patientName(s.resId)}</td><td>${s.type}</td><td>${s.date} ${s.time}</td><td><span class="badge ${s.accessed?'badge-stable':'badge-monitor'}">${s.accessed?'Accessed':'Requested'}</span></td><td>${statusBadge(s.status)}</td></tr>`).join('') || '<tr><td colspan="6">No service access records</td></tr>'}</tbody></table></div></div>
    <div class="card"><div class="card-hdr"><div><div class="card-ttl">Medicine Ledger</div><div class="page-sub">Active medicines, doctor prescriptions, and delivery orders</div></div></div><div class="tbl-wrap"><table><thead><tr><th>Date</th><th>Resident</th><th>Type</th><th>Medicine</th><th>Qty / Dose</th><th>Status</th></tr></thead><tbody>${medicineRows.map(m=>`<tr><td>${m.date}</td><td>${patientName(m.resId)}</td><td>${m.type}</td><td>${m.medicine}</td><td>${m.qty || 'As advised'}</td><td><span class="badge badge-teal">${m.status}</span></td></tr>`).join('') || '<tr><td colspan="6">No medicine records</td></tr>'}</tbody></table></div></div>
  </div>`;
  addAudit('VIEW','ledger_resources','Ledger and resource panel');
}

function serviceCatalog() {
  const hospital = selectedHospital();
  const hasIcu = (hospital?.beds?.ICU?.available || 0) > 0;
  const hasPrivate = (hospital?.beds?.['Private Room']?.available || 0) > 0;
  const hasGeneral = (hospital?.beds?.['General Ward']?.available || 0) > 0;
  const hasCardiology = hospital?.departments?.includes('Cardiology');
  const hasOrtho = hospital?.departments?.includes('Orthopedics');
  return [
    ['Doctor Appointment','📅',`${hospital?.doctors?.[0] || 'Doctor'} · by availability`,'Available'],
    ['Home Visit','🏠',hasGeneral ? 'Today 18:00' : 'Next available tomorrow',hasGeneral ? 'Available' : 'Next Slot'],
    ['Home Lab Collection','🧪',hospital?.departments?.includes('General') ? 'Tomorrow 07:30' : 'Partner slot tomorrow',hospital?.departments?.includes('General') ? 'Available' : 'Next Slot'],
    ['Non-Emergency Transport','🚑',hasIcu || hasPrivate ? 'Next slot 14:00' : 'Limited fleet','Busy'],
    ['Pharmacy Delivery','💊','2 hours','Available'],
    ['Physiotherapy Session','🧘',hasOrtho ? 'Today 16:00' : 'Referral required',hasOrtho ? 'Available' : 'Next Slot'],
    ['Dietitian Consultation','🍱',hasCardiology || hospital?.departments?.includes('General') ? 'Tomorrow' : 'Teleconsult tomorrow','Next Slot'],
    ['Housekeeping / Room Sanitization','🧹',hasPrivate ? '45 min' : 'By request',hasPrivate ? 'Available' : 'Next Slot']
  ];
}
function loadServices() {
  const hospital = selectedHospital();
  const scoped = currentRole === 'resident'
    ? serviceBookings.filter(s=>s.resId==='R001' && (!s.hospitalId || s.hospitalId === selectedHospitalId))
    : serviceBookings.filter(s => !s.hospitalId || s.hospitalId === selectedHospitalId);
  document.getElementById('services-content').innerHTML = `
  <div class="card selected-hospital-card">
    <div class="card-hdr"><div class="card-ttl">Services at ${hospital?.name || 'Selected Hospital'}</div><button class="btn btn-outline btn-sm" onclick="nav('hospitals')">Change Hospital</button></div>
    <div class="selected-hospital-meta">${hospital?.area || ''} · ${hospital?.status || 'Available'} · ${(hospital?.departments || []).slice(0, 4).join(', ')}</div>
  </div>
  <div class="service-grid">${serviceCatalog().map(([name,icon,eta,avail])=>`<div class="service-tile"><div class="service-icon">${icon}</div><div style="font-size:16px;font-weight:900;color:var(--g800)">${name}</div><div style="font-size:12px;color:var(--g500);margin:5px 0">${eta}</div><span class="badge ${avail==='Available'?'badge-stable':avail==='Busy'?'badge-monitor':'badge-teal'}">${avail}</span><div style="font-size:11px;color:var(--g400);margin-top:8px">${hospital?.name || 'Selected hospital'}</div><div style="margin-top:12px"><button class="btn btn-primary btn-sm" onclick="${name==='Doctor Appointment'?'openAppointmentModal()':`openServiceModal('${name.replace(/'/g,"\\'")}')`}">Book Now</button></div></div>`).join('')}</div>
  <div class="card" style="margin-top:14px"><div class="card-hdr"><div class="card-ttl">${currentRole === 'resident' ? 'My Service Requests' : 'Service Requests'} · ${hospital?.name || 'Selected Hospital'}</div></div><div class="tbl-wrap"><table><thead><tr><th>Ref</th><th>Service</th><th>Hospital</th><th>Resident</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead><tbody>${scoped.map(s=>`<tr><td>${s.id}</td><td>${s.type}</td><td>${s.hospitalName || hospital?.name || 'Selected hospital'}</td><td>${patientName(s.resId)}</td><td>${s.date} ${s.time}</td><td>${statusBadge(s.status)}</td><td>${s.status==='Pending'?`<button class="btn btn-outline btn-sm" onclick="cancelService('${s.id}')">Cancel</button>`:''}</td></tr>`).join('') || '<tr><td colspan="7">No service requests for this hospital</td></tr>'}</tbody></table></div></div>`;
  addAudit('VIEW','services','Service booking hub');
}
function openServiceModal(type) {
  document.getElementById('service-modal').classList.add('open');
  document.getElementById('svc-type').value = type;
  document.getElementById('svc-resident').innerHTML = RESIDENTS.slice(0,4).map(r=>`<option value="${r.id}">${r.name}</option>`).join('');
  document.getElementById('svc-resident').value = currentRole === 'resident' ? 'R001' : 'R001';
  document.getElementById('svc-date').value = todayISO(1);
  document.getElementById('svc-time').value = '10:00';
  document.getElementById('svc-confirm').innerHTML = '';
}
function closeServiceModal() { document.getElementById('service-modal').classList.remove('open'); }
function saveServiceBooking() {
  const hospital = selectedHospital();
  const item = {id:'SRV-'+Date.now(),type:document.getElementById('svc-type').value,resId:document.getElementById('svc-resident').value,date:document.getElementById('svc-date').value,time:document.getElementById('svc-time').value,urgency:document.getElementById('svc-urgency').value,notes:document.getElementById('svc-notes').value,status:'Pending',hospitalId:selectedHospitalId,hospitalName:hospital?.name || ''};
  setTimeout(() => {
    serviceBookings.unshift(item); saveStore('ehmr_service_bookings', serviceBookings);
    addAudit('CREATE','service_booking',`${item.type} for ${patientName(item.resId)}`);
    document.getElementById('svc-confirm').innerHTML = `<div class="alert-row alert-info" style="margin-top:12px"><div class="alert-ico">✓</div><div class="alert-body"><div class="alert-title">Booking ${item.id} confirmed</div><div class="alert-msg">${item.type} at ${item.hospitalName || 'selected hospital'} for ${patientName(item.resId)} on ${item.date} at ${item.time}</div><button class="btn btn-outline btn-sm" onclick="sendWhatsApp('${RESIDENTS.find(r=>r.id===item.resId).phone}','EHMR AI service booking ${item.id}: ${item.type} at ${item.hospitalName || 'selected hospital'} on ${item.date} at ${item.time}.')">Notify on WhatsApp</button>${waNote()}</div></div>`;
    toast('Service booking created');
  }, 400);
}
function cancelService(id) { const s = serviceBookings.find(x=>x.id===id); if (s) s.status='Cancelled'; saveStore('ehmr_service_bookings', serviceBookings); addAudit('UPDATE','service_booking',`${id} cancelled`); loadServices(); toast('Service cancelled'); }
function completeService(id) { const s = serviceBookings.find(x=>x.id===id); if (s) s.status='Completed'; saveStore('ehmr_service_bookings', serviceBookings); addAudit('UPDATE','service_booking',`${id} completed`); loadDash(); toast('Service marked complete'); }

function markDoseGiven(resId, medId, doseId) {
  const med = (medsData[resId] || []).find(m=>m.id===medId); const dose = med?.times.find(t=>t.id===doseId);
  if (!dose || dose.status === 'given') return;
  dose.status = 'given'; dose.adm = currentRole === 'doctor' ? 'Dr. Priya Nair' : RESIDENTS.find(r=>r.id===resId)?.caregiver;
  addAudit('UPDATE','emar',`${med.name} marked given for ${patientName(resId)}`);
  toast('Dose marked given');
  if (_currentPage === 'dashboard') loadDash();
  if (_currentPage === 'emar') loadEmar(selEmar);
}
function startReminderEngine() {
  if (reminderInterval) clearInterval(reminderInterval);
  reminderInterval = setInterval(checkMedReminders, 60000);
  checkMedReminders();
}
function checkMedReminders() {
  const now = new Date(), mins = now.getHours()*60 + now.getMinutes();
  Object.entries(medsData).forEach(([resId, meds]) => meds.forEach(m => m.times.forEach(d => {
    if (d.status === 'given') return;
    const due = timeMinutes(d.t), key = `${resId}-${m.id}-${d.id}-${new Date().toDateString()}`;
    if (due - mins <= 15 && due - mins >= 0 && !remindedDoses.has(key)) {
      remindedDoses.add(key); showReminderToast(resId, m, d);
    }
    if (mins - due > 30 && !remindedDoses.has(key + '-wa')) {
      remindedDoses.add(key + '-wa');
      const cg = CAREGIVERS.find(c => c.name === RESIDENTS.find(r=>r.id===resId)?.caregiver);
      if (cg) sendWhatsApp(cg.phone, `Medication overdue: ${patientName(resId)} has ${m.name} due at ${d.t}. Please update eMAR.`);
    }
  })));
}
function showReminderToast(resId, med, dose) {
  const stack = document.getElementById('reminder-toasts');
  if (!stack) return;
  const id = 'rt-' + Date.now();
  stack.insertAdjacentHTML('beforeend', `<div class="persistent-toast" id="${id}"><div style="display:flex;justify-content:space-between;gap:8px"><strong style="color:var(--coral)">Medication due</strong><button class="modal-close" style="width:26px;height:26px" onclick="document.getElementById('${id}').remove()">×</button></div><div style="font-size:12px;color:var(--g600);margin:5px 0">${patientName(resId)} · ${med.name} · ${dose.t}</div><button class="btn btn-primary btn-sm" onclick="markDoseGiven('${resId}','${med.id}','${dose.id}');document.getElementById('${id}').remove()">Mark Given</button></div>`);
}
function openMedOrderModal(resId = selEmar) {
  document.getElementById('med-order-modal').classList.add('open');
  document.getElementById('mo-resident').value = resId;
  document.getElementById('mo-med').innerHTML = (medsData[resId] || []).map(m=>`<option>${m.name}</option>`).join('');
  document.getElementById('mo-date').value = todayISO(2);
}
function closeMedOrderModal() { document.getElementById('med-order-modal').classList.remove('open'); }
function saveMedicationOrder() {
  const resId = document.getElementById('mo-resident').value;
  const order = {id:'MO-'+Date.now(),resId,med:document.getElementById('mo-med').value,qty:document.getElementById('mo-qty').value || '30 tablets',date:document.getElementById('mo-date').value,notes:document.getElementById('mo-notes').value,status:'Pending'};
  medicationOrders.unshift(order); saveStore('ehmr_med_orders', medicationOrders);
  addAudit('CREATE','medication_order',`${order.med} for ${patientName(resId)}`);
  closeMedOrderModal(); toast('Medication delivery order created');
  if (_currentPage === 'emar') loadEmar(selEmar);
}
const _loadEmarBase = loadEmar;
loadEmar = function(id) {
  _loadEmarBase(id);
  const target = document.getElementById('emar-content');
  if (!target) return;
  const orders = medicationOrders.filter(o => o.resId === selEmar);
  target.insertAdjacentHTML('beforeend', `<div class="card"><div class="card-hdr"><div class="card-ttl">📦 Med Orders</div><button class="btn btn-primary btn-sm" onclick="openMedOrderModal('${selEmar}')">Book Medication Delivery</button></div><div class="tbl-wrap"><table><thead><tr><th>Order</th><th>Medication</th><th>Qty</th><th>Expected</th><th>Status</th><th>Actions</th></tr></thead><tbody>${orders.map(o=>`<tr><td>${o.id}</td><td>${o.med}</td><td>${o.qty}</td><td>${o.date}</td><td><select class="order-status-select ${medOrderStatusClass(o.status)}" onchange="updateMedOrder('${o.id}',this.value);setMedOrderSelectClass(this)">${['Pending','Confirmed','Dispatched','Delivered'].map(s=>`<option ${o.status===s?'selected':''}>${s}</option>`).join('')}</select></td><td><button class="btn btn-outline btn-sm" onclick="sendMedOrderUpdate('${o.id}')">Send Update to Family</button></td></tr>`).join('') || '<tr><td colspan="6">No medication delivery orders</td></tr>'}</tbody></table></div>${waNote()}</div>`);
};
function medOrderStatusClass(status) {
  return 'status-' + String(status || 'Pending').toLowerCase().replace(/\s+/g, '-');
}
function setMedOrderSelectClass(select) {
  select.className = `order-status-select ${medOrderStatusClass(select.value)}`;
}
function updateMedOrder(id,status) { const o = medicationOrders.find(x=>x.id===id); if (o) o.status=status; saveStore('ehmr_med_orders', medicationOrders); addAudit('UPDATE','medication_order',`${id} ${status}`); toast('Medication order updated'); }
function sendMedOrderUpdate(id) { const o = medicationOrders.find(x=>x.id===id); const r = RESIDENTS.find(x=>x.id===o.resId); sendWhatsApp(r.phone, `Medication update for ${r.name}: ${o.med} order is ${o.status}. Expected by ${o.date}.`); }

function openCaregiverAssign(resId, reason) {
  if (!clinicalActionAllowed()) {
    toast('This clinical action is available only to care team roles', 'warning');
    return;
  }
  const activeNames = Object.values(caregiverRoster.slots).map(s=>s.caregiver);
  const available = CAREGIVERS.filter(c => !activeNames.includes(c.name) || c.name === RESIDENTS.find(r=>r.id===resId)?.caregiver);
  openDrawer('Assign Caregiver', patientName(resId), available.map(c=>`<div class="list-item"><strong>${c.name}</strong><span>${c.phone}</span><div style="margin-top:8px"><button class="btn btn-primary btn-sm" onclick="assignCaregiver('${resId}','${c.name}','${reason}')">Assign 2 Hours</button></div></div>`).join(''));
}
function assignCaregiver(resId, caregiver, reason) {
  const key = `${todayISO()}|${new Date().getHours() >= 18 ? 'Night' : new Date().getHours() >= 12 ? 'Evening' : 'Morning'}`;
  caregiverRoster.slots[key] = {caregiver,resId,coverage:'2 hours',reason};
  saveStore('ehmr_schedule', caregiverRoster);
  const c = CAREGIVERS.find(x=>x.name===caregiver);
  if (c) sendWhatsApp(c.phone, `EHMR AI Assignment: You have been assigned to ${patientName(resId)} from ${new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})} for 2 hours. Reason: ${reason}. Please confirm.`);
  addAudit('CREATE','caregiver_assignment',`${caregiver} to ${patientName(resId)} for ${reason}`);
  closeDrawer(); toast('Caregiver assigned');
}
const _loadAlertsBase = loadAlerts;
loadAlerts = function() {
  _loadAlertsBase();
  document.querySelectorAll('#alerts-list .alert-row').forEach((row, i) => {
    const a = ALERTS[i];
    if (a && !a.acked) row.insertAdjacentHTML('beforeend', `<button class="ack-btn ${clinicalActionClass()}" onclick="openCaregiverAssign('${(RESIDENTS.find(r=>r.name===a.res)||{}).id || 'R001'}','${a.type}')">ASSIGN</button>`);
  });
  appendHospitalAlertsPage();
};

function sparkline(vals) {
  vals = vals.map(Number).filter(Number.isFinite).slice(-5);
  if (vals.length < 2) return '';
  const min = Math.min(...vals), max = Math.max(...vals), span = max - min || 1;
  const pts = vals.map((v,i)=>`${i*18},${22 - ((v-min)/span)*18 + 1}`).join(' ');
  return `<svg class="spark" viewBox="0 0 76 24"><polyline points="${pts}" fill="none" stroke="#00897B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}
function parseRef(ref, low, high) {
  if (Number.isFinite(low) && Number.isFinite(high)) return {low, high};
  const nums = String(ref || '').match(/[\d.]+/g)?.map(Number) || [];
  if (String(ref).includes('<')) return {low:-Infinity, high:nums[0]};
  if (String(ref).includes('>')) return {low:nums[0], high:Infinity};
  return {low:nums[0] ?? -Infinity, high:nums[1] ?? Infinity};
}
function classifyLab(value, low, high) {
  const v = Number(value), refMid = Number.isFinite(high) && Number.isFinite(low) ? (low + high) / 2 : (Number.isFinite(high) ? high : low);
  let status = 'normal', dev = 0;
  if (Number.isFinite(v) && v < low) { status='low'; dev = Math.abs((low - v) / (refMid || low || 1)) * 100; }
  if (Number.isFinite(v) && v > high) { status='high'; dev = Math.abs((v - high) / (refMid || high || 1)) * 100; }
  const severity = dev > 40 ? 'Severe' : dev > 20 ? 'Moderate' : dev > 10 ? 'Mild' : 'Normal';
  return {status,severity,dev:Math.round(dev)};
}
function workflowClass(status) {
  return 'workflow-' + String(status || 'Published').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
function setWorkflowSelectClass(select) {
  select.className = `workflow-select ${workflowClass(select.value)}`;
}
const DEMO_LAB_LEDGER = [
  {date:'2026-04-05', test:'HbA1c', lab:'Apollo Diagnostics', result:'7.8', unit:'%', status:'HIGH', note:'Above target'},
  {date:'2026-03-20', test:'Creatinine', lab:'Metropolis', result:'1.1', unit:'mg/dL', status:'NORMAL', note:'Stable'},
  {date:'2026-03-01', test:'Cholesterol', lab:'SRL Diagnostics', result:'210', unit:'mg/dL', status:'HIGH', note:'Diet review advised'},
  {date:'2026-02-10', test:'Hemoglobin', lab:'Apollo Diagnostics', result:'12.4', unit:'g/dL', status:'LOW', note:'Monitor iron levels'}
];
function fullLabLedgerRows(resId) {
  const rows = (labsData[resId] || []).filter(l => (l.workflow || 'Published') === 'Published');
  if (!rows.length) return DEMO_LAB_LEDGER;
  return rows.map((l, index) => ({
    date:l.date || todayISO(-index),
    test:l.test,
    lab:l.lab || l.by || 'Apollo Diagnostics',
    result:l.result,
    unit:l.unit || '',
    status:String(l.status || 'normal').toUpperCase(),
    note:l.note || (l.status === 'normal' ? 'Stable' : 'Review advised')
  }));
}
function openLabSubmitForm(resId = selLabs) {
  selLabs = currentRole === 'resident' ? 'R001' : resId;
  if (_currentPage !== 'labs') nav('labs');
  else loadLabs(selLabs);
  closeDrawer();
  setTimeout(() => {
    const form = document.getElementById('lab-ledger-form');
    if (!form) return;
    form.style.display = 'block';
    form.classList.add('open');
    form.scrollIntoView({behavior:'smooth', block:'start'});
  }, 80);
}
function closeLabSubmitForm() {
  const form = document.getElementById('lab-ledger-form');
  if (!form) return;
  form.classList.remove('open');
  form.style.display = 'none';
}
function openLabLedgerList(resId = 'R001') {
  const targetRes = currentRole === 'resident' ? 'R001' : resId;
  const rows = fullLabLedgerRows(targetRes);
  openDrawer('Lab Ledger', patientName(targetRes), `
    <div class="card">
      <div class="card-hdr">
        <div><div class="card-ttl">Submitted Lab Reports</div><div class="page-sub">Read-only ledger view</div></div>
        <button class="btn btn-primary btn-sm" onclick="openLabSubmitForm('${targetRes}')">+ Add Lab Report</button>
      </div>
      <div class="tbl-wrap"><table>
        <thead><tr><th>Date</th><th>Test</th><th>Lab Name</th><th>Result</th><th>Unit</th><th>Status</th><th>Note</th></tr></thead>
        <tbody>${rows.map(l => `<tr>
          <td>${escapeHTML(l.date)}</td>
          <td>${escapeHTML(l.test)}</td>
          <td>${escapeHTML(l.lab)}</td>
          <td><strong>${escapeHTML(l.result)}</strong></td>
          <td>${escapeHTML(l.unit)}</td>
          <td>${labBadge(String(l.status).toLowerCase())}</td>
          <td>${escapeHTML(l.note)}</td>
        </tr>`).join('')}</tbody>
      </table></div>
    </div>`);
}
loadLabs = function(id) {
  selLabs = currentRole === 'resident' ? 'R001' : (id || 'R001');
  document.getElementById('labs-chips').innerHTML = resChipsHTML(selLabs, 'loadLabs');
  const visible = labsData[selLabs] || [];
  document.getElementById('labs-content').innerHTML = `<div class="card"><div class="card-hdr"><div><div class="card-ttl">Lab Ledger · ${patientName(selLabs)}</div><div class="page-sub">${currentRole === 'resident' ? 'Upload reports for doctor review' : 'Draft → Reviewed → Published workflow with anomaly flagging'}</div></div><button class="btn btn-primary btn-sm" onclick="openLabSubmitForm('${selLabs}')" data-roles="doctor,resident">+ Add Lab Report</button></div>
    <div class="form-section" id="lab-ledger-form" style="display:none"><div class="form-grid"><div class="form-group"><label>Resident</label><select id="ll-res">${roleScopedResidents().map(r=>`<option value="${r.id}" ${r.id===selLabs?'selected':''}>${r.name}</option>`).join('')}</select></div><div class="form-group"><label>Test Name</label><input id="ll-test" placeholder="Creatinine"/></div><div class="form-group"><label>Test Date</label><input id="ll-date" type="date" value="${todayISO()}"/></div><div class="form-group"><label>Lab Name</label><input id="ll-lab" placeholder="Apollo Diagnostics"/></div><div class="form-group"><label>Result Value</label><input id="ll-result" type="number" step="0.01"/></div><div class="form-group"><label>Unit</label><input id="ll-unit" placeholder="mg/dL"/></div><div class="form-group"><label>Reference Low</label><input id="ll-low" type="number" step="0.01"/></div><div class="form-group"><label>Reference High</label><input id="ll-high" type="number" step="0.01"/></div><div class="form-group"><label>Photo of Lab Report</label><input id="ll-photo" type="file" accept="image/*" capture="environment" onchange="previewLabPhoto(this)"/></div></div><div id="ll-photo-preview" style="display:none;margin-top:10px"></div><div class="form-group" style="margin-top:10px"><label>Upload Note</label><input id="ll-note" placeholder="Report reference"/></div><div class="form-actions"><button class="btn btn-primary" onclick="saveLabLedger()">Submit</button><button class="btn btn-outline" onclick="closeLabSubmitForm()">Cancel</button></div></div>
    <div class="tbl-wrap"><table><thead><tr><th>Date</th><th>Resident</th><th>Test</th><th>Result</th><th>Ref Range</th><th>Status</th><th>Trend</th><th>Workflow</th><th>Actions</th></tr></thead><tbody>${visible.map(l => { const last = (labsData[selLabs] || []).filter(x=>x.test===l.test).map(x=>Number(x.result)); const wf = l.workflow || 'Published'; return `<tr><td>${l.date}</td><td>${patientName(selLabs)}</td><td>${l.test}</td><td><strong>${l.result} ${l.unit}</strong>${l.photo?'<div style="margin-top:5px"><img src="'+l.photo+'" alt="Lab report photo" style="width:54px;height:54px;object-fit:cover;border-radius:8px;border:1px solid var(--border)"/></div>':''}</td><td>${l.ref}</td><td>${labBadge(l.status)} ${l.severity?`<span class="badge badge-gray">${l.severity}</span>`:''}</td><td>${last[0] > last[1] ? '↑' : last[0] < last[1] ? '↓' : '→'} ${sparkline(last.reverse())}</td><td>${currentRole==='doctor'?`<select class="workflow-select ${workflowClass(wf)}" onchange="setWorkflowSelectClass(this);changeLabWorkflow('${l.id}',this.value)">${['Patient Submitted','Draft','Reviewed','Published'].map(s=>`<option ${((l.workflow || 'Published')===s)?'selected':''}>${s}</option>`).join('')}</select>`:`<span class="workflow-select ${workflowClass(wf)}" style="display:inline-flex">${wf}</span>`}</td><td>${l.photo?`<button class="btn btn-outline btn-sm" onclick="openLabPhoto('${l.id}')">View Photo</button>`:''}${l.status !== 'normal'?`<button class="btn btn-outline btn-sm" onclick="explainLab('${l.id}')">🤖 Explain</button>`:''}</td></tr>`; }).join('') || '<tr><td colspan="9">No lab reports</td></tr>'}</tbody></table></div></div>`;
  applyRoleAccess(); addAudit('VIEW','labs',patientName(selLabs));
};
function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    if (!file) { resolve(''); return; }
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
async function previewLabPhoto(input) {
  const file = input.files && input.files[0];
  const box = document.getElementById('ll-photo-preview');
  if (!box) return;
  if (!file) { box.style.display = 'none'; box.innerHTML = ''; return; }
  const src = await readFileAsDataURL(file);
  box.style.display = '';
  box.innerHTML = `<div class="alert-row alert-info" style="margin-bottom:0"><div class="alert-ico">IMG</div><div class="alert-body"><div class="alert-title">${file.name}</div><div class="alert-msg">Photo attached to this lab report.</div></div><img src="${src}" alt="Lab report preview" style="width:70px;height:70px;object-fit:cover;border-radius:8px;border:1px solid var(--border)"/></div>`;
}
async function saveLabLedger() {
  const resId = currentRole === 'resident' ? 'R001' : document.getElementById('ll-res').value, low = parseFloat(document.getElementById('ll-low').value), high = parseFloat(document.getElementById('ll-high').value), result = document.getElementById('ll-result').value;
  if (!document.getElementById('ll-test').value || !result) { toast('Test and result are required','error'); return; }
  const cls = classifyLab(result, low, high);
  const photoInput = document.getElementById('ll-photo');
  const photoFile = photoInput?.files?.[0];
  const photo = await readFileAsDataURL(photoFile);
  const entry = {id:'L'+Date.now(),test:document.getElementById('ll-test').value,result,unit:document.getElementById('ll-unit').value,ref:`${low}-${high}`,status:cls.status,severity:cls.severity,deviation:cls.dev,date:document.getElementById('ll-date').value,lab:document.getElementById('ll-lab').value,note:document.getElementById('ll-note').value,photo,photoName:photoFile?.name || '',workflow:currentRole === 'resident' ? 'Patient Submitted' : 'Draft',by:currentRole === 'resident' ? 'Patient / Family' : 'Dr. Priya Nair'};
  setTimeout(()=>{
    if (!labsData[resId]) labsData[resId]=[];
    labsData[resId].unshift(entry);
    apiFetch('/api/residents/' + resId, {
      method:'PUT',
      body:JSON.stringify({
        labs:(labsData[resId] || []).map(l => ({
          test:l.test,
          result:l.result,
          unit:l.unit,
          ref:l.ref,
          status:l.status,
          date:l.date
        }))
      })
    }).catch(console.warn);
    addAudit('CREATE','lab_ledger',`${entry.test} for ${patientName(resId)} (${entry.status})`);
    selLabs=resId;
    loadLabs(resId);
    toast(currentRole === 'resident' ? 'Lab report uploaded for doctor review' : 'Lab report submitted as Draft');
  },400);
}
function changeLabWorkflow(id,status) { const l = (labsData[selLabs] || []).find(x=>x.id===id); if (l) l.workflow=status; addAudit('UPDATE','lab_workflow',`${id} moved to ${status}`); toast('Lab workflow updated'); }
function openLabPhoto(id) {
  const lab = (labsData[selLabs] || []).find(x=>x.id===id);
  if (!lab?.photo) { toast('No photo attached', 'warning'); return; }
  openDrawer('Lab Report Photo', `${lab.test} · ${lab.date}`, `<img src="${lab.photo}" alt="Lab report photo" style="width:100%;border-radius:12px;border:1px solid var(--border)"/><div class="page-sub" style="margin-top:10px">${lab.photoName || 'Uploaded lab report image'}</div>`);
}
async function explainLab(id) {
  const lab = (labsData[selLabs] || []).find(x=>x.id===id);
  const result = await featureAI('lab_anomaly_explanation', {lab,resident:aiPatientPayload(selLabs),medications:medsData[selLabs]}, () => ({riskLevel:lab.status === 'high' ? 'Medium' : 'Low', score:78, visitWindow:'Routine review within 7 days', insight:`${lab.test} is ${lab.status} by ${lab.deviation || 0}% from reference. Review symptoms, hydration, medication timing, and repeat/confirm as clinically appropriate.`, recommendation:'Share this result with the care team during the next review.', actions:[]}));
  openDrawer('AI Lab Explanation', lab.test, aiExplanationHTML(result, {riskLevel:lab.status === 'high' ? 'Medium' : 'Low', score:78, visitWindow:'Routine review within 7 days'}));
}

async function medSafetyCheck(resId, medText) {
  const fallback = () => ({overallSafety:/warfarin|digoxin|insulin/i.test(medText)?'Review Required':'Caution',interactions:[{name:'AI fallback screen',severity:'Medium',description:'Review allergy list, current medication classes, renal labs, and duplicate therapy before saving.'}],alternatives:['Pharmacist review'],doseCheck:'Dose requires senior-specific review',renalCheck:'Check creatinine/eGFR if kidney risk exists',duplicateCheck:'No exact duplicate found'});
  const data = await featureAI('medication_intelligence', {proposed:medText,resident:aiPatientPayload(resId),currentMeds:medsData[resId],abnormalLabs:(labsData[resId]||[]).filter(l=>l.status!=='normal')}, fallback);
  const safety = data.overallSafety || 'Caution';
  openDrawer('Medication Safety Panel', safety, `<div class="alert-row ${safety==='Review Required'?'alert-critical':safety==='Caution'?'alert-warning':'alert-info'}"><div class="alert-ico">💊</div><div class="alert-body"><div class="alert-title">Overall Safety: ${safety}</div><div class="alert-msg">${data.doseCheck || ''}<br>${data.renalCheck || ''}<br>${data.duplicateCheck || ''}</div></div></div>${(data.interactions || []).map(i=>`<div class="list-item"><strong>${i.name || 'Interaction'} · ${i.severity || ''}</strong><span>${i.description || i}</span></div>`).join('')}${(data.alternatives || []).map(a=>`<button class="btn btn-outline btn-sm" onclick="document.getElementById('rx-med-name').value='${String(a).replace(/'/g,"\\'")}'">Use ${a}</button>`).join(' ')}${safety==='Review Required'?'<label style="display:block;margin-top:12px;font-size:12px"><input type="checkbox" id="rx-ack"/> I have reviewed the AI safety alert and am proceeding on clinical judgment.</label>':''}<div class="form-actions"><button class="btn btn-outline btn-sm" onclick="closeDrawer()">Proceed Anyway</button><button class="btn btn-outline btn-sm" onclick="toast('Pharmacist consult noted')">Consult Pharmacist</button></div>`);
}
function openConsultation(resId='R001') {
  if (!clinicalActionAllowed()) {
    toast('This clinical action is available only to care team roles', 'warning');
    return;
  }
  openDrawer('Record Consultation', patientName(resId), `<div class="form-group"><label>Consultation Notes Fallback</label><textarea id="consult-notes" placeholder="Type notes if microphone is unavailable"></textarea></div><div id="record-state" class="wave" style="display:none"><span></span><span></span><span></span><span></span></div><div class="form-actions"><button class="btn btn-primary" onclick="startRecording('${resId}')">🎙️ Record Consultation</button><button class="btn btn-outline" onclick="transcribeConsultation('${resId}')">Stop & Transcribe</button></div><div id="rx-output"></div><hr style="border:none;border-top:1px solid var(--g100);margin:14px 0"><div class="card" style="padding:14px"><div class="card-ttl" style="margin-bottom:10px">✏️ Write Prescription</div><div class="form-grid"><div class="form-group"><label>Medication</label><input id="rx-med-name" oninput="debouncedSafety('${resId}',this.value)" placeholder="Drug name"/></div><div class="form-group"><label>Dose/Frequency</label><input id="rx-dose" placeholder="500mg twice daily"/></div></div><div class="form-actions"><button class="btn btn-primary" onclick="saveTypedPrescription('${resId}')">Save Prescription</button><button class="btn btn-outline" onclick="medSafetyCheck('${resId}',document.getElementById('rx-med-name').value+' '+document.getElementById('rx-dose').value)">Check Safety</button></div></div>`);
}
let mediaRecorder, audioChunks = [], safetyTimer;
function debouncedSafety(resId, text) { clearTimeout(safetyTimer); if ((text || '').length < 4) return; safetyTimer = setTimeout(()=>medSafetyCheck(resId, text), 800); }
async function startRecording(resId) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({audio:true});
    audioChunks = []; mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
    mediaRecorder.start(); document.getElementById('record-state').style.display = 'flex'; toast('Recording consultation');
  } catch (e) {
    document.getElementById('consult-notes').focus(); toast('Microphone unavailable. Use notes fallback.', 'warning');
  }
}
async function transcribeConsultation(resId) {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop();
  document.getElementById('record-state').style.display = 'none';
  const notes = document.getElementById('consult-notes').value || 'Patient reviewed. Continue current care. Prescribed Paracetamol 500mg twice daily for 3 days if pain.';
  const fallback = () => ({chiefComplaint:'Typed/recorded consultation',examinationFindings:notes,diagnosis:'Clinical review',medications:[{name:'Paracetamol',dose:'500mg',frequency:'Twice daily',duration:'3 days'}],followUp:'Review if symptoms persist.'});
  const rx = await featureAI('voice_prescription_extraction', {resident:aiPatientPayload(resId),notes,audioBase64:audioChunks.length?'demo-audio-base64':''}, fallback);
  renderPrescription(resId, rx);
}
function renderPrescription(resId, rx) {
  const meds = rx.medications || rx.prescribedMedications || [];
  document.getElementById('rx-output').innerHTML = `<div class="rx-card"><div style="display:flex;justify-content:space-between;gap:10px"><div><div style="font-size:18px;font-weight:900">℞ Prescription</div><div class="page-sub">${patientName(resId)} · Dr. Priya Nair · ${displayDate(todayISO())}</div></div><span class="badge badge-teal">AI extracted</span></div><div class="tbl-wrap" style="margin-top:12px"><table><thead><tr><th>Drug</th><th>Dose</th><th>Frequency</th><th>Days</th></tr></thead><tbody>${meds.map(m=>`<tr><td>${m.name || m.drug}</td><td>${m.dose || ''}</td><td>${m.frequency || ''}</td><td>${m.duration || m.days || ''}</td></tr>`).join('')}</tbody></table></div><div style="font-size:12px;color:var(--g600);margin-top:10px"><strong>Instructions:</strong> ${rx.followUp || rx.followUpInstructions || rx.instructions || 'Follow care plan.'}</div><div style="margin-top:12px;font-size:12px;color:var(--g500)">Signature: Dr. Priya Nair</div><div class="form-actions"><button class="btn btn-primary" onclick='savePrescription("${resId}", ${JSON.stringify(rx).replace(/'/g,"&#39;")})'>💾 Save to Timeline</button><button class="btn btn-outline" onclick='sendPrescriptionWA("${resId}", ${JSON.stringify(rx).replace(/'/g,"&#39;")})'>📱 Send via WhatsApp</button></div>${waNote()}</div>`;
  medSafetyCheck(resId, meds.map(m=>`${m.name || m.drug} ${m.dose || ''} ${m.frequency || ''}`).join('; '));
}
function saveTypedPrescription(resId) {
  const rx = {chiefComplaint:'Written prescription',diagnosis:'Doctor prescription',medications:[{name:document.getElementById('rx-med-name').value,dose:document.getElementById('rx-dose').value,frequency:'As written',duration:'As advised'}],followUp:'Follow up as advised.'};
  savePrescription(resId, rx);
}
function rxText(resId, rx) {
  const meds = rx.medications || [];
  return `Prescription for ${patientName(resId)}\nDoctor: Dr. Priya Nair\nDate: ${displayDate(todayISO())}\nMedications:\n${meds.map(m=>`- ${m.name || m.drug}: ${m.dose || ''} ${m.frequency || ''} ${m.duration || ''}`).join('\n') || '- As advised'}${rx.diet ? '\nDietary plan: ' + rx.diet : ''}${rx.activity ? '\nActivity plan: ' + rx.activity : ''}\nFollow-up: ${rx.followUp || rx.instructions || 'As advised.'}`;
}
function savePrescription(resId, rx) {
  prescriptionsData.unshift({id:'RX-'+Date.now(),resId,date:todayISO(),doctor:'Dr. Priya Nair',meds:rx.medications || [],rx});
  saveStore('ehmr_prescriptions', prescriptionsData);
  if (!notesData[resId]) notesData[resId] = [];
  notesData[resId].unshift({shift:'Doctor',date:todayISO(),author:'Dr. Priya Nair',role:'Doctor',note:'Prescription saved: ' + rxText(resId, rx),tasks:[],t:new Date().toISOString(),type:'Prescription'});
  addAudit('CREATE','prescription',`${patientName(resId)} prescription saved`);
  toast('Prescription saved to timeline');
}
function sendPrescriptionWA(resId, rx) { sendWhatsApp(RESIDENTS.find(r=>r.id===resId)?.phone, rxText(resId, rx)); }
const _loadCriticalBase = loadCriticalReview;
loadCriticalReview = function() {
  _loadCriticalBase();
  document.getElementById('critical-content').insertAdjacentHTML('afterbegin', `<div class="card"><div class="card-hdr"><div class="card-ttl">Consultation Tools</div></div><div class="res-chips">${RESIDENTS.slice(0,4).map(r=>`<div class="res-chip" onclick="openConsultation('${r.id}')"><div class="res-chip-av" style="background:${r.color}">${r.initials}</div>${r.name.split(' ')[0]}</div>`).join('')}</div></div>`);
};

// ===== BOOT =====
async function bootApp() {
  bindAuthControls();
  if (openResetModalFromUrl()) return;
  const restored = await restoreSession();
  if (!restored) {
    document.getElementById('app').style.display = 'none';
    document.getElementById('role-gate').style.display = '';
    return;
  }
}
bootApp();
