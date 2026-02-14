const { createTransporter } = require("../src/services/smtpService");
const nodemailer = require("nodemailer");

jest.mock("nodemailer");

describe("smtpService", () => {
  test("createTransporter returns transporter from nodemailer", () => {
    const fakeTransport = { verify: jest.fn() };
    nodemailer.createTransport.mockReturnValue(fakeTransport);

    const cfg = { host: "smtp.example.com", port: 587, encryption: "TLS" };
    const transporter = createTransporter(cfg);

    expect(nodemailer.createTransport).toHaveBeenCalled();
    expect(transporter).toBe(fakeTransport);
  });
});
