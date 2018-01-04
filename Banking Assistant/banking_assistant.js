/**
 * A small In-Room controls panel with 4 quick dial numbers
 */
const xapi = require('xapi');

// These match the widget ids of the In-Room control buttons
// change the numbers here to match your organization.  SIP URI's are also acceptable
const numbers = {
  dial_lending: '1000',
  dial_mortgage: '1000',
  dial_wealth: '1000',
  dial_reception: '1000',
};

function dial(number) {
  console.log('dial', number);
  xapi.command('dial', { Number: number });
}

function listenToGui() {
  xapi.event.on('UserInterface Extensions Widget Action', (event) => {
    if (event.Type === 'clicked') {
      const number = numbers[event.WidgetId];
      if (number) dial(number);
      else console.log('Unknown button pressed', event.WidgetId);
    }
  });
}

listenToGui();