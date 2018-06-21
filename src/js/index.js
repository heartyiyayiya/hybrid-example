import { polyfill, Promise } from 'es6-promise';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import FastClick from 'fastclick';

import '../css/base.css';
import '../css/layout.css';

/*import containers*/
import App from './containers/App';

/*import container*/
import { store } from './store/configureStore';


// 日期格式化
Date.prototype.format = function (q) {
    var s = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    };
    if (/(y+)/.test(q)) {
        q = q.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var r in s) {
        if (new RegExp("(" + r + ")").test(q)) {
            q = q.replace(RegExp.$1, RegExp.$1.length == 1 ? s[r] : ("00" + s[r]).substr(("" + s[r]).length))
        }
    }
    return q;
};

document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
}, false);

Promise.prototype.finally = function (callback) {
    let p = this.constructor;

    return this.then(
        value => p.resolve(callback()).then(() => value),
        reason => p.resolve(callback()).then(() => {
            throw reason
        })
    )
};


polyfill();




render(
    <Provider store={store} >
        <App />
    </Provider>,
    document.getElementById('root')
);
