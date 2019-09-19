import React from 'react'
import PropTypes from 'prop-types'

function CardTitle(props) {
  const { colorString, position, isHistorical } = props
  return (
    <span className="card-title">
      {isHistorical ? `${position} Color` : ''}
      <code>#{colorString}</code>
    </span>
  )
}
CardTitle.propTypes = {
  colorString: PropTypes.string,
  position: PropTypes.string,
  isHistorical: PropTypes.bool,
}
export default CardTitle
