const React = require('react')
//
// const ReactField = React.createClass({
//   render(){
//     debugger
//     const fieldName = this.props.fieldData["fieldName"];
//     const fieldType = this.props.fieldData["fieldType"];
//     const inputHandler = this.props.fieldData["handler"];
//
//     return (
//       <div>
//         <label htmlFor={fieldName}>{fieldName}</label>
//         <input type={fieldType}
//           id={fieldName}
//           onChange={inputHandler}
//           value={this.props.fieldValue}
//         />
//       </div>
//     )
//   }
// });

const Field = {
  build(fieldName, fieldType, handler, fieldValue){
    const ReactField = React.createClass({
          render(){
            return (
              <div>
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
    return (<ReactField/>)
  }
}

  //    <Field fieldData={ {fieldName: fieldName,
  //                      fieldType: fieldType,
  //                      handler: handler,
  //                      fieldValue: this.state[fieldName]} }/>
//    )
//  }
// }


module.exports = Field;
