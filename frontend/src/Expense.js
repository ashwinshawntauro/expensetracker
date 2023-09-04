import React,{ useEffect ,useState} from 'react'
import { Fab } from '@mui/material'
import './expense.css'

function Expense() {
  const url = "http://localhost:4000/api/date";
  const [data, setData] = useState([]);

  const fetchInfo = () => {
    return fetch(url)
      .then((res) => res.json())
      .then((d) => setData(d))
  }
  useEffect(() => {
    fetchInfo();
  }, []);
  return (
    <div>
      <div className="m-3">
        <h4 className="text-tertiary d-flex justify-content-between fw-semibold">Transactions <Fab className='bg-backdrop text-primary d-flex' aria-label="add" size="small" title="Add Transaction">
          <i className="bi bi-plus-circle fs-4 m-auto" ></i>
        </Fab></h4>


        <div className='mx'>
        {data.map((dataObj, index) => {
          return (
              <div className='border border-top-0 border-start-0 border-end-0 border-2 border-secondary'>
                <div className='text-backdrop fs-5'>{dataObj._id}</div>
                <div className="d-flex flex-row justify-content-between trans py-2">
                    <img alt="icon" className="border border-2 rounded" src="https://static.vecteezy.com/system/resources/previews/005/467/082/original/briefcase-icon-isolated-on-white-background-work-bag-symbol-free-vector.jpg"></img>
                    <div>
                        <div className="fw-semibold">{dataObj.category}</div>
                    </div>
                    <div className={`fw-semibold fs-5 ${dataObj.total>0 ? "text-success" :"text-danger"}`}>{dataObj.total}</div>
                </div>
              </div>
          )
          })
        }
        </div>
      </div>
    </div>
  )
}

export default Expense