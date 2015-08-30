//BASE = 'http://www.iieye.cc/mh/DA4A1F2C9C9E84AC/6840282AA359B761/';
SUFFIX_1 = '?p=';
SUFFIX_2 = '&s=0';
var fs = require('fs'),system = require('system'),address;

var page = require('webpage').create();
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36';
page.settings.loadImages = false;

if (system.args.length !== 3) {
    console.log('Usage: getPageCount.js <some URL> <file name>');
	//page.close();
    phantom.exit(1);
} else {
	filename = system.args[2];
    address = system.args[1];
    page.open(address+SUFFIX_1+'1'+SUFFIX_2,
	function(status){
		if(status!=='success'){
			console.log('fail');
		}else{
			var pc = page.evaluate(function(){
				return document.getElementById('spPageCount').textContent;
			});
			for(var i=0;i<parseInt(pc);++i){
				fs.write(filename, i.toString()+'\r\n', 'a');
			}
		}
		//page.close();
		phantom.exit();
	});
}