"use client";
import "./Packages.css";
import Copy from "../Copy/Copy";

const Packages = () => {
  const packages = [
    {
      name: "Essential Glow",
      price: "$150",
      duration: "90 minutes",
      description: "Perfect for first-time visitors looking to experience our signature treatments.",
      features: [
        "Deep Cleaning Facial",
        "LED Mask Session",
        "Facial Massage",
        "Complimentary Consultation"
      ]
    },
    {
      name: "Complete Renewal",
      price: "$280",
      duration: "2.5 hours",
      description: "Our most popular package combining multiple treatments for total rejuvenation.",
      features: [
        "Hydration Glow Facial",
        "HidroLips Treatment",
        "Full Body Massage",
        "LED Light Therapy",
        "Aromatherapy Session"
      ],
      featured: true
    },
    {
      name: "Ultimate Luxury",
      price: "$450",
      duration: "4 hours",
      description: "The complete spa experience with all our premium treatments.",
      features: [
        "Chemical Peel",
        "Collagen Threads",
        "Full Body Massage",
        "HidroLips Treatment",
        "Manicure & Pedicure",
        "Complimentary Glass of Champagne"
      ]
    }
  ];

  return (
    <section className="packages">
      <div className="container">
        <div className="packages-header">
          <Copy delay={0.1}>
            <p className="packages-callout">Our Packages</p>
          </Copy>
          <Copy delay={0.15}>
            <h2>Curated Wellness Experiences</h2>
          </Copy>
          <Copy delay={0.2}>
            <p className="packages-description">
              Choose from our specially designed packages, each crafted to provide you with the ultimate relaxation and rejuvenation experience.
            </p>
          </Copy>
        </div>

        <div className="packages-grid">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`package-card ${pkg.featured ? 'featured' : ''}`}
            >
              {pkg.featured && <div className="featured-badge">Most Popular</div>}
              <div className="package-header">
                <h3>{pkg.name}</h3>
                <div className="package-price">
                  <span className="price">{pkg.price}</span>
                  <span className="duration">{pkg.duration}</span>
                </div>
              </div>
              <p className="package-description">{pkg.description}</p>
              <div className="package-features">
                <p className="features-title">Includes:</p>
                <ul>
                  {pkg.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
              <button className="package-button">Book Now</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
