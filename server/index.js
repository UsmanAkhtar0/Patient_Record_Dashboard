const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { nanoid } = require('nanoid');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DATA_PATH = path.join(__dirname, 'data', 'patients.json');

function readData(){
  const raw = fs.readFileSync(DATA_PATH);
  return JSON.parse(raw);
}
function writeData(d){
  fs.writeFileSync(DATA_PATH, JSON.stringify(d, null, 2));
}

app.get('/api/patients', (req, res) => {
  try {
    const q = req.query.q || '';
    const data = readData();
    if(q){
      const filtered = data.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));
      return res.json(filtered);
    }
    res.json(data);
  } catch(err){
    res.status(500).json({ error: 'Failed to read data' });
  }
});

app.get('/api/patients/:id', (req, res) => {
  try {
    const data = readData();
    const patient = data.find(p => p.id === req.params.id);
    if(!patient) return res.status(404).json({ error: 'Not found' });
    res.json(patient);
  } catch(err){
    res.status(500).json({ error: 'Failed' });
  }
});

app.post('/api/patients', (req, res) => {
  try {
    const newP = req.body;
    newP.id = nanoid(8);
    const data = readData();
    data.unshift(newP);
    writeData(data);
    res.status(201).json(newP);
  } catch(err){
    res.status(500).json({ error: 'Failed to save' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Server running on', PORT));
