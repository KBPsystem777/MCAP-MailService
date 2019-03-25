const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const nodeMailer = require('nodemailer')

require('dotenv').config()

const port = process.env.PORT || 1964

app.use(bodyParser.urlencoded())
app.get('/', (req, res) => res.send('Welcome to MCAP Mail Service!'))

app.post('/send-quote', (req, res) => {
    let body = req.body
    console.log(body)
    async function main() {
        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        })

        const mailTemplate = `
            <h3>New Message from www.mcapadvertising.com</h3>
            
            <p>Good day! <b>${body.name}</b> is requesting a product quote</p><br>

            <p>See thier contact details below:</p>

            <p>Sender: <b>${body.name}</b></p>

            <p>Email: <b>${body.email}</b></p>

            <p>Phone: <b>${body.phone}</b></p><br>
        
            <p>Sent via <a href="https://mcap-mailer.herokuapp.com">https://mcap-mailer.herokuapp.com</a></p>
        `

        const mailOption = {
            from: 'MCAP Advertising Mail Services',
            to: ["mcapadvertising@gmail.com", "koleen.bp@outlook.com"],
            subject: "Service Quote Request",
            html: mailTemplate
        }

        let info = transporter.sendMail(mailOption)
        console.log("Message sent: %s", info.messageId)
        console.log("Preview URL: %s", nodeMailer.getTestMessageUrl(info))
        res.redirect('https://www.mcapadvertising.com/thanks')
    }
    main().catch(console.error)
})

app.listen(port, () => console.log(`Server Running on http://localhost:${port}`))