const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  host: "smtp.yandex.ru",
  port: 465, 
  secure: true, // Use `true` for port 465, `false` for all other ports if false use 587
  auth: {
    user: "lnkfmly@yandex.com",
    pass: "Marley.12345",
  },

});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'lnkfmlyy@yandex.com', // sender address
    to: "warsdgdhdjl@vuhu.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello user! Click the link for reset your password. <br> <a>Click to this link for reset your password.</a></b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

//main().catch(console.error);

module.exports = ()=>{
    main().catch(console.error)
}
