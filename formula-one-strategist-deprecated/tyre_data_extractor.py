import pandas as pd
import json
import torch
import torch.nn as nn

class Tyre_data_extractor():
    def __init__(self, file):
        self.file=  file
    
    def computeCsv(self):
        self.df = pd.read_csv(self.df)
        stints = []
        for col in self.df.columns:
            if col != 'LAP':
                stint = []
                for i in range(1,self.df.shape[0]):
                    value = self.df.loc[i,col]
                    if value in ['S','M','H','BOX']:
                        #empieza un nuevo stint
                        if len(stint) > 1: #guardamos el anterior si no es vacío
                            stints.append(stint)
                        if value == 'BOX': #si hay box, el neumático es el de antes
                             value = stints[len(stints)-1][0]
                        stint = [value]
                    elif type(value) == float:
                        value = -1
                    else:
                        try:
                            value = float(value) #comprobamos que sea un número
                        except:
                            value = -1 #es un string sin informacion
                        stint.append(value)
                if len(stint) > 1: #guardamos el anterior si no es vacío
                    stints.append(stint)
        
        self.tyre_stints_data ={'S': [],'M': [],'H': []}

        for stint in stints:
            stint_data = {}
            stint_data['x'] = []
            stint_data['y'] = []
            for i, value in enumerate(stint[1:]):
                if value != -1:
                    stint_data['x'].append(i)
                    stint_data['y'].append(value)
            if len(stint_data['x']) == 0:
                print(stint)
            self.tyre_stints_data[stint[0]].append(stint_data)
        
        with open('data/ByStintsData/tyre_stints_data.json', 'w') as file_json:
            json.dump(self.tyre_stints_data, file_json,indent=1)
    
    def computeStintsData(self):
        with open(self.file, 'r') as file:
            self.tyre_stints_data = json.load(file)
        
        tyre_data = {
            'soft': {'time': 0, 'loss': 0},
            'medium': {'time': 0, 'loss': 0},
            'hard': {'time': 0, 'loss': 0}
        }
        dict_tyre = {'S':'soft','M':'medium','H':'hard'}
        for tyre in ['S','M','H']:
            total_slope_laps = 0
            total_laps = 0
            time_min = 100000
            for stint_data in self.tyre_stints_data[tyre]:
                time_min = min(time_min,min(stint_data['y']))
                laps = len(stint_data['x'])
                x_torch = torch.tensor(stint_data['x'], dtype=torch.float32)
                x_torch = x_torch.view(-1,1)
                x_torch = torch.cat([torch.ones(laps,1),x_torch],dim=1)

                y_torch = torch.tensor(stint_data['y'], dtype=torch.float32)
                y_torch = y_torch.view(-1,1)

                if x_torch.shape[0] > 1:
                    [_,w] = torch.matmul(torch.matmul(torch.inverse(torch.matmul(x_torch.T, x_torch)), x_torch.T), y_torch)
                    total_slope_laps = w * laps
                    total_laps += laps
            average_slope = total_slope_laps /total_laps


            tyre_data[dict_tyre[tyre]]['loss'] = average_slope.item()
            tyre_data[dict_tyre[tyre]]['time'] = time_min

        return tyre_data

    def computeCircuit(self):
        with open(self.file, 'r') as file:
            tyre_data = json.load(file)
        
        tyre_data['soft']['time'] = float(tyre_data['soft']['time'] )
        tyre_data['soft']['loss'] = float(tyre_data['soft']['loss'] )

        tyre_data['medium']['time'] = float(tyre_data['medium']['time'])
        tyre_data['medium']['loss'] = float(tyre_data['medium']['loss'] )

        tyre_data['hard']['time'] = float(tyre_data['hard']['time'])
        tyre_data['hard']['loss'] = float(tyre_data['hard']['loss'])
        return tyre_data
            