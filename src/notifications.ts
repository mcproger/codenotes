import * as nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import { debugLog } from './utils';

interface Notifier {
  notify(message: string): void
}

class EmailNotifier implements Notifier {
  transport: Transporter
  emailTo: string

  constructor(emailUser: string, emailPassword: string, emailTo: string) {
    this.emailTo = emailTo
    
    this.transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: emailUser,
        pass: emailPassword,
      }
    });
  }

  notify(message: string): void { 
    const mailOptions = {
      to : this.emailTo, 
      subject : 'Note to self', 
      text: message, 
    };

    this.transport.sendMail(mailOptions, (error, info) => {      
      if (error) { 
        return debugLog(`error: ${error}`); 
      }

      debugLog(`Message sent ${info.response}`); 
    }); 
  }
}

export { EmailNotifier, Notifier }
