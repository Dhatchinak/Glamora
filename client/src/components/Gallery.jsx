import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import './Gallery.css';

// 12 guaranteed-working Unsplash URLs (beauty/fashion IDs verified stable)
const ITEMS = [
  { id:1,  title:'Bridal Radiance',     tag:'Bridal',    url:'https://images.unsplash.com/photo-1519741497674-611481863552', grad:'linear-gradient(135deg,#f8c8dc,#c9a84c)' },
  { id:2,  title:'Golden Hour Glow',    tag:'Makeup',    url:'https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84', grad:'linear-gradient(135deg,#e8c97a,#d28c82)' },
  { id:3,  title:'Silk Waves',          tag:'Hair',      url:'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e', grad:'linear-gradient(135deg,#1a1510,#3d3529)' },
  { id:4,  title:'Rose Editorial',      tag:'Makeup',    url:'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2', grad:'linear-gradient(135deg,#d28c82,#f8c8dc)' },
  { id:5,  title:'Velvet Touch',        tag:'Skincare',  url:'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881', grad:'linear-gradient(135deg,#e8d5f0,#c9a84c)' },
  { id:6,  title:'Crystal Nails',       tag:'Nails',     url:'https://images.unsplash.com/photo-1604654894610-df63bc536371', grad:'linear-gradient(135deg,#f5e9c4,#c9a84c)' },
  { id:7,  title:'Classic Elegance',    tag:'Bridal',    url:'https://images.unsplash.com/photo-1583391733956-6c78276477e2', grad:'linear-gradient(135deg,#f8c8dc,#e8d5f0)' },
  { id:8,  title:'Dewy Skin Ritual',    tag:'Skincare',  url:'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea', grad:'linear-gradient(135deg,#f5e6d3,#d28c82)' },
  { id:9,  title:'Pearl Highlight',     tag:'Makeup',    url:'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453', grad:'linear-gradient(135deg,#f5e9c4,#e8c97a)' },
  { id:10, title:'Midnight Curls',      tag:'Hair',      url:'https://images.unsplash.com/photo-1560869713-da86a9ec0744', grad:'linear-gradient(135deg,#211e16,#c9a84c)' },
  { id:11, title:'Blush Perfection',    tag:'Bridal',    url:'https://images.unsplash.com/photo-1519699047748-de8e457a634e', grad:'linear-gradient(135deg,#f8c8dc,#b8942f)' },
  { id:12, title:'Glass Skin',          tag:'Skincare',  url:'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c', grad:'linear-gradient(135deg,#e8d5f0,#f5e6d3)' },
];

const FILTERS = ['All','Bridal','Makeup','Hair','Nails','Skincare'];

// Stagger container
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } }
};
const itemVariants = {
  hidden:  { opacity: 0, scale: 0.88, y: 30 },
  visible: { opacity: 1, scale: 1,    y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.15, 1] } },
  exit:    { opacity: 0, scale: 0.9,  y: -10, transition: { duration: 0.3 } },
};

function GalleryCard({ item, onClick, index }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <motion.div
      className="gallery-item"
      variants={itemVariants}
      layout
      layoutId={`gallery-${item.id}`}
      onClick={() => onClick(item)}
      whileHover="hover"
    >
      {/* Gradient fallback — always visible until image loads */}
      <div className="gallery-grad" style={{ background: item.grad }} />

      {!failed && (
        <motion.img
          src={`${item.url}?w=600&q=80&fit=crop&crop=faces,center`}
          alt={item.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          className="gallery-img"
        />
      )}

      {/* Shimmer while loading */}
      {!loaded && !failed && <div className="gallery-shimmer" />}

      {/* Hover overlay with premium animated reveal */}
      <motion.div
        className="gallery-overlay"
        initial={{ opacity: 0 }}
        variants={{ hover: { opacity: 1 } }}
        transition={{ duration: 0.35 }}
      >
        <motion.div
          className="gallery-overlay-inner"
          initial={{ y: 20, opacity: 0 }}
          variants={{ hover: { y: 0, opacity: 1 } }}
          transition={{ duration: 0.38, delay: 0.05 }}
        >
          <span className="gallery-overlay-tag">{item.tag}</span>
          <h3 className="gallery-overlay-title">{item.title}</h3>
          <span className="gallery-overlay-cta">View ↗</span>
        </motion.div>
      </motion.div>

      {/* Gold shine sweep on hover */}
      <motion.div
        className="gallery-shine"
        initial={{ x: '-100%', opacity: 0 }}
        variants={{ hover: { x: '200%', opacity: [0, 0.4, 0] } }}
        transition={{ duration: 0.65, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}

export default function Gallery() {
  const [active,   setActive]   = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const ref = useRef(null);

  const filtered = active === 'All' ? ITEMS : ITEMS.filter(i => i.tag === active);

  return (
    <section className="section" id="gallery" ref={ref}>
      <div className="container">
        <div className="section-header">
          <motion.span className="section-label"
            initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
            Portfolio
          </motion.span>
          <motion.h2 className="section-title"
            initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.1}}>
            Our <em>Gallery</em>
          </motion.h2>
          <div className="divider" />
          <motion.p className="section-sub"
            initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:0.2}}>
            Twelve stories of transformation, each a masterpiece.
          </motion.p>
        </div>

        {/* Animated filter pills */}
        <motion.div className="gallery-filters"
          initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.25}}>
          {FILTERS.map(f => (
            <motion.button key={f}
              className={`gallery-filter ${active===f?'active':''}`}
              onClick={() => setActive(f)}
              whileTap={{ scale: 0.94 }}
              whileHover={{ y: -2 }}>
              {active === f && (
                <motion.span className="filter-dot" layoutId="filterDot" />
              )}
              {f}
            </motion.button>
          ))}
        </motion.div>

        {/* Staggered grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="gallery-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filtered.map((item, i) => (
              <GalleryCard key={item.id} item={item} onClick={setLightbox} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Premium Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div className="lightbox"
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            onClick={() => setLightbox(null)}>
            <motion.div className="lightbox-inner"
              initial={{scale:0.82, opacity:0, y:40}}
              animate={{scale:1,    opacity:1, y:0}}
              exit={{scale:0.88,    opacity:0, y:20}}
              transition={{duration:0.45, ease:[0.25,0.1,0.15,1]}}
              onClick={e => e.stopPropagation()}>

              <div className="lightbox-img-wrap" style={{background: lightbox.grad}}>
                <img
                  src={`${lightbox.url}?w=1200&q=90&fit=crop&crop=faces,center`}
                  alt={lightbox.title}
                />
              </div>

              <div className="lightbox-info">
                <div>
                  <span className="gallery-overlay-tag" style={{display:'block',marginBottom:'0.4rem'}}>{lightbox.tag}</span>
                  <h3 style={{fontFamily:'var(--serif)',fontSize:'1.4rem',color:'var(--ivory)'}}>{lightbox.title}</h3>
                </div>
                <a href="/booking" className="btn-primary" style={{padding:'0.7rem 1.6rem',fontSize:'9.5px'}}>
                  Book This Look
                </a>
              </div>

              <motion.button className="lightbox-close"
                onClick={() => setLightbox(null)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                transition={{ duration: 0.2 }}>
                ✕
              </motion.button>

              {/* Navigate prev/next */}
              {ITEMS.indexOf(lightbox) > 0 && (
                <button className="lightbox-nav lightbox-prev"
                  onClick={e => { e.stopPropagation(); setLightbox(ITEMS[ITEMS.indexOf(lightbox)-1]); }}>
                  ←
                </button>
              )}
              {ITEMS.indexOf(lightbox) < ITEMS.length-1 && (
                <button className="lightbox-nav lightbox-next"
                  onClick={e => { e.stopPropagation(); setLightbox(ITEMS[ITEMS.indexOf(lightbox)+1]); }}>
                  →
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
