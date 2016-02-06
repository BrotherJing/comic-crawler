# Usage

1. run getpagecount.bat, to get the total page count. This will write a list of page number(0,1,2...) to pagecount.txt
```
getpagecount.bat <base_url>
```
2. run crawl.bat, the image urls will be written into result.txt, and it will call comic.py to download the image files
```
crawl.bat <base_url> <page number file>
```
3. the crawler might fail on some pages, the failed image urls will be written into failed.txt. re-run crawl.bat on this file.
```
crawl.bat <base_url> failed.txt
```