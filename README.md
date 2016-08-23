# [For*μ*][link]
[link]: https://formu.derekshiller.com
*A form building website.* <br/>
formu.derekshiller.com

### Overview
<!-- ![GUI](./docs/ForMuGUI.png) -->

This website reproduces some of the essential functions of survey monkey's Wufoo.com. The site centers on a dynamic form-building application, that allows for drag and drop placement of fields and structural elements. The site also hosts the forms, which can be filled out by anyone with the appropriate link. All responses to a given form are available on the designer's index page.


### Main Features

* User signup, login, and session authentication
* Drag and drop form-building GUI
* Indexing of created forms for each user
* Online form completion with email invitations
* User access to results for completed forms


![MainScreenshot]
[MainScreenshot]: ./docs/ForMuFrontPage.png

![Editor]
[Editor]: ./docs/Editor.png

![Index]
[Index]: ./docs/Index.png

### Implementation

#### Architecture

On the back end, this site is built with Ruby on Rails and uses a PostgreSQL database to store persistent data.

This website is a single-page application. There is one HTML entry point. All other communication with the back end is carried out with AJAX requests and JSON responses. This allows the site to remain functional while requests are being processed, and contributes especially to a smoother form-design process.

On the front end, the major components of the site were constructed with React, using React Router. React routes allows components to be easily linked to particular URL path locations, and makes code reuse easy. Since forms play an essential role in the main features of the site, and since a form is essentially a sequence of fields, the site uses its own routing scheme to allow fields to be generically but efficiently implemented with flexible options hashes.

The causal architecture of the website follows a Flux design philosophy. All information as part of a loop: website -> back end / store-router -> local store -> website. For instance, when a field is added to the GUI design interface, the user sends a message that gets routed to the local store to add a field, which then gets rendered. When a user saves the form, a message is sent to the back end with the form data, which responds by supplying ids to allow the form to be tracked in the future. Those ids are saved in the store, and sent to the view, where they are reflected in the HTML input objects. This makes debugging especially straightforward, as there is a set path that one can take to figure out exactly where any problem might be occurring.

#### Databases

The site has three main kinds of data: users, forms, and form responses. All three are saved to a collection of tables in a PostgreSQL database.

Forms are split up across three tables: forms, form fields (entries), and form field choices (options for a given entry). Responses are split across two. These tables are accessed by the front end in the form of JSON objects. JBuilder is used to massage the form data from the database into the structure that will be easiest to use in generating sequences of fields in JavaScript. On the other end, forms and responses received from the front end are converted into something that Active Record can easily save in the associated tables in the database.

**Form Fields Table Schema**

| Column Name | Type |  Relation | Other |
| :------------- | :------------- | --- | --- |
| Id | Int | - | - |
| Type | String | - | Not Null |
| Form_Id | Int | Forms:Id | Not Null, Indexed |
| Label | String | - | Not Null |
| Instructions | Text | - | - |
| Form_Position | Int | - | Not Null |

**Form Field Options Table Schema**

| Column Name | Type |  Relation | Other |
| :------------- | :------------- | --- | --- |
| Id | Int | - | - |
| Form_Field_Id | Int | Form_Field:Id | Not Null, Indexed |
| Option_text | String | - | Not Null |



#### Field Components

Given the heavy use that this site places on form fields, all field components on the site were constructed with a generic React 'Field' component. This component takes an options hash, and uses that information to construct and assemble appropriate sub-components.

```javascript
wrapIfNecessary () {
  switch (this.props.fieldVals.fieldType) {
    case "text" :
    case "number" :
    case "password" :
    case "paragraph" :
    case "checkbox" :
    case "radio" :
      return (
        this.wrapDiv(2, this.addLabelAndInstructions(),
                        this.directToProperInputMaker())
      );
    case "rule" :
    case "section_title" :
      return this.directToProperStructuralElementMaker();
    break;
  }
}
```
{+{}"{}"}
```javascript
<div key = {`choice_div_${fieldVals.fieldId}`}>
 {
  fieldVals.choices.map(function(choice, index) {
  return (
    <label  htmlFor    =       { fieldVals.fieldId + "_choice_" + index + "_"  + choice.id  }
            id         =       { fieldVals.fieldId + "_label_" + index + "_" + choice.id }
            key        =       { fieldVals.fieldId + "_label_" + index + "_" + choice.id }
            className  =       { fieldVals.fieldType + "choice" }
           >
        { choice.choice_text }
        <input
            type        =       { fieldVals.fieldType }
            id          =       { fieldVals.fieldId + "_choice_" + index + "_" + choice.id}
            key         =       { fieldVals.fieldId + "_choice_"  +
            name        =       { fieldVals.fieldId }
            className   =       { fieldVals.className }
            onChange    =       { fieldVals.handler }
            onSelect    =       { fieldVals.onContainerClick }
            value       =       { choice.id }
            />
      </label>
```

#### Conditionalizing Methods

In order to streamline code and deal with complex properties, I wrote several  conditionalizing methods that only 'fire' if the appropriate object exists. This prevents JavaScript from throwing an error if no appropriate object tree exists.

```javascript
window.doIfDefined = function(func, context, ...args){
  let funcName = func.name || func
  let arg = getIfDefined(context, ...args)
  if (arg !== undefined) {
    if (func instanceof Function)
      { func.call(this, arg)}
    else if (arg[funcName] instanceof Function)
      { arg[funcName].call(arg) }
    else if (context[funcName] instanceof Function)
      { context[funcName].call(context, arg) }
  }
};
```

```javascript
if (getIfDefined(this.props, "location", "query", "user") === "Guest")
```
