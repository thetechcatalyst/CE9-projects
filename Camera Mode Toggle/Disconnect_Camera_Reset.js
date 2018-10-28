//
// Copyright (c) 2018 Cisco Systems
// Licensed under the MIT License
//
// See additional details at
//http://technologyordie.com/cisco-sx80-presenter-track-speaker-track-toggle-macro
//

const xapi = require('xapi');

xapi.event.on('CallDisconnect', (event) => {
	console.log('Resetting cameras to Speaker Track mode for the next caller.');
	enableSpeakerTrack();
});

function handleError(error){
  console.log('Error', error);
}

function setButtonPresenterTrack(){
  xapi.command('UserInterface Extensions Panel Save', {PanelId: 'CameraToggle'},
  `
  <Extensions>
  <Version>1.5</Version>
  <Panel>
    <PanelId>CameraToggle</PanelId>
    <Type>Statusbar</Type>
    <Icon>Camera</Icon>
    <Order>1</Order>
    <Color>#FF503C</Color>
    <Name>Presenter Track</Name>
  </Panel>
  </Extensions>
  `)
  .catch(handleError);
}

function enableSpeakerTrack(){
  xapi.command('Cameras SpeakerTrack Activate').catch(handleError);
  setButtonPresenterTrack();
}
