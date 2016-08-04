const React = require('react')

const Field = React.createClass({
      render(){
        const fieldName = this.props.fieldVals["fieldName"];
        const id = this.props.fieldVals["compId"];
        const fieldType = this.props.fieldVals["fieldType"];
        const handler = this.props.fieldVals["handler"];
        const fieldValue = this.props.fieldVals["fieldValue"];
        const className = this.props.fieldVals["className"];
        const readOnly = this.props.fieldVals["readOnly"];
        return (
          <div className = "inputWrapper">
            <label htmlFor={fieldName}>{fieldName}</label>
            <input type={fieldType}
             id={id || fieldName}
             className={className}
             onChange={handler}
             readOnly={readOnly}
             value={fieldValue}
            />
           </div>
         )
      }
})


module.exports = Field;
