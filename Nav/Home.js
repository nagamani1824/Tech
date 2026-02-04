import React, { useEffect, useState } from 'react';
import './Home.css';
import { data, useNavigate } from 'react-router-dom';
import a from './Images/explore1.avif';
import Chat from './Chat';
import AOS from 'aos';
import 'aos/dist/aos.css';

const cardstyle = [
  {
    id: 91,
    img: a,
    title: "Premium Laptops & Notebooks",
    para: "High-performance computing solutions for professionals and gamers. Featuring the latest processors, stunning displays, and advanced cooling systems.",
  },
  {
    id: 92,
    img: a,
    title: "Professional Monitors",
    para: "Crystal-clear displays with exceptional color accuracy and ergonomic designs. Perfect for creative work, gaming, and productivity.",
  },
  {
    id: 93,
    img: a,
    title: "Accessories & Peripherals",
    para: "Complete your setup with premium keyboards, mice, storage devices, and connectivity solutions from trusted brands.",
  },
];

const Home = () => {
  const navigate = useNavigate();

  const handleIconClick = (category) => {
    navigate('/ab', { state: { category } });
  };

  const [showSignIn, setShowSignIn] = useState(false);
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  

  // const[formdata,setFormdata]= useState({})

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleSignInCard = () => {
    setShowSignIn(!showSignIn);
    setErrors({});
  };

  const toggleMode = () => {
    setIsCreateAccount(!isCreateAccount);
    setErrors({});
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setPhone('');
  };

  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'firstName':
        if (!value.trim()) {
          error = 'First name is required';
        } else if (value.trim().length < 2) {
          error = 'First name must be at least 2 characters';
        } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
          error = 'First name can only contain letters';
        }
        break;
      case 'lastName':
        if (!value.trim()) {
          error = 'Last name is required';
        } else if (value.trim().length < 2) {
          error = 'Last name must be at least 2 characters';
        } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
          error = 'Last name can only contain letters';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 8) {
          error = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          error = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
        }
        break;
      case 'phone':
        if (!value.trim()) {
          error = 'Phone number is required';
        } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(value.replace(/\s/g, ''))) {
          error = 'Please enter a valid phone number';
        }
        break;
      default:
        break;
    }
    
    return error;
  };

  const handleFieldChange = (name, value) => {
    // Update field value
    switch (name) {
      case 'firstName': setFirstName(value); break;
      case 'lastName': setLastName(value); break;
      case 'email': setEmail(value); break;
      case 'password': setPassword(value); break;
      case 'phone': setPhone(value); break;
      default: break;
    }
    
    // Validate field if it has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleFieldBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const value = getFieldValue(name);
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const getFieldValue = (name) => {
    switch (name) {
      case 'firstName': return firstName;
      case 'lastName': return lastName;
      case 'email': return email;
      case 'password': return password;
      case 'phone': return phone;
      default: return '';
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const fieldsToValidate = isCreateAccount 
      ? ['firstName', 'lastName', 'email', 'password', 'phone']
      : ['email', 'password'];
    
    fieldsToValidate.forEach(field => {
      const value = getFieldValue(field);
      const error = validateField(field, value);
      if (error) newErrors[field] = error;
    });
    
    setErrors(newErrors);
    setTouched(fieldsToValidate.reduce((acc, field) => ({ ...acc, [field]: true }), {}));
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (validateForm()) {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(`${isCreateAccount ? 'Account created' : 'Logged in'} successfully!`);
      setShowSignIn(false);
      // Reset form
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setPhone('');
      setErrors({});
      setTouched({});
    }
    
    setIsSubmitting(false);
  };


  const[lap, setLap] = useState([])

  useEffect(()=>{
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
    fetch("http://localhost:4000/getlaptop").then((res)=>res.json()).then((data)=>{
      if(Array.isArray(data)) {
        setLap(data);
      }
    });
  },[])

  return (
    <>
      <div style={{ textAlign: 'right', padding: '1rem' }}>
        <h6 className="text-primary" style={{ cursor: 'pointer' }} onClick={toggleSignInCard}>
          {isCreateAccount ? 'Create Account' : 'Sign In'}{' '}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            className="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 
              11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 
              2.37A7 7 0 0 0 8 1" />
          </svg>
        </h6>
      </div>

      {showSignIn && (
        <div className="d-flex justify-content-center mb-4">
          <div className="card shadow" style={{ width: '22rem' }}>
            <div className="card-body">
              <h5 className="card-title">{isCreateAccount ? 'Create Account' : 'Sign In'}</h5>
              <form onSubmit={handleSubmit} noValidate>
                {isCreateAccount && (
                  <>
                    <div className="mb-3">
                      <label className="form-label">First Name</label>
                      <input 
                        className={`form-control ${touched.firstName ? (errors.firstName ? 'is-invalid' : 'is-valid') : ''}`}
                        value={firstName} 
                        onChange={e => handleFieldChange('firstName', e.target.value)}
                        onBlur={() => handleFieldBlur('firstName')}
                        placeholder="Enter your first name"
                      />
                      {touched.firstName && errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Last Name</label>
                      <input 
                        className={`form-control ${touched.lastName ? (errors.lastName ? 'is-invalid' : 'is-valid') : ''}`}
                        value={lastName} 
                        onChange={e => handleFieldChange('lastName', e.target.value)}
                        onBlur={() => handleFieldBlur('lastName')}
                        placeholder="Enter your last name"
                      />
                      {touched.lastName && errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Phone</label>
                      <input 
                        className={`form-control ${touched.phone ? (errors.phone ? 'is-invalid' : 'is-valid') : ''}`}
                        value={phone} 
                        onChange={e => handleFieldChange('phone', e.target.value)}
                        onBlur={() => handleFieldBlur('phone')}
                        placeholder="Enter your phone number"
                      />
                      {touched.phone && errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </div>
                  </>
                )}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input 
                    className={`form-control ${touched.email ? (errors.email ? 'is-invalid' : 'is-valid') : ''}`}
                    type="email" 
                    value={email} 
                    onChange={e => handleFieldChange('email', e.target.value)}
                    onBlur={() => handleFieldBlur('email')}
                    placeholder="Enter your email"
                  />
                  {touched.email && errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input 
                    className={`form-control ${touched.password ? (errors.password ? 'is-invalid' : 'is-valid') : ''}`}
                    type="password" 
                    value={password} 
                    onChange={e => handleFieldChange('password', e.target.value)}
                    onBlur={() => handleFieldBlur('password')}
                    placeholder="Enter your password"
                  />
                  {touched.password && errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary w-100 mb-2" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      {isCreateAccount ? 'Creating Account...' : 'Signing In...'}
                    </>
                  ) : (
                    isCreateAccount ? 'Create Account' : 'Login'
                  )}

                {/* if(adminLogin){
                  email === 'nagamani@gmail.com' && password === 'Naga@12345'
                  ? navigate('/Ad')
                  : navigate('/')
                } */}
                </button>
              </form>
              <button className="btn btn-link w-100" onClick={toggleMode}>
                {isCreateAccount ? 'Already have an account? Sign In' : "Don't have an account? Create One"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="promo-section" data-aos="fade-up">
        <hr />
        <h1 data-aos="zoom-in" data-aos-delay="200">Premium Electronics Store</h1>
        <h4 data-aos="fade-right" data-aos-delay="400">Discover cutting-edge technology and premium electronics for your professional and personal needs.</h4>
        <h5 data-aos="fade-left" data-aos-delay="600">Latest Technology, Unbeatable Performance, Exceptional Value</h5>
        <h6 className="offer-highlight" data-aos="bounce-in" data-aos-delay="800">
          <strong>🎯 Exclusive Launch Offers:</strong> Up to 40% off on selected premium products + Free extended warranty
        </h6>
        <p data-aos="fade-up" data-aos-delay="1000">✓ Free shipping on orders above ₹999 | ✓ 30-day return policy | ✓ Expert technical support</p>
        <p data-aos="fade-up" data-aos-delay="1100">✓ EMI options available | ✓ Secure payment processing | ✓ Certified products only</p>
        <hr />

        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel" data-aos="slide-up" data-aos-delay="1200">
          <div className="carousel-inner">
            {[
              "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=400&fit=crop",
              "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=400&fit=crop",
              "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&h=400&fit=crop",
            ].map((src, idx) => (
              <div className={`carousel-item ${idx === 0 ? 'active' : ''}`} key={idx}>
                <img src={src} alt={`Premium Electronics ${idx + 1}`} style={{ maxHeight: "500px", objectFit: "cover", width: "100%" }} />
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span className="carousel-control-prev-icon btn-dark" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="container my-5" data-aos="fade-up">
        <h3 data-aos="zoom-in" data-aos-delay="200">Shop by Category</h3>
        <p className="text-muted mb-4" data-aos="fade-up" data-aos-delay="300">Explore our comprehensive range of premium electronics and accessories</p>
        <div className="row text-center">
          {[
            { label: "Special Offers", icon: "https://img.icons8.com/color/96/000000/price-tag.png", desc: "Limited time deals" },
            { label: "Laptops", icon: "https://img.icons8.com/color/96/000000/laptop.png", desc: "Professional & gaming laptops" },
            { label: "Desktops", icon: "https://img.icons8.com/color/96/000000/computer.png", desc: "High-performance PCs" },
            { label: "Workstations", icon: "https://img.icons8.com/color/96/000000/workstation.png", desc: "Professional workstations" },
            { label: "Tablets", icon: "https://img.icons8.com/color/96/000000/tablet.png", desc: "iPad & Android tablets" },
            { label: "Accessories", icon: "https://img.icons8.com/color/96/000000/headphones.png", desc: "Audio & peripherals" },
            { label: "Monitors", icon: "https://img.icons8.com/color/96/000000/monitor.png", desc: "4K & gaming displays" },
            { label: "Gaming", icon: "https://img.icons8.com/color/96/000000/controller.png", desc: "Gaming gear & consoles" },
            { label: "Business", icon: "https://img.icons8.com/color/96/000000/business.png", desc: "Business solutions" },
            { label: "Education", icon: "https://img.icons8.com/color/96/000000/student-male.png", desc: "Student discounts" },
          ].map(({ label, icon, desc }, index) => (
            <div
              key={index}
              className="col-6 col-md-3 mb-4 category-item"
              style={{ cursor: 'pointer' }}
              onClick={() => handleIconClick(label)}
              data-aos="zoom-in"
              data-aos-delay={400 + index * 100}
            >
              <img src={icon} alt={label} style={{ width: "60px", height: "60px", marginBottom: "8px" }} />
              <p className="mt-2 mb-1 fw-bold">{label}</p>
              <small className="text-muted">{desc}</small>
            </div>
          ))}
        </div>
      </div>

      <div className='container' data-aos="fade-up">
        <h1 data-aos="zoom-in" data-aos-delay="200">Featured Categories</h1>
        <h6 data-aos="fade-right" data-aos-delay="400" className="text-muted">PREMIUM ELECTRONICS COLLECTION</h6>
        <div className='row'>
          {cardstyle.map((card, index) => (
            <div className="col-md-4 mb-4" key={card.id} data-aos="flip-left" data-aos-delay={500 + index * 200}>
              <div className="card h-100">
                <img src={card.img} className="card-img-top" alt={card.title} />
                <div className="card-body">
                  <h5 className="card-title">{card.title}</h5>
                  <p className="card-text">{card.para}</p>
                  <button className="btn btn-outline-primary" onClick={() => handleIconClick(card.title)}>
                    Explore Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>




       <section className="container" data-aos="fade-up">
  <h2 className="mt-5" data-aos="slide-up" data-aos-delay="200">New Arrivals</h2>
  <p className="text-muted mb-4" data-aos="fade-up" data-aos-delay="300">Discover the latest in premium electronics technology</p>

  {lap.map((item, index) => (
    <div key={item._id} className="row align-items-center mt-3" data-aos="slide-right" data-aos-delay={400 + index * 200}>
      <div className="col-6">
        <h3>{item.title}</h3>
        <p>{item.des}</p>
        <button className="btn btn-primary">View Details</button>
      </div>
      <div className="col-6">
        <img src={item.img} alt={item.title} className="img-fluid" width="200" />
      </div>
    </div>
  ))}
</section>



      </div>
      <Chat />
    </>
  );
};





export default Home;




