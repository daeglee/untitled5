import './App.css';
import {useEffect, useState} from "react";
import ChartList from "./chart/ChartList";
import {Link, Route} from "react-router-dom";
import {getChartList, postChartList} from "./repository/ChartDataRepository";
import CreateChartButton from "./chart/widget/CreateChartButton";
import Button from "@mui/material/Button";

function App() {
    const [loading, setLoading] = useState(true);
    const [charts, setCharts] = useState([]);
    const [isEditMode, setMode] = useState(false);

    function setChartsFunction(newValue){
        setCharts(newValue);
    }
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
                </ul>
                <hr/>
                {<div>
                    <Button variant="outlined" disabled={!isEditMode} onClick={saveClicked}>Save</Button>
                    <CreateChartButton isEditMode={isEditMode} setCharts={setChartsFunction}/>
                </div>}
                <Route path="/" exact={true}
                       render={() => <ChartList charts={getChart()} setCharts={setChartsFunction} isEditMode={isEditMode}/>}/>
            </div>
        </>
    );
}

export default App;
