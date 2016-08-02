# For*μ*

  *A form building website.*

  [Link coming soon]

### Minimum Viable Product

* User account creation, login, and guest/demo login
* Form Design
  * Basic field options
  * Drag and drop field placement
* Form Assignment
  * Index of designed forms
  * Assignment of forms to email addresses
* Form Completion
  * Individual form display
  * Ability to submit form
* Form Review
  * List of all forms filled out
  * Display individual form responses by user

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

[View flux structure][flux]

[View API endpoints][apiendpoints]

[View tables][tables]


[views]: docs/views.md
[components]: docs/components.md
[flux]: docs/flux.md
[apiendpoints]: docs/api_endpoints.md
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
  * Implement interface for form creation
  * Create flux actions linking backend with form design views.
  * Create sample forms

Phase 3: Form Index and Assignments (2 Days, W2 T 6pm)
  * Setup Form / FormInFocus Stores
  * Create form index views, with necessary linking to stores and backend
  * Include delete and seal-toggle flux cycles
  * Allow forms to be viewed on respond page
  * Create form assignment panel
  * Create guest user, make sample forms

Phase 4: Form completion (1 Day, W2 W 6pm)
  * Allow access to individual forms by formid
  * Fields can be filled out by user
  * Establish connections beween form respond page and backend.

Phase 6: Response view (2 Days, W2 F 6PM)
  * Responses page setup
  * Create sample forms and responses for guest account
