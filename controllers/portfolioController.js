const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const MessageModel = require('../models/MessageModel');


//transport
const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.API_SENDGRID,
    },
  })
);


const sendEmailController = async (req, res) => {
  try {
    const { name, email, msg } = req.body;

    //validation
    if (!name || !email || !msg) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    const newMessage = new MessageModel({ name, email, msg });
    await newMessage.save();
    //email matter
    
    await transporter.sendMail({
      to: "ayushmhaisane25@gmail.com", 
      from: "ayushmhaisane25@gmail.com", 
      subject: `Portfolio Contact from ${name}`,
      // ... aapke sendEmailController function ke andar ...

      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #222831; padding: 20px;">
          <table style="width: 90%; max-width: 600px; margin: 0 auto; background-color: #393e46; border-radius: 8px; overflow: hidden;">
            
            <!-- Header Row -->
            <tr>
              <td style="padding: 25px 30px; background-color: #00ADB5; text-align: center;">
                <h2 style="margin: 0; color: #EEEEEE; font-size: 24px;">New Portfolio Message</h2>
              </td>
            </tr>
            
            <!-- Content Row -->
            <tr>
              <td style="padding: 30px; color: #EEEEEE;">
                
                <h3 style="color: #EEEEEE; margin-top: 0;">You received a new message from ${name}</h3>
                <hr style="border: 0; border-top: 1px solid #5f6671;">
                
                <!-- Details Table -->
                <table style="width: 100%; margin-top: 20px; color: #EEEEEE;">
                  <tr>
                    <td style="width: 100px; padding-bottom: 10px;"><strong>Name:</strong></td>
                    <td style="padding-bottom: 10px;">${name}</td>
                  </tr>
                  <tr>
                    <td style="width: 100px; padding-bottom: 10px;"><strong>Email:</strong></td>
                    <td style="padding-bottom: 10px;">${email}</td>
                  </tr>
                </table>
                
                <!-- Message Block -->
                <div style="margin-top: 20px;">
                  <h4 style="color: #EEEEEE; margin-bottom: 10px;">Message:</h4>
                  <div style="background-color: #222831; border-radius: 5px; padding: 15px; color: #EEEEEE; line-height: 1.5;">
                    <p style="margin: 0;">${msg}</p>
                  </div>
                </div>
                
              </td>
            </tr>
            
            <!-- Footer Row -->
            <tr>
              <td style="padding: 20px 30px; background-color: #222831; text-align: center;">
                <p style="margin: 0; font-size: 12px; color: #888;">Sent from your portfolio contact form.</p>
              </td>
            </tr>
            
          </table>
        </div>
      `,


    });

    // MODIFICATION: Yeh response ab email send hone ke BAAD hi bhejega
    return res.status(200).send({
      success: true,
      message: "Your Message Send Successfully",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Send Email API Error",
      error,
    });
  }
};

module.exports = { sendEmailController };