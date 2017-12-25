import React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import Slider from 'material-ui/Slider'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import { DUPLICATE_THIS_INCIDENT, DELETE_THIS_INCIDENT, TEXT_ON_TEXT_BOX_EDITOR_CHANGE, CONFIG_ON_EDITOR_CHANGE } from '../../actions'

import './style.css'

let RangeEditor = ({ incident, onDuplicate, onDelete, onChange, onConfigChange }) => (
  <div>
    <div className="Title">
      <h2>Range</h2>
    </div>
    <RaisedButton label="Duplicate" className="Button" onClick={() => onDuplicate(incident.id)} />
    <RaisedButton label="Delete" className="Button" onClick={() => onDelete(incident.id)} />

    <Paper className="Card">
      <span className="CardTitle"> Range Text </span>
      <TextField
        hintText='Text here ...'
        multiLine={true}
        rows={1}
        rowsMax={20}
        value={incident.text}
        fullWidth={true}
        inputStyle={{fontFamily: 'Calibri', fontSize: 18}}
        onChange={(e, newText) => onChange(incident.id, newText)}
    />
    </Paper>

    <Paper className="Card">
      <span className="CardTitle"> Font Size </span>
      <span> {incident.fontSize} </span>
      <Slider
        className="Slider"
        min={5}
        max={100}
        value={incident.fontSize}
        onChange={(e, newValue) => onConfigChange(incident.id, { fontSize: newValue })}
      />
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
  },
  onConfigChange: (id, newConfig) => {
    dispatch(CONFIG_ON_EDITOR_CHANGE(id, newConfig))
  }
})

RangeEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(RangeEditor)


export default RangeEditor
