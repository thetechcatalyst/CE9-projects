# CE9-projects
Projects for Cisco DX, MX, SX and Room Systems

Further examples and descriptions of some of these projects can be found at
[http://technologyordie.com](http://technologyordie.com)

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

### Calculator
This is a calculator for use on screen on the DX80.

Currently this is in early BETA with very limited features. 
