export default function request(url, callBack) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				callBack(JSON.parse(xhr.responseText));
			} else {
				console.log("请求失败");
			}
		}
	}
	xhr.open("GET", url, true);
	xhr.send();

}
