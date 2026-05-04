const express = require('express');
const cors    = require('cors');
const dotenv  = require('dotenv');

dotenv.config();

const app = express();
app.use(cors({
  origin: ['https://glamora-in.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

app.use('/api/auth',     require('./routes/auth'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/services', require('./routes/services'));
app.use('/api/stylists', require('./routes/stylists'));
app.use('/api/packages', require('./routes/packages'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('🚀 Glamora server running on port ' + PORT);
  console.log('💾 Using flat-file JSON database (no MongoDB needed)');
  console.log('📂 Data stored in: server/data/db.json');
});
