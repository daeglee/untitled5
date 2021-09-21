import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {ChartTypeList, RawDataType, DataTypeList, DateType, DateTypeList, ChartType} from "../RawDataType";
import {useEffect, useState} from "react";
import {
    Collapse,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    TextField
} from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {MdDelete, MdEdit} from "react-icons/md";

/**
 * Create Chart Button and dialog
 * @param isEditMode : edit mode or create mode
 * @param addChart : setCharts state
 * @returns {JSX.Element}
 * @constructor
 */
export default function CreateChartButton({isEditMode, setCharts, chart, charts, index}) {
    const [open, setOpen] = React.useState(false); // dialog open

    const [dataType, setDataType] = useState(RawDataType.CPU.controllerAddress);
    const [chartType, setChartType] = useState(ChartType.AREA_CHART.name);
    const [dateType, setDateType] = useState(DateType.REAL_TIME.name);
    const [nestedOpen, nestedSetOpen] = React.useState(false); // detail open

    const [x, setX] = useState(500);
    const [y, setY] = useState(500);
    const [width, setWidth] = useState(400);
    const [height, setHeight] = useState(400);

    const handleClickOpen = () => {
        setOpen(true);
    };
    /**
     * Create Button is clicked
     */
    const handleCreate = () => {

        setCharts((previousState) => [...previousState, {
            id: previousState.length + 1,
            chartType: chartType,
            dateType: dateType,
            rawDataType: dataType,
            x: x,
            y: y,
            width: width,
            height: height
        }]);

        setOpen(false);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const dataTypeChanged = (event) => {
        setDataType(event.target.value);
    };
    const chartTypeChanged = (event) => {
        setChartType(event.target.value);
    };
    const dateTypeChanged = (event) => {
        setDateType(event.target.value);
    };

    const handleClick = () => {
        nestedSetOpen(!nestedOpen);
    };

    const changeX = (e) => {
        setX(e.target.value);
    }
    const changeY = (e) => {
        setY(e.target.value);
    }
    const changeWidth = (e) => {
        setWidth(e.target.value);
    }
    const changeHeight = (e) => {
        setHeight(e.target.value);
    }
    useEffect(() => {
        if (chart != null && isEditMode) {
            setChartType(charts[index].chartType);
            setDataType(charts[index].rawDataType);
            setDateType(charts[index].dateType);
            setX(charts[index].x);
            setY(charts[index].y);
            setWidth(charts[index].width);
            setHeight(charts[index].height);
        }
    }, [charts]);

    function getDialog() {
        return <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create chart</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You can create a custom chart by clicking the 'Save' button.
                </DialogContentText>
                <List
                    sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    <ListItem>
                        <FormControl sx={{mt: 2, minWidth: 240}}>
                            <InputLabel htmlFor="datatype">dateType</InputLabel>
                            <Select
                                id="datatype"
                                autoFocus
                                value={dataType}
                                onChange={dataTypeChanged}
                                label="datatype"
                            >
                                {DataTypeList.map(dataType => (
                                    <MenuItem value={dataType.controllerAddress}
                                              key={dataType.id}>{dataType.controllerAddress}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl sx={{mt: 2, minWidth: 240}}>
                            <InputLabel htmlFor="chartType">chartType</InputLabel>
                            <Select
                                id="chartType"
                                autoFocus
                                value={chartType}
                                onChange={chartTypeChanged}
                                label="chartType"
                            >
                                {ChartTypeList.map(chartType => (
                                    <MenuItem value={chartType.name} key={chartType.id}>{chartType.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl sx={{mt: 2, minWidth: 240}}>
                            <InputLabel htmlFor="dateType">dateType</InputLabel>
                            <Select
                                id="dateType"
                                autoFocus
                                value={dateType}
                                onChange={dateTypeChanged}
                                label="dateType"
                            >
                                {DateTypeList.map(dateType => (
                                    <MenuItem value={dateType.name} key={dateType.id}>{dateType.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </ListItem>
                    <ListItemButton onClick={handleClick}>
                        <ListItemText primary="Detail"/>
                        {nestedOpen ? <ExpandLess/> : <ExpandMore/>}
                    </ListItemButton>
                    <Collapse in={nestedOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem sx={{pl: 4}}>
                                <TextField
                                    label="X"
                                    defaultValue={x}
                                    id="x-position"
                                    size="small"
                                    onChange={changeX}
                                />
                                <TextField
                                    label="Y"
                                    id="y-position"
                                    defaultValue={y}
                                    size="small"
                                    onChange={changeY}
                                />
                            </ListItem>
                            <ListItem sx={{pl: 4}}>
                                <TextField
                                    label="width"
                                    defaultValue={width}
                                    id="width"
                                    size="small"
                                    onChange={changeWidth}
                                />
                                <TextField
                                    label="height"
                                    id="height"
                                    defaultValue={height}
                                    size="small"
                                    onChange={changeHeight}
                                />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleCreate}>Create</Button>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>;
    }

    function getButton() {
        function deleteClicked() {

        }

        if (chart != null) {
            let size = String(height).match(/\d/g);
            size = size.join("");
            return (
                <>
                    <div className="chartEdit" >
                        <MdEdit size="20%" onClick={handleClickOpen}/>
                    </div>
                    <div className="chartDelete">
                        <MdDelete size="20%" onClick={deleteClicked}/>
                    </div>
                </>
            )
        } else {
            return <Button variant="outlined" onClick={handleClickOpen} disabled={!isEditMode}>
                Create Custom Chart
            </Button>;
        }
    }

    return (
        <React.Fragment>
            {getButton()}
            {getDialog()}
        </React.Fragment>
    );
}
