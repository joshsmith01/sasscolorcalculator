import React from 'react'

function CardTitle(props) {
  return (
    <span className="card-title">
      {/* eslint-disable-next-line react/prop-types,react/destructuring-assignment */}
      End Color <code>#{props.colorString}</code>
    </span>
  )
}
export default CardTitle
