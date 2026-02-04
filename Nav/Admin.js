import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-3 col-lg-2 bg-primary text-white min-vh-100 p-3 sidebar">
          <div className="sidebar-header">
            <h4 className="mb-4 text-center">Admin Panel</h4>
            <hr className="bg-light" />
          </div>
          <ul className="list-group list-group-flush">
            {/* <li className="list-group-item bg-transparent">
              <Link to="/Ad" className="text-dark text-decoration-none">
                <i className="fas fa-tachometer-alt me-2"></i>Dashboard
              </Link>
            </li> */}
            <li className="list-group-item bg-transparent">
              <Link to="/lapdash" className="text-dark text-decoration-none">
                <i className="fas fa-laptop me-2"></i>Laptops
              </Link>
            </li>
            <li className="list-group-item bg-transparent">
              <Link to="/monitors" className="text-dark text-decoration-none">
                <i className="fas fa-desktop me-2"></i>Monitors
              </Link>
            </li>
            <li className="list-group-item bg-transparent">
              <Link to="/tablets" className="text-dark text-decoration-none">
                <i className="fas fa-tablet-alt me-2"></i>Tablets
              </Link>
            </li>
            <li className="list-group-item bg-transparent">
              <Link to="/accessories" className="text-dark text-decoration-none">
                <i className="fas fa-headphones me-2"></i>Accessories
              </Link>
            </li>
            <li className="list-group-item bg-transparent">
              <Link to="/gaming" className="text-dark text-decoration-none">
                <i className="fas fa-gamepad me-2"></i>Gaming
              </Link>
            </li>
            <li className="list-group-item bg-transparent">
              <Link to="/business" className="text-dark text-decoration-none">
                <i className="fas fa-briefcase me-2"></i>Business
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-12 col-md-9 col-lg-10 p-5 content-area">
          <div className="content-wrapper">
            <Outlet />
          </div>
        </div>
      </div>
    </div>



  );
};

export default Admin;