import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../api';

export default function Register() {
  const { login } = useAuth();
  const navigate  = useNavigate();
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      const { data } = await api.post('/auth/register', form);
      login(data.user, data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <motion.div className="auth-card" initial={{opacity:0,y:30,scale:0.97}} animate={{opacity:1,y:0,scale:1}} transition={{duration:0.65,ease:[0.25,0.1,0.15,1]}}>
        <div className="auth-logo">
          <span style={{fontFamily:'var(--serif)',fontSize:'1.6rem',color:'var(--ivory)'}}>Glam<span style={{color:'var(--gold-light)',fontStyle:'italic'}}>ora</span></span>
        </div>
        <h2 className="auth-title">Join Glamora</h2>
        <p className="auth-sub">Create your account & start earning rewards</p>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={submit}>
          <div className="form-field">
            <label>Full Name</label>
            <input className="form-input" placeholder="Priya Sharma" value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} required />
          </div>
          <div className="form-field">
            <label>Email Address</label>
            <input className="form-input" type="email" placeholder="your@email.com" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} required />
          </div>
          <div className="form-field">
            <label>Password</label>
            <input className="form-input" type="password" placeholder="Min. 6 characters" value={form.password} onChange={e=>setForm(p=>({...p,password:e.target.value}))} minLength={6} required />
          </div>
          <motion.button className="btn-primary" type="submit" disabled={loading} whileTap={{scale:0.97}} style={{width:'100%',justifyContent:'center',marginTop:'0.5rem'}}>
            {loading ? 'Creating account...' : '✦ Create Account'}
          </motion.button>
        </form>
        <p className="auth-link">Already have an account? <Link to="/login">Sign in</Link></p>
      </motion.div>
    </div>
  );
}
