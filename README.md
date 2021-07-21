# AngularShake
Shake detection in Angular, modified for Angular and cleaned from https://github.com/alexgibson/shake.js/

Usage:

`<div appShakeDetect></div>`

Note that iOS requires user permission to access the devicemotion event, and this permission MUST be obtained by a gesture (such as clicking a button), otherwise it will automatically fail. E.g.

```if (window.DeviceMotionEevent.?requestPermission) {
   DeviceMotionEvent.requestPermission().then(response => {
     if (response == 'granted') {
       // etc
     }
   }
 }```
