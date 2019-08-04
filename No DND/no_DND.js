//This code listens for a DND button press and then turns DND back off
//esentially voiding the DND feature

const xapi = require('xapi');

function DND_off() {
  xapi.status.on('Conference DoNotDisturb', (status) => {
    //console.log(`Status is: ${status}`);
    if(status == 'Active'){
      console.log('Active');
      xapi.command('Conference DoNotDisturb Deactivate');

    }
  });
}

DND_off();
