import './App.css';
import {useEffect, useState} from "react";
import ChartList from "./chart/ChartList";
import {Link, Route} from "react-router-dom";
import {getChartList, postChartList} from "./repository/ChartDataRepository";
import CreateChartButton from "./chart/widget/CreateChartButton";
import Button from "@mui/material/Button";
import {useDataContext, useDispatchContext} from "./context/ChartDataProvider";
import Setting from "./Setting";

function App() {
    const [loading, setLoading] = useState(true);
    const [isEditMode, setMode] = useState(false);

    const charts = useDataContext();
    const setCharts = useDispatchContext();

    function getChart(){
        return charts;
    }

    useEffect(() => {
        getChartList().then(
            (value => {
                setCharts(value)
                setLoading(false);
            })
        );

    }, []);

    if (loading)
        return (
            <div>
                Loading...
            </div>
        )

    function editClicked() {
        setMode(true);
    }

    function viewClicked() {
        setMode(false);
    }

    function saveClicked() {
        postChartList(charts).then(r => {
            console.log("saved");
        }).catch( reason => {
            console.log("save failed");
            console.log(reason);
            }

        );
    }

    function settingClicked() {
        setMode(false);

    }

    function editMode() {
        if(isEditMode)
        return <>
            {<div>
                <Button variant="outlined" disabled={!isEditMode} onClick={saveClicked}>Save</Button>
                <CreateChartButton isEditMode={isEditMode}/>
            </div>}
        </>;
    }

    return (
        <>
            <div>
                <ul>
                    <li onClick={viewClicked}>
                        <Link to="/">Home</Link>
                    </li>
                    <li onClick={editClicked}>
                        <Link to="/">편집하기</Link>
                    </li>
                    <li onClick={settingClicked}>
                        <Link to="/Setting">환경설정</Link>
                    </li>
                </ul>
                <hr/>
                {editMode()}
                <Route path="/" exact={true}
                       render={() => <ChartList charts={getChart()} isEditMode={isEditMode}/>}/>
                <Route path="/Setting" exact={true}
                       render={() => <Setting/>}/>
            </div>
        </>
    );
}

export default App;
