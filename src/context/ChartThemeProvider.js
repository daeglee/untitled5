import React, {createContext, useContext, useState} from 'react';
import blueTheme from "./theme/blueTheme";
import greenTheme from "./theme/greenTheme";
import indigoTheme from "./theme/indigoTheme";

const themeContext = createContext(null);
const setThemeContext = createContext(null);

export function ChartThemeProvider({children}){
    const [theme, setTheme] = useState(indigoTheme);

    return(
        <themeContext.Provider value = {theme}>
            <setThemeContext.Provider value={setTheme}>
                {children}
            </setThemeContext.Provider>
        </themeContext.Provider>
    );
}

export function useThemeContext() {
    const context = useContext(themeContext);
    if (!context) {
        throw new Error('Cannot find themeContext');
    }
    return context;
}

export function useSetThemeContext() {
    const context = useContext(setThemeContext);
    if (!context) {
        throw new Error('Cannot find setThemeContext');
    }
    return context;
}
