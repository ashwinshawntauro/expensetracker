import React,{ useEffect ,useState} from 'react'
import { Fab} from '@mui/material'
import './expense.css'
import { Form,Button,Modal,InputGroup} from 'react-bootstrap'
import axios from 'axios'

function Expense() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const url = "http://localhost:4000/api/sample";
  const url2 = "http://localhost:4000/api/wallets";

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  const [type,setType] =  useState([]);
  const [value,setAmount] = useState([]);
  const [date,setDate] = useState([]);
  const [category,setCategory] = useState([]);


  const fetchInfo = () => {
    return fetch(url)
      .then((res) => res.json())
      .then((d) => setData(d))
  }
  const fetchSort= () => {
    return fetch(url2)
      .then((res) => res.json())
      .then((d) => setData2(d))
  }

  useEffect(() => {
    fetchInfo();
    fetchSort();
  }, []);

  function useReload(){
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  const Submit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/api/post", {type,value,date,category})
    .then(
      document.getElementById('form-status-sucess').classList.remove("d-none"),
      useReload()
    )
    .catch(err=>console.log(err))
    //
    document.getElementById('form').classList.add("d-none");
    // console.log({type,value,date,category})
  }

  return (
    <div>
      <div className="m-3">
        <h4 className="text-tertiary d-flex justify-content-between fw-semibold">Transactions <Fab className='bg-backdrop text-primary d-flex' aria-label="add" size="small" title="Add Transaction">
          <i className="bi bi-plus-circle fs-4 m-auto" onClick={handleShow}></i>
        </Fab></h4>
        <div className='mx mb-5'>
        {data.map((dataObj, index) => {
          return (
              <div className='border border-top-0 border-start-0 border-end-0 border-2 border-secondary'>
                <div className='text-backdrop fs-5'>{dataObj.date}</div>
                <div className="d-flex flex-row justify-content-between trans py-2">
                    <img alt="icon" className="border border-2 rounded icon-bg" src={`${dataObj.type=="income"?"https://img.icons8.com/?size=512&id=37784&format=png":"https://img.icons8.com/?size=512&id=37783&format=png"}`}></img>
                    <div>
                        <div className="fw-semibold fs-5" style={{textTransform:"capitalize"}}>{dataObj.category}</div>
                    </div>
                    <div className={`fw-semibold fs-5 ${dataObj.type =="income" ? "text-success" :"text-danger"}`}>{dataObj.value}</div>
                </div>
              </div>
          )
          })
        }
        </div>
        <Modal id="modal" centered show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className='text-backdrop'>Add Transaction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div id='form-status-sucess' className='d-none'>
              <div className='d-flex flex-row justify-content-center'>
              <i className="bi bi-check-circle-fill px-2"></i>New Transaction Added!
              </div>
            </div>
            <div id='form-status-failure' className='d-none'>
              <div className='d-flex flex-row justify-content-center'>
              <i className="bi bi-exclamation-circle-fill px-2"></i>Sorry could not add
              </div>
            </div>
            <Form onSubmit={Submit} id='form'>
              <InputGroup className='w-100 d-flex justify-content-center fs-5'>
                <Form.Check
                  inline
                  label="Income"
                  name="type"
                  value="income"
                  type= "radio"
                  onChange={(e)=>setType(e.target.value)}
                />
                <Form.Check
                  inline
                  label="Expense"
                  name="type"
                  value="expense"
                  type= "radio"
                  onChange={(e)=>setType(e.target.value)}
                />
              </InputGroup>
              <br></br>
              <Form.Label className='text-backdrop'>Enter the Amount</Form.Label>
              <InputGroup>
                <InputGroup.Text> &#x20B9;</InputGroup.Text>
                <Form.Control name="value" placeholder='1000' onChange={(e)=>setAmount(e.target.value)}/>
              </InputGroup>
              <br></br>
              <Form.Label className='text-backdrop'>Enter the Date</Form.Label>
              <InputGroup>
                {/* <Form.Control name="date" placeholder='2023-05-03' onChange={(e)=>setDate(e.target.value)}/> */}
                <input type='date' onChange={(e)=>setDate(e.target.value)} className='form-control w-100'></input>
              </InputGroup>
              <br></br>
              <Form.Label className='text-backdrop'>Choose Category</Form.Label>
              <Form.Select name="category" onChange={(e)=>setCategory(e.target.value)}>
                <option value="Salary">Salary</option>
                <option value="Food" selected>Food</option>
                <option value="Shopping">Shopping</option>
                <option value='Bills'>Bills</option>
                <option value='Transport'>Transport</option>
                <option value='Gym'>Gym</option>
              </Form.Select>
              <Button className='bg-backdrop text-primary mt-4 mx-auto w-100' type='submit'>
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div> 
    </div>

  )
}

export default Expense