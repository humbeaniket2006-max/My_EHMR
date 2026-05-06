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
    html: `<div style="max-width:600px;margin:0 auto;padding:20px;background:#f4f4f4;font-family:Arial,sans-serif;"><div style="background:#0f172a;border-radius:8px 8px 0 0;padding:20px 32px;color:#ffffff;font-size:20px;font-weight:bold;">EHMR AI</div><div style="background:#ffffff;border-radius:0 0 8px 8px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);"><div style="color:#374151;font-size:16px;line-height:1.6;"><p style="margin:0 0 16px;">Hi ${safeName},</p><p style="margin:0 0 16px;">Welcome to EHMR AI. Your account is ready.</p><a href="${safeDashboardUrl}" style="background:#2563eb;color:#ffffff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;display:inline-block;margin-top:16px;">Open your dashboard</a><p style="margin:24px 0 0;">Regards,<br/>EHMR AI</p><p style="color:#9ca3af;font-size:12px;margin:24px 0 0;">If you didn't request this, you can safely ignore this email.</p></div></div></div>`
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
    html: `<div style="max-width:600px;margin:0 auto;padding:20px;background:#f4f4f4;font-family:Arial,sans-serif;"><div style="background:#0f172a;border-radius:8px 8px 0 0;padding:20px 32px;color:#ffffff;font-size:20px;font-weight:bold;">EHMR AI</div><div style="background:#ffffff;border-radius:0 0 8px 8px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);"><div style="color:#374151;font-size:16px;line-height:1.6;"><p style="margin:0 0 16px;">Hi ${safeName},</p><p style="margin:0 0 16px;">Use this link to reset your EHMR AI password. It expires in 30 minutes.</p><a href="${safeResetUrl}" style="background:#2563eb;color:#ffffff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;display:inline-block;margin-top:16px;">Reset password</a><p style="margin:24px 0 0;">Regards,<br/>EHMR AI</p><p style="color:#9ca3af;font-size:12px;margin:24px 0 0;">If you didn't request this, you can safely ignore this email.</p></div></div></div>`
  });
}

module.exports = {
  getAppUrl,
  sendEmail,
  sendPasswordResetEmail,
  sendWelcomeEmail
};
