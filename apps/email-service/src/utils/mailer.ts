import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail", // Shortcut for Gmail's SMTP settings - see Well-Known Services
  auth: {
    type: "OAuth2",
    user: "rohitmathry@gmail.com",
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});


const sendMail = async ({email,subject,text}:{email:string;subject:string;text:string})=>{
    const res = await transporter.sendMail({
        from:'"Your Order" <rohitmathry@gmail.com> ',
        to:email,
        subject,
        text,
        
    })
    console.log("Message Sent: ",res);
}

export default sendMail