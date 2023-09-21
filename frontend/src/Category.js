import React,{ useEffect ,useState} from 'react'
import { Fab} from '@mui/material'
import './expense.css'
import { Form,Button,Modal,InputGroup} from 'react-bootstrap'
import axios from 'axios'

function Category() {
  const [cat, GetCat] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [category,setName] =  useState([]);
  const [logo,setLogo] = useState([]);

  function useReload(){
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  const Submit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/api/newcategory", {category,logo})
    .then(
      document.getElementById('form-status-sucess').classList.remove("d-none"),
    )
    .catch(err=>console.log(err))
    .finally(
      useReload()
    )
    document.getElementById('form').classList.add("d-none");
  }

  const fetchCat= () =>{
    return fetch("http://localhost:4000/api/category")
    .then((res)=> res.json())
    .then((d)=> GetCat(d))
  }
    useEffect(() => {
      fetchCat();
    }, []);
  const style={
    width:"50px",background:"white",borderRadius:"10px"
  }
  return (
    <div>
        <div className="m-3 h-100">
            <h4 className="text-tertiary d-flex justify-content-between fw-semibold">Categories <Fab className='bg-backdrop text-primary d-flex' aria-label="add" size="small" title="Add Transaction">
          <i className="bi bi-plus-circle fs-4 m-auto" onClick={handleShow}></i>
        </Fab></h4>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr",gridTemplateRows:"auto", gridGap:"10px"}}>
            {cat.map((catObj, index) => {
              return (
              <div className='d-flex justify-content-around bg-backdrop p-2 rounded text-primary'>
                  <img alt="image1" src={catObj.logo} style={style}></img>
                  <div className='text-center'>
                      <div>{catObj.category}</div>
                      <div>{catObj.total}</div>
                  </div>
              </div> 
              )})}
            </div>
        </div>
        <Modal id="modal" centered show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className='text-backdrop'>New Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div id='form-status-sucess' className='d-none'>
              <div className='d-flex flex-row justify-content-center'>
              <i className="bi bi-check-circle-fill px-2"></i>New Category Added!
              </div>
            </div>
            <Form onSubmit={Submit} id='form'>
              <Form.Label className='text-backdrop'>Category Name</Form.Label>
              <Form.Control name="name" placeholder='Food' onChange={(e)=>setName(e.target.value)}/>
              <br></br>
              <Form.Label className='text-backdrop'>Image Link</Form.Label>
              <Form.Control name="logo" placeholder='https://google.com/favicon.ico' onChange={(e)=>setLogo(e.target.value)}/>
              <Button className='bg-backdrop text-primary mt-4 mx-auto w-100' type='submit'>
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
    </div>
  )
}

export default Category