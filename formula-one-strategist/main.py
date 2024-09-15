import f1_strategy as f1st
import f1_strategy_batcktracking as f1st_bt
import tyre_data_extractor as tde

if __name__ == '__main__':
    #Basic info
    laps = 53
    pit_time=24
    #Tyre data
    tyre_data_method = 'ByCircuit' #or ByCircuit or ByStintsData
    circuit = 'monza'
    stintsData = 'data/ByStintsData/tyre_stints_data.json'
    tyre_data = {
            'soft': {'time': 0.3, 'loss': 0.1},
            'medium': {'time': 0.5, 'loss': 0.2},
            'hard': {'time': 0.7, 'loss': 0.27}
    }
    #CurrentSituation
    #stints=[f1st.F1_Stint('hard',1)]
    stints = []
    if tyre_data_method == 'ByCircuit':
        file = 'data/ByCircuit/'+circuit+'.json'
        tde_instance = tde.Tyre_data_extractor(file)
        tyre_data = tde_instance.computeCircuit()
    elif tyre_data_method == 'ByStintsData':
        tde_instance = tde.Tyre_data_extractor(stintsData)
        tyre_data = tde_instance.computeStintsData()

    
    strategy = f1st.F1_Strategy(laps=laps, pit_time=pit_time, tyre_data=tyre_data,stints=stints)

    backtracking = f1st_bt.F1_Strategy_backtracking(strategy)
    strategy = backtracking.backtracking()

    strategy.print()

    

    backtracking.best_strategies()


    

    
