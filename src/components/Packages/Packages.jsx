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
      name: "Serenity Glow Facial Package",
      price: "$195",
      duration: "3 sessions",
      description: "Experience the ultimate facial rejuvenation with our signature Serenity Glow treatment.",
      features: [
        "3 Serenity Glow Facial Sessions",
        "LED Mask Session",
        "Facial Massage",
        "Deep Cleansing Treatment"
      ]
    },
    {
      name: "Facial & Massage Combo",
      price: "$160",
      duration: "90 minutes",
      description: "Perfect combination of facial care and full body relaxation in one session.",
      features: [
        "Serenity Glow Facial",
        "60-Minute Full Body Massage",
        "LED Light Therapy",
        "Aromatherapy Session"
      ],
      featured: true
    },
    {
      name: "Wellness Deep Cleansing",
      price: "$290",
      duration: "3 sessions",
      description: "Deep cleansing and purifying treatment package for comprehensive skin renewal.",
      features: [
        "3 Deep Cleansing Facial Sessions",
        "Extraction Treatment",
        "LED Mask Therapy",
        "Customized Skin Analysis"
      ]
    },
    {
      name: "Wellness Dermabrasion",
      price: "$315",
      duration: "3 sessions",
      description: "Advanced exfoliation treatment for smoother, more radiant skin.",
      features: [
        "3 Dermabrasion Sessions",
        "Microdermabrasion Treatment",
        "Skin Texture Refinement",
        "Post-Treatment Care Kit"
      ]
    },
    {
      name: "Lipotropic Injections - 5 Pack",
      price: "$225",
      duration: "5 sessions",
      description: "Boost your metabolism and energy levels with our lipotropic injection package.",
      features: [
        "5 Lipotropic Injections",
        "Metabolism Boost",
        "Energy Enhancement",
        "Weight Management Support"
      ]
    },
    {
      name: "Lymphatic Treatments - 6 Pack",
      price: "$450",
      duration: "6 sessions",
      description: "Promote detoxification and reduce swelling with specialized lymphatic drainage.",
      features: [
        "6 Lymphatic Drainage Sessions",
        "Reduces Swelling & Bloating",
        "Improves Circulation",
        "Detoxification Support"
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
              <button className="package-button" onClick={handleBookNow}>Book Now</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
