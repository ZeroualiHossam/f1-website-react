import f1_strategy as f1st

class F1_Strategy_backtracking():
    #Class that gets an uncompleted strategy
    #that has to be filled with the possible
    #following stints, based on its heuristic.
    #A backtracking algorithm is used to compute
    #the best possible strategy.

    def __init__(self, strategy):
        self.current_strategy = strategy
        
        self.best_strategy = f1st.F1_Strategy(laps=strategy.laps, pit_time=strategy.pit_time, tyre_data=strategy.tyre_data, stints=[])
        self.laps = strategy.laps - strategy.completed_laps()
        self.pit_time = strategy.pit_time
        self.tyre_data = strategy.tyre_data

        self.tyre_vector = ['soft','medium','hard']

        self.generate_tyre_combinations()
    
    def add1tyres(self,tyres): 
        #Recursive function that gets a list
        #of a certain tyre combination and returns
        #the following tyre combination. If the input
        #passed is the last one we should generate, it
        #returns an empty list.

        if len(tyres) == 1:
            if tyres[0] < 2:
                tyres[0] +=1
            else:
                tyres = []
        else:
            if tyres[len(tyres)-1] < 2:
                tyres[len(tyres)-1] +=1
            else:
                tyres.pop()
                tyres = self.add1tyres(tyres)
                if tyres == []:
                    tyres = []
                else:
                    tyres.append(0)
        return tyres

    def generate_tyre_combinations(self):
        #Generates all possible tyre combinations for
        #1, 2 and 3 pit stops. This will be used on
        #backtracking.

        tyres = [-1]
        tyres_combinations1 = []
        while True:
            tyres = self.add1tyres(tyres)
            if tyres == []:
                break
            tyres_combinations1.append(tyres.copy())
        
        tyres = [0,-1]
        tyres_combinations2 = []
        while True:
            tyres = self.add1tyres(tyres)
            if tyres == []:
                break
            tyres_combinations2.append(tyres.copy())
        tyres = [0,0,-1]
        tyres_combinations3 = []
        while True:
            tyres = self.add1tyres(tyres)
            if tyres == []:
                break
            tyres_combinations3.append(tyres.copy())

        self.tyres_combinations = [tyres_combinations1,tyres_combinations2,tyres_combinations3]

    def add1pit_laps(self,pit_laps):
        #Recursive function that gets a certain
        #pit laps combination and returns the following
        #combination. It returns an empty list if the input
        #passed is the last pit laps combination possible,
        #taking into account the laps that should be done.
        if(len(pit_laps) ==0):
            return []

        if(len(pit_laps) == 1): #We only have one stop
            if(pit_laps[0] == self.laps-1): #Check we won't generate any pit on last lap
                return [] #false
            else:
                pit_laps[0] +=1
        else: #We will add 1 to the last element. If it's the maximum, add 1 to the pit_laps without last
            if(pit_laps[len(pit_laps)-1] == self.laps-1):
                pit_laps.pop() 
                pit_laps = self.add1pit_laps(pit_laps)
                if pit_laps != []: #We have finished
                    #We add to the last the same value of the last of the rest not to generate impossible
                    #pit laps combinations.
                    pit_laps.append((pit_laps[len(pit_laps)-1]))
            else: #The last element is not the maximum, we add 1
                pit_laps[len(pit_laps)-1] += 1
        return pit_laps
    
    def check_duplicate(self, pit_laps_sorted):
        for i in range(1,len(pit_laps_sorted)):
            if pit_laps_sorted[i-1] == pit_laps_sorted[i]:
                return True
        return False
    
    def generate_strategies_from_pit_laps(self, pit_laps):
        #This function gets a certain pit laps combination
        #and returns all the possible stints with that pit laps
        #combination. There are several possible stints because
        #we have different tyre combinations.

        strategies = []
        for tyres in self.tyres_combinations[len(pit_laps)]:
            stints = []
            if len(pit_laps) == 0:
                tyre = self.tyre_vector[tyres[0]]
                stint = f1st.F1_Stint(tyre=tyre,laps=self.laps)
                stints.append(stint)
            else:
                for i in range(len(pit_laps)):
                    tyre = self.tyre_vector[tyres[i]]
                    if i == 0:
                        stint = f1st.F1_Stint(tyre=tyre,laps=pit_laps[i])
                    else:
                        stint = f1st.F1_Stint(tyre=tyre,laps=pit_laps[i]-pit_laps[i-1])
                    stints.append(stint)
                tyre = self.tyre_vector[tyres[len(tyres)-1]]
                stint = f1st.F1_Stint(tyre=tyre,laps=self.laps-pit_laps[len(pit_laps)-1])
                stints.append(stint)

            strategies.append(stints)
        
        return strategies

    def backtracking(self):
        #It computes the backtracking generating all possible
        #strategies and keeping the best.
        for stops in range(0,3):
            pit_laps = [1]*stops #Start with all stops at lap 1
            run_stops = True
            while (run_stops):
                pit_laps_sorted = pit_laps.copy() 
                pit_laps_sorted.sort()
                if (not self.check_duplicate(pit_laps_sorted)) and pit_laps == pit_laps_sorted: #check no duplicates and increasing
                    
                    strategies = self.generate_strategies_from_pit_laps(pit_laps)
                    for stints in strategies:
                        for pit in range(2):
                            strategy = f1st.F1_Strategy(laps=self.laps, pit_time=self.pit_time, tyre_data=self.tyre_data)
                            strategy.stints = stints

                            res = strategy.unify_strategies(self.current_strategy,pit)
                            accepted = strategy.accepted_strategy()
                            if res and accepted:
                                if strategy.heuristic() < self.best_strategy.heuristic() or self.best_strategy.completed_laps() == 0: #check if we improve

                                    self.best_strategy = strategy

                pit_laps = self.add1pit_laps(pit_laps) #go to the following pit_laps
                if pit_laps == []:
                    run_stops = False

        return self.best_strategy
    
    def best_strategies(self):
        #Once we've computed the best strategy
        #we get all strategies that are best than the
        #best strategy plus 15s, removing almost duplicate.
        best_strategies_list = []
        for stops in range(0,3):
            pit_laps = [1]*stops #Start with all stops at lap 1
            run_stops = True
            while (run_stops):
                pit_laps_sorted = pit_laps.copy() 
                pit_laps_sorted.sort()
                if (not self.check_duplicate(pit_laps_sorted)) and pit_laps == pit_laps_sorted: #check no duplicates and increasing
                    
                    strategies = self.generate_strategies_from_pit_laps(pit_laps)
                    for stints in strategies:
                        for pit in range(2): #pit after the current strategy or not
                            strategy = f1st.F1_Strategy(laps=self.laps, pit_time=self.pit_time, tyre_data=self.tyre_data)
                            strategy.stints = stints

                            res = strategy.unify_strategies(self.current_strategy, pit)
                            accepted = strategy.accepted_strategy()
                            if res and accepted:
                                heuristic = strategy.heuristic()
                                if strategy.heuristic() < self.best_strategy.heuristic() + 3: #check if we improve
                                    best_strategies_list.append((strategy,heuristic))

                pit_laps = self.add1pit_laps(pit_laps) #go to the following pit_laps
                if pit_laps == []:
                    run_stops = False

        best_strategies_list = sorted(
            best_strategies_list,
            key = lambda x: x[1]
        )

        best_strategies_list_2 = []
        best_strategies_type_found = {}
        for strategy in best_strategies_list:
            id_strat_type = strategy[0].strat_type_string()
            if best_strategies_type_found.get(id_strat_type) == None:
                best_strategies_list_2.append(strategy[0])
                best_strategies_type_found[id_strat_type] = 1
        
        for strategy in best_strategies_list_2:
            strategy.print()
    
    # More duplicates to eliminate
