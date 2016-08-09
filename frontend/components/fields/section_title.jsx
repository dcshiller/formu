const React = require('react')


const SectionTitle = React.createClass({

  render () {
    return (
            <h1 id = { this.props.fieldVals.fieldId + "_title"}
              key = { this.props.fieldVals.fieldId + "_title"}
              className = "sectionTitle"
            > { this.props.fieldVals.fieldName }</h1>

    )
  }
})




module.exports = SectionTitle;
