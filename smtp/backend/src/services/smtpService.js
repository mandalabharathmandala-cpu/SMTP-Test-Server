const nodemailer = require("nodemailer");

exports.createTransporter = (config) => {
  return nodemailer.createTransport({
    host: config.host,
    port: Number(config.port),
    secure: config.encryption === "SSL",
    auth: config.username || config.user ? { user: config.username || config.user, pass: config.password || config.pass } : undefined,
    tls: config.encryption === "TLS" ? { rejectUnauthorized: false } : undefined,
    connectionTimeout: config.timeout || 10000
  });
};
