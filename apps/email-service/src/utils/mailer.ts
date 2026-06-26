import nodemailer from "nodemailer"

const auth = process.env.GMAIL_APP_PASSWORD
  ? {
      user: "rohitmathur00981@gmail.com",
      pass: process.env.GMAIL_APP_PASSWORD,
    }
  : {
      type: "OAuth2",
      user: "rohitmathur00981@gmail.com",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    };

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: auth as any,
});


const sendMail = async ({email,subject,text}:{email:string;subject:string;text:string})=>{
    const res = await transporter.sendMail({
        from:'"Your Order" <rohitmathur00981@gmail.com> ',
        to:email,
        subject,
        text,
        
    })
    console.log("Message Sent: ",res);
}

export default sendMail