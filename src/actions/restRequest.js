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

export const DISPLAY_BANNER_MESSAGE = (message = '') => ({
  type: 'DISPLAY_BANNER_MESSAGE',
  message
})

export const FETCH_LINE = (id = '') => {
  return dispatch => {
    dispatch(REQUESTING_LINE)
    return fetch(`https://5kcqqq1fc7.execute-api.ap-southeast-2.amazonaws.com/beta/timelines/${id}`)
      .then(response => response.json())
      .then(data => dispatch(RECEIVE_LINE(id, data)))
      .catch(error => dispatch(REQUEST_LINE_ERROR(id, error)))
    }
  }


export const UPDATE_LINE = (id, data, unauthorizedCallback) => {
  return dispatch => {
    return fetch(
      `https://5kcqqq1fc7.execute-api.ap-southeast-2.amazonaws.com/beta/timelines/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(data)
      })
      .then(response => {
        console.log(response)
        if (response.status === 401) {
          dispatch(DISPLAY_BANNER_MESSAGE("You don't have edit permission to this timeline"))
        }
      })
      .catch(error => console.error(error))
    }
  }
