const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const nodemailer = require("nodemailer");
const { db } = require("../config/databaseMySql");

const readHtml = function (path, callback) {
  fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
    if (err) {
      throw err;
    } else {
      callback(null, html);
    }
  });
};

// const getAllProduct = (req, res) => {
//   db.query(
//     `
//         SELECT * FROM allproduct;
//         `,
//     async function (error, results) {
//       if (error) throw error;
//       try {
//         res.send({
//           success: true,
//           message: "Berhasil ambil data!",
//           data: results,
//         });
//       } catch (error) {
//         res.send(error);
//         console.log(error);
//       }
//     }
//   );
// };


const sendMailfromHtml = function (args, callback) {
  readHtml(path.join(__dirname, "../Assets/email.html"), function (err, html) {
    db.query(
      `SELECT * FROM ticket `,
      function (error, rows, fields) {
        if (error) throw error;
        const dataSql = rows;

        const image = path.join(__dirname, "../Assets/template");

        const template = handlebars.compile(html);
        const SmtpConfig = {
          pool: false,
          host: "smtp.gmail.com",
          port: "587",
          secure: false,
          requireTLS: true,
          auth: {
            user: "mr.mirsyad29@gmail.com",
            pass: "zoiwqawfvqcnnvhk",
          },
          logger: true,
          debug: true,
        };
        const transporter = nodemailer.createTransport(SmtpConfig);
        const replacements = {
          data1: [
            {
              product: "Test1",
              description: "desc product Test1",
              price: "5500",
            },
            {
              product: "Test2",
              description: "desc product Test2",
              price: "6600",
            },
            {
              product: "Test3",
              description: "desc product Test3",
              price: "9900",
            },
            {
              product: "Test4",
              description: "desc product Test4",
              price: "8800",
            },
          ],
          dataSql,
        };
        const sendHtml = template(replacements);
        const attachments = [
          {
            filename:'matagenit.jpg',
            path: `${image}/matagenit.jpg`,
            cid: "imagerandom",
          },
          {
            filename:'smile.jpg',
            path: `${image}/smile.jpg`,
            cid: "imagerandom1",
          },
          // {
          //   filename:'aaaa.jpg',
          //   path: `${image}/aaaa.jpg`,
          //   cid: "imagerandom2",
          // },
        ];
        const mailOption = {
          from: args.from || "mr.mirsyad29@gmail.com",
          to: args.email,
          subject: args.subject,
          html: sendHtml,
          attachments,
        };

        transporter.sendMail(mailOption, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email Terkirim" + info.response);
            console.log(dataSql);
          }
          return callback(error);
        });
      }
    );
  });
};

module.exports = {
  sendMailfromHtml,
  // getAllProduct,
};
