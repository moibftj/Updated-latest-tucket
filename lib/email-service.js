import nodemailer from 'nodemailer'

// Brevo SMTP Configuration
const transporter = nodemailer.createTransporter({
  host: process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com',
  port: parseInt(process.env.BREVO_SMTP_PORT) || 587,
  secure: false, // STARTTLS
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASSWORD
  }
})

// Email Templates
const emailTemplates = {
  // Template for non-users - Fun and catchy invitation
  tripInvitation: {
    subject: "🌍 {{senderName}} wants to share an amazing {{destination}} adventure with you!",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Adventure Awaits! 🌟</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .card { background: white; border-radius: 20px; padding: 40px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); text-align: center; }
          .logo { font-size: 32px; font-weight: bold; margin-bottom: 20px; }
          .pink { color: #ff34ac; }
          .blue { color: #7dbbe5; }
          .hero { font-size: 28px; font-weight: bold; margin-bottom: 20px; line-height: 1.3; }
          .trip-details { background: linear-gradient(135deg, #ff34ac20, #7dbbe520); padding: 20px; border-radius: 15px; margin: 30px 0; }
          .trip-title { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
          .cta-button { display: inline-block; background: linear-gradient(135deg, #ff34ac, #7dbbe5); color: white; padding: 18px 40px; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 18px; margin-top: 20px; box-shadow: 0 10px 20px rgba(255,52,172,0.3); transition: transform 0.2s; }
          .cta-button:hover { transform: translateY(-2px); }
          .fun-quote { font-style: italic; color: #666; margin: 30px 0; font-size: 18px; }
          .emoji { font-size: 24px; }
          .footer { margin-top: 40px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="card">
            <div class="logo">
              <span class="pink">Tucker</span><span class="blue">Trips</span> 🧳
            </div>

            <div class="hero">
              {{senderName}} thinks you'd love their<br>
              <span class="pink">{{destination}}</span> adventure! 🌟
            </div>

            <div class="trip-details">
              <div class="trip-title">{{tripTitle}}</div>
              <div class="emoji">✈️ Dates: {{dates}}</div>
              <div class="emoji">📍 Destination: {{destination}}</div>
              <div class="emoji">⭐ Rated: {{rating}}/10</div>
              {{#if tripDescription}}
              <div style="margin-top: 15px; font-style: italic; color: #666;">
                "{{tripDescription}}"
              </div>
              {{/if}}
            </div>

            <div class="fun-quote">
              "The best trips aren't just about places... they're about people who share them!" ✨
            </div>

            <a href="{{signupUrl}}" class="cta-button">
              🚀 Join the Adventure!
            </a>

            <div class="footer">
              <p>P.S. Once you join, you'll see {{senderName}}'s complete trip details - all the secret spots, budget tips, and "wish-I-knew" moments!</p>
              <p style="margin-top: 20px; font-size: 12px; color: #999;">
                Tucker Trips - Where friends share real travel experiences
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  },

  // Template for existing users
  tripShared: {
    subject: "🎉 {{senderName}} shared a {{destination}} trip with you on Tucker Trips!",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Trip Shared! 🌟</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .card { background: white; border-radius: 20px; padding: 40px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
          .logo { font-size: 28px; font-weight: bold; margin-bottom: 20px; text-align: center; }
          .pink { color: #ff34ac; }
          .blue { color: #7dbbe5; }
          .header { font-size: 24px; font-weight: bold; margin-bottom: 20px; text-align: center; }
          .trip-info { background: #f8f9fa; padding: 20px; border-radius: 15px; margin: 20px 0; }
          .trip-title { font-size: 20px; font-weight: bold; margin-bottom: 10px; }
          .cta-button { display: inline-block; background: linear-gradient(135deg, #ff34ac, #7dbbe5); color: white; padding: 15px 30px; border-radius: 50px; text-decoration: none; font-weight: bold; margin: 20px auto; box-shadow: 0 10px 20px rgba(255,52,172,0.3); }
          .emoji { font-size: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="card">
            <div class="logo">
              <span class="pink">Tucker</span><span class="blue">Trips</span>
            </div>

            <div class="header">
              🎉 New trip shared with you!
            </div>

            <div class="trip-info">
              <div class="trip-title">{{tripTitle}}</div>
              <div class="emoji">📍 {{destination}}</div>
              <div class="emoji">📅 {{dates}}</div>
              <div class="emoji">👤 Shared by {{senderName}}</div>
            </div>

            <div style="text-align: center;">
              <a href="{{tripUrl}}" class="cta-button">
                👀 View Trip Details
              </a>
            </div>

            <div style="text-align: center; margin-top: 30px; color: #666; font-size: 14px;">
              Your circle of travel adventures is growing! 🌍
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  }
}

class EmailService {
  static async sendEmail(to, template, data) {
    try {
      const templateData = emailTemplates[template]
      if (!templateData) {
        throw new Error(`Template ${template} not found`)
      }

      // Replace template variables
      let subject = templateData.subject
      let html = templateData.html

      Object.keys(data).forEach(key => {
        const regex = new RegExp(`{{${key}}}`, 'g')
        subject = subject.replace(regex, data[key] || '')
        html = html.replace(regex, data[key] || '')
      })

      const mailOptions = {
        from: '"Tucker Trips" <no-reply@tuckertrips.com>',
        to: to,
        subject: subject,
        html: html
      }

      const result = await transporter.sendMail(mailOptions)
      console.log('Email sent successfully:', result.messageId)
      return result
    } catch (error) {
      console.error('Error sending email:', error)
      throw error
    }
  }

  static async sendTripInvitation(recipientEmail, trip, senderName) {
    const signupUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/signup?sharedTrip=${trip.id}&email=${encodeURIComponent(recipientEmail)}`

    const data = {
      senderName: senderName,
      destination: trip.destination,
      tripTitle: trip.title,
      dates: trip.startDate ?
        (trip.endDate ? `${new Date(trip.startDate).toLocaleDateString()} - ${new Date(trip.endDate).toLocaleDateString()}` : new Date(trip.startDate).toLocaleDateString()) :
        'TBD',
      rating: trip.rating || 'Not rated',
      tripDescription: trip.description || trip.overallComment,
      signupUrl: signupUrl
    }

    return await this.sendEmail(recipientEmail, 'tripInvitation', data)
  }

  static async sendTripToExistingUser(recipientEmail, trip, senderName) {
    const tripUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard?section=shared&trip=${trip.id}`

    const data = {
      senderName: senderName,
      destination: trip.destination,
      tripTitle: trip.title,
      dates: trip.startDate ?
        (trip.endDate ? `${new Date(trip.startDate).toLocaleDateString()} - ${new Date(trip.endDate).toLocaleDateString()}` : new Date(trip.startDate).toLocaleDateString()) :
        'TBD',
      tripUrl: tripUrl
    }

    return await this.sendEmail(recipientEmail, 'tripShared', data)
  }

  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}

export default EmailService