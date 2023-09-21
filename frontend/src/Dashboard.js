import React,{ useEffect ,useState} from "react"
import "./dashboard.css"
import './custom.css'
import Exp_bar from './components/Exp_bar';
import Cat_pie from './components/Cat_pie';
import Wallets from "./components/Wallets";
import Cat_pie2 from "./components/Cat_pie2";

function Dashboard() {
    const url = "http://localhost:4000/api/totalincome";
    const url2 = "http://localhost:4000/api/avgincome";
    const url3 = "http://localhost:4000/api/avgexpense";
    const url4 = "http://localhost:4000/api/totalexpense";

    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    const [data4, setData4] = useState([]);
    const [data, setData] = useState([]);

    const fetchInfo = () => {
        return fetch(url)
        .then((res) => res.json())
        .then((d) => setData(d))
    }
    const avgInfo = () => {
        return fetch(url2)
        .then((res) => res.json())
        .then((dx) => setData2(dx))
    }
    const avgexpInfo = () => {
        return fetch(url3)
        .then((res) => res.json())
        .then((dx) => setData3(dx))
    }
    const expInfo = () => {
        return fetch(url4)
        .then((res) => res.json())
        .then((dx) => setData4(dx))
    }
    useEffect(() => {
        fetchInfo();
        avgInfo();
        avgexpInfo();
        expInfo();
    }, []);
    return(
        <div className="m-3">
            <h4 className="text-tertiary fw-semibold">Dashboard</h4>
            <div className="boxes p-2">
                <div className="g-0 p-2 bg-primaryl text-backdrop rounded">
                    <div className="fs-4 text-start px-3 fw-semibold">Welcome, User</div>
                    <div className="text-start px-3">Your Finance Details are as follows:</div>
                    <div className="row p-3 my-auto"> 
                        <div className="col">
                            <div className="fw-semibold">Cash Flow</div>
                            <div>Income:
                                {data.map((dataObj, index) => {
                                    return (
                                        <span className="text-success">{dataObj.total.toFixed(2)}</span>
                                )})}
                            </div>
                            <div>Expense:
                            {data4.map((dataObj, index) => {
                                    return (
                                <span className="text-danger">{dataObj.total.toFixed(2)}</span>
                                    )})}
                            </div>
                        </div>
                        <div className="col">
                            <div className="fw-semibold">Averages</div>
                            <div>Avg Income:<span className="text-success">{data2.map((dataObj, index) => {return (dataObj.total.toFixed(2))})}</span></div>
                            <div>Avg Expense:<span className="text-danger" style={{width:"5px"}}>{data3.map((dataObj, index) => {return (dataObj.total.toFixed(2))})}</span></div>
                        </div>
                    </div>
                </div>
                <div className="p-2 bg-primaryl rounded">
                    <Wallets/>
                </div>
                <div className="p-2 bg-primaryl rounded">
                    <Exp_bar/>
                </div>
                <div className="p-2 bg-primaryl rounded">
                    <div className="row">
                        <div className="col-6">
                            <Cat_pie/> 
                        </div>
                        <div className="col-6">
                            <Cat_pie2/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard