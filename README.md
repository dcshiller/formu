# For*μ*

  *A form building website.*

  [Link coming soon]

### Minimum Viable Product

* User account creation, login, and guest/demo login
* Form Creation
  * Basic field options
  * Drag and drop field placement
* Form Assignment
  * Index of created forms
  * Assignment of forms to users
  * Email notification
* Form Completion
  * Index of assigned forms (for each user)
  * Individual form display
  * Ability to Submit form
* Form Review
  * Display form responses by user.

BONUS:
  * Standard Questions
    * A selection of common questions
    * Save fields as standard questions
    * Save sets of fields as standard subfields
  * Save feature for incomplete forms
  * Data in excel format
  * Basic data summary

### Wireframes

[View wireframes][views]

[views]: docs/views.md

### React Components


### Api Endpoints


### Database Schema


##### Users Table

  | Column Name | Type | Relation | Other |
  | --- | --- | --- | --- | --- |
  | Id  | Int | - | - |
  | Username | String | - | Unique, Not Null, Indexed |
  | Email | String | - | Unique, Not Null, Indexed |
  | Password | String | - | Not Null |    

##### Forms Table

| Column Name | Type |  Relation | Other |
| :------------- | :------------- | --- | --- |
| Id  | Int | - | - |
| Designer_Id | Int | Users:Id | Not Null, Indexed |
| Title | String | - | Not Null |
| Instructions | Text | - | - |

##### Form Fields Table

| Column Name | Type |  Relation | Other |
| :------------- | :------------- | --- | --- |
| Id | Int | - | - |
| Type | String | - | Not Null |
| Form_Id | Int | Forms:Id | Not Null, Indexed |
| Label | String | - | Not Null |
| Instructions | Text | - | - |


##### Form Field Option


| Column Name | Type |  Relation | Other |
| :------------- | :------------- | --- | --- |
| Id | Int | - | - |
| Form_Field_Id | Int | Form_Field:Id | Not Null, Indexed |
| Option_text | String | - | Not Null |


##### Form Responses

| Column Name | Type |  Relation | Other |
| :------------- | :------------- | --- | --- |
| Id | Int | - | - |
| Form_Id | Int | Form:Id | Indexed, Not Null |


##### Form Field Response

| Column Name | Type |  Relation | Other |
| :------------- | :------------- | --- | --- |
| Id | Int | - | - |
| Form_Field_Id | Int | Form_Field:Id | Indexed, Not Null |
| Response_Id | Int Form_Response:Id | Indexed, Not Null |
| Response_Value | Text | - | - |  


### Implementation Time line

Phase 1: Setup Basic Structure (2 days, W1 W 6pm)

Objective: Create back-end, allow users.

  * create User model
  * authentication backend setup
  * create StaticPages controller and root view
  * set up webpack & flux scaffold with skeleton files
  * setup APIUtil to interact with the API
  * set up flux cycle for frontend auth
  * user signup/signin components
  * blank landing component after signin
  * style signin/signup components
  * seed users

Phase 2: Design Features (2 days, W2 M 9am)

Objective: Basic form design features completed.

  * create Form, Form-Field, Form-Field-Option models
  * seed the database with a small amount of test data
  * CRUD API for Forms, Form Fields, Form Field Options.
  * test out API interaction in the console.
  * implement each note component, building out the flux loop as * needed.

Phase 3: Form Assignments

Phase 4: Form completion

Phase 5: Response view
