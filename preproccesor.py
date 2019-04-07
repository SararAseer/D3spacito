import csv
import itertools
import copy
import json

rowCounter = 0
questionList = {}

questionResponseDict = {}
districtResponsesDict = {}

with open('static/data/student_data.csv', newline='') as csvfile:
    reader = csv.reader(csvfile, delimiter=',', quotechar='"')
    for row in reader:
        if rowCounter == 0: # High level header
            answers = list(reader)[0]
            for cell in range(3, len(row)):
                if len( row[cell] ) > 0:
                    questionList[ row[cell] ] = {answers[cell]: 0}
                    questionResponseDict[cell] = [ row[cell], answers[cell] ]
                    stepsAhead = 1
                    while cell + stepsAhead < len(row) and len( row[cell + stepsAhead] ) == 0:
                        questionResponseDict[cell + stepsAhead] = [ row[cell], answers[cell + stepsAhead] ]

                        questionList[ row[cell] ][answers[cell + stepsAhead]] = 0
                        stepsAhead += 1

with open('static/data/student_data.csv', newline='') as csvfile:
    reader = csv.reader(csvfile, delimiter=',', quotechar='"')
    next(reader)
    next(reader)
    next(reader)
    for row in reader:
        district = int(row[0][0:2])
        if district > 32:
            continue
        if not district in districtResponsesDict.keys():
            districtResponsesDict[district] = copy.deepcopy(questionList)
        for cell in range(3, len(row)):
            if row[cell] != "N/A":
                districtResponsesDict[district][questionResponseDict[cell][0]][questionResponseDict[cell][1]] += int(row[cell])


f = open("surveys.json", "w")
f.write(json.dumps(districtResponsesDict))
f.close()
