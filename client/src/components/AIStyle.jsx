import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AIStyle.css';

const OPTIONS = {
  'Face Shape':  ['Oval','Round','Square','Heart','Diamond','Oblong'],
  'Hair Type':   ['Straight','Wavy','Curly','Coily','Fine','Thick'],
  'Skin Tone':   ['Fair','Light','Medium','Tan','Dark','Deep'],
  'Occasion':    ['Wedding','Party','Everyday','Corporate','Festival','Date Night'],
};
const KEYS = { 'Face Shape':'face', 'Hair Type':'hair', 'Skin Tone':'skin', 'Occasion':'occasion' };

export default function AIStyle() {
  const [sel,     setSel]     = useState({ face:'', hair:'', skin:'', occasion:'' });
  const [result,  setResult]  = useState('');
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const toggle = (key, val) => setSel(p => ({ ...p, [key]: p[key] === val ? '' : val }));

  const generate = async () => {
    const { face, hair, skin, occasion } = sel;
    if (!face && !hair && !occasion) { setError('Please select at least one option.'); return; }
    setError(''); setLoading(true); setResult('');
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 300,
          system: 'You are Glamora\'s luxury beauty AI. Give a personalised, elegant beauty recommendation in 3-4 sentences. Mention specific hairstyles and makeup looks by name. Sound like a high-end beauty consultant.',
          messages: [{ role: 'user', content: `Face: ${face||'any'}, Hair: ${hair||'any'}, Skin: ${skin||'any'}, Occasion: ${occasion||'general'}. Recommend the perfect look.` }],
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      setResult(data.content?.map(b => b.text || '').join('') || '');
    } catch (e) {
      setError('AI stylist is momentarily unavailable. Please try again.');
    }
    setLoading(false);
  };

  const canGenerate = Object.values(sel).some(Boolean);

  return (
    <section className="section" id="ai" style={{ background: 'var(--charcoal)' }}>
      <div className="container">
        <div className="section-header">
          <motion.span className="section-label"
            initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
            AI Technology
          </motion.span>
          <motion.h2 className="section-title"
            initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.1}}>
            Your Personal <em>Style AI</em>
          </motion.h2>
          <div className="divider" />
          <motion.p className="section-sub"
            initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:0.2}}>
            Powered by Claude AI — bespoke recommendations tailored to your unique features.
          </motion.p>
        </div>

        <div className="ai-grid">
          {/* LEFT — selectors */}
          <motion.div
            initial={{opacity:0,x:-40}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.75}}>
            {Object.entries(OPTIONS).map(([label, opts]) => (
              <div key={label} className="ai-option-group">
                <p className="ai-option-label">{label}</p>
                <div className="ai-tags">
                  {opts.map(opt => (
                    <motion.button key={opt}
                      className={`ai-tag ${sel[KEYS[label]] === opt ? 'selected' : ''}`}
                      onClick={() => toggle(KEYS[label], opt)}
                      whileTap={{ scale: 0.95 }}>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}

            {error && (
              <motion.p initial={{opacity:0}} animate={{opacity:1}}
                style={{color:'var(--danger)',fontSize:'0.82rem',marginBottom:'1rem'}}>
                {error}
              </motion.p>
            )}

            <motion.button
              className="btn-primary"
              onClick={generate}
              disabled={!canGenerate || loading}
              whileTap={{ scale: 0.97 }}
              style={{ marginTop: '0.5rem' }}>
              {loading ? (
                <span style={{display:'flex',alignItems:'center',gap:'8px'}}>
                  <span className="ai-spinner" /> Analysing...
                </span>
              ) : '✦ Generate My Look'}
            </motion.button>
          </motion.div>

          {/* RIGHT — result */}
          <motion.div
            initial={{opacity:0,x:40}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.75,delay:0.15}}>
            <p className="ai-option-label" style={{marginBottom:'1rem'}}>Your Recommendation</p>

            <div className="ai-result">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div key="dots" className="ai-loading"
                    initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                    <span className="ai-dot" /><span className="ai-dot" /><span className="ai-dot" />
                  </motion.div>
                ) : result ? (
                  <motion.div key="result"
                    initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0}}
                    transition={{duration:0.5}}>
                    <p className="ai-result-text">"{result}"</p>
                    <div className="ai-result-footer">
                      <span>✦ Powered by Claude AI</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="empty" className="ai-empty"
                    initial={{opacity:0}} animate={{opacity:1}}>
                    <span className="ai-empty-icon">✦</span>
                    <p>Select your features and let our AI craft your perfect look</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {result && (
              <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.3}}
                style={{marginTop:'1.5rem', display:'flex', gap:'1rem', flexWrap:'wrap'}}>
                <a href="/booking" className="btn-primary">Book This Look →</a>
                <button className="btn-outline" onClick={() => { setResult(''); setSel({face:'',hair:'',skin:'',occasion:''}); }}
                  style={{padding:'0.9rem 1.5rem'}}>
                  Reset
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
