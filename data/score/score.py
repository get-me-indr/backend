import json
import sys

with open('data/score/events.json') as data_file:
    data = json.load(data_file)


    ret = data
    sys.stdout.write(json.dumps(ret))
