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

Phase 3: Form Index and Assignments (2 Days, W2 T 6pm)
  * Setup Form / FormInFocus Stores
  * Allow Forms to be indexed by user
  * Delete and seal-toggle flux cycles
  * Setup Individual Form Store
  * Allow forms to be viewed
  * Allow forms to be assigned by email

Phase 4: Form completion (1 Day, W2 W 6pm)
  * Allow access to individual forms by formid
  * Fields can be filled out by user
  * Respondee submission saves form in database.

Phase 5: Response view (1 Day, W2 Th 6PM)
  * Responses page setup
  * Form submission makes response available to designer's responses page

Phase 6: CSS (1 Day, F 5:30PM )
  * systematize and tweak style
  * ensure that all components run smoothly
  * remove *all* glitches and bugs
