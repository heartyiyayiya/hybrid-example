export default function getUrlParam(name)
{
    /*var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = decodeURIComponent(window.location.href.split("?")[1]).match(reg);*/
    
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
    	return unescape(r[2]); 
    } else {
    	return null;
	}
}
