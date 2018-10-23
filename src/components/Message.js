import React from 'react'

const Message = ({ id, labels, read, selected, starred, subject }) => {
  const readClasses = read ? "row message read" : "row message unread"
  const selectedClass = selected ? " selected" : ""
  const starredClasses = starred ? "star fa fa-star" : "star fa fa-star-o"
  const checkedClass = selected ? "checked" : ""
  const labelSpans = labels.map(label => {
    return <span class="label label-warning">{label}</span>
  })

  return (
    <div className={readClasses + selectedClass}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked={checkedClass} />
          </div>
          <div className="col-xs-2">
            <i className={starredClasses}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        {labelSpans}
        <a href="#">
          {subject}
    </a>
      </div>
    </div>
  )
}

export default Message