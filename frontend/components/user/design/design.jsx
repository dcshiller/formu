const React = require('react')
const FieldSelectorTab = require('./field_selector_tab')

const Design = React.createClass({
  render(){
    return (
      <div className="paneContainer">
        <div className="fieldDiv">
          <FieldSelectorTab/>
        </div>
        <div className="formViewDiv">

        </div>
      </div>
    )
  }
})


module.exports = Design;
