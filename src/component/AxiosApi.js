
import React, { useEffect, useState } from 'react'
import "./Axios.css"
import axios from 'axios'
function AxiosApi() {
  const [apidata, setData] = useState([])
  const Url ="https://jsonplaceholder.typicode.com/comments"
  useEffect(() => {
    function getData() {
      fetch(Url)
        .then(res => res.json())
        .then((data) => {
          console.log('api repsonse data ',data)
          setData(data)
        })

    }

    getData()
  }, [])
   
  const addData = async()=>{
    console.log("add item")
    const item ={id:1,postId:1,name:"new item",email:"akleem@123"}
    await axios.post(Url,item)
    setData([item, ...apidata])
  }

  const handlDelete = async (res) => {
      await axios.delete(Url + '/' + res.id + res)
    console.log("delet res", res)
    setData(apidata.filter((p) => p.id !== res.id))
  }
  return (
    <div>
      <div className='container'>
        <h1>API data {apidata.length}</h1>
        <div className='header'>
        <button onClick={addData} className='btn btn-info'>Add item</button>
          <p>show all api data with the help of fetch method </p>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <td>Id</td>
              <th>Post_Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Delete</th>

            </tr>
          </thead>
          <tbody>
          {
              apidata.map((item) =>
                <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.postId}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td><button onClick={()=> handlDelete(item)} className='btn btn-info'>Delete</button></td>
               
              </tr> 
              )
            }
          </tbody>

        </table>

      </div>
    </div>
  )
}

export default AxiosApi