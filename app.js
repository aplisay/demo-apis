const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');



const app = express();

app.use(cors());
app.use(bodyParser.json());

let slots = [
  new Date('2025-01-24 09:00:00'),
  new Date('2025-01-24 10:00:00'),
  new Date('2025-01-24 11:00:00'),
  new Date('2025-01-27 10:00:00'),
  new Date('2025-01-27 11:00:00'),
  new Date('2025-01-27 12:00:00'),
  new Date('2025-02-07 12:00:00'),
  new Date('2025-02-07 13:00:00'),
  new Date('2025-03-07 09:00:00'),
];

let actions = [
  { type: 'book', explanation: 'the doctor has asked me to get you to come in for a new appointment', action: 'get the user to book an appointment' },
  {
    type: 'sample', explanation: 'we sent you a stool sample kit recently, but the lab has not received it yet', 
    action: 'find out why the user has not sent back the sample, offer to send a new one if it was lost or damaged'
  }
]



// Schedule endpoint
app.post('/auth', async (req, res) => {
  const { first, middle, last, year, month } = req.body;
  const id = Math.round(Math.random() * 1000000000)

  return res.json({id});
});

// Village endpoint
app.post('/free_slots', async (req, res) => {
  const { id } = req.body;

  res.json(slots);
});

app.post('/confirm_slot', async (req, res) => {
  const { slot } = req.body;

  const date = new Date(slot);
  slots = slots.filter(s => s.getTime() !== date.getTime())

  const results = {
    response: 'Thank you, your appointment at ${date} has been confirmed.',
    helpful_info: 'Please make sure you arrive in plenty of time to find your way to the department, and bring your journal with you'
  }

  res.json(results);
});

app.post('/followup_action', async (req, res) => {
  const { id } = req.body;



  const results = actions[1];
  res.json(results);
});

app.post('/resolution', async (req, res) => {
  const { id, action } = req.body;

  res.json({ok: true});
});



// Start the server
const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
