import React, { useEffect, useState } from 'react'
import Admin from '../Nav/Admin'
import { data, Link, useParams } from 'react-router-dom'

const Accdash = () => {


  const {id} = useParams()


  const[Acc, setAcc] = useState([])
  


  useEffect(()=>{
    fetch("http://localhost:4000/getAccessories").then((res)=>res.json()).then((data)=>setAcc(data))
  },[])
  const handleDelete = (id) => {
    fetch(`http://localhost:4000/Accessories/${id}`,{
      method:"delete",
      headers:{
        "content-type":"application/json"
      },

    }).then((res)=> res.json()).then((data)=> {
      alert("Item removed")
      setAcc(Acc.filter((item)=> item._id !==id))
      window.location.href = "/accessories"
    })
  }
  return (
        <>
   <div className="container-fluid">
  <div className="row">
    <div className="col-9 col-md-2 bg-primary text-white min-vh-100 p-3">
      <Admin/> 
    </div>

    <div className="col-9  mt-5">
      <h5>Accessories Dashboard</h5>
     <Link to="/accupload"><button className='btn btn-primary'>Add Data</button></Link> 
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Description</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              Acc.map((item)=>(
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>{item.des}</td>
                  <td><img src={item.img} width={100}></img></td>
                  <td>
                    <Link to={`/accedit/${item._id}`}>
                    <button className='btn btn-primary'>edit</button> 
                    </Link>

                    <button 
                    className='btn btn-red'
                    onClick={()=> handleDelete(item._id)}
                    >delete</button></td>
                </tr>
              ))
            }
            
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default Accdash
