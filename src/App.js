import './App.css';
import {useEffect, useState} from "react";
import ChartList from "./chart/ChartList";
import {Link, Route} from "react-router-dom";
import Edit from "./Edit";
import {getChartList} from "./repository/ChartDataRepository";

function App() {
    const [loading, setLoading] = useState(true);
    const [charts, setCharts] = useState([]);
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
    return (
        <>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/edit">편집하기</Link>
                    </li>
                </ul>
                <hr/>
                <Route path="/" exact={true}
                       render={() => <ChartList charts={charts}/>}/>
                <Route path="/edit" render={Edit}/>
            </div>
        </>
    );
}

export default App;
