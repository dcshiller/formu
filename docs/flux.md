# Flux Cycles

## Auth Cycles

### Session API Request Actions

* `signUp`
  0. invoked from `SignupForm` `onSubmit`
  0. `POST /api/users` is called.
  0. `receiveCurrentUser` is set as the success callback.
* `logIn`
  0. invoked from `Navbar` `onSubmit`
  0. `POST /api/session` is called.
  0. `receiveCurrentUser` is set as the callback.
* `logOut`
  0. invoked from `Navbar` `onClick`
  0. `DELETE /api/session` is called.
  0. `removeCurrentUser` is set as the success callback.
* `fetchCurrentUser`
  0. invoked from `App` in `didMount`
  0. `GET /api/session` is called.
  0. `receiveCurrentUser` is set as the success callback.

### Session API Response Actions

* `receiveCurrentUser`
  0. invoked from an API callback
  0. stores in `_currentUser` in `CurrentUserStore`
* `removeCurrentUser`
  0. invoked from an API callback
  0. removes `_currentUser` in `CurrentUserStore`

## Form Cycles

### Forms Design API Request Actions

* `fetchFormDetails`
  0. invoked by `didMount`
  0. `GET /api/forms/:id` is called.
  0. `receiveFormDetails` is set as the success callback.

* `createForm`
  0. invoked from save button `onClick` on design page
  0. `POST /api/forms` is called.

* `updateForm`
  0. invoked from save button `onClick` on design page
  0. `PATCH /api/forms/:id` is called.

-------------------

* `receiveFormDetails`
  0. invoked from API callback.
  0. `FormInFocus` store updates `_FormInFocus` and emits change.


### Forms Index API Request Actions

* `fetchAllFormsForUser`
  0. invoked from `Index` on `didMount`/`willReceiveProps`
  0. `GET /api/forms/` is called with userid.
  0. `receiveAllForms` is set as the success callback.

* `toggleSealForm`
  0. invoked from close button `onClick` on index page
  0. `PATCH` `/api/forms/:id/seal` is called.
  0. `successfulToggle` is set as the success callback.

* `destroyForm`
  0. invoked from delete form button `onClick` on Index.
  0. `DELETE /api/forms/:id` is called.
  0. `removeForm` is set as the success callback.

---------------------

* `receiveAllForms`
  0. invoked from an API callback.
  0. `Form` store updates `_forms` and emits change.

  `successfulToggle`
  0. invoked from an API callback.
  0, `Form` store updates `_form[id]` and emits change.

* `removeForm`
  0. invoked from an API callback.
  0. `Form` store removes `_form[id]` and emits change.


### Form Responses API Actions

* [see fetchFormDetails]

* `getResponses`
  0. invoked by `didMount` on responses page.
  0. `GET /api/forms/:id/responses` is called.

* `getSingleResponse`
  0. invoked by `onClick` on responses page.
  0. `GET /api/forms/:id/responses/:id is called.
  0. `receiveSingleResponse` is set as the success callback.

-------------------------

* `receiveSingleResponse`
  0. invoked from API callback.
  0. `FormInFocus` store updates `_FormInFocus` and emits change.


### Form Respond API Actions

* `submitResponse`
  0. invoked from submit button on response page.
  0. `POST /api/forms/:id/responses/`

### Store Listeners

* `Index` component listens to `Form` store.
* `Index`, `Design`, `Responses` components listen to `CurrentUser` store.
* `Design` component listens to `FormInFocus' store.
