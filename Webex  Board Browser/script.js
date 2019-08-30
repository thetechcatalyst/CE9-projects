const xapi = require('xapi');

/*
Note, you will need ot create a UI object with the panelId of "browser" for this to work
*/

//JSON settings to the text input window
const textInput = {
  "Text": "Enter URL or Search String",
  "FeedbackId": "url",
  "Title": "Browse the Internet"
};

//verify string is a URL
function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

//launch browser with properly formatted URL
function open(url) {
  console.log('Real URL is: ' + url);
  xapi.command('UserInterface WebView Display', { Url: url })
   .catch(e => console.log('Not able to open url', e.toString()))
}

//launch URL input window when browse button is pressed
function browseButton(event) {
  //console.log('Pressed button', event.PanelId);
  console.log(event);
  if (event.PanelId === 'browser') {

  xapi.command('UserInterface Message TextInput Display', textInput);

  }
}

function browseEvent(event){

  if (event.FeedbackId === 'url') {

    //open(event.Text);
    //console.log(validURL(event.Text));
    if (validURL(event.Text)) {
      //console.log('Opening: ' + event.Text);
      open('http://' + event.Text);                                        //open the url directly
    }
    else {
      //console.log('Opening: ' + 'https://www.google.com/search?q=' + event.Text);
      open('https://www.google.com/search?q=' + event.Text);  //Perform search on google
    }
  }
}


xapi.event.on('UserInterface Extensions Panel Clicked', browseButton);
xapi.event.on('UserInterface Message TextInput Response', browseEvent);
