const React = require('react')


const Rule = React.createClass({

  render () {
    return (<hr id = { this.props.fieldVals.fieldId + "_rule" }
                key = { this.props.fieldVals.fieldId + "_rule" }
            />)
  }
})




module.exports = Rule;
