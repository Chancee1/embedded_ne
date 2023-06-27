const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://jinezachance:cijbejjug@moviedb.wsziy6u.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
    console.log("Connected to database Successfully")
}).catch(err =>{
    console.log(err)
});
const dataSchema = new mongoose.Schema({
  date: Date,
  temperature: String,
  humidity: String,
});

const Data = mongoose.model('Data', dataSchema);

// Save temperature data
app.post('/data', (req, res) => {
  const { temperature, humidity } = req.body;

  const date = new Date();
  const newTemperature = new Data({ date, temperature, humidity });
  newTemperature.save();
  res.sendStatus(200);
});

// Retrieve temperature data
app.get('/data', async (req, res) => {
  try {
    const data = await Data.find().select('date temperature humidity').exec();
    res.json(data);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});