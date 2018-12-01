import os
from pdfminer.pdfparser import PDFParser,PDFDocument

def extract():
    #read pdf files into list
    file_list = os.listdir("pdf")
    if '.DS_Store' in file_list:
        file_list.remove('.DS_Store')

    metadata = []
    for file in file_list:
        fp = open('pdf/' + file, 'rb')
        print(file)
        parser = PDFParser(fp)
        doc = PDFDocument()
        parser.set_document(doc)
        doc.set_parser(parser)
        doc.initialize()
        metadata.extend(doc.info)

    return metadata
