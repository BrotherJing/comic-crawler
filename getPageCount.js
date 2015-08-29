//BASE = 'http://www.iieye.cc/mh/DA4A1F2C9C9E84AC/6840282AA359B761/';
SUFFIX_1 = '?p=';
SUFFIX_2 = '&s=0';
var fs = require('fs'),system = require('system'),address;

var page = require('webpage').create();

if (system.args.length !== 3) {
    console.log('Usage: getPageCount.js <some URL> <file name>');
	page.close();
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
			fs.write(filename, pc, 'w');
		}
		page.close();
		phantom.exit();
	});
}