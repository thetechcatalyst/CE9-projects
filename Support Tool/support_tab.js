//
// Copyright (c) 2018 Cisco Systems
// Licensed under the MIT License
//

/**
 * A small In-Room controls panel with 4 quick dial numbers
 */
const xapi = require('xapi');



//Configured options for Email support popup box
const email_popup = {
  FeedbackId: 1,
  Placeholder: "Type your notes here",
  SubmitText: "Submit",
  Text: "Breifly describe the issue you are having with this system.",
  Title: "What seems to be the problem?",
};

//Phone number or SIP URI for support (or support hunt group)
const support_number = '1000';


function dial(number) {
  xapi.command('dial', { Number: number });
}


function listenToUI() {
  xapi.event.on('UserInterface Extensions Widget Action', (event) => {

    if (event.WidgetId === 'support_email'){
      xapi.command('UserInterface Message TextInput Display', email_popup);
    }

    if (event.WidgetId === 'support_call'){
      dial(support_number);
    }

  });
}


listenToUI();
