const User = require("../models/user");
const bcrypt = require("bcrypt");
const mailer = require("nodemailer");
const { generateAccessTolen, decodedAccessTolen } = require("../helpers/jwt");
const saltRounds = 10;
const accountTest = {
  username: "test",
  email: "pha13pro@gmail.com",
  password: "test123",
};
module.exports = {
  register: async (req, res) => {
    // const { username, email, password } = req.body;
    const { username, email, password } = accountTest;
    const verifyUrl = "http://localhost:2207/verify/";
    const emailTemplateGenerator = (userID) => {
      return `<table width="100%" cellspacing="0" cellpadding="0" bgcolor="#f5f6f7"><tbody><tr><td height="50">&nbsp;</td></tr><tr><td align="center" valign="top"><table style="border:1px solid #f1f2f5;border-radius:2px" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff"><tbody><tr><td style="border-bottom:1px solid #eee;padding-left:16px" colspan="3" align="left" bgcolor="#ffffff" height="60"><img src="https://preview.colorlib.com/theme/hvac/img/logo.png" alt="hvac-logo"></td></tr><tr><td colspan="3" height="20">&nbsp;</td></tr><tr><td width="20">&nbsp;</td><td align="left"><table width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td colspan="3" height="20">&nbsp;</td></tr><tr><td colspan="3"><h3 style="font-size:24px;font-weight:700;margin:10px 0">Verify account</h3><br><br><table><tbody><tr><td>Click link to verify account:&nbsp;</td><td><a target="_blank" href="${
        verifyUrl + userID
      }" style="font-size: 16px; font-weight: 700">${
        verifyUrl + userID
      }</a></td></tr></tbody></table></td></tr><tr><td colspan="3" height="20">&nbsp;</td></tr><tr><td style="text-align:center" colspan="3"><span style="font-family:Helvetica,Arial,sans-serif;font-size:12px;color:#ccc">This message was sent from HVAC</span></td></tr></tbody></table></td><td width="20">&nbsp;</td></tr><tr><td colspan="3" height="20">&nbsp;</td></tr></tbody></table></td></tr><tr><td height="50">&nbsp;</td></tr></tbody></table>`;
    };
    bcrypt.hash(password.toString(), saltRounds, async (err, hash) => {
      const user = await User.create({
        username,
        email,
        password: hash,
        verification: 0,
      });
      const transporter = mailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.SERVER_MAIL_ACCOUNT,
          pass: process.env.SERVER_MAIL_PASSWORD,
        },
      });
      await transporter.sendMail({
        from: process.env.SERVER_MAIL_ACCOUNT,
        to: "buinhupha@gmail.com",
        subject: "subject",
        html: emailTemplate(user.id),
      });
      res.json(user);
    });
  },
  verifyAccount: async (req, res) => {
    const { userID } = req.params;
    await User.findByIdAndUpdate(userID, { verification: 1 }).exec();
    return;
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).exec();
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
  },
};
