import json
filename = "./json_file.json" # Make sure to rename the downloaded file to json_file.json in the same directory as the script
flag=0
send=""
with open(filename,'r' ,encoding="utf8") as fr:
    pre = fr.read()
    words = pre.split(',')
    for x in words: 
        if(x == '"input":true'):
            flag=1
        if(x == '"disabled":false' and flag==1):
            x = '"disabled":true'
            flag=0
        send += x 
        send += ","
str = send[:-1]
obj = json.loads(str)
with open('new_file.json', 'w') as out: # new_file.json would be the file with all fields disbaled (to be imoorted in CHEFs)
    json.dump(obj,out)
    