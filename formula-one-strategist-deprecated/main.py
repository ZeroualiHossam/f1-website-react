import f1_strategy as f1st
import f1_strategy_batcktracking as f1st_bt
import tyre_data_extractor as tde

def get_laps_sc(safety_car):
    safety_car2 = []
    if len(safety_car)%2 == 0 and len(safety_car)>0:
        safety_car.sort()
        for i in range(int(len(safety_car)/2)):
            safety_car2 += ([x for x in range(safety_car[i*2],safety_car[i*2+1]+1)])
    else:
        safety_car2 = []
    
    return set(safety_car2)

if __name__ == '__main__':
    #Basic info
    laps = 51
    pit_time=20
    #Tyre data
    tyre_data_method = 'ByCircuit' #or ByCircuit or ByStintsData
    circuit = 'azerbaijan'
    stintsData = 'data/ByStintsData/tyre_stints_data.json'
    tyre_data = {
            'soft': {'time': 0.3, 'loss': 0.1},
            'medium': {'time': 0.5, 'loss': 0.2},
            'hard': {'time': 0.7, 'loss': 0.27}
    }
    #Safety car
    sc = [15,17,35,47] #every 2 numbers a safety car.

    #CurrentSituation
    stints=[f1st.F1_Stint('hard',17),f1st.F1_Stint('hard',17),f1st.F1_Stint('hard',15)]
    #stints = []
    if tyre_data_method == 'ByCircuit':
        file = 'data/ByCircuit/'+circuit+'.json'
        tde_instance = tde.Tyre_data_extractor(file)
        tyre_data = tde_instance.computeCircuit()
    elif tyre_data_method == 'ByStintsData':
        tde_instance = tde.Tyre_data_extractor(stintsData)
        tyre_data = tde_instance.computeStintsData()

    
    strategy = f1st.F1_Strategy(laps=laps, pit_time=pit_time, tyre_data=tyre_data,stints=stints,safety_car=get_laps_sc(sc))

    backtracking = f1st_bt.F1_Strategy_backtracking(strategy)
    strategy = backtracking.backtracking()

    #strategy.print()

    

    backtracking.best_strategies()


    

    
