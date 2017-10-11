import React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import Slider from 'material-ui/Slider'
import TextField from 'material-ui/TextField'
import { grey400 } from 'material-ui/styles/colors';

import './style.css'

let TextBoxEditor = ({ event }) => (
  <div>
    <div className="Title">
      <h3>Text Box</h3>
    </div>
    <Paper className="Card">
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
  event: state.data.events.filter(event => event.when === state.ui.eventTimestampOnEditPanel)[0]
})

const mapDispatchToProps = (dispatch) => ({
  // onRequestClose: () => {
    // dispatch(TOGGLE_EDIT_PANEL())
  // }
})

TextBoxEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(TextBoxEditor)


export default TextBoxEditor
