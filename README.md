# UWI Programme Admin website
This website is made for administrative personnel in charge of uploading and viewing entry requirements for degree programmes at the University of the West Indies. 
Currently available [here](https://uwiprogrammeadmin.firebaseapp.com)

Run `npm install` and then `ng serve` to run the application, defaults to localhost:4200
Due to this angular application using a material pro template, within src/app there are a number of extra directories such as layouts, material-component and starter.

starter component is the home page, edit-programme-page component is the view page, and login-page component is the login page.

## Structure and routing of the application
Within src/app/layouts, there is a folder called full. This is the full component and contains the entire application. It consists of the header component (a toolbar at the top of every view) as well as as a sidebar component (a list of items each with routing attached). 
When an item on the sidebar is clicked, only the `<app-spinner>` in the full.component.html is affected. 

The items displayed in the sidebar are taken from src/app/shared/menu-items/menu-items.ts. Each item in this list of menu items is an object. The state property is the link that app.routing.ts recognizes. The name property gives the value of what is displayed in the sidebar. The type property should have 'link' as the value. 
If a new item has to be added to the sidebar component, here's how to set up the routing:
1. Make a new component to navigate to, make sure it is inside of src/app. A new component can be generated with angular CLI ( `ng generate component component_name` or `ng g c component_name`).     
2. Make a new object in the MENUITEMS array of the menu-items.ts file, following the same format as all the other objects. The state should be the url for the routing without the forward slash (eg. if '/test' is the url that navigates to a component, then 'test' should be the value of the state property. This ensures that the value shows up in the sidebar. 
3. Within the app.routing.ts file, add a new object to the children array. This object has two properties: path and loadChildren. Path should be the exact value of the state in the menu-items.ts file (eg. if '/test' is the url, then 'test' should be the value of the path property). loadChildren should be the path (relative to app.routing.ts) of the component to be loaded upon navigation.
Routing should be finished at this point.

The material component folder simply contains all the material angular components needed for UI of the application.
data-layer.service.ts contains all the get and post requests needed for the home and view pages.


## Login View -> /login
(Firebase Authentication not set up yet) A person will be able to login with their details and will automatically be routed to the home page 

## Home View -> /home
The home view will display the number of programmes offered by each faculty as per the data inside the database. An administrator can upload an excel file containining all the programmes, requirements as well as additional info. This will refresh the database and the new values will be displayed

## Programme View -> /view
This view will contain a list of faculties for the user to select. A list of all programmes offered by that faculty is returned in a scrollable div underneath the faculty dropdown. Clicking on a programme will reveal all the necessary requirements to qualify for that programme. Scrollable div still needs to be fixed on Edge.

# Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

# Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

# Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

# Generate further documentattion

`npm run compodoc`
