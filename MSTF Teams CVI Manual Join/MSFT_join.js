const xapi = require('xapi')
const DIALPAD_ID = 'dailpad';
const INROOMCONTROL_WEBCONTROL_PANELID = "MSFT";
const videoDomain = 'sitename';  //this is the site name asscoiated with your CVI instance
const webexDomain = '@m.webex.com'
const finalDomain = '.' + videoDomain + webexDomain
var teamsnumbertodial = '';

function showDialPad(){
  xapi.command("UserInterface Message TextInput Display", {
    InputType: 'Numeric'
    , Placeholder: 'Conference ID'
    , Title: "Microsoft Teams Call"
    , Text: "Enter the VTC Confernece ID"
    , SubmitText: "Dial"
    , FeedbackId: DIALPAD_ID
  }).catch((error) => { console.error(error); });
}

function listenToGui(){
  xapi.event.on('UserInterface Extensions Panel Clicked', (event) => {
    JSON.stringify(event);
    if(event.PanelId === INROOMCONTROL_WEBCONTROL_PANELID) {
      showDialPad();
    }
  }
  );
}

xapi.event.on('UserInterface Message TextInput Response', (event) => {
  switch(event.FeedbackId){
    case DIALPAD_ID:
    teamsnumbertodial = event.Text + finalDomain;
    xapi.command("dial",{Number: teamsnumbertodial}).catch((error) =>
    {console.error(error); });
    break;
  }
});

listenToGui();
