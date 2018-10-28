//
// Copyright (c) 2018 Cisco Systems
// Licensed under the MIT License
//
// Writen by Adam Schaeffer
//
// See additional details at
//http://technologyordie.com/cisco-sx80-presenter-track-speaker-track-toggle-macro
//

const xapi = require('xapi');

const presenterTrackConnectorID = 3;

function handleError(error){
  console.log('Error:', error);
}

function setButtonSpeakerTrack(){
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
    <Name>Speaker Track</Name>
  </Panel>
  </Extensions>
  `)
  .catch(handleError);
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


function changeCameraInput(){
  xapi.command('Video Input SetMainVideoSource', {
    ConnectorId: presenterTrackConnectorID,
  }).catch(handleError);
}

function enablePresenterTrack(){
  xapi.command('Cameras PresenterTrack Set', {
    Mode: 'Follow',
  }).catch(handleError);
  setButtonSpeakerTrack();
}

function enableSpeakerTrack(){
  xapi.command('Cameras SpeakerTrack Activate').catch(handleError);
  setButtonPresenterTrack();
}

function presenterTrackChanger(event){
  //console.log(event);//for debugging

  xapi.status
    .get('Cameras PresenterTrack Status')
    .then((value) => {
      //console.log(value);

      if(value === 'Off'){
        changeCameraInput();
			  enablePresenterTrack();
			  console.log('Presenter Track Enabled');
      }else{
        enableSpeakerTrack();
        console.log('Speaker Track Enabled');
      }

  });
}

xapi.event.on('UserInterface Extensions Panel Clicked',presenterTrackChanger);
