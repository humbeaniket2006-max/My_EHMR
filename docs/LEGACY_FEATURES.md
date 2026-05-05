# Features From `index (6).html`

The original single-file EHMR dashboard included a broad senior-care feature set. This project was restructured as a professional full-stack hospital booking system, so the features are now split into backend APIs and frontend modules.

## Included Now

- Original EHMR AI single-page dashboard UI
- Patient and Hospital role entry
- Hospital/admin dashboard interface using the original clinical/admin modules
- Patient dashboard interface using the original patient/resident modules
- Hospital search, filters, and Leaflet map selection for patients
- Appointment booking with selected hospital, doctor, date, and slot
- Vitals, eMAR, shift notes, labs, ledger/resources, timeline, care plan, services, insurance/ABHA, audit, prescriptions, and medication tools
- Local backend routes for appointments, availability, AI proxy, records, auth, Groq, and MongoDB

## Map Added

The new patient-only `Find Hospitals` page adds the requested map feature without replacing the original app interface.

## Planned Extensions

These are still demo-level in the restored app and can be converted to production-backed modules later:

- Persist every original module to MongoDB instead of localStorage
- Production WhatsApp dispatch integration
- Production voice transcription pipeline
- Hospital-specific admin login accounts
- Real bed inventory updates per hospital
