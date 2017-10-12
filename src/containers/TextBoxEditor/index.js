import React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import Slider from 'material-ui/Slider'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import { DUPLICATE_THIS_EVENT, DELETE_THIS_EVENT } from '../../actions'

import './style.css'

let TextBoxEditor = ({ event, onDuplicate, onDelete }) => (
  <div>
    <div className="Title">
      <h3>Text Box</h3>
    </div>
    <RaisedButton label="Duplicate" className="Button" onClick={() => onDuplicate(event.id)} />
    <RaisedButton label="Delete" className="Button" onClick={() => onDelete(event.id)} />

    <Paper className="Card">
      <span> TEXT </span>
      <TextField
        hintText='Text here ...'
        multiLine={true}
        rows={2}
        rowsMax={20}
        value={event.text}
        fullWidth={true}
    />
    </Paper>

    <Paper className="Card">
      <span> Timestamp </span>
      <Slider className="Slider"/>
    </Paper>
  </div>
)

const mapStateToProps = (state) => ({
  event: state.data.events.filter(event => event.id === state.ui.eventIdOnEditPanel)[0]
})

const mapDispatchToProps = (dispatch) => ({
  onDelete: (id) => {
    dispatch(DELETE_THIS_EVENT(id))
  },
  onDuplicate: (id) => {
    dispatch(DUPLICATE_THIS_EVENT(id))
  }
})

TextBoxEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(TextBoxEditor)


export default TextBoxEditor
