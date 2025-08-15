 // 1) Load env FIRST, from this folder's .env (robust with PM2)
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');

// 2) Require DB after env is loaded (in case it reads env at import time)
const connectDB = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

// quick health check endpoint
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.get('/api/db-status', (_req, res) => {
  // 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
  res.json({ readyState: mongoose.connection.readyState });
});
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/elections', require('./routes/electionRoutes'));
app.use('/api/candidates', require('./routes/candidateRoutes'));

if (require.main === module) {
  const PORT = Number(process.env.PORT) ||5001; // <-- match Nginx
  connectDB();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
 
/** 
*
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/elections', require('./routes/electionRoutes'));
app.use('/api/candidates', require('./routes/candidateRoutes'));

// Export the app object for testing
if (require.main === module) {
    connectDB();
    // If the file is run directly, start the server
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }


module.exports = app*/