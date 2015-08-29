import urllib
import urllib2
import sys

class Spider:
    def __init__(self,fn,baseurl):
        self.filename = fn
        self.urls = open(self.filename,'r')
        self.h = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
        'Referer': baseurl
        }
        self.arr = []

    def crawl(self):
        line = self.urls.readline()
        self.arr.append(line)
        i = 1;
        while line:
            line = self.urls.readline()
            self.arr.append(line)
        self.urls.close()

        for i in range(0,len(self.arr)):
            self.saveImg(self.arr[i])
            print 'finish '+str(i)

    def saveImg(self,url):
        
        req = urllib2.Request(url,headers=self.h)
        u = urllib2.urlopen(req)
        data = u.read()
        #data = requests.get(url,stream=True)
        filename = url.split('/')[-1][:-1]
        f = open(filename,'wb')
        f.write(data)
        f.close()

# usage: python comic.py <urls file> <base url>
def main(argv):
    if len(argv) != 3:
        print 'argument error'
        return
    spider = Spider(argv[1],argv[2])
    spider.crawl()
    
if __name__ == '__main__':
    main(sys.argv)
