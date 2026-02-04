import React, { useEffect, useState } from 'react'
import Admin from '../Nav/Admin'
import { data, useParams } from 'react-router-dom'

const Tapedit = () => {

  const {id} = useParams()

  const[tap, settap]= useState({
    title:"",
    price:"",
    des:"",
    img:""
  })

  useEffect(()=>{
    fetch(`http://localhost:4000/tablet/${id}`).then((res)=>res.json()).then((data)=>settap(data))
  })

  const handleSubmit =(event) =>{
    event.preventDefault()
    const form= event.target
    const title=form.title.value
    const price=form.price.value
    const des=form.des.value
    const img=form.img.value
    if(title==="" || price==="" || des==="" || img===""){
      alert("change the value")
      return
    }

    const obj={
      title,
      price,
      des,
      img
    }
    fetch(`http://localhost:4000/tablet/${id}`,{
      method:"PATCH",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(obj)

    }).then((res)=>res.json()).then((data)=>{
      alert("Form updated")
      form.reset()
      window.location.href="tablets"
    })

  }



  return (
        <>
    <div className="container-fluid">
  <div className="row">
    <div className="col-12 col-md-2 bg-primary text-white min-vh-100 p-3">
      <Admin/>
    </div>

    <div className="col-12 col-md-10 mt-5">
      <h5>Tablet edit Details</h5>
      <form className="mt-3" onSubmit={handleSubmit}>
        <input
            type="text"
          name="title"
          id='title'
          placeholder="Title"
          className="form-control mb-2"
          defaultValue={tap.title}
        />
        <textarea
          name="des"
          id="des"
          placeholder="Description"
          
          className="form-control mb-2"
          defaultValue={tap.des}
        />
        <input
          type="number"
          name="price"
          id='price'
          placeholder="Price"
          className="form-control mb-2"
          defaultValue={tap.price}
        />
        <input
          type="url"
          name="img"
          id='img'
          placeholder="Image URL"
          className="form-control mb-2"
          defaultValue={tap.img}
        />
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success">
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
</div>


    
    </>
  )
}

export default Tapedit
