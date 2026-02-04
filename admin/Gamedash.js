import React, { useEffect, useState } from 'react'
import Admin from '../Nav/Admin'
import { Link, useParams } from 'react-router-dom'

const Gamedash = () => {

  const {id} = useParams()

  const[game, setgame] = useState([])

  useEffect(()=>{
    fetch("http://localhost:4000/getgaming").then((res)=>res.json()).then((data)=>setgame(data))
  },[])
  const handleDelete = (id) => {
    fetch(`http://localhost:4000/gaming/${id}`,{
      method:"delete",
      headers:{
        "content-type":"application/json"
      },

    }).then((res)=> res.json()).then((data)=> {
      alert("item removed")
      setgame(game.filter((item)=> item._id !==id))
      window.location.href = "/gameing"
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
      <h5>Gaming Dashboard</h5>
     <Link to="/gameupload"><button className='btn btn-success'>Add Data</button></Link> 
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
              game.map((item)=>(
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>{item.des}</td>
                  <td><img src={item.img} width={100}></img></td>
             <td>
                                 <Link to={`/Gameedit/${item._id}`}>
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
export default Gamedash
