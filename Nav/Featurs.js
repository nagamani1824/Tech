import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Featurs.css';
import Chat from './Chat';

const Featurs = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  const technologies = [
    {
      id: 1,
      category: 'laptops',
      title: 'Premium Laptops',
      description: 'Industry-leading laptops with cutting-edge performance, stunning displays, and innovative design for professionals and creators.',
      icon: '💻',
      features: ['Intel Core i9 Processors', '4K OLED Displays', '32GB RAM', '1TB SSD Storage'],
      color: '#FF6B6B'
    },
    {
      id: 2,
      category: 'workstations',
      title: 'High-Performance Workstations',
      description: 'Powerful workstations designed for demanding tasks like 3D modeling, video editing, and scientific computing.',
      icon: '🖥️',
      features: ['NVIDIA RTX GPUs', 'Intel Xeon Processors', 'ECC Memory', 'Professional Graphics'],
      color: '#4ECDC4'
    },
    {
      id: 3,
      category: 'tablets',
      title: 'Smart Tablets',
      description: 'Versatile tablets combining the power of laptops with the portability of traditional tablets for modern productivity.',
      icon: '📱',
      features: ['Detachable Keyboard', 'Active Pen Support', 'All-Day Battery', 'Thunderbolt Ports'],
      color: '#45B7D1'
    },
    {
      id: 4,
      category: 'servers',
      title: 'Enterprise Servers',
      description: 'Scalable, reliable server solutions powering businesses with advanced computing infrastructure and cloud capabilities.',
      icon: '🖧',
      features: ['High Availability', 'Scalable Architecture', 'Advanced Security', 'Cloud Integration'],
      color: '#96CEB4'
    },
    {
      id: 5,
      category: 'ai',
      title: 'AI-Powered Solutions',
      description: 'Intelligent systems leveraging AI and machine learning to optimize performance and enhance user experiences.',
      icon: '🤖',
      features: ['Smart Performance Tuning', 'Predictive Maintenance', 'Voice Assistants', 'Intelligent Cooling'],
      color: '#FFEAA7'
    },
    {
      id: 6,
      category: 'gaming',
      title: 'Gaming Excellence',
      description: 'High-performance gaming laptops and desktops designed for immersive gaming experiences and content creation.',
      icon: '🎮',
      features: ['NVIDIA GeForce RTX', 'High-Refresh Displays', 'RGB Lighting', 'Advanced Cooling'],
      color: '#DDA0DD'
    },
    {
      id: 7,
      category: 'sustainability',
      title: 'Sustainable Technology',
      description: 'Eco-friendly computing solutions with recycled materials, energy-efficient designs, and carbon-neutral initiatives.',
      icon: '🌱',
      features: ['Recycled Materials', 'Energy Star Certified', 'Carbon Neutral', 'Extended Lifecycle'],
      color: '#98D8C8'
    },
    {
      id: 8,
      category: 'accessories',
      title: 'Premium Accessories',
      description: 'High-quality peripherals and accessories designed to enhance productivity and complement Tech devices.',
      icon: '🎧',
      features: ['Wireless Charging', 'Premium Audio', 'Ergonomic Design', 'Smart Connectivity'],
      color: '#F7DC6F'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: '🌟' },
    { id: 'laptops', name: 'Laptops', icon: '💻' },
    { id: 'workstations', name: 'Workstations', icon: '🖥️' },
    { id: 'tablets', name: 'Tablets', icon: '📱' },
    { id: 'servers', name: 'Servers', icon: '🖧' },
    { id: 'ai', name: 'AI Solutions', icon: '🤖' },
    { id: 'gaming', name: 'Gaming', icon: '🎮' },
    { id: 'sustainability', name: 'Sustainable Tech', icon: '🌱' },
    { id: 'accessories', name: 'Accessories', icon: '🎧' }
  ];

  const filteredTechnologies = activeCategory === 'all'
    ? technologies
    : technologies.filter(tech => tech.category === activeCategory);

  return (
    <>
      {/* Hero Section */}
      <section className="tech-hero" data-aos="fade-up">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">Tech Innovation</h1>
            <p className="hero-subtitle">
              Discover cutting-edge technology solutions that empower your digital transformation journey
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">77K+</span>
                <span className="stat-label">Employees Worldwide</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">180+</span>
                <span className="stat-label">Countries Served</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">$62B</span>
                <span className="stat-label">Annual Revenue</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="category-filter" data-aos="fade-up">
        <div className="container">
          <h2 className="section-title">Tech Product Portfolio</h2>
          <div className="filter-buttons">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="filter-icon">{category.icon}</span>
                <span className="filter-text">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Grid */}
      <section className="technology-grid" data-aos="fade-up">
        <div className="container">
          <div className="tech-cards">
            {filteredTechnologies.map((tech, index) => (
              <div
                key={tech.id}
                className="tech-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                style={{ '--accent-color': tech.color }}
              >
                <div className="tech-header">
                  <div className="tech-icon" style={{ backgroundColor: tech.color }}>
                    {tech.icon}
                  </div>
                  <h3 className="tech-title">{tech.title}</h3>
                </div>
                <p className="tech-description">{tech.description}</p>
                <div className="tech-features">
                  {tech.features.map((feature, idx) => (
                    <span key={idx} className="feature-tag">
                      {feature}
                    </span>
                  ))}
                </div>
                <button className="learn-more-btn">
                  Learn More
                  <span className="btn-arrow">→</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Stats */}
      <section className="innovation-stats" data-aos="fade-up">
        <div className="container">
          <h2 className="section-title">Tech's Global Impact</h2>
          <div className="stats-grid">
            <div className="stat-card" data-aos="fade-up" data-aos-delay="100">
              <div className="stat-icon">🏆</div>
              <div className="stat-number">#1</div>
              <div className="stat-label">PC Market Leader</div>
            </div>
            <div className="stat-card" data-aos="fade-up" data-aos-delay="200">
              <div className="stat-icon">🌍</div>
              <div className="stat-number">15M+</div>
              <div className="stat-label">People Impacted by 2025</div>
            </div>
            <div className="stat-card" data-aos="fade-up" data-aos-delay="300">
              <div className="stat-icon">🔬</div>
              <div className="stat-number">1000+</div>
              <div className="stat-label">Patents Filed Annually</div>
            </div>
            <div className="stat-card" data-aos="fade-up" data-aos-delay="400">
              <div className="stat-icon">💚</div>
              <div className="stat-number">Net-Zero</div>
              <div className="stat-label">Carbon Goals Validated</div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="future-vision" data-aos="fade-up">
        <div className="container">
          <div className="vision-content">
            <h2 className="section-title">Tech's Mission</h2>
            <p className="vision-text">
              At Tech, we believe in the power of technology to transform lives and create a better future.
              Our commitment to innovation, sustainability, and social responsibility drives everything we do,
              from developing cutting-edge devices to building intelligent solutions that make a real difference.
            </p>
            <div className="vision-points">
              <div className="vision-point" data-aos="fade-right">
                <h4>Smarter Technology for All</h4>
                <p>Making advanced computing accessible to everyone, everywhere, empowering individuals and organizations to achieve more.</p>
              </div>
              <div className="vision-point" data-aos="fade-up">
                <h4>Sustainable Innovation</h4>
                <p>Leading the industry in environmental responsibility with carbon-neutral goals and eco-friendly product design.</p>
              </div>
              <div className="vision-point" data-aos="fade-left">
                <h4>Intelligent Transformation</h4>
                <p>Advancing New IT technologies including AI, cloud, edge computing, and intelligent devices to shape the future.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Chat />
    </>
  );
};

export default Featurs;