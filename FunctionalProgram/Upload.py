import requests
import json

if __name__ = '__main__' :
    with open("./JSONfiles/metadata.json",'r',encoding='utf-8') as json_file:
        p = json.load(json_file)
    requests.put('https://inf551-project-f33cc.firebaseio.com/metadata.json', json.dumps(p))
