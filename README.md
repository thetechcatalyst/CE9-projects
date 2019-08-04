## CE9-projects
Projects for Cisco DX, MX, SX and Room Systems

Further examples and descriptions of some of these projects can be found at
[http://technologyordie.com](http://technologyordie.com)

### Sample Code
The Sample Code is the code used in the XAPI / Macro intro
video on [YouTube](https://youtu.be/9QHb05iSPBI)


### OBTP Meeting Auto start

This macro listens for a OBTP booking event to start / stop on the endpoint and starts and stops the meeting
automatically based on this booked meeting.  Tested on a DX80 registered to Webex teams.

### Support Tools
Support Tools is a menu that can be added to your system to allow users to contact support via call or through a brief email.

In addition to the XML and JS files you will also need to configure a feedback
mechanism to forward along information submitted with the email ticket.

You can configure this from the codec CLI as follows

```
xcommand HttpFeedback Register FeedbackSlot: 1 Expression: event/userinterface/message/textinput/response Format: JSON ServerUrl: http://<hostname>/<path>
```

And then verify it with

```
xstatus HttpFeedback
*s HttpFeedback 1 Expression: "event/userinterface/message/textinput/response"
*s HttpFeedback 1 Format: "JSON"
*s HttpFeedback 1 URL: "http://<hostname>/<path>"
** end

OK
```



### Banking Assistant
Dial shortcuts based on a banking use case.  You can make simple changes to get
functionality and appearances to suit your applications needs.


### Banking Assistant 2.0
The first version of the banking assistant actually had a windows that opened
options the end use would select.  This was problematic because it created a 2
click work flow.  In this version I added multiple buttons directly to the Home
Screen that can be pressed directly and the call dialed.

This Version of the assistant was tested with the CE 9.3 version of software.

### Calculator
This is a calculator for use on screen on the DX80.

Currently this is in early BETA with very limited features.

### Camera Mode Toggle

Check out the blog article on this project [HERE](http://technologyordie.com/cisco-sx80-presenter-track-speaker-track-toggle-macro)

The camera mode toggle application is for SX80 codecs running CE 9.3 or later.
This code will allow you toggle between Speaker Track and Presenter Track with
only a single touch of the screen.  

Typically the Camera settings are inside a menu and are not 100% intuitive for
all users.  There is also the optional "Disconnect_Camera_Reset.js" script that
will set the codec back to Speaker Track after a call concludes so the systems
is ready for the next user and the user knows what to expect.

### No DND

This macro simply watches for a DND Activate event and then again returns the
system to the DND Deactivate state in effect making the DND not available to
the end users ensuring calls always ring through to the endpoint.
