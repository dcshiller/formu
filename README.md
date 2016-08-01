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

### Structure

[View wireframes][views]

[View components][components]

[View Flux Structure][flux]

[View API endpoints][apiendpoints]

[View tables][tables]


[views]: docs/views.md
[components]: docs/components.md
[flux]: docs/flux.md
[apiendpoints]: docs/apiendpoints.md
[tables]: docs/tables.md


### Implementation Time line

Phase 1: Setup Basic Structure (2 days, W1 W 6pm)

Objective: Create back-end, allow users.

  * create User model
  * authentication back end setup
  * create StaticPages controller and root view
  * set up webpack & flux scaffold with skeleton files
  * setup APIUtil to interact with the API
  * set up flux cycle for front end auth
  * user signup/signin components
  * blank landing component after signin
  * style signin/signup components
  * seed users

Phase 2: Design Features (2 days, W2 M 9am)

Objective: Basic form design features completed.

  * create Form, Form-Field, Form-Field-Option models
  * CRUD API for Forms, Form Fields, Form Field Options
  * Implement interface for form creation.
  * Create sample forms

Phase 3: Form Index and Assignments

Phase 4: Form completion

Phase 5: Response view
