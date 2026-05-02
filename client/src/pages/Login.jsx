import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../api';

export default function Login() {
  const { login } = useAuth();
  const navigate  = useNavigate();
  const [form, setForm] = useState({ email:'', password:'' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      login(data.user, data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <motion.div className="auth-card" initial={{opacity:0,y:30,scale:0.97}} animate={{opacity:1,y:0,scale:1}} transition={{duration:0.65,ease:[0.25,0.1,0.15,1]}}>
        <div className="auth-logo">
          <span style={{fontFamily:'var(--serif)',fontSize:'1.6rem',color:'var(--ivory)'}}>Glam<span style={{color:'var(--gold-light)',fontStyle:'italic'}}>ora</span></span>
        </div>
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-sub">Sign in to manage your appointments</p>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={submit}>
          <div className="form-field">
            <label>Email Address</label>
            <input className="form-input" type="email" placeholder="your@email.com" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} required />
          </div>
          <div className="form-field">
            <label>Password</label>
            <input className="form-input" type="password" placeholder="••••••••" value={form.password} onChange={e=>setForm(p=>({...p,password:e.target.value}))} required />
          </div>
          <motion.button className="btn-primary" type="submit" disabled={loading} whileTap={{scale:0.97}} style={{width:'100%',justifyContent:'center',marginTop:'0.5rem'}}>
            {loading ? 'Signing in...' : '✦ Sign In'}
          </motion.button>
        </form>
        <p className="auth-link">New to Glamora? <Link to="/register">Create account</Link></p>
        <p className="auth-link" style={{marginTop:'0.5rem',fontSize:'0.75rem',color:'var(--fog)'}}>
          Demo admin: <span style={{color:'var(--gold)'}}>admin@glamora.in</span> / <span style={{color:'var(--gold)'}}>admin123</span>
        </p>
      </motion.div>
    </div>
  );
}
