const express = require('express');
const router = express.Router();

const packages = [
  {
    id: 1, name: 'Monthly Self-Care', icon: '✦', featured: false,
    description: 'Your monthly glow routine',
    services: ['Deep Cleanse Facial', 'Nail Art (Hands + Feet)', 'Blowout & Style', 'Eyebrow Threading'],
    duration: '3.5 hours', price: 2200
  },
  {
    id: 2, name: 'Bridal Glow', icon: '❖', featured: true,
    description: 'Radiate on your special day',
    services: ['Bridal Makeup (HD)', 'Hairstyle + Accessories', 'Skin Prep & Glow Facial', 'Nail Art & Mehendi', 'Saree Draping'],
    duration: '6 hours', price: 8500
  },
  {
    id: 3, name: 'Party Ready', icon: '◆', featured: false,
    description: 'Dazzle every room you enter',
    services: ['Event Makeup', 'Curls / Updo Style', 'Express Facial', 'Nail Polish + Art'],
    duration: '4 hours', price: 3800
  }
];

router.get('/', (req, res) => res.json(packages));

module.exports = router;
