### Principal Components

* App
  * NavBar
  * User Login Form
  * User Signup Form
  * Form Design page
    * Selection Panel
      * Field Addition Tab
      * Field Properties Tab
      * Form Properties Tab
    * View Panel
      * Field Items
  * Form Index Page
    * Form Items
    * Share Form
  * Response Review Page
    * Respondent List
    * Field Items
  * Form Respond Page
    * Field Items


### Routes

* Component: **App**  *Path:* `/`
  * Component: **Login**  *Path:* `/login`
  * Component: **Sign Up**  *Path:* `/signup`
  * Component: **Form Design Page**  *Path:* `/design/:formid`
  * Component: **Index** *Path:* `/` redirects to `/username/index`
    * Component: **Index** *Path:* `/username/index`
    * Component: **Review** *Path:* `/username/review/:formid`
  * component: **Respond** *Path:* `/responses`
