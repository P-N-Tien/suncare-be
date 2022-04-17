
require('dotenv').config()
import nodemailer from 'nodemailer'

let setSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: "<phamngoctien4321@gmail.com>", // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thong tin dat lich kham benh", // Subject line
        html: getBodyHTML(dataSend)
    })
}

let getBodyHTML = (dataSend) => {
    let result = ''

    if (dataSend.language === 'vi') {
        result = `<h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên SunCare!</p>
        <p>Thông tin đặt lịch khám bệnh: </p>
        <div><b>Thời gian: ${dataSend.time}</b> </div>
        <div><b>Tên Bác sĩ: ${dataSend.doctorName}</b> </div>
        
        <p>Nếu các thông tin trên hợp lệ, vui lòng click đường link bên dưới để xác nhận để hoàn tất thủ tục đặt lịch khám bệnh</p>
        <a href=${dataSend.redirectLink}>Click vào link này!</a>

        <p>Xin chân thành cảm ơn!</p>
        `
    }

    if (dataSend.language === 'en') {
        result = `<h3> Dear ${dataSend.patientName}!</h3>
        <p>You received this email because you booked an online medical appointment on SunCare!</p>
        <p>Information to book a medical appointment: </p>
        <div><b>Time: ${dataSend.time}</b> </div>
        <div><b>Doctor Name: ${dataSend.doctorName}</b> </div>
        
        <p>If the above information is valid, please click the link below to confirm to complete the procedure to book an appointment</p>
        <a href=${dataSend.redirectLink}>Click vào link này!</a>

        <p>Sincerely thank!</p>
        `
    }

    return result
}

module.exports = {
    setSimpleEmail
}