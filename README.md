# In Real Time

Enables user's around the world to see the same from a specified timezone.

*Options:* callback, custom formatting, offset time, and update frequency (ensure's single threading time is accurate).  
*API:* stop, start.

<a href="http://codepen.io/depthdev/pen/ONwRYg" target="_blank">Demo</a>

Use
---

`let timer = inRealTime();` // Returns UTC time

*OR*

    let timer = new inRealTime({
        callback: function(formattedTime, dateObj) {
            timeElem.textContent = formattedTime;
        }, // Callback to to run during each update
        format: 'hh:mm:ssa', // 'HH,H,hh,h,mm,ss,sss,a'
        offset: -4, // Timezone offset in hours as int/float (remember to account for daylight savings, usually between the 2nd Sunday in March @ 2am to the 1st Sunday in November @ 2am the time is increased by 1 hour)
        update: 100 // Update frequency in milliseconds as int
    });

API
---
`timer.stop();`  
`timer.start();`
