let transporter;
let missingMailerWarned = false;

function mailEnabled() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function getFromAddress() {
  return process.env.MAIL_FROM || process.env.SMTP_FROM || 'EHMR AI <no-reply@ehmr.ai>';
}

function getAppUrl() {
  return (process.env.APP_URL || process.env.FRONTEND_URL || `http://localhost:${process.env.PORT || 5000}`).replace(/\/$/, '');
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}

function getTransporter() {
  if (transporter) return transporter;

  let nodemailer;
  try {
    nodemailer = require('nodemailer');
  } catch (error) {
    if (!missingMailerWarned) {
      console.warn('Email disabled: nodemailer is not installed. Run npm install before enabling SMTP email.');
      missingMailerWarned = true;
    }
    return null;
  }

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || '').toLowerCase() === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  console.log(`SMTP transporter created: ${process.env.SMTP_HOST}:${process.env.SMTP_PORT} user=${process.env.SMTP_USER}`);
  return transporter;
}

async function sendEmail({ to, subject, text, html }) {
  if (!mailEnabled()) {
    console.log(`Email skipped: SMTP is not configured (${subject} -> ${to})`);
    return { skipped: true };
  }

  const mailer = getTransporter();
  if (!mailer) return { skipped: true };

  return mailer.sendMail({
    from: getFromAddress(),
    to,
    subject,
    text,
    html
  });
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
