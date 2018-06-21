; (function (win) {
	'use strict';

	var store = {},
		localStorageName = 'localStorage',
		storage;

	function isLocalStorageNameSupported() {
		try {
			return (localStorageName in win && win[localStorageName])
		} catch (err) {
			return false
		}
	}

	if (isLocalStorageNameSupported()) {

		storage = win[localStorageName];
		store.serialize = function (value) {
			return JSON.stringify(value)
		};

		store.deserialize = function (value) {
			if (typeof value != 'string') { return undefined }
			try { return JSON.parse(value) }
			catch (e) { return value || undefined }
		};

		store.set = function (key, val) {  //存储localstorage
			if (val === undefined) {
				return store.remove(key)
			}
			storage.setItem(key, store.serialize(val));
			return val
		};
		store.get = function (key) { //获取localstorage
			return store.deserialize(storage.getItem(key))
		};
		store.remove = function (key) { //移除localstorage
			storage.removeItem(key)
		};
		//        store.clear = function () { //删除全部localstorage
		//            storage.clear()
		//        };
		store.getAll = function () { //获取全部的localstorage
			var ret = {};
			store.forEach(function (key, val) {
				ret[key] = val
			});
			return ret
		};
		store.forEach = function (callback) { //循环
			for (var i = 0; i < storage.length; i++) {
				var key = storage.key(i);
				callback(key, store.get(key))
			}
		}
	}
	module.exports = store
})(Function('return this')());