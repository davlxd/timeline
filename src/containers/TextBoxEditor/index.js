import React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import Slider from 'material-ui/Slider'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'

import { DUPLICATE_THIS_INCIDENT, DELETE_THIS_INCIDENT, TEXT_ON_TEXT_BOX_EDITOR_CHANGE, CONFIG_ON_EDITOR_CHANGE } from '../../actions'

import './style.css'

let TextBoxEditor = ({ incident, onDuplicate, onDelete, onTextChange, onConfigChange }) => (
  <div>
    <div className="Title">
      <h2>Text Box</h2>
    </div>
    <RaisedButton label="Duplicate" className="Button" onClick={() => onDuplicate(incident.id)} />
    <RaisedButton label="Delete" className="Button" onClick={() => onDelete(incident.id)} />

    <Paper className="Card">
      <span className="CardTitle"> Text </span>
      <TextField
        hintText='Text here ...'
        multiLine={true}
        rows={1}
        rowsMax={20}
        value={incident.text}
        fullWidth={true}
        inputStyle={{fontFamily: '"Times New Roman", Georgia, Serif', fontSize: 18}}
        onChange={(e, newText) => onTextChange(incident.id, newText)}
    />
    </Paper>

    <Paper className="Card">
      <span className="CardTitle"> Box Width </span>
      <span> {incident.width} </span>
      <Slider
        className="Slider"
        min={20}
        max={window.innerWidth}
        value={incident.width}
        onChange={(e, newValue) => onConfigChange(incident.id, { width: newValue })}
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

    <Paper className="Card">
      <Checkbox
        label="Display Border"
        checked={incident.displayBorder}
        onCheck={(e, isChecked) => onConfigChange(incident.id, isChecked ? { displayBorder: true } : { attachCord: false, displayBorder: false } )}
      />
    </Paper>

    <Paper className="Card">
      <span className="CardTitle"> Border Width </span>
      <span> {incident.borderWidth} </span>
      <Slider
        className="Slider"
        min={0.1}
        max={8}
        value={incident.borderWidth}
        onChange={(e, newValue) => onConfigChange(incident.id, { borderWidth: newValue })}
      />
    </Paper>

    <Paper className="Card">
      <Checkbox
        label="Attach Cord"
        checked={incident.attachCord}
        onCheck={(e, isChecked) => onConfigChange(incident.id, isChecked ? { attachCord: true, displayBorder: true } : { attachCord: false })}
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
  onTextChange: (id, text) => {
    dispatch(TEXT_ON_TEXT_BOX_EDITOR_CHANGE(id, text))
  },
  onConfigChange: (id, newConfig) => {
    dispatch(CONFIG_ON_EDITOR_CHANGE(id, newConfig))
  }
})

TextBoxEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(TextBoxEditor)


export default TextBoxEditor
