import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import './MyBookings.css';

export default function MyBookings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    api.get('/bookings/my')
      .then(r => setBookings(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  const statusColor = s => ({ pending:'var(--warning)', confirmed:'var(--success)', done:'var(--gold)', rejected:'var(--danger)' }[s] || 'var(--mist)');

  return (
    <div className="my-bookings-page section">
      <div className="container">
        <div className="section-header">
          <motion.span className="section-label" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>Your Account</motion.span>
          <motion.h2 className="section-title" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.1}}>
            My <em>Bookings</em>
          </motion.h2>
          <div className="divider" />
        </div>

        {/* Loyalty Points */}
        {user?.loyaltyPoints > 0 && (
          <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} transition={{delay:0.2}}
            style={{textAlign:'center',background:'var(--gold-glow)',border:'1px solid var(--gold-border)',borderRadius:'10px',padding:'1.5rem',maxWidth:'300px',margin:'0 auto 3rem'}}>
            <p style={{fontFamily:'var(--cap)',fontSize:'8px',letterSpacing:'0.3em',color:'var(--mist)',textTransform:'uppercase',marginBottom:'0.3rem'}}>Loyalty Points</p>
            <p style={{fontFamily:'var(--serif)',fontSize:'2.5rem',color:'var(--gold-light)'}}>{user.loyaltyPoints}</p>
          </motion.div>
        )}

        {loading ? (
          <div style={{display:'grid',gap:'1rem'}}>
            {[1,2,3].map(i => (
              <div key={i} className="shimmer" style={{height:'90px',borderRadius:'10px'}} />
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} style={{textAlign:'center',padding:'5rem 2rem'}}>
            <p style={{fontSize:'3rem',marginBottom:'1rem'}}>📅</p>
            <p style={{color:'var(--mist)',marginBottom:'2rem'}}>No appointments yet. Book your first session!</p>
            <button className="btn-primary" onClick={() => navigate('/booking')}>Book Now</button>
          </motion.div>
        ) : (
          <div className="bookings-list">
            {bookings.map((b, i) => {
              const d = new Date(b.date + 'T00:00:00');
              return (
                <motion.div key={b._id} className="booking-card"
                  initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.07}}>
                  <div className="bc-date">
                    <div>{d.getDate()}</div>
                    <div className="bc-month">{d.toLocaleDateString('en-IN',{month:'short'})}</div>
                  </div>
                  <div>
                    <div className="bc-service">{b.service}</div>
                    <div className="bc-meta">with {b.stylist} · {b.timeSlot}</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div className="bc-price">₹{b.totalPrice?.toLocaleString('en-IN')}</div>
                    <div style={{fontFamily:'var(--cap)',fontSize:'7.5px',letterSpacing:'0.18em',color:statusColor(b.status),textTransform:'uppercase',marginTop:'0.3rem'}}>
                      {b.status}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
