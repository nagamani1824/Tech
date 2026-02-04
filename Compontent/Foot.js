import React from 'react';
// import './Foot.css';
import { Link } from 'react-router-dom';

const Foot = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-4 mt-5">
      <div className="container text-md-left">
        <div className="row text-md-left">
          
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning text-decoration-underline-none"> <Link to="/">Tech </Link> </h5>
            <p>
              Tech is a global leader in innovative consumer, commercial and enterprise technologies. We design, engineer and build the world's most secure and powerful devices.
            </p>
          </div>
 
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Products</h5>
            <p> <Link to="/ab" className="text-light text-decoration-underline" >Laptops </Link> </p>
            <p> <Link className="text-light text-decoration-hover-underline" to="/ab" >Desktops</Link></p>
            <p><Link  className="text-light text-decoration-underline" to="/ab"> Tablets </Link> </p>
            <p> <Link className="text-light text-decoration-underline"  to="/ab"> Accessories </Link></p>
          </div>

          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3" >
            <h5  className="text-uppercase mb-4 font-weight-bold text-warning">Support</h5>
            <p><Link to="/call" className="text-light text-decoration-underline">Customer Service</Link></p>
            <p><Link to="/call" className="text-light text-decoration-underline">Warranty</Link></p>
            <p><Link to="/call" className="text-light text-decoration-underline">Drivers & Software</Link></p>
            <p><Link to="/call" className="text-light text-decoration-underline">Repair Status</Link></p>
          </div>

          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3 ">
            <h5 className="text-uppercase  mb-4 font-weight-bold text-warning">Contact</h5>
            <p><i className="fas fa-home me-3"></i> 100 Tech Way, Morrisville, NC</p>
            <p><i className="fas fa-envelope me-3"></i> support@tech.com</p>
            <p><i className="fas fa-phone me-3"></i> +1 800 426 7378</p>

            <div className="mt-3"> 
              <a href="#" className="text-light me-3"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-light me-3"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-light me-3"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-light"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>

        <hr className="my-4 text-light" />

        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8">
            <p>© {new Date().getFullYear()} Tech. All rights reserved.</p>
          </div>
          <div className="col-md-5 col-lg-4 text-md-end">
            <p>Powered by React & Bootstrap</p>
          </div>
        </div>
      </div>
      
    </footer>
  );
};

export default Foot;

