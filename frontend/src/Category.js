import React,{ useEffect ,useState} from 'react'

function Category() {
  const url = "http://localhost:4000/api/category/food";
  const url2 = "http://localhost:4000/api/category/salary";
  const url3 = "http://localhost:4000/api/category/shopping";
  const url4 = "http://localhost:4000/api/category/bills";
  const url5 = "http://localhost:4000/api/category/transport";
  const url6 = "http://localhost:4000/api/category/gym";

    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    const [data4, setData4] = useState([]);
    const [data5, setData5] = useState([]);
    const [data6, setData6] = useState([]);

    const fetchInfo = () => {
        return fetch(url)
        .then((res) => res.json())
        .then((d) => setData(d))
    }
    const fetchInfo2 = () => {
      return fetch(url2)
      .then((res) => res.json())
      .then((d) => setData2(d))
  }
  const fetchInfo3 = () => {
    return fetch(url3)
    .then((res) => res.json())
    .then((d) => setData3(d))
  }
  const fetchInfo4 = () => {
    return fetch(url4)
    .then((res) => res.json())
    .then((d) => setData4(d))
  }
  const fetchInfo5 = () => {
    return fetch(url5)
    .then((res) => res.json())
    .then((d) => setData5(d))
  }
  const fetchInfo6 = () => {
    return fetch(url6)
    .then((res) => res.json())
    .then((d) => setData6(d))
  }
    useEffect(() => {
        fetchInfo();
        fetchInfo2();
        fetchInfo3();
        fetchInfo4();
        fetchInfo5();
        fetchInfo6();
    }, []);
  const style={
    width:"50px",background:"white",borderRadius:"10px"
  }
  return (
    <div>
        <div className="m-3 h-100">
            <h4 className="text-tertiary d-flex justify-content-between fw-semibold">Categories</h4>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr",gridTemplateRows:"auto", gridGap:"10px"}}>
              <div className='d-flex justify-content-around bg-danger p-2 rounded text-primary'>
                  <img alt="image1" src='https://img.icons8.com/?size=512&id=37783&format=png' style={style}></img>
                  <div>
                      <div>Food</div>
                      {data.map((dataObj, index) => {
                        return (
                            <div>{dataObj.total}</div>
                        )
                      })}
                  </div>
              </div>
              <div className='d-flex justify-content-around bg-success p-2 rounded text-primary'>
                  <img alt="image2" src='https://img.icons8.com/?size=512&id=37784&format=png' style={style}></img>
                  <div>
                      <div>Salary</div>
                      {data2.map((dataObj, index) => {
                        return (
                            <div>{dataObj.total}</div>
                        )
                      })}
                  </div>
              </div>
              <div className='d-flex justify-content-around bg-danger p-2 rounded text-primary'>
                  <img alt="image3" src='https://img.icons8.com/?size=512&id=37783&format=png' style={style}></img>
                  <div>
                      <div>Shopping</div>
                      {data3.map((dataObj, index) => {
                        return (
                            <div>{dataObj.total}</div>
                        )
                      })}
                  </div>
              </div>
              <div className='d-flex justify-content-around bg-danger p-2 rounded text-primary'>
                  <img alt="image4" src='https://img.icons8.com/?size=512&id=37783&format=png' style={style}></img>
                  <div>
                      <div>Bills</div>
                      {data4.map((dataObj, index) => {
                        return (
                            <div>{dataObj.total}</div>
                        )
                      })}
                  </div>
              </div>
              <div className='d-flex justify-content-around bg-danger p-2 rounded text-primary'>
                  <img alt="image5" src='https://img.icons8.com/?size=512&id=37783&format=png' style={style}></img>
                  <div>
                      <div>Transport</div>
                      {data5.map((dataObj, index) => {
                        return (
                            <div>{dataObj.total}</div>
                        )
                      })}
                  </div>
              </div>
              <div className='d-flex justify-content-around bg-danger p-2 rounded text-primary'>
                  <img alt="image6" src="https://img.icons8.com/?size=512&id=37783&format=png" style={style}></img>
                    <div>
                      <div>Gym</div>
                      {data6.map((dataObj, index) => {
                        return (
                            <div>{dataObj.total}</div>
                        )
                      })}
                    </div>
              </div>
            </div>
        </div>

    </div>
  )
}

export default Category