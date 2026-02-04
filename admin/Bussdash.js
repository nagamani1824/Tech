import React, { useEffect, useState } from 'react'
import Admin from '../Nav/Admin'
import { Link, useParams } from 'react-router-dom'

const Bussdash = () => {
  
  const {id} = useParams()


  const[Busi, setBusi] = useState([])
  


  useEffect(()=>{
    fetch("http://localhost:4000/getbusiness").then((res)=>res.json()).then((data)=>setBusi(data))
  },[])
  const handleDelete = (id) => {
    fetch(`http://localhost:4000/business/${id}`,{
      method:"delete",
      headers:{
        "content-type":"application/json"
      },

    }).then((res)=> res.json()).then((data)=> {
      alert("Item removed")
      setBusi(Busi.filter((item)=> item._id !==id))
      window.location.href = "/business"
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
      <h5>business Dashboard</h5>
     <Link to="/bussupload"><button className='btn btn-success'>Add Data</button></Link> 
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
              Busi.map((item)=>(
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>{item.des}</td>
                  <td><img src={item.img} width={100}></img></td>
                  <td>
                    <Link to={`/bussedit/${item._id}`}>
                    <button className='btn btn-success'>edit</button> 
                    </Link>

                    <button 
                    className='btn btn-danger'
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

export default Bussdash
