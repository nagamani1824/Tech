import React from 'react'
import Admin from '../Nav/Admin'




const Dashboard = () => {
  return (
     < >
   <div className="container-fluid">
  <div className="row">
    <div className="col-9 col-md-2 bg-primary text-white min-vh-100 p-3">
      <Admin />
      
    </div>

    <div className="col-9  mt-5">
      <h5>Dashboard</h5>
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
            <tr>
              <td colSpan="5" className="text-center">No data available</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

    </>

  )
}

export default Dashboard
