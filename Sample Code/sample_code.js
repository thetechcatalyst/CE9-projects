//
// Copyright (c) 2018 Cisco Systems
// Licensed under the MIT License
//

/**
* Sample Code written by Adam Schaeffer
* http://technologyordie.com
*/
const xapi = require('xapi');

//print out the full content of the event object
function test1(event) {
  console.log(event);
}

//print panel id to log file
function test2(event) {
  console.log("The button pressed was " + event.PanelId);
}

//put an on screen popup for 10 seconds with panel id
//Equal to: xcommand UserInterface Message Alert Display Duration: 10 Text: "The event id is: panel1" Title: "eventid"
function test3(event) {
  xapi.command('UserInterface Message Alert Display', {
    Title: 'Event ID',
    Text: 'The event ID is: ' + event.PanelId,
    Duration: 10,
  });
}

//Listen for event to happen.  Change callback function to experiment
xapi.event.on('UserInterface Extensions Panel Clicked', test1);
