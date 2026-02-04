import React, { useEffect, useState } from 'react'
import Admin from '../Nav/Admin'
import { useParams } from 'react-router-dom' 

const Accedit = () => {
  const {id} = useParams()

  const [Acc, setAcc]= useState({
    title:"",
    price:"",
    des:"",
    img:""
  })

  useEffect(()=>{
    
    fetch(`http://localhost:4000/Accessories/${id}`).then((res)=>res.json()).then((data)=>setAcc(data))
  })
  const handleSubmit = (event) => {
    event.preventDefault()
    const form= event.target
    const title=form.title.value
    const price=form.price.value
    const des=form.des.value
    const img=form.img.value
    if(title==="" || price===""|| des==="" || img===""){
      alert("change The Value")
      return
    }
    const obj={
      title,
      price,
      des,
      img
    }
    fetch(`http://localhost:4000/Accessories/${id}`,{
      method:"PATCH",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(obj)
    }).then((res)=>res.json()).then((data)=>{
      alert("Form Updataed")
      form.reset()
      window.location.href="/accessories"
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
      <h5>Accessories edit Details</h5>
      <form className="mt-3" onSubmit={handleSubmit}>
        <input
          type="text"
          name="Title"
          id='title'
          placeholder="Title"
          className="form-control mb-2"
          defaultValue={Acc.title}
        />
        <textarea
          name="des"
          id="des"
          placeholder="Description"
          className="form-control mb-2"
          defaultValue={Acc.des}
          
        />
        <input
          type="number"
          id='price'
          name="Price"
          placeholder="Price"
          className="form-control mb-2"
          defaultValue={Acc.price}
        />
        <input
          type="url"
          name="Image"
          id='img'
          placeholder="Image URL"
          className="form-control mb-2"
          defaultValue={Acc.img}

        />
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
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

export default Accedit
