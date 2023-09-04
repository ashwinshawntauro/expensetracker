import React ,{ useEffect ,useState} from "react"


function Demo() {
    const url = "http://localhost:4000/api/sample";
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
    <>
        <form action='http://localhost:4000/api/post' method='POST'>
            <label>Email address</label>
            <input type='text' name='name'></input>
            <button variant="primary" type="submit">
                Submit
            </button>
        </form>
        <div>
        {data.map((dataObj, index) => {
            return (
                <div key={index}>{dataObj.value}</div>
              );
            })
        } 
        </div>
    </>
  )
}

export default Demo