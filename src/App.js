import React, {Component} from 'react';
import Note from './components/Note';
import noteService from './services/notes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      newNote: '',
      showAll: true
    }
  }

  componentDidMount() {
      noteService.getAll()
      .then(notes => {
        this.setState({
          notes
        });
      });
  }

  addNote = (e) => {
    e.preventDefault();
    const newNoteObject = {
      content: this.state.newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    }
    noteService
      .create(newNoteObject)
      .then(newNote => {
        this.setState({
          notes: this.state.notes.concat(newNote),
          newNote: ''
        })
      });
    
  }
  
  handleNoteChange = (e) => {
    this.setState({
      newNote: e.target.value
    });
  }

  toggleVisible = () => {
    this.setState({
      showAll: !this.state.showAll
    })
  }

  toggleImportanceOf = (id) => {
    return () => {
      const note = this.state.notes.find((note) => note.id === id);
      const changedNote = {
        ...note, 
        important: !note.important
      };
      noteService.update(id, changedNote)
        .then(changedNoteX => {
          const notes = this.state.notes.filter((note) => note.id !== id);
          this.setState({
            notes: notes.concat(changedNoteX)
          });
        });
        
    }
    
  }

  render() {
    const notesToShow = this.state.showAll ? this.state.notes : this.state.notes.filter(note => note.important);
    const label = this.state.showAll ? 'vain tärkeät' : 'kaikki';

    return (
      <div>
        <h1>Muistiinpanot</h1>
        <button onClick={this.toggleVisible}>näytä {label}</button>
        <ul>
          {notesToShow.map((note) => <Note key={note.id} note={note} toggleImportance={this.toggleImportanceOf(note.id)} />)}
        </ul>
        <form onSubmit={this.addNote}>
          <input value={this.state.newNote} onChange={this.handleNoteChange}/>
          <button type="submit">tallenna</button>
        </form>
      </div>
    );  
  }  
};

export default App;