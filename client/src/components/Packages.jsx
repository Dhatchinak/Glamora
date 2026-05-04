import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Packages.css';

const PACKAGES = [
  {
    badge: 'Most Popular',
    name: 'Signature Glow',
    desc: 'Our signature full-service experience — hair, skin, and finish for the modern woman.',
    price: '₹2,800',
    features: ['Luxury hair wash & blow-dry','Hydrating facial treatment','Brow shaping & tinting','Signature makeup finish','Complimentary scalp massage'],
    featured: true,
  },
  {
    badge: 'Bridal',
    name: 'Eternal Beauty',
    desc: 'Complete bridal package with pre-wedding consultation, trials, and day-of perfection.',
    price: '₹8,500',
    features: ['Bridal makeup (HD)',  'Saree/lehenga draping', 'Hair styling & extensions','Mehndi design consultation','Touch-up kit included','Pre-bridal skin prep'],
    featured: false,
  },
  {
    badge: 'Essential',
    name: 'Pure Refresh',
    desc: 'The perfect pick-me-up for busy women — in and out glowing in under 90 minutes.',
    price: '₹1,200',
    features: ['Express facial (30 min)','Hair trim & style','Nail polish refresh','Lip treatment'],
    featured: false,
  },
  {
    badge: 'VIP',
    name: 'Royale Experience',
    desc: 'Our most exclusive offering. Private suite, champagne, and the full Glamora treatment.',
    price: '₹14,000',
    features: ['Private suite booking', 'Full-day pampering (6hr)', 'Head-to-toe treatment', 'Personal stylist consultation','Luxury gift hamper','Priority scheduling for 3 months'],
    featured: false,
  },
];

export default function Packages() {
  const navigate = useNavigate();
  return (
    <section className="section section-alt" id="packages">
      <div className="container">
        <div className="section-header">
          <motion.span className="section-label" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}}>
            Our Offerings
          </motion.span>
          <motion.h2 className="section-title" initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7,delay:0.1}}>
            Curated <em>Packages</em>
          </motion.h2>
          <div className="divider" />
        </div>

        <div className="packages-grid">
          {PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              className={`pkg-card ${pkg.featured ? 'featured' : ''}`}
              initial={{ opacity:0, y:40 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.7, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
            >
              <span className="pkg-badge">{pkg.badge}</span>
              <h3 className="pkg-name">{pkg.name}</h3>
              <p className="pkg-desc">{pkg.desc}</p>
              <div className="pkg-price">{pkg.price} <span>/ session</span></div>
              <ul className="pkg-features">
                {pkg.features.map(f => <li key={f}>{f}</li>)}
              </ul>
              <button className="btn-primary" onClick={() => navigate('/booking')} style={{width:'100%',justifyContent:'center'}}>
                Book Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
