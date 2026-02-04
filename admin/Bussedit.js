import React, { useEffect, useState } from 'react'
import Admin from '../Nav/Admin'
import { data, useParams } from 'react-router-dom'

const Bussedit = () => {
  const{id} = useParams()

    const[Bus, setbus]=useState({
      title:"",
      price:"",
      des:"",
      img:""
    })
  

    useEffect(()=>{
      fetch(`http://localhost:4000/business/${id}`).then((res)=>res.json()).then((data)=>setbus(data))
    })


    const handleSubmit = (event) =>{
      event.preventDefault()
        const form = event.target
        const title=form.title.value
        const price=form.price.value
        const des=form.des.value
        const img=form.img.value
        if(title==="" || price==="" || des==="" || img==="" ){
          alert("item updated")
          return
        }

        const obj={
          title,
          price,
          des,
          img
        }

        fetch(`http://localhost:4000/business/${id}`,{
          method:"PATCH",
          headers:{
            "content-type":"application/json"
          },
          body:JSON.stringify(obj)
        }).then((res)=>res.json()).then((data)=>{
          alert("form updated")
          form.reset()
          window.location.href="/business"
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
      <h5>Business edit Details</h5>
      <form className="mt-3" onSubmit={handleSubmit}>
        <input
          type="text"
          name="Title"
          id='title'
          placeholder="Title"
          className="form-control mb-2"
          defaultValue={Bus.title}
        />
        <textarea
          name="des"
          id='des'
          placeholder="Description"
          className="form-control mb-2"
          defaultValue={Bus.des}
        />
        <input
          type="number"
          name="Price"
          id='price'
          placeholder="Price"
          className="form-control mb-2"
          defaultValue={Bus.price}
        />
        <input
          type="url"
          name="Image"
          id='img'
          placeholder="Image URL"
          className="form-control mb-2"
          defaultValue={Bus.img}
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

export default Bussedit
