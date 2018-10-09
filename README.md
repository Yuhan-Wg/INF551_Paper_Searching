# INF551_Paper_Searching


## Project Timeline
 
### Week 4(by Sep 16)

Prepare Data: Scrape pdf documents from websites


### Week 5-6(by Sep 30)

Build Database: Extract the metadata from pdf documents, convert to JSON and upload to Firebase real-time database.

### Week 7-8(by Oct 14)

Create a Simple App: Design a simple webpage, link to the database, and develop a simple app with basic search functions like searching by metadata

### Week 9-10(by Oct 28)

Modify Our App:  Modify out App to implement some more complicated functions like searching by words or sentences in contents

### Oct 29

Project Midterm Report

### Week 11(by Nov 4)

Buffer Week: Complete the unfinished tasks in the former weeks and consider the next step

### Week 12-13(by Nov 18)

Improve Our User Inference and Integrate UI and the API

### Week 14(by Nov 25)

Final Test of App and Write Final Report

### Sep 26

Final Review

## Milestones
We divide our project into 4 Steps, which can be thought as milestones:
⇨ Get all required data.(Before Sep 30)
⇨ A simple app with basic functions, which can work properly(Before Oct 14)
⇨ Midterm, an advanced app with more complicated functions(Before Oct 28)
⇨ Final, a finished app with beautiful interface(Before Nov 18)

## JSON Data Structure
{year:{week:[content,]}}

content is dictionary, keys are shown below:

content
{'category',
'title',
'author',
'authorInstitution',
'publisher',
'date',
'doi',
'pdfLink',
'textLink',
'text'}

