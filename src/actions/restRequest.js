export const REQUESTING_LINE = {
  type: 'REQUESTING_LINE'
}

export const RECEIVE_LINE = (id, data) => ({
  type: 'RECEIVE_LINE',
  id,
  data
})

export const REQUEST_LINE_ERROR = (id, error) => ({
  type: 'REQUEST_LINE',
  id,
  error
})

export const FETCH_LINE = (id = '') => {
  return dispatch => {
    dispatch(REQUESTING_LINE)
    return fetch(`http://localhost:4000/${id}`)
      .then(response => response.json)
      .then(data => dispatch(RECEIVE_LINE(id, data)))
      .catch(error => dispatch(REQUEST_LINE_ERROR(id, error)))
  }
}
