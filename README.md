# zoom-to-khconf
This is a proof-of-concept/spike into a tool to rebroadcast Zoom meeting audio to KHConf via Twilio. It uses call bridging (AKA a 3 way call). A bit like an adhoc conference call. We make the first call to KHConf, then connect a call to Zoom.

Cost is approx 1p per minute for call to Zoom, 0.2p for a call to KHConf when using SIP.

This script could be used in a serverless environment such as [AWS](https://aws.amazon.com/). With a Lambda on a cron trigger, the connection could be scheduled to coincide with meeting start times. I have used environment variables to make this easier for different meeting numbers and timings.

## Improvements that could be made

Making a call to Zoom first would likely make more sense. When the meeting ends, it should then end the call to KHConf.

Sometimes the call to Zoom can fail. Some code to redial on calls shorter than 30 seconds would be useful.

## Instructions for use:

Development environment:

Requirements
* [NodeJs](https://nodejs.org/) - [How to on Windows](https://blog.teamtreehouse.com/install-node-js-npm-windows)

Install
* Clone this repository - [How to](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository)
* Install node dependencies: `npm install`
* Copy file `.env.template` to `.env` and add the required details from [KHConf Reports](https://report.khconf.com/) and [Twilio console](https://www.twilio.com/console)
* Run application with command `npm run start`


## Notes

Your KH sip number is probably something like, this is undocumented and pulled from network traffic using [Wireshark](https://www.wireshark.org/) and the [KHConf client](https://www.khconf.com/):

sip:+44121******0@sipgw.khconf.com

## Sample `.env` file

```
TWILIO_SID=AC29c54******************9
TWILIO_AUTH_TOKEN=aD34******************8
TWILIO_FROM_NUMBER=0117******2

ZOOM_PHONE_NUMBER=+44203******7
ZOOM_MEETING_ID=2********0
ZOOM_PASSWORD=1**2

KHCONF_PHONE_NUMBER=+44121******0
KHCONF_SIP=sip:+44121******0@sipgw.khconf.com

CALL_DURATION_MINUTES=125
```