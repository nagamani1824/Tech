import React, { useEffect, useState } from 'react';
import './Contact.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Chat from './Chat';

const services = [
  {
    title: 'Device as a Service (DaaS)',
    description: 'Flexible subscription model for hardware, software, and services with predictable costs.',
    icon: '💻',
    features: ['Monthly subscriptions', 'Automatic updates', '24/7 support', 'Flexible scaling'],
    color: '#FF6B6B'
  },
  {
    title: 'Managed Services',
    description: 'Comprehensive IT management solutions to optimize performance and reduce costs.',
    icon: '⚙️',
    features: ['Infrastructure monitoring', 'Security management', 'Backup & recovery', 'Performance optimization'],
    color: '#4ECDC4'
  },
  {
    title: 'Consulting & Deployment',
    description: 'Expert guidance and seamless implementation of Tech solutions for your business.',
    icon: '🎯',
    features: ['Solution architecture', 'Project management', 'Training & enablement', 'Change management'],
    color: '#45B7D1'
  },
  {
    title: 'Support & Warranty',
    description: 'Round-the-clock technical support and comprehensive warranty coverage for peace of mind.',
    icon: '🛠️',
    features: ['24/7 technical support', 'On-site service', 'Extended warranties', 'Accidental damage protection'],
    color: '#96CEB4'
  },
  {
    title: 'Security Solutions',
    description: 'Advanced cybersecurity services to protect your business from evolving threats.',
    icon: '🔒',
    features: ['Endpoint protection', 'Data encryption', 'Threat intelligence', 'Compliance management'],
    color: '#FFEAA7'
  },
  {
    title: 'Cloud & Hybrid Solutions',
    description: 'Seamless integration of cloud services with on-premises infrastructure.',
    icon: '☁️',
    features: ['Cloud migration', 'Hybrid infrastructure', 'Multi-cloud management', 'Edge computing'],
    color: '#DDA0DD'
  },
  {
    title: 'Data Center Solutions',
    description: 'High-performance computing infrastructure for mission-critical applications.',
    icon: '🏗️',
    features: ['High-density servers', 'Liquid cooling', 'Energy efficiency', 'Scalable storage'],
    color: '#98D8C8'
  },
  {
    title: 'AI & Analytics Services',
    description: 'Intelligent solutions powered by AI and machine learning for business insights.',
    icon: '🤖',
    features: ['Predictive analytics', 'AI consulting', 'Machine learning models', 'Data visualization'],
    color: '#F7DC6F'
  }
];

const serviceCategories = [
  { id: 'all', name: 'All Services', icon: '🌟' },
  { id: 'managed', name: 'Managed Services', icon: '⚙️' },
  { id: 'consulting', name: 'Consulting', icon: '🎯' },
  { id: 'support', name: 'Support', icon: '🛠️' },
  { id: 'security', name: 'Security', icon: '🔒' },
  { id: 'cloud', name: 'Cloud Solutions', icon: '☁️' },
  { id: 'datacenter', name: 'Data Center', icon: '🏗️' },
  { id: 'ai', name: 'AI & Analytics', icon: '🤖' }
];

const Contact = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
    AOS.refresh();
  }, []);

  const filteredServices = activeCategory === 'all'
    ? services
    : services.filter(service => {
        switch(activeCategory) {
          case 'managed': return service.title.includes('Managed');
          case 'consulting': return service.title.includes('Consulting') || service.title.includes('Deployment');
          case 'support': return service.title.includes('Support') || service.title.includes('Warranty');
          case 'security': return service.title.includes('Security');
          case 'cloud': return service.title.includes('Cloud') || service.title.includes('Hybrid');
          case 'datacenter': return service.title.includes('Data Center');
          case 'ai': return service.title.includes('AI') || service.title.includes('Analytics');
          default: return true;
        }
      });

  return (
    <>
      <div className="services-hero" data-aos="fade-up">
        <div className="hero-content">
          <h1 className="hero-title">Tech Services</h1>
          <p className="hero-subtitle">Comprehensive solutions to accelerate your digital transformation</p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">500K+</span>
              <span className="stat-label">Devices Managed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support Available</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">150+</span>
              <span className="stat-label">Countries Served</span>
            </div>
          </div>
        </div>
      </div>

      <div className="services-section">
        <div className="container">
          <div className="services-header" data-aos="fade-up">
            <h2>Our Service Portfolio</h2>
            <p>Choose from our comprehensive range of enterprise-grade services</p>
          </div>

          <div className="service-categories" data-aos="fade-up" data-aos-delay="100">
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>

          <div className="services-grid">
            {filteredServices.map((service, index) => (
              <div
                className="service-card"
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 50}
                style={{ '--accent-color': service.color }}
              >
                <div className="service-icon" style={{ backgroundColor: service.color }}>
                  {service.icon}
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>
                      <span className="feature-dot"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="learn-more-btn">
                  Learn More
                  <span className="arrow">→</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="cta-section" data-aos="fade-up">
        <div className="container">
          <h2>Ready to Transform Your Business?</h2>
          <p>Contact our experts to discuss your specific requirements</p>
          <div className="cta-buttons">
            <button className="btn btn-primary">Get Started</button>
            <button className="btn btn-outline">Contact Sales</button>
          </div>
        </div>
      </div>

      <Chat/>
    </>
  );
};

export default Contact;