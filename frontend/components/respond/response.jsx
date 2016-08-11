
const React = require('react');
const hashHistory = require('react-router').hashHistory;
const ErrorStore = require('../../stores/error_store.js');
const ResponseStore = require('../../stores/response_store.js');
const FormDatabaseActions = require('../../actions/form_database_actions.js');
const ResponseDatabaseActions = require('../../actions/response_database_actions.js');
// const Field = require('../field');


const Response = React.createClass({

  getInitialState () {
    return {response: ResponseStore.getResponse()}
  },

  componentDidMount () {
    this.responseStoreReceipt = ResponseStore.addListener(this.retrieveResponse);
    this.errorStoreReceipt = ErrorStore.addListener(this.checkErrors);
    ResponseDatabaseActions.getResponse(this.props.params.responseId);
  },

  componentWillUnmount () {
    this.responseStoreReceipt.remove();
    this.errorStoreReceipt.remove();
  },

  checkErrors () {
    let errors = ErrorStore.retrieveErrors();
    if (errors.response === "Not Found"){this.setState({response: "RESPONSE NOT FOUND"})}
  },

  drawResponse (responseObj, index) {
    return (
      <li className="responseWrapper"
          key={`response_${index}`}>
        { responseObj.section_title   &&  <h4 key={`section_title_${index}`}> {responseObj.section_title} </h4> }
        { responseObj.rule            &&  <hr key={`rule_${index}`}/>  }
        { responseObj.response_value  &&
            <label className="question" key={`label_${index}`}>
              {responseObj.field_label}
            </label> }
        { responseObj.response_value  && responseObj.response_value.map(
              function(val, choice_index){
                return <p className="answer"
                          key={`${responseObj.response_value}_choice_${choice_index}`}> {val} </p>
              }
        )}

      </li>
    )
  },

  drawResponses () {
    if (this.state.response == "RESPONSE NOT FOUND")
    {
      return <p className="notFoundMessage"> Response Not Found </p>
    }
    else if (this.state.response && this.state.response.responses)
    {
      let self = this;
      let arrayOfResponses = this.state.response.responses.map(function(response, index){
        return  ( <ul
                      key={`ul_${index}`}>
                    {self.drawResponse(response, index)}
                  </ul>)
      })
      return arrayOfResponses;
    }
  },

  retrieveResponse () {
    this.setState({response: ResponseStore.getResponse()})
  },

  render(){
    return (
      <main className="formContainer responseContainer">
        { <h1 className="formResponseTitle"> { this.state.response.form_title } </h1> }
        <h2> Response ID: {this.state.response.id} </h2>
        <h3> Completed on {this.state.response.created_at} GMT
          <hr/>
        </h3>
        <div>
          { this.drawResponses() }
        </div>
      </main>
    );
  }

});


module.exports = Response;
