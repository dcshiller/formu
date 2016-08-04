const React = require('react')

const Field = React.createClass({
      render(){
        const fieldName = this.props.fieldVals["fieldName"];
        const fieldType = this.props.fieldVals["fieldType"];
        const handler = this.props.fieldVals["handler"];
        const fieldValue = this.props.fieldVals["fieldValue"];
        return (
          <div className = "inputWrapper">
            <label htmlFor={fieldName}>{fieldName}</label>
            <input type={fieldType}
             id={fieldName}
             onChange={handler}
             value={fieldValue}
            />
           </div>
         )
      }
})


module.exports = Field;
