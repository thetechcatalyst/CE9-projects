/* This macro accomodates the URI format documented here:
https://support.zoom.us/hc/en-us/articles/201854563-Start-a-Meeting-from-an-H-323-SIP-Endpoint
allowing you to key in a password and / or host a Zoom meeting from a Cisco Endpoint */

const xapi = require('xapi');

const KEYBOARD_TYPES = {
      NUMERIC     :   'Numeric'
    , SINGLELINE  :   'SingleLine'
    , PASSWORD    :   'Password'
    , PIN         :   'PIN'
};
const CALL_TYPES = {
      AUDIO     :   'Audio'
    , VIDEO     :   'Video'
};

const DIALPAD_ID = 'zoomdialpad';
const DIALPAD_PASSWORD = 'zoompassword';
const DIALHOSTPIN_ID = 'zoomhostpin';

const INROOMCONTROL_ZOOMCONTROL_PANELID = 'zoomdial';

/* Use these to check that its a valid number (depending on what you want to allow users to call */
const REGEXP_URLDIALER = /([a-zA-Z0-9@_\-\.]+)/; /*  . Use this one if you want to allow URL dialling */
const REGEXP_NUMERICDIALER =  /^([0-9]{9,11})$/; /* Use this one if you want to limit calls to numeric only. In this example, require number to be between 9 and 11 digits. */
//const REGEXP_MEETING_PASSWORD = /^([0-9]{6})$/;  /* Use this for meeting  passwords that are numeric and 6 charaters in length.  Update for your orgs settings */

const DIALPREFIX_AUDIO_GATEWAY = '0';
const DIALPOSTFIX_ZOOMURL = '@zoomcrc.com';

var zoomnumbertodial = '';
var zoompassword = '';
var zoomhostpin = '';
var hostpin = '';
var isInWebexCall = 0;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

xapi.event.on('CallDisconnect', (event) => {
	isInWebexCall = 0;
    });


/* show meeting dial menu  - step 1 */
function showDialPad(text){

  xapi.command("UserInterface Message TextInput Display", {
    InputType: KEYBOARD_TYPES.NUMERIC
    , Placeholder: '10 or 11 digit or full dial string'
    , Title: "Zoom Meeting"
    , Text: text
    , SubmitText: "Next"
    , FeedbackId: DIALPAD_ID
  }).catch((error) => { console.error(error); });
}

/* Show password entry box - step 2 */
function showPassword(text){
  xapi.command("UserInterface Message TextInput Display", {
    InputType: KEYBOARD_TYPES.PIN
    , Placeholder: "Meeting Password (numeric)"
    , Title: "Meeting Password"
    , Text: text
    , SubmitText: "Next"
    , FeedbackId: DIALPAD_PASSWORD
  } ).catch((error) => { console.error(error); });
}

/* Show password entry box - step 3 */
function showHostpin(text){
  xapi.command("UserInterface Message TextInput Display", {
    InputType: KEYBOARD_TYPES.PIN
    , Placeholder: "Host Pin"
    , Title: "Host Pin"
    , Text: text
    , SubmitText: "Dial"
    , FeedbackId: DIALHOSTPIN_ID
  } ).catch((error) => { console.error(error); });
}



/* This is the listener for the in-room control panel button that will trigger the dial panel to appear */
xapi.event.on('UserInterface Extensions Panel Clicked', (event) => {
    if(event.PanelId === INROOMCONTROL_ZOOMCONTROL_PANELID){
         showDialPad("Enter the Zoom 10 or 11 Digit Meeting ID:" );
    }
});



xapi.event.on('UserInterface Message TextInput Response', (event) => {
    switch(event.FeedbackId){
        case DIALPAD_ID:
            console.log("here1");
            let regex =REGEXP_URLDIALER; // First check, is it a valid number to dial
            let match = regex.exec(event.Text);
            if (match !== null) {
                let contains_at_regex = /@/;
                let contains_at_in_dialstring = contains_at_regex.exec(event.Text);
                if (contains_at_in_dialstring !== null) {
                    zoomnumbertodial = match[1];
                }
                else{
                    zoomnumbertodial = match[1];
                    //zoomnumbertodial = zoomnumbertodial + DIALPOSTFIX_ZOOMURL ; // Here we add the default hostname to the SIP number
                }
                 sleep(200).then(() => { //this is a necessary trick to get it working with multiple touch panels to not mess up event-clears from other panels

                showPassword('Enter Numberic Meeting Password (If one is set)');
            });

            }
            else{
                showDialPad("You typed in an invalid number. Please try again. Format is blablabla..." );
            }
            break;

        case DIALPAD_PASSWORD:
          /* todo: verify password format / length */
          zoompassword = event.Text;
          showHostpin("If you are the host enter your host pin");
          break;

        case DIALHOSTPIN_ID:
            zoomhostpin = event.Text;

            /* assemble the URI to call */
            if (zoompassword !== ''){
              zoomnumbertodial = zoomnumbertodial + '.' + zoompassword;
            }
            if (zoomhostpin !== ''){
              zoomnumbertodial = zoomnumbertodial + '..' + zoomhostpin;
            }
            zoomnumbertodial = zoomnumbertodial + DIALPOSTFIX_ZOOMURL;

            console.log('Dialing: ' + zoomnumbertodial);
            xapi.command("dial", {Number: zoomnumbertodial}).catch((error) => { console.error(error); });
            break;
    }
});
