import React,{ useEffect ,useState} from 'react'
import { Fab} from '@mui/material'
import './expense.css'
import { Form,Button,Modal,InputGroup} from 'react-bootstrap'

function Expense() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const url = "http://localhost:4000/api/sample";
  const url2 = "http://localhost:4000/api/wallets";

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

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
                    <img alt="icon" className="border border-2 rounded icon-bg" src={`${dataObj.type==1?"https://img.icons8.com/?size=512&id=37784&format=png":"https://img.icons8.com/?size=512&id=37783&format=png"}`}></img>
                    <div>
                        <div className="fw-semibold fs-5" style={{textTransform:"capitalize"}}>{dataObj.category}</div>
                    </div>
                    <div className={`fw-semibold fs-5 ${dataObj.type ==1 ? "text-success" :"text-danger"}`}>{dataObj.value}</div>
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
            <Form action="http://localhost:4000/api/post" method='post'>
              <InputGroup className='w-100 d-flex justify-content-center fs-5'>
              <Form.Label className='text-backdrop'>Expense</Form.Label>
              <Form.Check // prettier-ignore
                type="switch"
                id="transaction-type"
                name="type"
                value="1"
                className='mx-3'
              />
              <Form.Label className='text-backdrop'>Income</Form.Label>
              </InputGroup>
              <br></br>
              <Form.Label className='text-backdrop'>Enter the Amount</Form.Label>
              <InputGroup>
                <InputGroup.Text> &#x20B9;</InputGroup.Text>
                <Form.Control name="value" placeholder='1000'/>
              </InputGroup>
              <br></br>
              <Form.Label className='text-backdrop'>Enter the Date</Form.Label>
              <InputGroup>
                <Form.Control name="date" placeholder='2023-05-03'/>
              </InputGroup>
              <br></br>
              <Form.Label className='text-backdrop'>Choose Wallet</Form.Label>
              <Form.Check className='mx-2' inline type="radio" name="wallet" label="Cash" value="cash" />
              <Form.Check className='mx-2' inline type="radio" name='wallet' label="Bank" value="bank"/>
              <br></br>
              <Form.Label className='text-backdrop'>Choose Category</Form.Label>
              <Form.Select name="category">
                <option value="Salary" selected>Salary</option>
                <option value="Food">Food</option>
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