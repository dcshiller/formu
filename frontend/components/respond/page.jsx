const React = require('react')

const BlankPage = React.createClass({

  render () {

    <main className="formContainer">
      { <h1> { this.state.form.properties.title } </h1> }
      { <p className="instructions"> {this.state.form.properties.instructions }</p> }
      <form>
      { this.drawFields() }
      </form>
      <button onClick={this.submitResponses}> Submit Responses </button>
    </main>

  }

});
