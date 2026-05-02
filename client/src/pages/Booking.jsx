import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import Toast from '../components/Toast';
import './Booking.css';

const STYLISTS = [
  { id:1, name:'Priya Rangan',   initials:'PR', exp:'8 yrs', spec:'Bridal & Hair',  rating:'4.9 ★', fee:900 },
  { id:2, name:'Ayesha Khan',    initials:'AK', exp:'5 yrs', spec:'Skin & Makeup',  rating:'4.8 ★', fee:750 },
  { id:3, name:'Meena Varghese', initials:'MV', exp:'3 yrs', spec:'Nail & Skin',    rating:'4.6 ★', fee:600 },
];
const SERVICES = [
  { name:'Hair Cut & Style',    price:500,  icon:'✂️' },
  { name:'Bridal Makeup',       price:800,  icon:'💍' },
  { name:'Facial & Glow',       price:600,  icon:'✨' },
  { name:'Nail Art',            price:300,  icon:'💅' },
  { name:'Hair Color',          price:1200, icon:'🎨' },
  { name:'Keratin Treatment',   price:1500, icon:'💫' },
  { name:'Party Makeup',        price:600,  icon:'🎉' },
  { name:'Skin Brightening',    price:800,  icon:'🌟' },
];
const SLOTS = ['10:00','10:30','11:00','11:30','12:00','12:30','2:00','2:30','3:00','3:30','4:00','4:30'];
const BUSY  = ['10:00','10:30','12:30'];
const STEPS = ['Stylist','Service','Schedule','Confirm'];

const stepVariants = {
  enter:  { opacity: 0, x: 30 },
  center: { opacity: 1, x: 0  },
  exit:   { opacity: 0, x: -30 },
};

export default function Booking() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep]     = useState(0);
  const [stylist, setStylist] = useState(STYLISTS[0]);
  const [service, setService] = useState(SERVICES[0]);
  const [slot, setSlot]     = useState('');
  const [date, setDate]     = useState('');
  const [name, setName]     = useState(user?.name || '');
  const [email, setEmail]   = useState(user?.email || '');
  const [isWeekend, setIsWeekend] = useState(false);
  const [isRush, setIsRush]       = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [toast, setToast]   = useState('');
  const [loading, setLoading] = useState(false);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3500); };
  const checkWeekend = (val) => { if (!val) return; const d = new Date(val); setIsWeekend(d.getDay()===0||d.getDay()===6); };
  const selectSlot = (s) => { setSlot(s); const hr = parseInt(s); setIsRush(hr>=11&&hr<=12); };

  let total = service.price + stylist.fee;
  if (isWeekend) total = Math.round(total * 1.2);
  if (isRush)    total += 200;

  const handleNext = () => {
    if (step===2 && !date) { showToast('Please select a date'); return; }
    if (step===2 && !slot) { showToast('Please select a time slot'); return; }
    if (step < 3) setStep(s => s+1);
  };

  const handleConfirm = async () => {
    if (!name || !email) { showToast('Please fill your name and email'); return; }
    if (!user) { navigate('/login'); return; }
    setLoading(true);
    try {
      await api.post('/bookings', {
        userName:name, userEmail:email,
        stylist:stylist.name, service:service.name,
        date, timeSlot:slot,
        basePrice:service.price, stylistFee:stylist.fee,
        isWeekend, isRush, totalPrice:total
      });
      setConfirmed(true);
    } catch { showToast('Booking failed. Please try again.'); }
    setLoading(false);
  };

  if (confirmed) return (
    <div className="booking-page section">
      <div className="container">
        <motion.div className="booking-confirmed" initial={{opacity:0,scale:0.92}} animate={{opacity:1,scale:1}} transition={{duration:0.6,ease:[0.25,0.1,0.15,1]}}>
          <motion.span className="confirmed-icon" animate={{rotate:[0,10,-10,0]}} transition={{delay:0.5,duration:0.6}}>✦</motion.span>
          <h2 className="confirmed-title">Booking <em>Confirmed</em></h2>
          <p className="confirmed-sub">Thank you, {name}! Your appointment has been booked.<br />We'll send confirmation to {email}.</p>
          <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
            <button className="btn-primary" onClick={() => navigate('/my-bookings')}>View My Bookings</button>
            <button className="btn-outline" onClick={() => navigate('/')}>Back to Home</button>
          </div>
        </motion.div>
      </div>
    </div>
  );

  return (
    <div className="booking-page section">
      <div className="container">
        <div className="section-header">
          <motion.span className="section-label" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>Appointments</motion.span>
          <motion.h2 className="section-title" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.1}}>
            Book Your <em>Session</em>
          </motion.h2>
          <div className="divider" />
        </div>

        {/* Steps */}
        <div className="booking-steps">
          {STEPS.map((s,i) => (
            <div key={s} className={`bstep ${i===step?'active':''} ${i<step?'done':''}`}
              style={{cursor:i<step?'pointer':'default'}} onClick={() => i<step && setStep(i)}>
              <div className="bstep-num">{i<step?'✓':i+1}</div>
              <span className="bstep-label">{s}</span>
            </div>
          ))}
        </div>

        <div className="booking-layout">
          {/* Step content */}
          <div style={{overflow:'hidden'}}>
            <AnimatePresence mode="wait">
              <motion.div key={step} variants={stepVariants} initial="enter" animate="center" exit="exit"
                transition={{duration:0.35,ease:[0.25,0.1,0.15,1]}}>

                {/* STEP 0 — Stylist */}
                {step === 0 && (
                  <div>
                    <p style={{color:'var(--mist)',fontSize:'0.88rem',marginBottom:'1.5rem'}}>Choose your preferred stylist</p>
                    <div className="stylists-grid">
                      {STYLISTS.map(s => (
                        <motion.div key={s.id} className={`stylist-card ${stylist.id===s.id?'selected':''}`}
                          onClick={() => setStylist(s)} whileTap={{scale:0.97}}>
                          <div className="stylist-avatar">{s.initials}</div>
                          <div className="stylist-name">{s.name}</div>
                          <div className="stylist-spec">{s.spec}</div>
                          <div className="stylist-rating">{s.rating} · {s.exp}</div>
                        </motion.div>
                      ))}
                    </div>
                    <button className="btn-primary" onClick={handleNext}>Continue →</button>
                  </div>
                )}

                {/* STEP 1 — Service */}
                {step === 1 && (
                  <div>
                    <p style={{color:'var(--mist)',fontSize:'0.88rem',marginBottom:'1.5rem'}}>Select your service</p>
                    <div className="services-grid">
                      {SERVICES.map(sv => (
                        <motion.div key={sv.name} className={`service-card ${service.name===sv.name?'selected':''}`}
                          onClick={() => setService(sv)} whileTap={{scale:0.97}}>
                          <div style={{fontSize:'1.5rem',marginBottom:'0.5rem'}}>{sv.icon}</div>
                          <div className="service-name">{sv.name}</div>
                          <div className="service-price">₹{sv.price}</div>
                        </motion.div>
                      ))}
                    </div>
                    <div style={{display:'flex',gap:'1rem',flexWrap:'wrap'}}>
                      <button className="btn-outline" onClick={() => setStep(0)}>← Back</button>
                      <button className="btn-primary" onClick={handleNext}>Continue →</button>
                    </div>
                  </div>
                )}

                {/* STEP 2 — Schedule */}
                {step === 2 && (
                  <div>
                    <div className="form-field">
                      <label>Select Date</label>
                      <input className="form-input" type="date" min={new Date().toISOString().split('T')[0]} value={date}
                        onChange={e=>{setDate(e.target.value);checkWeekend(e.target.value);}} />
                    </div>
                    <div className="form-field">
                      <label>Select Time Slot</label>
                      <div className="slots-grid">
                        {SLOTS.map(s => (
                          <motion.button key={s} className={`slot-btn ${slot===s?'selected':''}`}
                            disabled={BUSY.includes(s)} onClick={() => selectSlot(s)} whileTap={{scale:0.95}}>
                            {s}{BUSY.includes(s) ? ' ✕' : ''}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    {isWeekend && <p style={{fontSize:'0.8rem',color:'var(--warning)',marginBottom:'0.5rem'}}>⚠ Weekend surcharge: +20%</p>}
                    {isRush    && <p style={{fontSize:'0.8rem',color:'var(--warning)',marginBottom:'0.5rem'}}>⚠ Rush hour surcharge: +₹200</p>}
                    <div style={{display:'flex',gap:'1rem',flexWrap:'wrap',marginTop:'1.5rem'}}>
                      <button className="btn-outline" onClick={() => setStep(1)}>← Back</button>
                      <button className="btn-primary" onClick={handleNext}>Continue →</button>
                    </div>
                  </div>
                )}

                {/* STEP 3 — Confirm */}
                {step === 3 && (
                  <div>
                    <p style={{color:'var(--mist)',fontSize:'0.88rem',marginBottom:'1.5rem'}}>Confirm your details</p>
                    <div className="user-fields">
                      <div className="form-field">
                        <label>Full Name</label>
                        <input className="form-input" value={name} onChange={e=>setName(e.target.value)} placeholder="Your full name" />
                      </div>
                      <div className="form-field">
                        <label>Email Address</label>
                        <input className="form-input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" />
                      </div>
                    </div>
                    {!user && <p style={{fontSize:'0.82rem',color:'var(--warning)',marginBottom:'1.5rem'}}>Please <a href="/login" style={{color:'var(--gold)'}}>login</a> to confirm</p>}
                    <div style={{display:'flex',gap:'1rem',flexWrap:'wrap'}}>
                      <button className="btn-outline" onClick={() => setStep(2)}>← Back</button>
                      <motion.button className="btn-primary" onClick={handleConfirm} disabled={loading} whileTap={{scale:0.97}}>
                        {loading ? 'Booking...' : '✦ Confirm Booking'}
                      </motion.button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Summary sidebar */}
          <motion.div className="booking-summary" initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} transition={{delay:0.2,duration:0.6}}>
            <div className="bs-title">Booking Summary</div>
            <div className="bs-row"><span className="label">Stylist</span><span className="value">{stylist.name}</span></div>
            <div className="bs-row"><span className="label">Service</span><span className="value">{service.name}</span></div>
            {date && <div className="bs-row"><span className="label">Date</span><span className="value">{new Date(date+'T00:00:00').toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short'})}</span></div>}
            {slot && <div className="bs-row"><span className="label">Time</span><span className="value">{slot}</span></div>}
            <div className="bs-divider" />
            <div className="bs-row"><span className="label">Service</span><span className="value">₹{service.price}</span></div>
            <div className="bs-row"><span className="label">Stylist fee</span><span className="value">₹{stylist.fee}</span></div>
            {isWeekend && <div className="bs-surcharge">Weekend +20%</div>}
            {isRush    && <div className="bs-surcharge">Rush hour +₹200</div>}
            <div className="bs-divider" />
            <div className="bs-total">
              <span className="label">Total</span>
              <motion.span className="value" key={total} initial={{scale:1.15,color:'#e8c97a'}} animate={{scale:1,color:'var(--gold-light)'}} transition={{duration:0.3}}>
                ₹{total.toLocaleString('en-IN')}
              </motion.span>
            </div>
          </motion.div>
        </div>
      </div>
      {toast && <Toast msg={toast} />}
    </div>
  );
}
