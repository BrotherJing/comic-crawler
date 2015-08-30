:usage crawl.bat <baseurl> <page number file>

for /f "delims=" %%i in (%2) do call crawlpage.bat %1 %%i

python comic.py result.txt %1