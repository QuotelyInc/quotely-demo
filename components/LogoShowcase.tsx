'use client'

export default function LogoShowcase() {
  const logos = [
    { src: '/images/quotely-logos/logo-variant-39.jpg', alt: 'Quotely Design 1' },
    { src: '/images/quotely-logos/logo-variant-42.jpg', alt: 'Quotely Design 2' },
    { src: '/images/quotely-logos/logo-variant-43.jpg', alt: 'Quotely Design 3' },
    { src: '/images/quotely-logos/logo-variant-44.jpg', alt: 'Quotely Design 4' },
    { src: '/images/quotely-logos/logo-variant-45.jpg', alt: 'Quotely Design 5' },
    { src: '/images/quotely-logos/logo-variant-46.jpg', alt: 'Quotely Design 6' },
  ];

  return (
    <>
      <style jsx>{`
        .logo-showcase {
          padding: 4rem 2rem;
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
          text-align: center;
        }

        .showcase-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .showcase-title {
          font-size: 1.5rem;
          color: #1a1a1a;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .showcase-subtitle {
          color: #666;
          margin-bottom: 3rem;
          font-size: 1rem;
        }

        .logo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 2rem;
          align-items: center;
          justify-items: center;
        }

        .logo-item {
          padding: 1.5rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100px;
        }

        .logo-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }

        .logo-item img {
          max-width: 120px;
          height: auto;
          object-fit: contain;
        }

        @media (max-width: 768px) {
          .logo-grid {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 1rem;
          }

          .logo-item {
            padding: 1rem;
          }

          .logo-item img {
            max-width: 80px;
          }
        }
      `}</style>

      <section className="logo-showcase">
        <div className="showcase-container">
          <h2 className="showcase-title">Powered by Quotely</h2>
          <p className="showcase-subtitle">
            Modern insurance technology trusted by leading agencies
          </p>
          
          <div className="logo-grid">
            {logos.map((logo, index) => (
              <div key={index} className="logo-item">
                <img src={logo.src} alt={logo.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}