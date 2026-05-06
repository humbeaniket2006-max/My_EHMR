const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

let missingApiKeyWarned = false;

function mailEnabled() {
  return Boolean(process.env.BREVO_API_KEY);
}

function getFromAddress() {
  return process.env.MAIL_FROM_ADDRESS || 'noreply@ehmrai.com';
}

function getAppUrl() {
  return (process.env.APP_URL || process.env.FRONTEND_URL || `http://localhost:${process.env.PORT || 5000}`).replace(/\/$/, '');
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}

function parseSender(address) {
  const match = String(address || '').match(/^(.*)<([^>]+)>$/);
  if (!match) {
    return { email: String(address || '').trim() };
  }

  return {
    name: match[1].trim().replace(/^"|"$/g, ''),
    email: match[2].trim()
  };
}

async function sendEmail({ to, subject, text, html }) {
  if (!mailEnabled()) {
    if (!missingApiKeyWarned) {
      console.warn('Email disabled: BREVO_API_KEY is not configured. Skipping outbound email.');
      missingApiKeyWarned = true;
    }
    return { skipped: true };
  }

  const response = await fetch(BREVO_API_URL, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'api-key': process.env.BREVO_API_KEY,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      sender: parseSender(getFromAddress()),
      to: [{ email: to }],
      subject,
      textContent: text,
      htmlContent: html
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Brevo email failed (${response.status}): ${errorText}`);
  }

  return response.json();
}

async function sendWelcomeEmail(user) {
  const dashboardUrl = getAppUrl();
  const safeName = escapeHtml(user.name);
  const safeDashboardUrl = escapeHtml(dashboardUrl);
  return sendEmail({
    to: user.email,
    subject: 'Welcome to EHMR AI',
    text: `Hi ${user.name},\n\nWelcome to EHMR AI. Your account is ready.\n\nOpen your dashboard: ${dashboardUrl}\n\nRegards,\nEHMR AI`,
    html: `<p>Hi ${safeName},</p><p>Welcome to EHMR AI. Your account is ready.</p><p><a href="${safeDashboardUrl}">Open your dashboard</a></p><p>Regards,<br/>EHMR AI</p>`
  });
}

async function sendPasswordResetEmail(user, resetToken) {
  const resetUrl = `${getAppUrl()}/?resetToken=${encodeURIComponent(resetToken)}&email=${encodeURIComponent(user.email)}`;
  const safeName = escapeHtml(user.name);
  const safeResetUrl = escapeHtml(resetUrl);
  return sendEmail({
    to: user.email,
    subject: 'Reset your EHMR AI password',
    text: `Hi ${user.name},\n\nUse this link to reset your EHMR AI password. It expires in 30 minutes:\n${resetUrl}\n\nIf you did not request this, you can ignore this email.\n\nRegards,\nEHMR AI`,
    html: `<p>Hi ${safeName},</p><p>Use this link to reset your EHMR AI password. It expires in 30 minutes:</p><p><a href="${safeResetUrl}">Reset password</a></p><p>If you did not request this, you can ignore this email.</p><p>Regards,<br/>EHMR AI</p>`
  });
}

module.exports = {
  getAppUrl,
  sendEmail,
  sendPasswordResetEmail,
  sendWelcomeEmail
};
