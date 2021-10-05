import * as React from 'react';
import List from '@mui/material/List';
import {FormControl, ListItem, ListItemButton, ListItemText, ListSubheader, MenuItem, Select} from "@mui/material";
import {chartThemeList} from "./context/theme/chartThemList";
import {useSetThemeContext, useThemeContext} from "./context/ChartThemeProvider";
import {useEffect, useState} from "react";

export default function Setting() {
    const theme = useThemeContext();
    const setTheme = useSetThemeContext();
    const [themeSelect, setThemeSelect] = useState(chartThemeList[0].name);
    useEffect(() => {
        chartThemeList.forEach( (value,index) =>{
            if(theme === value.value){
                setThemeSelect(value.name);
            }
        })
    }, []);

    const changeTheme = (event) => {
        const targetValue = event.target.value;
        chartThemeList.forEach( (value,index) =>{
            if(targetValue === value.name){
                setTheme(value.value);
                setThemeSelect(value.name);
            }
        })
    };
    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            subheader={<ListSubheader>Settings</ListSubheader>}
        >
            <ListItemButton>
                <FormControl sx={{mt: 2, minWidth: 240}}>
                <Select label="Chart Theme" id="chartTheme" onChange={changeTheme}
                value={themeSelect}>
                    {chartThemeList.map( (value,index) =>
                        <MenuItem key={index.toString()}value={value.name}> {value.name} </MenuItem>
                    )}

                </Select>
                    </FormControl>
            </ListItemButton>

        </List>
    );
}
