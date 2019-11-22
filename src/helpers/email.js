import nodemaler from 'nodemailer';

const { EMAIL_USERNAME, EMAIL_PASSWORD, EMAIL_HOST } = process.env;

const sendEmail = async options => {
  // create a  transporter
  const transporter = nodemaler.createTransport({
    host: EMAIL_HOST,
    port: 25,
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
    }
  });

  // define email options
  const mailOptions = {
    from: 'solomon Rock <contact@market-hub.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  //send email nodemailer
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
