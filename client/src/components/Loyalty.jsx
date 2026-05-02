import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Loyalty.css';

const TIERS = [
  {
    icon: '🥉', name: 'Pearl', pts: '0 – 999 pts', color: '#cd7f32',
    perks: ['5% off every visit', 'Birthday gift hamper', 'Early booking access', 'Welcome goodie bag'],
  },
  {
    icon: '🥈', name: 'Silver', pts: '1000 – 1999 pts', color: '#b0b0b0',
    perks: ['8% off all services', 'Free scalp massage (monthly)', 'Priority slot booking', 'Exclusive member events'],
  },
  {
    icon: '🏆', name: 'Gold', pts: '2000 – 3499 pts', color: '#c9a84c',
    perks: ['12% off all services', 'Free hair treatment (quarterly)', 'Personal stylist allocation', 'VIP lounge access', 'Seasonal gift hamper'],
    featured: true,
  },
  {
    icon: '💎', name: 'Platinum', pts: '3500 – 4999 pts', color: '#8eb4cb',
    perks: ['16% off everything', 'Monthly signature facial', 'Free makeup session (bi-monthly)', 'Private suite access', 'Complimentary luxury hamper', 'Dedicated beauty concierge'],
  },
  {
    icon: '👑', name: 'Diamond', pts: '5000+ pts', color: '#e8c97a',
    perks: ['20% off everything', 'Full-day pampering (quarterly)', 'Personal stylist on-call', 'Private event invites', 'Complimentary bridal trial', 'Chauffeured salon visits', 'Annual makeover package'],
  },
];

export default function Loyalty() {
  const navigate = useNavigate();
  const { user }  = useAuth();

  return (
    <section className="section" id="loyalty">
      <div className="container">
        <div className="section-header">
          <motion.span className="section-label" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
            Glamora Rewards
          </motion.span>
          <motion.h2 className="section-title" initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.1}}>
            Loyalty <em>Programme</em>
          </motion.h2>
          <div className="divider" />
          <motion.p className="section-sub" initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:0.2}}>
            Earn 10 points for every ₹100 spent. Five tiers of exclusive rewards — because loyalty deserves royalty.
          </motion.p>
        </div>

        {/* 5-tier loyalty cards — centered grid */}
        <div className="loyalty-tiers">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              className={`tier-card ${tier.featured ? 'tier-featured' : ''}`}
              style={{ '--tier-color': tier.color }}
              initial={{ opacity:0, y:50 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.65, delay: i * 0.1 }}
              whileHover={{ y:-7, boxShadow:`0 24px 60px ${tier.color}28` }}
            >
              {tier.featured && (
                <div className="tier-popular-badge">Most Popular</div>
              )}
              <div className="tier-icon">{tier.icon}</div>
              <div className="tier-name" style={{ color: tier.color }}>{tier.name}</div>
              <div className="tier-pts">{tier.pts}</div>
              <div className="tier-divider" style={{ background: tier.color }} />
              <ul className="tier-perks">
                {tier.perks.map(p => (
                  <li key={p}>
                    <span style={{ color: tier.color }}>✦</span> {p}
                  </li>
                ))}
              </ul>
              <button
                className="tier-cta"
                style={{ borderColor: tier.color, color: tier.color }}
                onClick={() => navigate(user ? '/booking' : '/register')}
              >
                {user ? 'Book & Earn' : 'Join Now'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* User loyalty status card */}
        {user && (
          <motion.div
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className="loyalty-user-card">
            <div>
              <p className="loyalty-user-label">Your Points Balance</p>
              <p className="loyalty-user-pts">{user.loyaltyPoints || 0}</p>
              <p className="loyalty-user-sub">Keep booking to unlock higher tiers ✦</p>
            </div>
            <button className="btn-primary" onClick={() => navigate('/booking')}>Book & Earn Points</button>
          </motion.div>
        )}

        {!user && (
          <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} style={{textAlign:'center',marginTop:'3rem'}}>
            <p style={{color:'var(--mist)',fontSize:'0.9rem',marginBottom:'1.5rem'}}>Already a member? Sign in to track your points.</p>
            <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
              <button className="btn-primary" onClick={() => navigate('/register')}>Join Glamora Rewards</button>
              <button className="btn-outline" onClick={() => navigate('/login')}>Sign In</button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
