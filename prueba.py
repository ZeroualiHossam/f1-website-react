import numpy as np
from random import randrange
import math
import pandas as pd

def compute_closer_driver(data_matrix,i_new):
    closer_driver = -1
    min_distance = -1
    for i in range(i_new):
        distance = np.linalg.norm(data_matrix[i] - data_matrix[i_new])
        if distance <= min_distance or min_distance == -1:
            closer_driver = i
            min_distance = distance
    
    #second closer driver
    s_closer_driver = -1
    min_distance = -1
    for i in range(i_new):
        if i != closer_driver:
            distance = np.linalg.norm(data_matrix[i] - data_matrix[i_new])
            if distance <= min_distance or min_distance == -1:
                s_closer_driver = i
                min_distance = distance

    return closer_driver, s_closer_driver

df = pd.read_csv('f1-final.csv')
df = df.drop('Unnamed: 0',axis=1)

questions = list(df.columns)[1:]
drivers = list(df['Driver name'])

asked = [False]*len(questions)

df_matrix = df.drop(['Driver name'],axis=1)
data_matrix = df_matrix.to_numpy()

new_row = np.zeros((1, data_matrix.shape[1]))

data_matrix = np.vstack([data_matrix, new_row])

ndrivers = len(drivers)
i_new = ndrivers
closer_driver = 0

q_left = len(questions)

for i in range(100):
    if i == 0: #first question is random
        question_i = randrange(len(questions))
        asked[question_i] = True
    else:
        possible_question_i = []
        for q, value in enumerate(data_matrix[closer_driver]):
            #we search for questions the closer driver answers yes, to confirm if it is him.
            if value == 1 and not(asked[q]):
                possible_question_i.append(q)
        if len(possible_question_i) == 0: #driver has all answers not asked to 0
            #we recompute only focusing on questions never asked, not on any specific driver
            possible_question_i = []
            for q in range(len(asked)):
                if asked[q] == False:
                    possible_question_i.append(q)
            if len(possible_question_i) == 0: #all questions asked
                break
        possible_question_i_index = randrange(len(possible_question_i))
        question_i = possible_question_i[possible_question_i_index]
        asked[question_i] = True
    
    print(questions[question_i])
    answer = int(input())

    data_matrix[i_new, question_i] = answer


    closer_driver, s_closer_driver = compute_closer_driver(data_matrix,i_new)

    q_left -=1
    distance_to_closer_driver = np.linalg.norm(data_matrix[closer_driver] - data_matrix[i_new])
    distance_to_s_closer_driver = np.linalg.norm(data_matrix[s_closer_driver] - data_matrix[i_new])

    print(drivers[closer_driver], drivers[s_closer_driver])

    if distance_to_s_closer_driver > math.sqrt(q_left): 
        #if the distance to the second closer driver is greater than the 
        # distance we would move with the questions left, break
        break

print('Answer: '+drivers[closer_driver])