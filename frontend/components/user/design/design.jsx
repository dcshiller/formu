const React = require('react')
const FieldSelectorTab = require('./field_selector_tab')

const TabPanes =  [
                    <FieldSelectorTab/>,
                    <FieldSelectorTab/>,
                    <FieldSelectorTab/>
                  ]


const Design = React.createClass({
  getInitialState(){
    return {paneSelected: 0}
  },
  selectPane(tabNumber){
    this.setState({paneSelected: tabNumber})
  },
  returnSelectedTab(){
    return TabPanes[this.state.paneSelected]
  },
  newTab(labelText, paneNumber){
    return (
              <li onClick={this.selectPane.bind(this,paneNumber)}
                  className={this.state.paneSelected === paneNumber ? "inFocus" : "notInFocus" } >
                  {labelText}
              </li>
          )
  },
  render(){
    return (
      <div className="paneContainer">
        <div className="fieldDiv">
          <ul>
            {this.newTab("Add a field", 0)}
            {this.newTab("Field properties", 1)}
            {this.newTab("Form properties", 2)}
          </ul>
          { this.returnSelectedTab() }
        </div>
        <div className="formViewDiv">

        </div>
      </div>
    )
  }
})


module.exports = Design;
