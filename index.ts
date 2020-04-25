import * as dotenv from 'dotenv';
import { Twilio, twiml } from 'twilio';
const VoiceResponse = twiml.VoiceResponse;

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const client = new Twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const response = new VoiceResponse();
const dial = response.dial({ timeLimit: 35, callerId: process.env.TWILIO_FROM_NUMBER });

dial.number({ 
    // w = 0.5 second pause
    sendDigits: `ww${process.env.ZOOM_MEETING_ID}#wwwwwwww#ww${process.env.ZOOM_PASSWORD}#ww${process.env.ZOOM_PASSWORD}#ww${process.env.ZOOM_PASSWORD}#`,
}, process.env.ZOOM_PHONE_NUMBER);

client.calls.create({
    to: process.env.KHCONF_SIP,
    from: process.env.TWILIO_FROM_NUMBER,
    twiml: response.toString(),
}).then((message) => console.log(message.sid), (error) => { console.log(error); });

// End call:
// client.calls('CA89af3de0f1efb4437afcf30646947093')
//       .update({status: 'completed'})
//       .then(call => console.log(`Call ended: ${call.to}`));