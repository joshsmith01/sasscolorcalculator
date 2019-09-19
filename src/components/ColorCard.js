import React from 'react'
import PropTypes from 'prop-types'
import CardTitle from './CardTitle'

const ColorCard = props => {
  const { colorString, position, isHistorical } = props
  return (
    <div
      className={`color-card color-card-${position}`}
      style={{ background: `#${colorString}` }}
    >
      <CardTitle
        colorString={colorString}
        position={position}
        isHistorical={isHistorical}
      />
    </div>
  )
}

ColorCard.propTypes = {
  position: PropTypes.oneOf(['start', 'end']),
  colorString: PropTypes.string,
  isHistorical: PropTypes.bool,
}
export default ColorCard
