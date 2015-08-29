phantomjs getPageCount.js %1 pagecount.txt

for /f "delims=" %%i in (pagecount.txt) do test.bat %1 %%i

python comic.py result.txt %1