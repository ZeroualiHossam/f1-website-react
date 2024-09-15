class F1_Stint():
    #Class that contains a stint,
    #which is described by the tyre 
    #selected for the stint and the
    #laps done

    def __init__(self, tyre, laps):
        self.tyre = tyre
        self.laps = laps


class F1_Strategy():
    #Class implementing a f1 strategy.
    #A strategy is described by its stints
    #and it also contains the tyre data, the
    #total laps that should be done and the time
    #spent on pits to compute how good it is
    #with the heuristic function.

    def __init__(self, laps, pit_time, tyre_data, stints=[]):
        self.stints = stints
        self.laps = laps
        self.pit_time = pit_time
        self.tyre_data = tyre_data
    
    def print(self):
        #prints a f1 strategy with
        #the tyre and laps of each
        #stint and the heuristic.

        for i,stint in enumerate(self.stints):
            print('Stint '+str(i)+': ',stint.tyre,' ',stint.laps)
        print(self.heuristic())
    
    def strat_type_string(self):
        string = ''.join([stint.tyre+' ' for stint in self.stints])
        return string
    
    def unify_strategies(self, strategy2, pit):

        if (pit == 0): #no pit after current strategy
            self.stints = strategy2.stints + self.stints
            if (self.unify_stintB(len(strategy2.stints)-1)):
                self.unify_stint(len(strategy2.stints)-1)
            else:
                return False #because it's not possible to unify
        else:
            self.stints = strategy2.stints + self.stints
        return True
    
    def accepted_strategy(self):
        tyres = []
        for stint in self.stints:
            tyres.append(stint.tyre)
        return len(self.stints) > 1 and len(list(set(tyres))) > 1
    
    def completed_laps(self):
        laps = 0
        for stint in self.stints:
            laps += stint.laps
        return laps

    def heuristic(self):
        #Computes how good a strategy is based on
        #the seconds that will last a race with
        #this strategy. Taking into account the
        #data collected.

        #Que compruebe haya un pit y variacion de tyre.
        #if len(self.stints > 1) and 
        total_time = 0
        for stint in self.stints:
            time_laps = stint.laps * self.tyre_data[stint.tyre]['time'] #Time if there was no degradation
            offset_total = ((stint.laps-1) * (stint.laps)) / 2 #Times we have to add the loss
            offset_time = offset_total * self.tyre_data[stint.tyre]['loss'] #We multiply by the loss
            total_time += time_laps + offset_time #The total time adds the time spent on this stint.
        
        total_time += (len(self.stints)-1) * self.pit_time #We add the pit time.
        
        return total_time
    
    def split_stintB(self,stint_i):
        return (stint_i>=0) and (stint_i<len(self.stints))

    def split_stint(self,stint_i):
        stints = []

        for i,stint in enumerate(self.stints):
            if (i != stint_i):
                stints.append(stint)
            else:
                stint1 = F1_Stint(tyre=stint.tyre,laps=stint.laps//2)
                stint2 = F1_Stint(tyre=stint.tyre,laps=stint.laps//2)
                if (stint.laps%2 != 0):
                    stint2.laps += 1
                stints.append(stint1)
                stints.append(stint2)
        
        self.stints = stints
    
    def change_tyreB(self,stint_i,tyre):
        return (stint_i>=0) and (stint_i<len(self.stints)) and (tyre in ['soft','medium','hard'])

    def change_tyre(self,stint_i,tyre):
        self.stints[stint_i].tyre = tyre
    
    def unify_stintB(self,stint_i):
        return (stint_i>=0) and (stint_i<len(self.stints)-1) and (self.stints[stint_i].tyre == self.stints[stint_i+1].tyre) #same tyre to unify
    
    def unify_stint(self,stint_i):
        stints = []

        for i,stint in enumerate(self.stints):
            if (i != stint_i and i != stint_i+1):
                stints.append(stint)
            elif (i == stint_i):
                stint1 = F1_Stint(tyre=stint.tyre,laps=stint.laps + self.stints[i+1].laps)
                stints.append(stint1)
        
        self.stints = stints
    
    def extend_stintB(self,stint_i):
        return (stint_i>=0) and (stint_i<len(self.stints)-1) and (self.stints[stint_i+1].laps > 1)
    
    def extend_stint(self,stint_i):
        self.stints[stint_i].laps+=1
        self.stints[stint_i+1].laps-=1

    def short_stintB(self,stint_i):
        return (stint_i>=0) and (stint_i<len(self.stints)-1) and (self.stints[stint_i].laps > 1)
    
    def short_stint(self,stint_i):
        self.stints[stint_i].laps-=1
        self.stints[stint_i+1].laps+=1

