/**
* OneButtonDial written by Adam Schaeffer
* http://technologyordie.com
*/
const xapi = require('xapi');

//change number / SIP URI below for your requirements 
const dial_general = '1000';
const dial_mortgage = '2000';
const dial_wealth = '3000';


function quickDial(event) {
  //console.log(event); //logs the information passed in the "event" variable
  
  if (event.PanelId === 'general') {
    xapi.command('Dial', { Number: dial_general }); 
  } 
  
  if (event.PanelId === 'mortgage') {
    xapi.command('Dial', { Number: dial_mortgage }); 
  }
  
  if (event.PanelId === 'wealth') {
    xapi.command('Dial', { Number: dial_wealth });
  }

}

//Listen for event to happen.
xapi.event.on('UserInterface Extensions Panel Clicked', quickDial);
