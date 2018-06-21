let countDown = function (times, fn, endFn) {
    if (typeof times === "number") {
        times = calculateDateTime(times);
    }
    if (Object.prototype.toString.apply(times) === "[object Date]") {
        return (init.call(this, times, fn, endFn));
    }
}

//把毫秒转换成数组[day, hour, minute, second]
function calculateTime(time) {
    if (time < 0) {
        return [0, 0, 0, 0];
    }
    time = Math.floor(time / 1000);
    var times = [], scales = [86400, 3600, 60];
    for (var i = 0; i < scales.length; i++) {
        times.push(Math.floor(time / scales[i]));
        time %= scales[i];
    }
    times.push(time);
    return times;
}

//把间隔时间转换成日期
function calculateDateTime(time) {
    var times = new Date();
    times = times.getTime() + time;
    return new Date(times);
}
/*countDown.prototype.clear = function(){
    clearInterval(this.timer)
}*/
function init(times, fn, endFn) {
    var intervalTime;
    function calculateTimes() {
        intervalTime = times.getTime() - new Date().getTime();

        if (intervalTime > 0) {
            fn(calculateTime(intervalTime));
        } else {
            fn([0, 0, 0, 0]);
            if (typeof endFn === "function") {
                endFn();
            }
            return true;
        }
    }
    if (calculateTimes()) {
        return
    }
    var intervalMac = setInterval(function () {
        calculateTimes()
        if (intervalTime <= 0) {
            clearInterval(intervalMac);
        }

    }, 1000);

    // this.timer = intervalMac;
    return intervalMac;
}

export default countDown;