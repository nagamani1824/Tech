import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Nav from './Nav';
import Contact from './Nav/Contact';
import Home from './Nav/Home';
import About from './Nav/About';
import Featurs from './Nav/Featurs';
import Foot from './Compontent/Foot';
import Admin from './Nav/Admin'; 
import AddItem from './Nav/AddItem';
import DashLap from './admin/DashLap';
import Uploadlap from './admin/Uploadlap';
import Editlap from './admin/Editlap';
import Mondash from './admin/Mondash';
import Monupload from './admin/Monupload';
import Monedit from './admin/Monedit';
import Tapdash from './admin/Tapdash';
import Tapupload from './admin/Tapupload';
import Tapedit from './admin/Tapedit';
import Accdash from './admin/Accdash';
import Accupload from './admin/Accupload';
import Accedit from './admin/Accedit';
import Gamedash from './admin/Gamedash';
import Gameupload from './admin/Gameupload';
import Gameedit from './admin/Gameedit';
import Bussdash from './admin/Bussdash';
import Bussupload from './admin/Bussupload';
import Bussedit from './admin/Bussedit';
import Dashboard from './admin/Dashboard';



const RouterContent = () => {
  const location = useLocation();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // trigger animation briefly on location change
    setAnimate(true);
    const t = setTimeout(() => setAnimate(false), 350);
    return () => clearTimeout(t);
  }, [location]);

  return (
    <div className={`page ${animate ? 'page-animate' : ''}`}>
      <Nav />

      {/* <Round1 /> */}


      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ab" element={<About />} />
        <Route path="/call" element={<Contact />} />
        <Route path="/f" element={<Featurs />} />
        <Route path="/Ad" element={<Admin />} />
        <Route path="/add-item" element={<Admin />} />
        <Route path="/add/item" element={<AddItem />} /> 
        <Route path="/lapdash" element={<DashLap/>} />
        <Route path='/uploadlap' element={<Uploadlap/>}/>
        <Route path='/editlap/:id' element={<Editlap/>} loader={({params})=>fetch(`http://localhost:4000/lapdash/${params.id}`)}/>
        <Route path='/monitors' element={<Mondash/>}/>
        <Route path='/monupload' element={<Monupload/>}/>
        <Route path='/monedit/:id' element={<Monedit/>} loader={({params})=>fetch(`http://localhost:4000/mobile/${params.id}`)}/>
        <Route path='/tablets' element={<Tapdash/>}/>
        <Route path='/tapupload' element={<Tapupload/>}/>
        <Route path='/tapedit/:id' element={<Tapedit/>} loader={({params})=>fetch(`http://localhost:4000/tablet/${params.id}`)}/>
        <Route path='/accessories' element={<Accdash/>}/>                                                               
        <Route path='/accupload' element={<Accupload/>}/>
        <Route path='/accedit/:id' element={<Accedit/>} loader={({params})=>fetch(`http://localhost:4000/accessories/${params.id}`)}/>
        <Route path='/gaming' element={<Gamedash/>}/>
        <Route path='/gameupload' element={<Gameupload/>}/>
        <Route path='/gameedit/:id' element={<Gameedit/>} />
        <Route path='/business' element={<Bussdash/>}  loader={({params})=>fetch(`http://localhost:4000/gaming/${params.id}`)} />
        <Route path='/bussupload' element={<Bussupload/>}/>
        <Route path='/bussedit/:id' element={<Bussedit/>}  loader={({params})=>fetch(`http://localhost:4000/business/${params.id}`)}  />
        <Route path='/dash' element={<Dashboard/>}/>
      </Routes>
      <Foot />
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <RouterContent />
    </BrowserRouter>
  );
};

export default App;
