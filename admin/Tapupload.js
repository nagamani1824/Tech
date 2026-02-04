import React from 'react'
import Admin from '../Nav/Admin'

const Tapupload = () => {
  const handleSubmit = (event) =>{
    event.preventDefault()
    const form = event.target
    const title = form.title.value
    const des = form.des.value
    const img = form.img.value
    const price = form.price.value
    const quantity = 1

    if(title==="" || des==="" || img==="" || price===""){
      alert("fill all the feilds")
      return
    }

    const obj = {
      title,
      des,
      img,
      price
    }

    fetch("http://localhost:4000/addtablet",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(obj)
    }).then((res)=>res.json()).then((data)=>{
      alert("data added successfully")
      form.reset()
      window.location.href="/tablets"
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
      <h5>Tablet upload Details</h5>
      <form className="mt-3" onSubmit={handleSubmit}>
        <label value="title">Title</label>
        <input
          type="text"
          name="title"
          id='title'
          placeholder="Title"
          className="form-control mb-2"
        />
         <label value="des">Title</label>
        <textarea
          name="des"
          id='des'
          placeholder="Description"
          className="form-control mb-2"
        />
         <label value="price">Price</label>
        <input
          type="text"
          name="price"
        id='price'
          placeholder="Price"
          className="form-control mb-2"
          
        />
         <label value="img">Image</label>
        <input
          type="text"
          name="img"
          id='img'
          placeholder="Image URL"
          className="form-control mb-2"
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

export default Tapupload
