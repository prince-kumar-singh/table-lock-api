const express = require('express');
const app = express();
const tablesRouter = require('./routes/tables');

app.use(express.json());
app.use('/api/tables', tablesRouter);

const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Table Lock API is running ✅');
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
