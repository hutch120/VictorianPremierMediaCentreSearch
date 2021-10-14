import moment from 'moment'
import { format } from 'timeago.js'
import PropTypes from 'prop-types'

export function DateInfo ({ value }) {
  if (value && value !== '') {
    const mDate = moment(value)
    const timeAgoText = 'over ' + format(mDate.valueOf())
    return `${timeAgoText} (${value})`
  } else {
    return null
  }
}

DateInfo.propTypes = {
  value: PropTypes.string
}
