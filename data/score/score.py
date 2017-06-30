import json
import sys

def discovery_score(dist):
    if dist <= 5:
        return .8
    elif dist <= 10:
        return .6
    elif dist <= 20:
        return .4
    else:
        return .2


with open('data/score/events.json') as data_file:
    data = json.load(data_file)

    ursa_events = data['ursa_events']
    discovery_events = data['discovery_events']


    #Find overlaps
    overlaps = []

    ursa_Ids = [event['eventId'] for event in ursa_events]
    for event in discovery_events:
        if event['eventId'] in ursa_Ids:
            overlaps.append(event['eventId'])


    discovery_events.sort(key=lambda x: (x['distance']))

    finalOutputList = []


    for i in range(0,5):
        if ursa_events[i]['eventId'] in overlaps:
            finalOutputList.insert(0,ursa_events[i])
        else:
            finalOutputList.append(ursa_events[i])


        if discovery_events[i]['eventId'] in overlaps:
            finalOutputList.insert(0,discovery_events[i])
        else:
            finalOutputList.append(discovery_events[i]);

    sys.stdout.write(json.dumps(finalOutputList))
