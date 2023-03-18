const express = require('express');
const app = express();
const heartRateRoutes = require('./routes/heartRateRoutes');

const PORT = 3000;

app.use('/api/v1/heartrates', heartRateRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
