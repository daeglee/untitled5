import React, {createContext, useContext, useState} from 'react';

const DataContext = createContext(null);
const DispatchContext = createContext(null);

export function ChartDataUpdateContextProvider({children}){
    // 1. 일치하는 타입이고
    // 2. 해당타입의 logTime과 비교하여
    // 3. logTime이 더 최신값이면 삭제
    // 한번 데이터를 받아오면
    const [updateArray, dispatch] = useState({
        type: [],
        logTime: 0,
        value: []
    });
    // type = 현재 구독중인 값의 type들의 목록
    // 100 - cpu usage realtime
    // 200 - cpu usage minute 과 같이 규칙을 정해야할 것으로 보인다.

    // logTime - 가장 최신의 logTime ( value에서 logTime을 포함하겠지만, 만약 logTime < value의 logTime중 큰 값이 있다면
    // logTime의 값이 갱신된다.

    // value - data의 array
    // useState를 useEffect로 바꿀지 고려해봐야할 것으로 보인다.


    return(
        <DataContext.Provider value = {updateArray}>
            <DispatchContext.Provider value={dispatch}>
                        {children}
            </DispatchContext.Provider>
        </DataContext.Provider>
    );
}

export function useDataContext() {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('Cannot find DataContext');
    }
    return context;
}

export function useDispatchContext() {
    const context = useContext(DispatchContext);
    if (!context) {
        throw new Error('Cannot find DispatchContext');
    }
    return context;
}
