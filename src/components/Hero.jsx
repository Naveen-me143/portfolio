import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle image loading
  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = (e) => {
    console.error('Image failed to load:', e.target.src);
    setImageError(true);
    setImageLoaded(false);
    
    // Fallback to the SVG placeholder
    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='350' height='350' viewBox='0 0 350 350'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23000000;stop-opacity:1' /%3E%3Cstop offset='25%25' style='stop-color:%233b82f6;stop-opacity:1' /%3E%3Cstop offset='50%25' style='stop-color:%238b5cf6;stop-opacity:1' /%3E%3Cstop offset='75%25' style='stop-color:%2306b6d4;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23000000;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='350' height='350' fill='url(%23grad)'/%3E%3Ccircle cx='175' cy='130' r='50' fill='rgba(255,255,255,0.9)'/%3E%3Cpath d='M175 140 Q185 145 175 155 Q165 145 175 140' fill='%23333'/%3E%3Ccircle cx='165' cy='125' r='3' fill='%23333'/%3E%3Ccircle cx='185' cy='125' r='3' fill='%23333'/%3E%3Cpath d='M125 220 Q175 200 225 220 Q225 280 175 290 Q125 280 125 220' fill='rgba(255,255,255,0.8)'/%3E%3Ctext x='50%25' y='85%25' font-size='14' text-anchor='middle' dy='.3em' fill='rgba(255,255,255,0.8)'%3EDasari Naveen%3C/text%3E%3C/svg%3E";
  };

  // Multiple image path options to try
  const imagePaths = [
    '/images/men.avif',           // For deployed version (public folder)
    './images/men.avif',          // Original path
    '/assets/images/men.avif',    // Alternative assets folder
    'images/men.avif',            // Without leading dot/slash
    '/public/images/men.avif',    // Alternative public path
  ];

  const FloatingElement = ({ delay, size, color, position }) => (
    <div
      className="floating-element"
      style={{
        animationDelay: `${delay}s`,
        width: `${size}px`,
        height: `${size}px`,
        background: `radial-gradient(circle, ${color}, transparent)`,
        ...position,
      }}
    />
  );

  return (
    <section className="hero-section">
      {/* Enhanced Floating Background Elements */}
      <FloatingElement 
        delay={0} 
        size={80} 
        color="rgba(59, 130, 246, 0.15)" 
        position={{ top: '8%', left: '8%' }} 
      />
      <FloatingElement 
        delay={1.5} 
        size={60} 
        color="rgba(139, 92, 246, 0.12)" 
        position={{ top: '75%', left: '12%' }} 
      />
      <FloatingElement 
        delay={2.5} 
        size={100} 
        color="rgba(6, 182, 212, 0.1)" 
        position={{ top: '15%', right: '8%' }} 
      />
      <FloatingElement 
        delay={0.8} 
        size={45} 
        color="rgba(236, 72, 153, 0.13)" 
        position={{ bottom: '15%', right: '15%' }} 
      />
      <FloatingElement 
        delay={3} 
        size={35} 
        color="rgba(245, 158, 11, 0.11)" 
        position={{ top: '50%', left: '5%' }} 
      />
      <FloatingElement 
        delay={2} 
        size={55} 
        color="rgba(16, 185, 129, 0.09)" 
        position={{ top: '40%', right: '5%' }} 
      />

      <div className="hero-container">
        {/* Left Section */}
        <div
          className="hero-left-section"
          style={{
            transform: `translateX(${isVisible ? 0 : -100}px)`,
            opacity: isVisible ? 1 : 0,
          }}
        >
          <h1 className="glitch-text hero-heading">
            <span className="hero-text-reveal">Hi, I'm</span>{" "}
            <span className="gradient-text hero-name-highlight">
              Dasari Naveen
            </span>
          </h1>

          <p className="typewriter hero-subtitle">Full Stack Developer</p>

          <p className="hero-description">
            Passionate about crafting exceptional digital experiences with cutting-edge technologies and innovative solutions.
          </p>

          <ul className="hero-bullet-list">
            {[
              "Expert in React, Node.js, and modern web architectures for scalable applications.",
              "Specializing in responsive UI/UX design with attention to user experience.",
              "Proficient in state management with Redux, Context API, and modern patterns.",
              "Database design expertise with SQL, NoSQL, and cloud-based solutions.",
              "Strong algorithmic thinking and problem-solving capabilities.",
            ].map((point, index) => (
              <li
                key={index}
                className="slide-in-left hero-bullet-item"
                style={{
                  animationDelay: `${1 + index * 0.2}s`,
                }}
              >
                <span className="pulse-icon hero-bullet-icon">💻</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section - Enhanced 3D Image */}
        <div className="hero-right-section">
          <div
            className="hero-image-3d hero-image-wrapper"
            style={{
              transform: `
                perspective(1000px) 
                rotateX(${mousePosition.y * 8}deg) 
                rotateY(${mousePosition.x * 8}deg)
                translateZ(${isVisible ? 0 : 200}px)
              `,
              opacity: isVisible ? 1 : 0,
            }}
          >
            <div className="floating-container hero-image-container">
              {/* Loading indicator */}
              {!imageLoaded && !imageError && (
                <div className="image-loading-placeholder" style={{
                  width: '350px',
                  height: '350px',
                  background: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: 'pulse 2s infinite',
                }}>
                  <span style={{ fontSize: '18px', color: '#666' }}>Loading...</span>
                </div>
              )}

              {/* Main Image with multiple fallback sources */}
              <picture>
                <source srcSet="/images/men.avif" type="image/avif" />
                <source srcSet="/images/men.webp" type="image/webp" />
                <source srcSet="/images/men.jpg" type="image/jpeg" />
                <img
                  src="/images/men.avif"
                  alt="Dasari Naveen - Full Stack Developer"
                  className="hero-profile-image hero-profile-image-3d"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  style={{
                    display: imageLoaded || imageError ? 'block' : 'none'
                  }}
                />
              </picture>
              
              {/* Enhanced Rotating Rings */}
              <div className="hero-ring-1 rotating-ring" />
              <div className="hero-ring-2 rotating-ring-reverse" />
              <div className="hero-ring-3 rotating-ring" />
              
              {/* Enhanced Floating Particles */}
              <div className="hero-particle-1 floating-particle" />
              <div className="hero-particle-2 floating-particle" />
              <div className="hero-particle-3 floating-particle" />
              <div className="hero-particle-4 floating-particle" />
            </div>
            
            {/* Enhanced 3D Shadow */}
            <div className="hero-shadow-3d" />
          </div>

          {/* Debug info (remove in production) */}
          {process.env.NODE_ENV === 'development' && (
            <div style={{ 
              position: 'absolute', 
              bottom: '-50px', 
              left: '0', 
              fontSize: '12px', 
              color: '#666',
              background: 'rgba(0,0,0,0.1)',
              padding: '5px',
              borderRadius: '3px'
            }}>
              Image Status: {imageLoaded ? 'Loaded ✅' : imageError ? 'Error ❌' : 'Loading...'}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;