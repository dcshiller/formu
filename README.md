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


### React Components


### Api Endpoints


### Database Schema


  | Table |
  |------|-------|-------|-------|-------|-------|
  |Users | id*    |*__username__*   |password| *__email__* |   
  |Forms | id$    |*__designer__*(\*) |title | instructions (A.N.) | mutable |
  |Form Fields| id^ | *__form_id__*($) |type | label | instructions (A.N.)|
  |Form Selection | id | *__field_id__*(^) | option_text |
  |Form Assignments | id | *__respondee__*(\*) | *__form_id__*($) | status |
  |Form Responses | id& | *__respondee__*(\*) | *__form_id__*($)|
  |Form Field Responses| id | *__response_id__*(&) | response_value |


  #### Key

  (A.N.): Allow Null

  *__Bolded__* :  Indexed Field

  | primary_key | -> | foreign_key |
  | --- | --- | --- |
  | \*         | ->  |        (\*) |


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
