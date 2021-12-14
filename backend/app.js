const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

const PORT = process.env.PORT;

// Connection to mongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((result) => {
    console.log('- Connected to mongoDB');

    app.listen(PORT, () => console.log(`-- Starting server at port: ${PORT}`));
  })
  .catch((err) => {
    console.log('- Error: ' + err);

    process.exit(1);
  });

const Guest = require('./modules/guestModel.js');

// Middlewares
app.use(cors());
app.use(express.json());

// returns all users
app.get('/api/guests', (req, res) => {
    Guest.find({}).then((result) => res.json(result));
  });

// - POST
// adds new user to users collection
app.post('/api/guests', (req, res) => {
    let newGuest = req.body;
  
    const guest = new Guest(newGuest);
  
    guest
      .save()
      .then((result) => res.json({ message: 'Guest saved' }))
      .catch((err) =>
        res.json({ message: 'Guest has not been saved, please try again latter' })
      );
  });
  
  // - PUT
  // updates user
  app.put('/api/guests/:id', (req, res) => {
    const guestId = req.params.id;
    const editedGuest = req.body;
    Guest.findOneAndUpdate({_id: guestId},editedGuest)
      .then((result) => res.json({ message: 'Guest status updated'}))
      .catch((err) =>
        res.json({ message: 'Guest has not been updated, please try again latter'})
      );
  });
  // - DELETE
  //  deletes user
  app.delete('/api/guests/:id', (req, res) => {
    const guestId = req.params.id;
    Guest.findByIdAndDelete(guestId)
      .then((result) => res.json({ message: 'Guest Deleted' }))
      .catch((err) =>
        res.json({ message: 'Guest has not been deleted, please try again latter' } + err)
      );
  });