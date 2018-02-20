import React, { Component } from 'react';
import './App.css';
// import { MuiThemeProvider, theme } from 'material-ui/styles';
// import Paper from 'material-ui/Paper';
// import Card from 'material-ui/Card';

class IndividCoNotes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      individData: {}
    }
    this.change = this.change.bind(this);
  }

  change() {
  }

  componentDidMount() {
  }

  render() {
      if (this.props.notes) {
        const notes = this.props.notes;
        // console.log('notes: ', notes);
        return (
          <div className='individCoNotesContainer'>
            {notes.map((records, index) => (
              <div key={index}>
                <h3>{records.Title}</h3>
                <p>{records.Content}</p>
                <p>{records.RecordDate}</p>
              </div>
            ))}
          </div>
        )
      } else {
        return (
          <p>Loading...</p>
        )
      }
  }
}

export default IndividCoNotes;
