import f1_strategy as f1st
import f1_strategy_batcktracking as f1st_bt
import tabularocr

import sys
if __name__ == '__main__':
    tyre_data = {
         'soft': {'time': 92.431, 'loss': 0.09},
        'medium': {'time': 92.825, 'loss': 0.06},
        'hard': {'time': 93.360, 'loss': 0.05}
    }

    stints=[f1st.F1_Stint('hard',10)]
    strategy = f1st.F1_Strategy(laps=57, pit_time=23, tyre_data=tyre_data,stints=stints)

    backtracking = f1st_bt.F1_Strategy_backtracking(strategy)
    strategy = backtracking.backtracking()

    strategy.print()

    backtracking.best_strategies()

    print(sys.prefix)


    

    
