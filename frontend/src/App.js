import './App.css';
import Dashboard from './Dashboard';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './custom.css'
import Category from './Category';
import Expense from './Expense'
import React ,{ useEffect ,useState} from "react"
function App() {
    const path = window.location.pathname
    const dashClick= () =>
    {
        window.open("/", "_self")
    }
    const catClick= () =>
    {
        window.open("/categories", "_self")
    }
    const expClick= () =>
    {
        window.open("/expense", "_self")
    }
    const url = "http://localhost:4000/api/sample";
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);

    const fetchInfo = () => {
        return fetch(url)
        .then((res) => res.json())
        .then((d) => setData(d))
    }
    const fetchIncome = () => {
        return fetch("http://localhost:4000/api/totalincome")
        .then((res) => res.json())
        .then((d) => setData2(d))
    }
    const fetchExp = () => {
        return fetch("http://localhost:4000/api/totalexpense")
        .then((res) => res.json())
        .then((d) => setData3(d))
    }
    useEffect(() => {
        fetchInfo();
        fetchIncome();
        fetchExp();
    }, []);
    
  return (
    <div className="App">
      <div className="row container-fluid g-0">
            <div className="main col-9">
                <div className="m-3">
                    <div className="fs-2 header-title text-backdrop">Expense Tracker</div>
                    <div className="m-3 d-flex flex-row justify-content-around">
                        <div onClick={dashClick} className={`${path !== "/" ? "bg-secondary text-backdrop" : "bg-backdrop shadow text-primary"} badge text-primary fs-5 my-auto mx-2 w-25 rounded`}><i className="bi bi-clipboard-data-fill px-2"></i>Dashboard</div>
                        <div onClick={catClick} className={`${path !== "/categories" ? "bg-secondary text-backdrop" : "bg-backdrop shadow text-primary"} badge text-primary fs-5 my-auto mx-2 w-25 rounded`}><i className="bi bi-tag-fill px-2"></i>Categories</div>
                        <div onClick={expClick} className={`${path !== "/expense" ? "bg-secondary text-backdrop" : "bg-backdrop shadow text-primary"} badge text-primary fs-5 my-auto mx-2 w-25 rounded`}><i class="bi bi-currency-exchange px-2"></i>Transactions</div>
                    </div>
                    <hr></hr>
                </div>
                <BrowserRouter>
            `      <Routes>
                    <Route path="/">
                      <Route index element={<Dashboard/>} />
                      <Route path="/Categories" element={<Category />} />
                      <Route path="/Expense" element={<Expense />} />
                    </Route>
                  </Routes>
                </BrowserRouter>
            </div>
            <div className="sidebar col-3 border border-2 p-3 border-top-0 border-end-0 border-bottom-0 border-secondary" style={{height:"100vh"}}>
                <div className='d-flex flex-column justify-content-between h-100'>
                    <div>
                        <div className="wallet-grid my-3">
                            <div className="bg-backdrop text-primary shadow rounded p-2">
                                <div className="fw-bold">Total Income</div>
                                {data2.map((dataObj, index) => {return (<small className="fs-4 fw-semibold">{dataObj.total}</small> )})}
                            </div>

                            <div className="bg-backdrop text-primary shadow rounded p-2">
                                <div className="fw-bold">Total Expenses</div>
                                {data3.map((dataObj, index) => {return (<small className="fs-4 fw-semibold">{dataObj.total}</small> )})}  
                            </div>
                        </div>

                        <h5 className="d-flex justify-content-between fw-bold">Transactions</h5>
                        <div style={{height:"480px",overflowY:"auto",paddingRight:"20px"}}>
                        {data.map((dataObj, index) => {
                        return (
                            <div className="d-flex flex-column my-3 text-center" key={index}>
                                <div className="d-flex flex-row justify-content-between trans py-2">
                                    <img className="border border-2 rounded bg-white" src={`${dataObj.type=="income"?"https://img.icons8.com/?size=512&id=37784&format=png":"https://img.icons8.com/?size=512&id=37783&format=png"}`}></img>
                                    <div>
                                        <div className="fw-semibold">{dataObj.category}</div>
                                        <small>{dataObj.date}</small>
                                    </div>
                                    <div className={`fw-semibold ${dataObj.type=="income" ? "text-success" :"text-danger"}`}>{dataObj.value}</div>
                                </div>

                            </div>
                            )
                        })} 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
