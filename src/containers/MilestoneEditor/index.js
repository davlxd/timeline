import React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import { DUPLICATE_THIS_INCIDENT, DELETE_THIS_INCIDENT } from '../../actions'

import './style.css'

let MilestoneEditor = ({ incident, onDuplicate, onDelete }) => (
  <div>
    <div className="Title">
      <h2>Milestone</h2>
    </div>
    <RaisedButton label="Duplicate" className="Button" onClick={() => onDuplicate(incident.id)} />
    <RaisedButton label="Delete" className="Button" onClick={() => onDelete(incident.id)} />
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
  }
})

MilestoneEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(MilestoneEditor)


export default MilestoneEditor
