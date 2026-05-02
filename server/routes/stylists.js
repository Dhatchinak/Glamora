const express = require('express');
const router = express.Router();

const stylists = [
  { id: 1, name: 'Priya Rangan', initials: 'PR', experience: '8 yrs', speciality: 'Bridal & Hair', rating: 4.9, fee: 900, color: '#2a1f0a', textColor: '#c9a84c' },
  { id: 2, name: 'Ayesha Khan', initials: 'AK', experience: '5 yrs', speciality: 'Skin & Makeup', rating: 4.8, fee: 750, color: '#0a1a2a', textColor: '#7ab5e8' },
  { id: 3, name: 'Meena Varghese', initials: 'MV', experience: '3 yrs', speciality: 'Nail & Skin', rating: 4.6, fee: 600, color: '#1a0a1a', textColor: '#c87ad8' }
];

router.get('/', (req, res) => res.json(stylists));

module.exports = router;
