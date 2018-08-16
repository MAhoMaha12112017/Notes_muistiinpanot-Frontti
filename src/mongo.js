const mongoose = require('mongoose');

const url = 'mongodb://fullstack:TaysiLasti33@ds129593.mlab.com:29593/notes';

mongoose.connect(url, { useNewUrlParser: true });



const Note = mongoose.model('Note', {
  content: String,
  date: Date,
  important: Boolean
})

// find notes
Note
  .find({important: false})
  .then(result => {
    result.forEach(note => {
      console.log(note);
    });
    mongoose.connection.close();
  });

// create a new note
/*
const note = new Note({
  content: 'HTML on helppoa',
  date: new Date(),
  important: true
});

note
  .save()
  .then(response => {
    console.log('note saved');
    mongoose.connection.close();
  });
*/