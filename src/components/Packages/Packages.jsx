"use client";
import "./Packages.css";
import { useRouter } from "next/navigation";
import Copy from "../Copy/Copy";

const Packages = () => {
  const router = useRouter();

  const handleBookNow = () => {
    router.push("/connect");
  };

  const packages = [
    {
      name: "Serenity Glow Facial",
      price: "$195",
      duration: "3 sessions",
      description: "Ultimate facial rejuvenation with our signature treatment.",
      image: "/packages/1.jpg",
      features: [
        "3 Facial Sessions",
        "LED Mask Therapy",
        "Facial Massage",
        "Deep Cleansing"
      ]
    },
    {
      name: "Facial & Massage Combo",
      price: "$160",
      duration: "90 minutes",
      description: "Perfect blend of facial care and full body relaxation.",
      image: "/packages/2.jpg",
      features: [
        "Serenity Glow Facial",
        "60-Min Body Massage",
        "LED Therapy",
        "Aromatherapy"
      ],
      featured: true
    },
    {
      name: "Wellness Deep Cleansing",
      price: "$290",
      duration: "3 sessions",
      description: "Deep purifying treatment for comprehensive skin renewal.",
      image: "/packages/3.jpg",
      features: [
        "3 Deep Cleansing Sessions",
        "Extraction Treatment",
        "LED Mask Therapy",
        "Skin Analysis"
      ]
    },
    {
      name: "Wellness Dermabrasion",
      price: "$315",
      duration: "3 sessions",
      description: "Advanced exfoliation for smoother, radiant skin.",
      image: "/packages/4.jpg",
      features: [
        "3 Dermabrasion Sessions",
        "Microdermabrasion",
        "Texture Refinement",
        "Treatment Care Kit"
      ]
    },
    {
      name: "Lipotropic Injections",
      price: "$225",
      duration: "5 sessions",
      description: "Boost metabolism and energy levels naturally.",
      image: "/packages/5.jpg",
      features: [
        "5 Injections",
        "Metabolism Boost",
        "Energy Enhancement",
        "Weight Management"
      ]
    },
    {
      name: "Lymphatic Treatments",
      price: "$450",
      duration: "6 sessions",
      description: "Promote detoxification and reduce swelling.",
      image: "/packages/6.jpg",
      features: [
        "6 Drainage Sessions",
        "Reduces Bloating",
        "Improves Circulation",
        "Detox Support"
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
              {pkg.image && (
                <div className="package-image">
                  <img src={pkg.image} alt={pkg.name} />
                </div>
              )}
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
              <button className="package-button" onClick={handleBookNow}>Book Now</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
