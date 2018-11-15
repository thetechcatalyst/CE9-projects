const xapi = require('xapi');

//dial the number or SIP URI
function dial(number){
  //xapi.command('dial', number).catch(e => console.error('Failed to Dial...'));
  xapi.command('dial',number).catch(e => console.error('Failed to Dial...'));

}


function bookstart(Id){

  //get the details of the bookings on the system
  xapi.command('Bookings List').then((output) => {

    const bookings = output.Booking;

    //loop through all bookings on the system
    for (var index = 0; index < bookings.length; ++index) {

      //find the booking that has the same ID as the one that just went active
      //(its posible to have multiple bookings living on the system at one time)
      if(bookings[index].Id == Id){

        //make number value to pass to dial funtion
        var number = {Number: bookings[index].DialInfo.Calls.Call[0].Number};
        console.log("Placing call to: " + JSON.stringify(number));
        dial(number);

      }
    }
  });
}

//Ensures the active called URI matches the URI for the booking that just ended and ends the call if they match
function verify_call_terminate(booking){
  xapi.status.get('Call').then((status) => {

    var callbacknumber = status[0].CallbackNumber ;
    callbacknumber = callbacknumber.split(":")[1];

    console.log(booking.DialInfo.Calls.Call[0].Number);

    if(callbacknumber == booking.DialInfo.Calls.Call[0].Number){
      xapi.command('Call Disconnect').catch(e => console.error('Could not end the call but we tried...'));
    }

  });
}

//When a meeting ends this function is called.  It gets the details about the booking that just ended and
//calls the function ultimatly ends the call.  The two could be consolidated but the environment warns
//against nesting functions inside of for loops...
function bookend(Id){

  xapi.command('Bookings List').then((output) => {

    const bookings = output.Booking;
    for (var index = 0; index < bookings.length; ++index) {
      if(bookings[index].Id == Id){
        verify_call_terminate(bookings[0]);
      }
    }
  });
}

//listen for "bookings start" events.  May need to register xfeedback /bookings/start event
//I used "xfeedback register /Event" to capture all events (probably not a good idea in production)
xapi.event.on('Bookings Start', (event) => {

  bookstart(event.Id);

});

//When a meeting comes to an end on the calendar call the function that ends it
xapi.event.on('Bookings End', (event) => {

  bookend(event.Id);

});
