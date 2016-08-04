const React = require('react')

const FormViewPane = React.createClass({
  render(){
    return(
      <div className="formViewPane">
          <h1 className="formTitle"> Untitled Form!! </h1>
          <p> This is a form. May it soon be awesome. </p>
        <hr/>
      </div>
    )
  }
});

module.exports = FormViewPane;
