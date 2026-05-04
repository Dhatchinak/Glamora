import { useState } from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

const WHATSAPP_NUMBER = '919360309620'; // Replace with actual number

export default function Contact() {
  const [form, setForm] = useState({ name:'', phone:'', message:'' });
  const [sent, setSent] = useState(false);

  const handleWA = () => {
    const text = encodeURIComponent(
      `Hello Glamora! I'm ${form.name || 'interested in booking'}.\n${form.message || 'I would like to book an appointment.'}\nPhone: ${form.phone || ''}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section className="section section-alt" id="contact">
      <div className="container">
        <div className="section-header">
          <motion.span className="section-label" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
            Get In Touch
          </motion.span>
          <motion.h2 className="section-title" initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.1}}>
            Visit <em>Glamora</em>
          </motion.h2>
          <div className="divider" />
        </div>

        <div className="contact-grid">
          <motion.div initial={{opacity:0,x:-40}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.8}}>
            {[
              { icon:'📍', title:'Address',   val:'14 Thillai Nagar East, Trichy, Tamil Nadu 620018' },
              { icon:'📞', title:'Phone',     val:'+91 93603 09620' },
              { icon:'✉️', title:'Email',     val:'hello@glamora.in' },
              { icon:'⏰', title:'Hours',     val:'Mon–Sat: 9am – 8pm\nSun: 10am – 6pm' },
            ].map(({ icon, title, val }) => (
              <div className="contact-info-item" key={title}>
                <div className="contact-icon">{icon}</div>
                <div>
                  <div className="contact-info-title">{title}</div>
                  <div className="contact-info-val" style={{whiteSpace:'pre-line'}}>{val}</div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{opacity:0,x:40}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.8,delay:0.15}}>
            <p style={{fontFamily:'var(--cap)',fontSize:'8.5px',letterSpacing:'0.3em',color:'var(--mist)',textTransform:'uppercase',marginBottom:'2rem'}}>
              Quick WhatsApp Booking
            </p>
            <div className="form-field">
              <label>Your Name</label>
              <input className="form-input" placeholder="Priya Sharma" value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} />
            </div>
            <div className="form-field">
              <label>Phone Number</label>
              <input className="form-input" placeholder="+91 93603 09620" value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))} />
            </div>
            <div className="form-field">
              <label>Message (optional)</label>
              <textarea className="form-input" rows={4} placeholder="I'd like to book a bridal makeup session for..." value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))} style={{resize:'vertical'}} />
            </div>
            <motion.button
              className="btn-primary"
              onClick={handleWA}
              style={{ background: sent ? '#25D366' : undefined, color: sent ? '#fff' : undefined }}
              whileTap={{ scale: 0.97 }}
            >
              {sent ? '✓ Opening WhatsApp...' : '💬 Chat on WhatsApp'}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
