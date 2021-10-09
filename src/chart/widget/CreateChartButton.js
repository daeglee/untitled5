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
    ListItemText, OutlinedInput,
    TextField
} from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {MdDelete, MdEdit} from "react-icons/md";
import {ChartDelete, ChartEdit} from "../ChartList";
import {useDataContext, useDispatchContext} from "../../context/ChartDataProvider";
import {getResourceList} from "../functions/GetResourceList";

/**
 * Create Chart Button and dialog
 * @param isEditMode : edit mode or create mode 이지만 실제 구분은 chart =null인지 확인으로 하고 있어서 ...
 * @param addChart : setCharts state
 * @returns {JSX.Element}
 * @constructor
 */
export default function CreateChartButton({isEditMode, chart, index, changeState}) {
    const [open, setOpen] = React.useState(false); // dialog open

    const [dataType, setDataType] = useState(RawDataType.CPU.controllerAddress);
    const [chartType, setChartType] = useState(ChartType.AREA_CHART.name);
    const [dateType, setDateType] = useState(DateType.REAL_TIME.name);
    const [nestedOpen, nestedSetOpen] = React.useState(false); // detail open
    const [resourceList, setResourceList] = useState([]); //원본들
    const [resources, setResources] = useState([]); // resource의 이름만 가지고 있음
    const [selectedResources, setSelectedResources] = useState([]); // 선택된 이름

    const [x, setX] = useState(500);
    const [y, setY] = useState(500);
    const [width, setWidth] = useState(400);
    const [height, setHeight] = useState(400);

    const handleClickOpen = () => {
        setOpen(true);
        if (changeState != null)
            changeState(true);
    };

    const charts = useDataContext();
    const setCharts = useDispatchContext();


    /**
     * Create Button is clicked
     */
    const handleCreate = () => {
        const resourceInfos = [];
        selectedResources.forEach( resource => {
            resourceList.forEach( value => {
                if(value.resource === resource){
                    resourceInfos.push(value);
                }
            })

        });

        setCharts((previousState) => [...previousState, {
            id: charts[charts.length - 1].id + 1,
            chartType: chartType,
            dateType: dateType,
            rawDataType: dataType,
            x: x,
            y: y,
            width: width,
            height: height,
            resourceList: resourceInfos,
        }]);

        if (changeState != null)
            changeState(false);
        setOpen(false);
        console.log(charts);
    };

    function handleSave() {
        const resourceInfos = [];
        selectedResources.forEach( resource => {
            resourceList.forEach( value => {
                if(value.resource === resource){
                    resourceInfos.push(value);
                }
            })

        });
        const cloneChart = [...charts];
        cloneChart[index] = {
            ...cloneChart[index],
            chartType: chartType,
            dateType: dateType,
            rawDataType: dataType,
            x: x,
            y: y,
            width: width,
            height: height,
            resourceList: resourceInfos,
        }
        setCharts(cloneChart);
        setOpen(false);
        if (changeState != null) {
            changeState(false);
        }
    }

    const handleClose = () => {
        setOpen(false);
        if (changeState != null) {
            changeState(false);
        }
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
        getResourceList().then(value => {
                setResourceList(value);
                const resources = [];
                value.forEach(name => {
                    resources.push(name.resource);
                })
                setResources(resources);
            }
        ).catch(e => console.log("loading resource info fails "))

        if (chart != null && isEditMode) {
            setChartType(charts[index].chartType);
            setDataType(charts[index].rawDataType);
            setDateType(charts[index].dateType);
            if(chart.resourceList != null ){
                const list = [];
                chart.resourceList.forEach( value =>{
                    list.push(value.resource);
                })
                setSelectedResources(list);
            }

        }
    }, []);


    useEffect(() => {
        if (chart != null && isEditMode) {
            setX(charts[index].x);
            setY(charts[index].y);
            setWidth(charts[index].width);
            setHeight(charts[index].height);
        }
    }, [charts]);


    function getDialog() {
        function saveButton() {

            if (chart != null) {
                return <Button onClick={handleSave}>Save</Button>;
            } else {
                return <Button onClick={handleCreate}>Create</Button>;
            }
        }

        const handleResourceListChange = (event) => {
            const {
                target: {value}
            } = event;
            setSelectedResources(
                typeof value === "string" ? value.split(",") : value
            );
        };

        function resourceListItem() {
            if(resources === null)
                return <></>;

            return <ListItem>
                <FormControl sx={{m: 2, width: 240}}>
                    <InputLabel id="multiple-resource-label">Resource</InputLabel>
                    <Select
                        labelId="multiple-resource"
                        id="multiple-resource"
                        multiple
                        value={selectedResources}
                        onChange={handleResourceListChange}
                        input={<OutlinedInput label="Resource"/>}
                    >
                        {resources.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </ListItem>;
        }

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
                            <InputLabel htmlFor="datatype">dataType</InputLabel>
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
                    {resourceListItem()}
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
                {saveButton()}
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>;
    }

    function getButton() {
        function deleteClicked() {
            const cloneChart = [...charts];
            cloneChart[index] = {
                ...cloneChart[index],
                x: -20000,
                y: -20000,
            }
            setCharts(cloneChart);
            setOpen(false);
            changeState(false);
        }

        if (chart != null) {
            return (
                <>
                    <ChartEdit>
                        <MdEdit size="20%" onClick={handleClickOpen}/>
                    </ChartEdit>
                    <ChartDelete>
                        <MdDelete size="20%" onClick={deleteClicked}/>
                    </ChartDelete>
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
