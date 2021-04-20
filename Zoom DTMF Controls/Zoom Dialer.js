import xapi from 'xapi';


async function sendDTMF(code){
 try {
      await
      xapi.command("Call DTMFSend", {DTMFString: code});
     } catch (error) {
       console.error(error);
     }
}
 

xapi.Event.UserInterface.Extensions.Widget.Action.on((event) => {
  if (event.Type !== 'pressed'){
    return;
  }
    var DTMF;

    switch (event.WidgetId) {
      case "changelayout":
        DTMF = "11";
          console.log('Change Layout was Pressed');
        break;
      case "audiomute":
        DTMF = "12"; 
          console.log('Audio was Pressed');
        break;
      case "videomute":
        DTMF = "14"; 
          console.log('Video Mute was Pressed');
        break;
      case "record":
        DTMF = "15"; 
          console.log('Record was Pressed');
        break;
      case "videonames":
        DTMF = "102"; 
          console.log('Show/Hide Names was Pressed');
        break;
      case "mute_on_entry":
        DTMF = "103"; 
          console.log('Mute on Entry was Pressed');
        break;
      case "participants_show":
        DTMF = "16"; 
          console.log('Show Participants was Pressed');
        break;
      case "exit":
        DTMF = "*"; 
          console.log('Exit was Pressed');
        break;
    }
    
  sendDTMF(DTMF);
    
    });

