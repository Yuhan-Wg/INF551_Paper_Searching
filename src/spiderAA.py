from urllib.request import urlopen, urlretrieve
from bs4 import BeautifulSoup
import re
import time
import json
import random
import urllib
import requests

class spiderAA:
    def __init__(self, year_start, year_end):
        self.basic_url = 'http://science.sciencemag.org'
        self.url_list = dict()
        self.text_list = dict()
        self.year_start = year_start
        self.year_end = year_end
        self.url_count = 0
        self.metadata_count = 0
        self.sleep_time = 20

    def autoScraping(self, name = "metadata.json"):
        for year in range(self.year_start, self.year_end+1):
            self.scrapingURL(year)
            print("Scraping URL year %s finished with url number %s"%(year,self.url_count))
            self.scrapingMetadata(year)
            print("Scraping metadata year %s finished with metadata number %s"%(year,self.metadata_count))

        self.saveasJSON(name)

    def scrapingURL(self,year):
        #########################################
        #
        # Func scrapingUPL will get self.url_list
        # self.url_list:{year:{week:[ [text_url, pdf_url], ]}}
        #
        #########################################
        if year in self.url_list:
            print("Warning: urls of year %s already exist. Begin overwriting after 60 seconds."%year)
            for i in reversed(range(60)):
                print(  "=" * i + " " * (60-i)+ str(i) + " seconds" + '\r', end='')
                time.sleep(1)
            print("begin overwriting urls for year %s"%year+" " * 60)

        ##################### Year ######################################
        self.url_list[year]=dict()
        ########## Find week list webpage ##########
        html=self.basic_url+'/content/by/year/'+str(year)
        b0 = urlopen(html)
        bs0bj = BeautifulSoup(b0,'html5lib')
        list_ = bs0bj.find('div',{'class':'pane-content'})\
        .findAll('a',{'class':'highwire-cite-linked-title'})
        ## each element in list_ direct to paper list page
        ########## end week list webpage ##########

        ########### Loop for each week ##########
        ## search in paper list webpage
        for i in range(len(list_)):
            #### weekly lists
            # form of list_[i].get_text()[0:6] is as Jan 01
            week = list_[i].get_text()[0:6]
            self.url_list[year][week]=[]
            #### open paper list webpage
            link=list_[i].get('href')
            b1 = urlopen(self.basic_url + link)
            time.sleep(self.sleep_time * (1+random.random()) )
            bs1bj = BeautifulSoup(b1, 'html5lib')
            #### end ####

            #### paper link list ####
            fullList = bs1bj.findAll('div', {'class': 'toc-citation'})

            ##### Loop for each paper #####
            for div in fullList:
                #### Check if we can access pdf documents ####
                #### if pdf url redirects to another webpage
                #### there is no permission for us to access pdf
                try:
                    pdf_url = self.basic_url +\
                    div.find('a',{'type':'application/pdf'}).get('href')
                except:
                    continue

                #try:
                #    pdf_content = urlopen(pdf_url, timeout=30)
                #    time.sleep(self.sleep_time * (1+random.random()) )
                #except:
                #    print('Time out!')
                #    continue

                #if '.full.pdf' not in pdf_content.geturl():
                #    ## if true, means url is redirected
                #    ## Restricted access
                #    continue
                ### check end ###

                ### text url is helpful for us to get more metadata from
                ### webpage that can't be read from pdf documents
                try:
                	text_url = self.basic_url + \
                	div.find('a',{'title':'Full Text'}).get('href')
                except:
                	continue

                self.url_list[year][week].append((text_url, pdf_url))
                self.url_count += 1
                print("URL Number: %s    \r"%self.url_count,end='')
            ###### Paper Loop END ######
            ################## Week Loop END #############
        ##################### Year END ##################################

    def scrapingMetadata(self,year):
        #########################################
        #
        # Func scrapingMetadata will get self.text_list
        # self.url_list:{year:{week:[ metadata, ]}}
        # need self.url_list (run self.scrapingURL first)
        #
        #########################################
        ########### Week Loop ############
        ## check if year in self.url_list
        if year not in self.url_list:
            raise ValueError("url_list not contains urls for this year, "\
             "run scrapingUPL() first")
        if year in self.text_list:
            print("Warning: metadata of year %s already exist. Begin overwriting after 60 seconds."%year)
            for i in reversed(range(60)):
                print(  "=" * i + " " * (60-i)+ str(i) + " seconds" + '\r', end='')
                time.sleep(1)
            print("begin overwriting metadata for year %s"%year+" " * 60)

        self.text_list[year] = dict()
        ## Week Loop ##
        for week in self.url_list[year]:
            #classified by weeks
            self.text_list[year][week] = list()
            for text_url, pdf_url in self.url_list[year][week]:

                ### read text url #####
                b1 = urlopen(text_url)
                bs1bj = BeautifulSoup(b1, 'html5lib')
                textDict = self.analyzeWebpage(bs1bj)
                textDict['pdfLink'] = pdf_url
                self.text_list[year][week].append(textDict)
                self.metadata_count += 1
                print("Metadata Number: %s    \r"%self.metadata_count,end='')
                time.sleep(self.sleep_time * (1+random.random()) )

    def analyzeWebpage(self, bs1bj):
        #########################################
        #
        # Func analyzeWebpage will return metadata
        # metadata:{author:'John Smith', Age:35, ... }
        #
        #########################################

        # title
        try:
            title = bs1bj.find('meta', {'name': 'citation_title'}).get('content')
        except:
            title = None

        # category
        try:
            category = bs1bj.find('meta', {'name': 'citation_section'}).get('content')
        except:
            category = None

        #Article type
        try:
            articleType = bs1bj.find('meta', {'name': 'citation_article_type'}).get('content')
        except:
            articleType = None

        #Publisher
        try:
            publisher = bs1bj.find('meta', {'name': 'citation_publisher'}).get('content')
        except:
            publisher = None

        #Publication data
        try:
            pubDate = bs1bj.find('meta', {'name': 'citation_publication_date'}).get('content')
        except:
            pubDate = None

        #DOI
        try:
            doi = bs1bj.find('meta', {'name': 'citation_doi'}).get('content')
        except:
            doi = None

        # text link
        try:
            text_link = bs1bj.find('link', {'title': 'Full Text (Plain)'}).get('href')
        except:
            text_link = None

        # ppt link
        try:
            ppt_link = bs1bj.find('link', {'title': 'Full Text (Plain)'}).get('href')
        except:
            ppt_link = None

        # cover image link
        try:
            image_link = bs1bj.find('meta', {'name': 'issue_cover_image'}).get('href')
        except:
            image_link = None

        #Author
        author_list = bs1bj.findAll('meta', {'name': 'citation_author'})
        author = list(map(lambda x:x.get('content'), author_list))

        #Institution
        institution_list = bs1bj.findAll('meta', {'name': 'citation_author_institution'})
        institution = list(map(lambda x:x.get('content'), institution_list))


        # put them in to directory
        textDict = {}
        textDict['category'] = category
        textDict['type'] = articleType
        textDict['title'] = title
        textDict['author'] = author
        textDict['authorInstitution'] = institution
        textDict['publisher'] = publisher
        textDict['date'] = pubDate
        textDict['doi'] = doi
        textDict['textLink'] = text_link
        textDict['pptLink'] = ppt_link
        textDict['imageLink'] = image_link

        # content
        textDict['text'] = ''

        # Data for function to search by abstrace, introduction, discussion part
        textParts = bs1bj.findAll('p', {'id': re.compile('p\-[0-9]*')})
        for finding in textParts:
            textDict['text'] += finding.get_text().replace('\n',' ') + ' '

        return textDict

    def saveasJSON(self, name, data):
        with open("../data/json/"+ name,'w',encoding='utf-8') as json_file:
            json.dump(data, json_file, ensure_ascii=False)

    def readJSON(self, name):
        with open("../data/json/"+name,'r',encoding='utf-8') as json_file:
            data = json.load(json_file)
        return data

    
