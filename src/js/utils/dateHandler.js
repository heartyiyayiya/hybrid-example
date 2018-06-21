/**
 * Created by wangqian on 16/2/15.
 */



function getDate(date){
    if(typeof date === 'string'){
        date = new Date(date.replace(/\..*$/,"").replace(/-/g,'/').replace(/\+/g,' '));
    }
    return new Date(date);
}

function getWeekStr(date,currentDate){
    date = getDate(date);
    currentDate = getDate(currentDate);

    var d1 = date.getDate(),
        d2 = currentDate.getDate(),
        week = date.getDay();

    if(d1 == d2){
        return '今天'
    }else if((d2 + 1) == d1){
        return '明天'
    }else if((d2 + 2) == d1){
        return '后天'
    }

    switch(week){
        case 0: return '星期日';
        case 1: return '星期一';
        case 2: return '星期二';
        case 3: return '星期三';
        case 4: return '星期四';
        case 5: return '星期五';
        case 6: return '星期六';
    }
}

function addDate(count,date) {
    date = getDate(date);
    date.setDate(date.getDate() + count);
    return getDate(date);
}

function addHours(hours,date){
    date = getDate(date);
    date.setHours(date.getHours() + hours);
    return getDate(date);
}

function formatYMD(date){
    date = getDate(date);
    var year = date.getFullYear(),
        month = date.getMonth()+1,
        day = date.getDate();

    return(year + '年' + month + '月' + day + '日')
}

function getYMDarr(date){
    date = getDate(date);
    let year = date.getFullYear(),
        month = date.getMonth()+1,
        day = date.getDate();
    return [year, month, day]
}

module.exports = {
    getDate:getDate,
    getWeekStr:getWeekStr,
    addDate:addDate,
    addHours:addHours,
    formatYMD: formatYMD,
    getYMDarr: getYMDarr
};