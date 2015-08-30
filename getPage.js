SUFFIX_1 = '?p=';
SUFFIX_2 = '&s=0';
FAILED_FILE_NAME = 'failed.txt';

var page = require('webpage').create(),
    system = require('system'),
    address;
var found = false;
var fs = require('fs'),regExp = new RegExp("http://.*\.JPG");
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36';
page.settings.resourceTimeout = 10*1000;

if (system.args.length !== 4) {
    console.log('Usage: getPage.js <some URL> <page number> <file name>');
    page.close();
    phantom.exit(1);
} else {
    address = system.args[1];
    pagenumber = parseInt(system.args[2])+1;
    filename = system.args[3];

    page.onResourceRequested = function (request) {
        var url = request.url;
        var result = regExp.test(url);
        if(result&&!found){
            found = true;
            fs.write(filename,url+'\r\n','a');
            page.close();
            phantom.exit();
        }
    };
    page.onResourceTimeout = function(){
        console.log('timeout');
        fs.write(FAILED_FILE_NAME,(pagenumber-1).toString()+'\r\n','a');
        page.close();
        phantom.exit();
    }

    /*page.onResourceReceived = function (res) {
        //console.log('received: ' + JSON.stringify(res, undefined, 4));
        var url = res.url;
        var result = regExp.test(url);
        if(result&&!found){
            found = true;
            fs.write(filename,url+'\r\n','a');
            //page.close();
            phantom.exit();
        }
    };*/

    page.open(address+SUFFIX_1+pagenumber.toString()+SUFFIX_2, function (status) {
        if (status !== 'success') {
            console.log('FAIL to load the address');
        }
        page.close();
        phantom.exit();
    });
}
