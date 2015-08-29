SUFFIX_1 = '?p=';
SUFFIX_2 = '&s=0';
var page = require('webpage').create(),
    system = require('system'),
    address;
var found = false;
var fs = require('fs'),regExp = new RegExp("http://.*\.JPG");

if (system.args.length !== 4) {
    console.log('Usage: getPage.js <some URL> <page number> <file name>');
    page.close();
    phantom.exit(1);
} else {
    address = system.args[1];
    pagenumber = system.args[2]+1;
    filename = system.args[3];
    /*page.onResourceRequested = function (req) {
        console.log('requested: ' + JSON.stringify(req, undefined, 4));
    };*/

    page.onResourceReceived = function (res) {
        //console.log('received: ' + JSON.stringify(res, undefined, 4));
        var url = res.url;
        var result = regExp.test(url);
        if(result&&!found){
            found = true;
            fs.write(filename,url+'\r\n','a');
            page.close();
            phantom.exit();
        }
    };

    page.open(address+SUFFIX_1+pagenumber.toString()+SUFFIX_2, function (status) {
        if (status !== 'success') {
            console.log('FAIL to load the address');
        }
        page.close();
        phantom.exit();
    });
}
