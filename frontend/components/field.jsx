const React = require('react')

const Field = React.createClass({
      render(){
        const fieldName = this.props.fieldVals["fieldName"];
        const id = this.props.fieldVals["fieldId"];
        const fieldType = this.props.fieldVals["fieldType"];
        const handler = this.props.fieldVals["handler"];
        const fieldValue = this.props.fieldVals["fieldValue"];
        const className = this.props.fieldVals["className"];
        const readOnly = false//this.props.fieldVals["readOnly"];
        const draggable = this.props.fieldVals["draggable"];
        const onDragStart = this.props.fieldVals["onDragStart"];
        const onDragEnd = this.props.fieldVals["onDragEnd"];
        const onContainerClick = this.props.fieldVals["onContainerClick"];


        return (
          <div className = "inputWrapper"
                draggable={draggable}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onClick={onContainerClick}
                >
              <label htmlFor={id}
              >{fieldName}</label>
              <input type={fieldType}
                     id={id || fieldName}
                     className={className}
                     onChange={handler}
                     readOnly={readOnly}
                     onSelect={onContainerClick}
                     value={fieldValue}
                    />
           </div>
         )
      }
})


module.exports = Field;
