
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from './redux/CartSlice';
import Chat from './Chat';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './About.css';

const About = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("Laptops");
  const [cart,setcart] =useState([]);
  const [Orderplaced,setOrderplaced] = useState(false);
  const [trackingStatus, setTrackingStatus] = useState('Order Placed');
  const [trackingSteps, setTrackingSteps] = useState([
    { step: 'Order Placed', completed: true, time: new Date().toLocaleString() },
    { step: 'Processing', completed: false, time: null },
    { step: 'Shipped', completed: false, time: null },
    { step: 'Out for Delivery', completed: false, time: null },
    { step: 'Delivered', completed: false, time: null }
  ]);
  const [showTracking, setShowTracking] = useState(false);
  const [showCartPanel, setshowCartPanel] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStep, setSubmissionStep] = useState(0);
  const submissionSteps = ['Validating Details', 'Processing Payment', 'Sending Confirmation'];
  const [paymentSectionVisible, setPaymentSectionVisible] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'online',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    upiId: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    upiId: ''
  });

  useEffect(() => {
    if (location.state?.category) {
      setActiveTab(location.state.category);
    }
  }, [location.state]);

  useEffect(() => {
    if (orderDetails.paymentMethod === 'online') {
      setPaymentSectionVisible(true);
    } else {
      setPaymentSectionVisible(false);
    }
  }, [orderDetails.paymentMethod]);

  useEffect(() => {
    if (Orderplaced) {
      setShowTracking(true);
      // Simulate live tracking updates with smoother transitions
      const timer1 = setTimeout(() => {
        setTrackingStatus('Processing');
        setTrackingSteps(prev => prev.map(step => 
          step.step === 'Processing' ? { ...step, completed: true, time: new Date().toLocaleString() } : step
        ));
      }, 3000); // 3 seconds

      const timer2 = setTimeout(() => {
        setTrackingStatus('Shipped');
        setTrackingSteps(prev => prev.map(step => 
          step.step === 'Shipped' ? { ...step, completed: true, time: new Date().toLocaleString() } : step
        ));
      }, 10000); // 10 seconds

      const timer3 = setTimeout(() => {
        setTrackingStatus('Out for Delivery');
        setTrackingSteps(prev => prev.map(step => 
          step.step === 'Out for Delivery' ? { ...step, completed: true, time: new Date().toLocaleString() } : step
        ));
      }, 20000); // 20 seconds

      const timer4 = setTimeout(() => {
        setTrackingStatus('Delivered');
        setTrackingSteps(prev => prev.map(step => 
          step.step === 'Delivered' ? { ...step, completed: true, time: new Date().toLocaleString() } : step
        ));
      }, 25000); // 25 seconds

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }
  }, [Orderplaced]);


  const cartProduct = useSelector((state)=>state.cart.cartItem)
  const dispatch = useDispatch()

  const addCart = (item) =>{
    dispatch(addToCart(item))
  }

  const RemoveCart = (item) =>{
    dispatch(deleteFromCart(item))
  }

  const handleOrderSubmit = () => {
    const errors = {};
    if (!orderDetails.name.trim()) {
      errors.name = 'Name is required.';
    }
    if (!orderDetails.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!orderDetails.email.includes('@')) {
      errors.email = 'Please enter a valid email.';
    }
    if (!orderDetails.phone.trim()) {
      errors.phone = 'Phone number is required.';
    }
    if (!orderDetails.address.trim()) {
      errors.address = 'Address is required.';
    }
    if (orderDetails.paymentMethod === 'online') {
      // For online payment, either card details or UPI ID must be provided
      const hasCardDetails = orderDetails.cardNumber.trim() || orderDetails.expiryDate.trim() || orderDetails.cvv.trim();
      const hasUpiId = orderDetails.upiId.trim();
      
      if (!hasCardDetails && !hasUpiId) {
        errors.cardNumber = 'Please provide either card details or UPI ID for online payment.';
      }
      
      // Validate card details if any card field is filled
      if (hasCardDetails) {
        if (!orderDetails.cardNumber.trim()) {
          errors.cardNumber = 'Card number is required.';
        } else if (orderDetails.cardNumber.replace(/\s/g, '').length !== 16 || !/^\d+$/.test(orderDetails.cardNumber.replace(/\s/g, ''))) {
          errors.cardNumber = 'Please enter a valid 16-digit card number.';
        }
        if (!orderDetails.expiryDate.trim()) {
          errors.expiryDate = 'Expiry date is required.';
        } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(orderDetails.expiryDate)) {
          errors.expiryDate = 'Please enter a valid expiry date (MM/YY).';
        }
        if (!orderDetails.cvv.trim()) {
          errors.cvv = 'CVV is required.';
        } else if (orderDetails.cvv.length !== 3 || !/^\d+$/.test(orderDetails.cvv)) {
          errors.cvv = 'Please enter a valid 3-digit CVV.';
        }
      }
      
      if (hasUpiId && !/@/.test(orderDetails.upiId)) {
        errors.upiId = 'Please enter a valid UPI ID (e.g., user@paytm).';
      }
    }
    if (cartProduct.length === 0) {
      alert('Your cart is empty.');
      return;
    }
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      setSubmissionStep(0);
      
      // Simulate processing time for animation with steps
      setTimeout(() => setSubmissionStep(1), 500); // Validating
      setTimeout(() => setSubmissionStep(2), 1000); // Processing Payment
      setTimeout(() => {
        // Send notifications
        const phoneNumber = orderDetails.phone.startsWith('+') ? orderDetails.phone : `+91${orderDetails.phone}`;
        
        fetch('http://localhost:4000/send-notification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: orderDetails.email,
            phone: phoneNumber,
            orderDetails: orderDetails,
            cartItems: cartProduct
          })
        })
        .then(response => response.json())
        .then(data => {
          console.log('Notifications sent:', data);
        })
        .catch(error => {
          console.error('Error sending notifications:', error);
        })
        .finally(() => {
          setIsSubmitting(false);
          setSubmissionStep(0);
          setOrderplaced(true);
          setShowOrderForm(false);
          setshowCartPanel(false);
          setFormErrors({ name: '', email: '', phone: '', address: '', paymentMethod: '', cardNumber: '', expiryDate: '', cvv: '', upiId: '' }); // reset errors
          setOrderDetails({
            name: '',
            email: '',
            phone: '',
            address: '',
            paymentMethod: 'online',
            cardNumber: '',
            expiryDate: '',
            cvv: '',
            upiId: ''
          }); // reset form
        });
      }, 1500); // 1.5 second delay for animation
    }
  }

  const product = [
    {
      id: 1,
      price: "$40,999",
      off: "50,500",
      tax: "Incl. Shipping & all Taxes",
      rating: "⭐⭐⭐⭐ 4 out of 5 stars",
      img: "https://m.media-amazon.com/images/I/71D9HSayVSL._SX679_.jpg",
      des: "Tech IdeaPad Slim 3 13th Gen Intel Core i5...",
      ModelName: "IdeaPad Slim 3",
      ScreenSize: 15.3,
      Colour: "i5-13420H",
      HardDiskSize: "512 GB",
      CPUModel: "Intel Core i5",
      RAMMemoryInstalledSize: "16 GB",
      OperatingSystem: "Windows 11 Home",
      SpecialFeature: "HD Audio, Anti Glare Coating, Memory Card Slot",
      GraphicsCard: "Integrated",
      category: "Laptops"
    },
       {
      id: 2,
      price: "$49,990",
      off: "59,990",
      tax: "Incl. Shipping & all Taxes",
      rating: "⭐⭐⭐⭐ 4 out of 5 stars",
      img: "https://m.media-amazon.com/images/I/81b4LYOyFVL._SX679_.jpg",
      des: "Tech IdeaPad Slim 3 13th Gen Intel Core i7...",
      ModelName: "IdeaPad Slim 3",
      ScreenSize: 15.6,
      Colour: "i7-1355U",
      HardDiskSize: "1 TB",
      CPUModel: "Intel Core i7",
      RAMMemoryInstalledSize: "16 GB",
      OperatingSystem: "Windows 11 Home",
      SpecialFeature: "HD Audio, Anti Glare Coating, Memory Card Slot",
      GraphicsCard: "Integrated",
      category: "Laptops"

    },
    {
      id: 3,
      price: "$59,990",
      off: "69,990",
      tax: "Incl. Shipping & all Taxes",
      rating: "⭐⭐⭐⭐ 4 out of 5 stars",
    img: "https://p2-ofp.static.pub//fes/cms/2025/06/09/whh4pyng6njp6zsyy6ohcj6p676z2g607561.png",

      des: "Tech IdeaPad Slim 5 13th Gen Intel Core i7...",
      ModelName: "IdeaPad Slim 5",
      ScreenSize: 15.6,
      Colour: "i7-1355U",
      HardDiskSize: "1 TB",
      CPUModel: "Intel Core i7",
      RAMMemoryInstalledSize: "16 GB",
      OperatingSystem: "Windows 11 Home",
      SpecialFeature: "HD Audio, Anti Glare Coating, Memory Card Slot",
      GraphicsCard: "Integrated",
      category: "Laptops"

    },
    {
      id: 4,
      price: "$69,990",
      off: "79,990",
      tax: "Incl. Shipping & all Taxes",
      rating: "⭐⭐⭐⭐ 4 out of 5 stars",
       img: "https://m.media-amazon.com/images/I/81b4LYOyFVL._SX679_.jpg",

      des: "Tech IdeaPad Slim 7 13th Gen Intel Core i9...",
      ModelName: "IdeaPad Slim 7",
      ScreenSize: 15.6,
      Colour: "i9-13900H",
      HardDiskSize: "1 TB",
      CPUModel: "Intel Core i9",
      RAMMemoryInstalledSize: "32 GB",
      OperatingSystem: "Windows 11 Home",
      SpecialFeature: "HD Audio, Anti Glare Coating, Memory Card Slot",
      GraphicsCard: "Integrated",
      category: "Laptops"
    },
    {
      id: 5,
      price: "$79,990",
      off: "89,990",
      tax: "Incl. Shipping & all Taxes",
      rating: "⭐⭐⭐⭐ 4 out of 5 stars",
      img: "https://m.media-amazon.com/images/I/81b4LYOyFVL._SX679_.jpg",
      des: "Tech Legion 5 Pro Gaming Laptop...",
      ModelName: "Legion 5 Pro",
      ScreenSize: 16.0,
      Colour: "i7-12700H",
      HardDiskSize: "1 TB SSD",
      CPUModel: "Intel Core i7",
      RAMMemoryInstalledSize: "32 GB",
      OperatingSystem: "Windows 11 Home",
      SpecialFeature: "HD Audio, Anti Glare Coating, Memory Card Slot",
      GraphicsCard: "NVIDIA GeForce RTX 3060",
      category: "Gaming"
    },
    {
      id: 6,
      price: "$19,990",
      off: "29,990",
      tax: "Incl. Shipping & all Taxes",
      rating: "⭐⭐⭐⭐⭐ 5 out of 5 stars",
      img: "https://p1-ofp.static.pub/fes/cms/2023/02/23/uddxnquvofnhqy58pa8nrq7tt9vujv541809.jpg",
      des: "ThinkPad Universal USB-C Dock",
      ModelName: " Universal USB-C Dock",
      ScreenSize: null,
      Colour: "Black",
      HardDiskSize: null,
      CPUModel: null,
      RAMMemoryInstalledSize: null,
      OperatingSystem: null,
      SpecialFeature: " 1 Year Software",
      GraphicsCard: null,
      category: "Accessories"
    },
    {
      id:7,
      price:"₹25,960",
      off:"₹29,990",
      tax:"Incl. Shipping & all Taxes",
      rating:"⭐⭐⭐⭐ 4 out of 5 stars",
      img:"https://p4-ofp.static.pub//fes/cms/2025/05/23/hd4yiq8oupdf3muz3k78sgh9qbp6jd222198.png",
      des:"ThinkVision M14t Gen 2 - 35.56cms (14) Monitor",
      ModelName:"M14t Gen 2 Monitor",
      ScreenSize: 14,
      Colour:"Black",
      HardDiskSize:null,
      CPUModel:null,
      RAMMemoryInstalledSize:null,
      OperatingSystem:null,
      SpecialFeature:"Wireless, 1 Year Software",
      GraphicsCard:null,
      category:"Monitors"
    },
    {
      id: 8,
      price : "$8,199",
      off : "13,199",
      tax : "Incl. Shipping & all Taxes",
      rating : "⭐⭐⭐⭐ 4 out of 5 stars",
      img : "https://p4-ofp.static.pub//fes/cms/2025/05/28/9xv629vbpkjymwa2qtisbhqwdh51rm765706.png",
      des : "Tech L24i-4A 60.45cms (23.8) Monitor",
      ModelName : "L24i-4A Monitor",
      ScreenSize : 23.8,
      Colour : "Black",
      HardDiskSize : null,
      CPUModel : null,
      RAMMemoryInstalledSize : null,  
      OperatingSystem : null, 
      SpecialFeature : "FHD, IPS Panel, 75Hz",
      GraphicsCard : null,
      category : "Monitors"
    },
    {
      id:9,
      price:"8,798",
      off:"9,999",
      tax:"Incl. Shipping & all Taxes",
      rating:"⭐⭐⭐⭐⭐ 5 out of 5 stars",
      img:"https://p2-ofp.static.pub//fes/cms/2025/05/23/w8lsltb3s279ef48ajq3d6b2tjtdto515227.png",
      des:"ThinkVision S24i-30 60.45cms (23.8) Monitor",
      ModelName:"S24i-30 Monitor",
      ScreenSize: 23.8,
      Colour:"Black",
      HardDiskSize:null,
      CPUModel:null,
      RAMMemoryInstalledSize:null,
      OperatingSystem:null,
      SpecialFeature:null,
      GraphicsCard:null,
      category:"Monitors"
    },
    {
      id:10,
      price:"₹10,999",
      off:"₹12,999",
      tax:"Incl. Shipping & all Taxes",
      rating:"⭐⭐⭐⭐ 4 out of 5 stars",
      img:"https://p3-ofp.static.pub//fes/cms/2024/03/22/x0lf2o1hskmh27yz60f9rdwrn6l0dq170736.jpg",
      des:"Tech Tab M11",
      ModelName:"Tab M11", 
      ScreenSize: 11,
      Colour:"Slate Grey",
      category:"Tablets"

    },
    {
      id:11,
      price:"₹27,999",
      off:"₹29,999",
      tax:"Incl. Shipping & all Taxes", 
      rating:"⭐⭐⭐⭐ 4 out of 5 stars",
      img:"https://p3-ofp.static.pub//fes/cms/2025/03/11/1byjvmzo2dwgi566c7o5cn62vd8nwk011088.png",
      des:"Tech Idea Tab Pro",
      ModelName:"Idea Tab Pro",
      ScreenSize: 12.7,
      Colour:"Storm Grey",
      category:"Tablets"

    },
    {
      id:12,
      price:"1,699",
      off:"1,999",
      tax:"Incl. Shipping & all Taxes",
      rating:"⭐⭐⭐⭐ 4 out of 5 stars", 
      img:"https://p4-ofp.static.pub/fes/cms/2022/10/06/srbpeu1zg6nefg9b68h081zap6b941451004.jpg",
      des:"Tech 600 Bluetooth Silent Mouse",
      ModelName:"600 Bluetooth Silent Mouse",
      category:"Accessories"
    },
    {
      id:13,
      price:"₹7,999",
      off:"₹9,499",
      tax:"Incl. Shipping & all Taxes",
      rating:"⭐⭐⭐⭐ 4 out of 5 stars",
      img:"https://p4-ofp.static.pub//fes/cms/2024/10/23/pmfd3m8x78vxpihbuii7p9smskdcsp583237.png",
      des:"Tech Wireless Stereo Headset",
      ModelName:"Wireless Stereo Headset",
      category:"Accessories"
    },
    {
      id:14,
      price:"₹1,999",
      off:"₹2,499",
      tax:"Incl. Shipping & all Taxes",
      rating:"⭐⭐⭐⭐ 4 out of 5 stars",
      img:"https://p1-ofp.static.pub/medias/bWFzdGVyfHJvb3R8MTQ4NzF8aW1hZ2UvcG5nfGg3Yi9oMDgvMTI5MTczMDE4Mzc4NTQucG5nfDI3YzEzMmYyYjZiZTE2MDJmNWY1NGEyZmFhYTI3ZjQ0NDJiYzhjMjU1NDhlNTFiZGY0ZDg5ZjIwM2ZiNWEwYWE/GXC1D66063-200x150-01.png"  ,
      des:"Tech 510 FHD Webcam",
      ModelName:"510 FHD Webcam",

      category:"Accessories"
    },
    {
      id:15,
      price:"₹55,491",
      off:"₹59,990",
      tax:"Incl. Shipping & all Taxes",
      rating:"⭐⭐⭐⭐ 4 out of 5 stars",
      img:"https://p2-ofp.static.pub//fes/cms/2024/03/20/0xbcadobdac1lq59yhjwmzngsft11s006858.png",
      des:"ThinkPad E14 - AMD Ryzen 5, 16 GB RAM, 512 SSD, Win 11 Home",
      screenSize: "35.56cms (14) ",
      ModelName:"ThinkPad E14",
      CPUModel:"AMD Ryzen 5 7535U",
      RAMMemoryInstalledSize:"16 GB",
      HardDiskSize:"512 GB SSD",
      OperatingSystem:"Windows 11 Home",
      Colour:"Graphite Black",
      SpecialFeature:"Fingerprint Reader, Backlit Keyboard, Dolby Audio",
      GraphicsCard:"Integrated AMD Radeon Graphics",
      SoftwarePreload :"MS Office",

      category:"Business"
    },
    {
      id:16,
      price:"₹47,991",  
      off:"₹49,990",
      tax:"Incl. Shipping & all Taxes",
      des:"ThinkBook 16 - AMD Ryzen 5, 16 GB RAM, 512 SSD, Win 11 Home",
      rating:"⭐⭐⭐⭐ 4 out of 5 stars",
      img:"https://p1-ofp.static.pub/medias/26340069271_222_202402191044561744687260440.png",
      ModelName:"ThinkBook 16",
      screensize:"40.64cms (16)",
      Colour:"Arctic Grey",
      OperatingSystem:"Windows 11 Home Single Language 64",
      CPUModel:"AMD Ryzen 5 7535HS",
      RAMMemoryInstalledSize:"16 GB",
      category:"Business",
      HardDiskSize:"512 GB SSD",
      SpecialFeature:"Fingerprint Reader, Backlit Keyboard, Dolby Audio", 
      GraphicsCard:"Integrated AMD Radeon Graphics",
      SoftwarePreload :"MS Office",

    },
    { id:17,
      price:"₹2,49,375",
      off:"₹2,59,990",
      tax:"Incl. Shipping & all Taxes",   
      rating:"⭐⭐⭐⭐ 4 out of 5 stars",
      img:"https://p1-ofp.static.pub//fes/cms/2025/06/16/3dw8kgblm8rqaqto7h765zggsrcvwc524986.png",
      des:"Tech Legion Pro 7i Intel, 40.64cms - Core Ultra 9, 32 GB RAM, 1 TB SSD, Win 11 Home",

      ModelName:"Legion Pro 7",
      screensize:"40.64cms (16)",
      Colour:"Eclipse Black",
      OperatingSystem:"Windows 11 Home Single Language 64",
      CPUModel:"Intel Core Ultra 9-13900HX",
      RAMMemoryInstalledSize:"32 GB",
      category:"Gaming",
      HardDiskSize:"1 TB SSD",
      SpecialFeature:"Backlit Keyboard, Dolby Audio, Fingerprint Reader",
      GraphicsCard:"NVIDIA GeForce RTX 4070",
      SoftwarePreload :"MS Office",


    },
    {
      id:18,
      price:""

    }
  ];

  const filteredProducts = product.filter((item) => {
    if (activeTab === "Laptops") return item.category === "Laptops";
    if (activeTab === "Accessories & Software") return item.category === "Accessories";
    if (activeTab === "Gaming") return item.category === "Gaming";
    if(activeTab === "Business") return item.category === "Business";
    if(activeTab === "Tablets") return item.category === "Tablets";
    if(activeTab === "Monitors") return item.category === "Monitors";
    return true;
  });

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid justify-content-between">
          <span className="navbar-brand fw-bold">🖥️ Premium Electronics Hub</span>
        <button className="btn btn-outline-light position-relative" onClick={() => setshowCartPanel(!showCartPanel)}>
            🛒 
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cartProduct.length}
            </span>
          </button>
</div> 
      </nav>

      <div className="container mt-3">
        <div className="text-center mb-4">
          <h2 className="text-primary fw-bold" data-aos="fade-down">Premium Electronics Collection</h2>
          <p className="text-muted">Discover cutting-edge technology from trusted brands</p>
        </div>
        <ul className="nav nav-tabs justify-content-center">
          <li className="nav-item">
            <button className={`nav-link ${activeTab === "Laptops" ? "active" : ""}`} onClick={() => setActiveTab("Laptops")}>
              💻 Laptops & Notebooks
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === "Accessories & Software" ? "active" : ""}`} onClick={() => setActiveTab("Accessories & Software")}>
              🎧 Accessories & Peripherals
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link  ${activeTab === "Gaming" ? "active" : ""}`} onClick={() => setActiveTab("Gaming")}>
              🎮 Gaming & Entertainment
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link  ${activeTab === "Business" ? "active" : ""}`} onClick={() => setActiveTab("Business")}>
              💼 Business Solutions
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link  ${activeTab === "Tablets" ? "active" : ""}`} onClick={() => setActiveTab("Tablets")}>
              📱 Tablets & Mobile
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link  ${activeTab === "Monitors" ? "active" : ""}`} onClick={() => setActiveTab("Monitors")}>
              🖥️ Monitors & Displays
            </button>
          </li>
        </ul>
      </div>

      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <h1 className="display-4 fw-bold text-center mb-4" data-aos="fade-down">
              {activeTab === "Laptops" && "💻 Professional Laptops & Notebooks"}
              {activeTab === "Accessories & Software" && "🎧 Premium Accessories & Software"}
              {activeTab === "Gaming" && "🎮 Gaming & Entertainment Systems"}
              {activeTab === "Business" && "💼 Business & Productivity Solutions"}
              {activeTab === "Tablets" && "📱 Tablets & Mobile Devices"}
              {activeTab === "Monitors" && "🖥️ Professional Monitors & Displays"}
            </h1>
            <p className="lead text-center text-muted mb-5" data-aos="fade-up">
              {activeTab === "Laptops" && "High-performance computing solutions for professionals, students, and gamers"}
              {activeTab === "Accessories & Software" && "Complete your setup with premium peripherals and productivity tools"}
              {activeTab === "Gaming" && "Immersive gaming experiences with cutting-edge hardware and accessories"}
              {activeTab === "Business" && "Reliable business solutions designed for productivity and collaboration"}
              {activeTab === "Tablets" && "Versatile tablets and mobile devices for work and entertainment"}
              {activeTab === "Monitors" && "Crystal-clear displays for professional work and entertainment"}
            </p>
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.map((item, index) => (
            <div
              key={item.id}
              className="product-card shadow-sm"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="product-image-container position-relative">
                <img
                  src={item.img}
                  alt={item.ModelName}
                  className="product-image img-fluid"
                />
                {item.price !== item.off && (
                  <div className="badge bg-danger position-absolute top-0 end-0 m-2">
                    SALE
                  </div>
                )}
              </div>
              <div className="product-content p-3">
                <h5 className="product-title fw-bold mb-2">{item.ModelName}</h5>
                <p className="product-description text-muted small mb-3">{item.des}</p>

                <div className="product-price mb-2">
                  <span className="current-price fw-bold text-primary fs-5">{item.price}</span>
                  {item.off && <span className="original-price text-decoration-line-through text-muted ms-2">{item.off}</span>}
                  <div className="tax-info small text-success">{item.tax}</div>
                </div>

                <div className="product-rating mb-3">
                  <span className="rating-stars">{item.rating}</span>
                </div>

                <div className="product-specs mb-3">
                  {item.ScreenSize && <div className="spec-item small"><strong>Screen:</strong> {item.ScreenSize}"</div>}
                  {item.RAMMemoryInstalledSize && <div className="spec-item small"><strong>RAM:</strong> {item.RAMMemoryInstalledSize}</div>}
                  {item.HardDiskSize && <div className="spec-item small"><strong>Storage:</strong> {item.HardDiskSize}</div>}
                  {item.CPUModel && <div className="spec-item small"><strong>CPU:</strong> {item.CPUModel}</div>}
                  {item.OperatingSystem && <div className="spec-item small"><strong>OS:</strong> {item.OperatingSystem}</div>}
                  {item.GraphicsCard && <div className="spec-item small"><strong>Graphics:</strong> {item.GraphicsCard}</div>}
                </div>

                <div className="product-actions d-flex gap-2">
                  {
                    cartProduct.find((items)=>items.id === item.id) ?
                    <button className="btn btn-outline-primary flex-fill" onClick={()=>setshowCartPanel(true)}>
                      <i className="fas fa-shopping-cart me-1"></i>View Cart
                    </button> :
                    <button className="btn btn-outline-primary flex-fill" onClick={()=>addCart(item)}>
                      <i className="fas fa-cart-plus me-1"></i>Add to Cart
                    </button>
                  }
                  <button className="btn btn-success flex-fill" onClick={() => { addCart(item); setShowOrderForm(true); }}>
                    <i className="fas fa-bolt me-1"></i>Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showTracking && (
          <div className="tracking-container mt-4 animate-fade-in" data-aos="fade-in">
            <div className="card shadow-lg border-0">
              <div className="card-header bg-gradient-primary text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0"><i className="fas fa-truck me-2 animate-bounce"></i>Live Order Tracking</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowTracking(false)}></button>
              </div>
              <div className="card-body">
                <div className="tracking-status mb-4 text-center">
                  <h6>Current Status: <span className="badge bg-success fs-6 animate-pulse">{trackingStatus}</span></h6>
                  <div className="progress mt-3" style={{height: '8px'}}>
                    <div 
                      className="progress-bar bg-success animate-progress" 
                      role="progressbar" 
                      style={{width: `${(trackingSteps.filter(s => s.completed).length / trackingSteps.length) * 100}%`}}
                      aria-valuenow={trackingSteps.filter(s => s.completed).length} 
                      aria-valuemin="0" 
                      aria-valuemax={trackingSteps.length}
                    ></div>
                  </div>
                </div>
                <div className="tracking-steps">
                  {trackingSteps.map((step, index) => (
                    <div key={index} className={`step-item d-flex align-items-center mb-4 ${step.completed ? 'completed animate-slide-in' : 'pending'}`}>
                      <div className={`step-circle me-3 ${step.completed ? 'bg-success animate-check' : 'bg-secondary'}`}>
                        {step.completed ? <i className="fas fa-check text-white"></i> : <i className="fas fa-clock text-white"></i>}
                      </div>
                      <div className="step-content flex-grow-1">
                        <h6 className={`mb-1 ${step.completed ? 'text-success fw-bold' : 'text-muted'}`}>{step.step}</h6>
                        {step.time && <small className="text-muted animate-fade-in">{step.time}</small>}
                      </div>
                      {index < trackingSteps.length - 1 && (
                        <div className={`step-connector ${step.completed ? 'completed' : ''}`}></div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="tracking-info mt-4 p-3 bg-light rounded animate-fade-in">
                  <h6><i className="fas fa-info-circle me-2"></i>Tracking Information</h6>
                  <p className="mb-1"><strong>Order ID:</strong> #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                  <p className="mb-1"><strong>Estimated Delivery:</strong> 3-5 business days</p>
                  <p className="mb-0"><strong>Updates:</strong> You will receive SMS and email notifications for each status change.</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {showCartPanel && (
        <div className="position-fixed top-0 end-0 bg-white border shadow p-3" style={{width: '300px', height: '100vh', zIndex: 1050, overflowY: 'auto'}}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Shopping Cart</h4>
            <button className="btn btn-close" onClick={() => setshowCartPanel(false)}></button>
          </div>
          {cartProduct.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cartProduct.map((item) => (
                <div key={item.id} className="d-flex align-items-center mb-3 border-bottom pb-2">
                  <img src={item.img} alt={item.ModelName} style={{width: '50px', height: '50px', objectFit: 'contain', marginRight: '10px'}} />
                  <div className="flex-grow-1">
                    <p className="mb-1 fw-bold">{item.ModelName}</p>
                    <p className="mb-1">{item.price}</p>
                    <p className="mb-1">Qty: {item.quantity}</p>
                  </div>
                  <button className="btn btn-sm btn-danger" onClick={() => RemoveCart(item)}>Remove</button>
                </div>
              ))}
              <div className="mt-3">
                <button className="btn btn-success w-100" onClick={() => setShowOrderForm(true)}>Place Order</button>
              </div>
            </>
          )}
        </div>
      )}

      {showOrderForm && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Place Your Order</h5>
                <button type="button" className="btn-close" onClick={() => setShowOrderForm(false)}></button>
              </div>
              <div className="modal-body">
                {isSubmitting && (
                  <div className="submission-tracking mb-4">
                    <h6 className="text-center mb-3">Processing Your Order...</h6>
                    <div className="progress mb-3">
                      <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style={{width: `${((submissionStep + 1) / submissionSteps.length) * 100}%`}}></div>
                    </div>
                    <div className="tracking-steps-small">
                      {submissionSteps.map((step, index) => (
                        <div key={index} className="step-item-small d-flex align-items-center mb-2">
                          <div className={`step-circle-small me-2 ${index <= submissionStep ? 'bg-success' : 'bg-secondary'}`}>
                            {index < submissionStep ? (
                              <i className="fas fa-check text-white"></i>
                            ) : index === submissionStep ? (
                              <i className="fas fa-spinner fa-spin text-white"></i>
                            ) : (
                              <i className="fas fa-clock text-white"></i>
                            )}
                          </div>
                          <span className={index <= submissionStep ? 'text-success' : 'text-muted'}>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <form>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" value={orderDetails.name} onChange={(e) => setOrderDetails({...orderDetails, name: e.target.value})} required />
                    {formErrors.name && <div className="text-danger">{formErrors.name}</div>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={orderDetails.email} onChange={(e) => setOrderDetails({...orderDetails, email: e.target.value})} required />
                    {formErrors.email && <div className="text-danger">{formErrors.email}</div>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input type="tel" className="form-control" value={orderDetails.phone} onChange={(e) => setOrderDetails({...orderDetails, phone: e.target.value})} required />
                    {formErrors.phone && <div className="text-danger">{formErrors.phone}</div>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <textarea className="form-control" rows="3" value={orderDetails.address} onChange={(e) => setOrderDetails({...orderDetails, address: e.target.value})} required></textarea>
                    {formErrors.address && <div className="text-danger">{formErrors.address}</div>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Payment Method</label>
                    <select className="form-select" value={orderDetails.paymentMethod} onChange={(e) => setOrderDetails({...orderDetails, paymentMethod: e.target.value})} required>
                      <option value="online">Online Payment</option>
                      <option value="cod">Cash on Delivery</option>
                    </select>
                  </div>
                  {orderDetails.paymentMethod === 'online' && paymentSectionVisible && (
                    <div className="payment-section">
                      <h6>Online Payment Details</h6>
                      <p className="text-muted">Choose either Card Payment or UPI Payment</p>
                      
                      <div className="mb-3">
                        <label className="form-label">Card Number (Optional)</label>
                        <input type="text" className="form-control" placeholder="1234 5678 9012 3456" value={orderDetails.cardNumber} onChange={(e) => setOrderDetails({...orderDetails, cardNumber: e.target.value})} />
                        {formErrors.cardNumber && <div className="text-danger">{formErrors.cardNumber}</div>}
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Expiry Date (Optional)</label>
                          <input type="text" className="form-control" placeholder="MM/YY" value={orderDetails.expiryDate} onChange={(e) => setOrderDetails({...orderDetails, expiryDate: e.target.value})} />
                          {formErrors.expiryDate && <div className="text-danger">{formErrors.expiryDate}</div>}
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">CVV (Optional)</label>
                          <input type="text" className="form-control" placeholder="123" value={orderDetails.cvv} onChange={(e) => setOrderDetails({...orderDetails, cvv: e.target.value})} />
                          {formErrors.cvv && <div className="text-danger">{formErrors.cvv}</div>}
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <label className="form-label">OR UPI ID (Optional)</label>
                        <input type="text" className="form-control" placeholder="user@paytm" value={orderDetails.upiId} onChange={(e) => setOrderDetails({...orderDetails, upiId: e.target.value})} />
                        {formErrors.upiId && <div className="text-danger">{formErrors.upiId}</div>}
                      </div>
                    </div>
                  )}
                </form>
                <h6>Order Summary:</h6>
                <ul>
                  {cartProduct.map((item) => (
                    <li key={item.id}>{item.ModelName} - {item.price} (Qty: {item.quantity})</li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowOrderForm(false)}>Cancel</button>
                <button type="button" className={`btn btn-success ${isSubmitting ? 'submitting' : ''}`} onClick={handleOrderSubmit} disabled={isSubmitting}>
                  {isSubmitting ? 'Processing...' : 'Submit Order'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Chat />

    </>
  );
};

export default About;








