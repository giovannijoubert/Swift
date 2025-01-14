const ejs = require('ejs');
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const config = require('../../config/config-email.json');

// mailgun authentication details
const mgAuth = {
  auth: {
    api_key: process.env.MG_API_KEY || config.apiKey,
    domain: process.env.MG_DOMAIN_FROM || config.domainFrom
  }
};

// connect to mailgun API
const apiTransporter = nodemailer.createTransport(mg(mgAuth));

/** *****Registration Email ******** */
// eslint-disable-next-line no-unused-vars
module.exports.registrationEmail = (req, res) => {
  ejs.renderFile(`${__dirname}/RegistrationTemp.ejs`, { name: req.name }, (err, data) => {
    const mailOptions = {
      from: process.env.MG_EMAIL_FROM || config.emailFrom,
      to: req.email,
      subject: 'Swift-app Account Activated',
      html: data
    };
    apiTransporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(`error occurs : ${error}`);
      } else {
        // eslint-disable-next-line no-console
        console.log(`Email successfully sent to: ${info.response}`);
      }
    });
  });
};

/** *****Payment Email ******** */
// eslint-disable-next-line no-unused-vars
module.exports.paymentEmail = (req, res) => {
  const { orderId } = req;
  const resName = req.restaurantName;
  const MenuItemName = req.menuitemname;
  const tip = req.waiterTip;
  const tax = req.orderTax;
  const { name } = req;
  const amount = req.amountPaid;
  const { paymentMethod } = req;
  const total = amount + tip + tax;

  ejs.renderFile(`${__dirname}/PaymentEmail.ejs`, {
    orderId, name, tip, tax, total, amount, paymentMethod, resName, MenuItemName
  }, (err, data) => {
    const mailOptions = {
      from: process.env.MG_EMAIL_FROM || config.emailFrom,
      to: req.email,
      subject: 'Swift-app Payment Reciept',
      // text: 'Congratulations you have successfully registered ',
      html: data
    };

    apiTransporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(`error occurs : ${error}`);
      } else {
        // eslint-disable-next-line no-console
        console.log(`Email successfully sent to: ${info.response}`);
      }
    });
  });
};

/** *****Password reset Email ******** */
// eslint-disable-next-line no-unused-vars
module.exports.passResetEmail = (req, res) => {
  ejs.renderFile(`${__dirname}/PasswordResetTemp.ejs`, { token: req.val }, (err, data) => {
    const mailOptions = {
      from: process.env.MG_EMAIL_FROM || config.emailFrom,
      to: req.email,
      subject: 'Swift-app Password Reset',
      html: data
    };
    apiTransporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(`error occurs : ${error}`);
      } else { // eslint-disable-next-line no-console
        console.log(`Email successfully sent to: ${info.response}`);
      }
    });
  });
};

/** *****Employee sign in Email ******** */
// eslint-disable-next-line no-unused-vars
module.exports.employSignInEmail = (req, res) => {
  // const { restaurantname } = req;
  // const { waiterName } = req;
  const restaurantName = 'jollies';
  const waiterName = 'John';
  const { role } = req;
  ejs.renderFile(`${__dirname}/employeeSignIn.ejs`, { restaurantName, waiterName, role }, (err, data) => {
    const mailOptions = {
      from: process.env.MG_EMAIL_FROM || config.emailFrom,
      to: req.email,
      subject: 'Employee Sign in',
      html: data
    };
    apiTransporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(`error occurs : ${error}`);
      } else { // eslint-disable-next-line no-console
        console.log(`Email successfully sent to: ${info.response}`);
      }
    });
  });
};

/** *****Employee registration Email ******** */
// eslint-disable-next-line no-unused-vars
module.exports.employRegisEmail = (email, res) => {
  const resName = 'Papa Giovanni';
  // const { email } = req;

  ejs.renderFile(`${__dirname}/employeeRegi.ejs`, { restaurantName: resName }, (err, data) => {
    const mailOptions = {
      from: process.env.MG_EMAIL_FROM || config.emailFrom,
      to: email,
      subject: 'Employee Registration',
      html: data
    };
    apiTransporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(`error occurs : ${error}`);
      } else { // eslint-disable-next-line no-console
        console.log(`Email successfully sent to: ${info.response}`);
      }
    });
  });
};
