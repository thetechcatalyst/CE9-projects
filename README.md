# CE9-projects
Projects for Cisco DX, MX, SX and Room Systems

#### Support Tools
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






#### Banking Assistant
Dial shortcuts based on a banking use case.  You can make simple changes to get
functionality and appearances to suit your applications needs.
