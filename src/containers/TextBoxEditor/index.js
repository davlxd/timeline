import React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import Slider from 'material-ui/Slider'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import { DUPLICATE_THIS_INCIDENT, DELETE_THIS_INCIDENT, TEXT_ON_TEXT_BOX_EDITOR_CHANGE } from '../../actions'

import './style.css'

let TextBoxEditor = ({ incident, onDuplicate, onDelete, onChange }) => (
  <div>
    <div className="Title">
      <h3>Text Box</h3>
    </div>
    <RaisedButton label="Duplicate" className="Button" onClick={() => onDuplicate(incident.id)} />
    <RaisedButton label="Delete" className="Button" onClick={() => onDelete(incident.id)} />

    <Paper className="Card">
      <span> TEXT </span>
      <TextField
        hintText='Text here ...'
        multiLine={true}
        rows={2}
        rowsMax={20}
        value={incident.text}
        fullWidth={true}
        onChange={(e, newText) => onChange(incident.id, newText)}
    />
    </Paper>

    <Paper className="Card">
      <span> Timestamp </span>
      <Slider className="Slider"/>
    </Paper>

    <Paper className="Card">
      <span> Width </span>
      <Slider className="Slider"/>
    </Paper>

    <Paper className="Card">
      <span> Font size </span>
      <Slider className="Slider"/>
    </Paper>
  </div>
)

const mapStateToProps = (state) => ({
  incident: state.data.incidents.filter(incident => incident.id === state.ui.editPanel.incidentId)[0]
})

const mapDispatchToProps = (dispatch) => ({
  onDelete: (id) => {
    dispatch(DELETE_THIS_INCIDENT(id))
  },
  onDuplicate: (id) => {
    dispatch(DUPLICATE_THIS_INCIDENT(id))
  },
  onChange: (id, text) => {
    dispatch(TEXT_ON_TEXT_BOX_EDITOR_CHANGE(id, text))
  }
})

TextBoxEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(TextBoxEditor)


export default TextBoxEditor
