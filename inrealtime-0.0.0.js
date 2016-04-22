/*
 InRealTimeJS v0.0.0
 (c) 2016 Depth Development. http://depthdev.com
 License: MIT
*/

function inRealTime(obj) {

  var o = function () {
    var tmp = obj || {};
    tmp.callback = tmp.callback || function () {};
    tmp.format = tmp.format || 'hh:mm:ss';
    tmp.update = tmp.update || 1000;
    tmp.timestamp = function () {
      var d = new Date();
      return d.getTime() + d.getTimezoneOffset() * 60000 + (tmp.offset ? tmp.offset * 3600000 : 0);
    }();
    tmp.now = Date.now();
    return tmp;
  }();

  var format = function format(date) {

    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var ms = date.getMilliseconds();

    var formatted = o.format;

    // Create hours
    if (/h/i.test(formatted)) {
      // 'HH': Hour in day, padded (00-23)
      // 'H': Hour in day (0-23)
      // 'hh': Hour in AM/PM, padded (01-12)
      // 'h': Hour in AM/PM, (1-12)
      var caseH = formatted.replace(/(h+).*/i, '$1');
      switch (caseH) {
        case 'HH':
          formatted = formatted.replace(/HH/, h < 10 ? '0' + h : h);
          break;
        case 'H':
          formatted = formatted.replace(/H/, h);
          break;
        case 'hh':
          var tmp = h > 12 ? h - 12 : h;
          formatted = formatted.replace(/hh/, tmp < 10 ? '0' + tmp : tmp);
          break;
        case 'h':
          formatted = formatted.replace(/h/, h > 12 ? h - 12 : h);
          break;
      }
    }
    // Create minutes
    if (/m/.test(formatted)) {
      // 'mm': Minute in hour, padded (00-59)
      // 'm': Minute in hour (0-59)
      if (/(m{2})/.test(formatted)) {
        formatted = formatted.replace(/mm/, m < 10 ? '0' + m : m);
      } else {
        formatted = formatted.replace(/m/, m);
      }
    }
    // Create milliseconds
    if (/s{3}/.test(formatted)) {
      // 'sss': Millisecond in second, padded (000-999)
      formatted = formatted.replace(/sss/, ms < 10 ? '00' + ms : ms < 100 ? '0' + ms : ms);
    }
    // Create seconds
    if (/s{1,2}/.test(formatted)) {
      // 'ss': Second in minute, padded (00-59)
      // 's': Second in minute (0-59)
      if (/(s{2})/.test(formatted)) {
        formatted = formatted.replace(/ss/, s < 10 ? '0' + s : s);
      } else {
        formatted = formatted.replace(/s/, s);
      }
    }
    // Create period
    if (/a/.test(formatted)) {
      // 'a': AM/PM marker
      formatted = formatted.replace(/a/, h < 12 ? 'AM' : 'PM');
    }

    return formatted;
  };

  var date = function date() {
    return new Date(o.timestamp + (Date.now() - o.now));
  };

  var run = undefined;
  var start = function start() {
    run = setInterval(function () {
      var d = date();
      o.callback(format(d), d);
    }, o.update);
  };
  var stop = function stop() {
    clearInterval(run);
  };

  if (!obj) {
    return new Date(o.timestamp);
  } else {
    start();
    return {
      start: start,
      stop: stop
    };
  }
} // inRealTime();
