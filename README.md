# Restaurant Pocket List

Favorite restaurants list 

# Snapshot

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

1. Install node.js by nvm
    * download nvm-setup.zip from nvm-windows on github and then unzip it
    * install LTS version of node.js 
```
$ nvm install 10.16.0
```
2. MongoDB  

### Installing

1. Download this project 
```
$ git clone https://github.com/umbrally/AC-Restaurant-list-CRUD.git
```

2. Install packages used in this project
```
$ npm install
```

3. Import seed data

```
$ npm run seeder
```

4. Create facebook login OAuth
[Facebook for Developers](https://developers.facebook.com/)
Create an new app and using facebook login, and then get applicaiton ID and application Secret. 

5. Set .env and use it
Step 1. Create an .env file in root.

Step 2. Write env data as following. 
```
FACEBOOK_ID=//your fackbook application ID from '4. Create facebook login OAuth' setting
FACEBOOK_SECRET=//your fackbook application Secret from '4. Create facebook login OAuth' setting
FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback 
```

6. [http://localhost:3000](http://localhost:3000) excution on your browser
```
$ npm run dev
```


## Features

* User can register by giving email and password. If the email is registered, user will be reminded.
* User can login by email/password or facebook. If email or password is incorrect, user will be reminded. 
* If login is not successful, user will not visit any page and redirect to login page.
* After login is successful, an login session will created and save cookie in user's side. Then, user can use following function:
  ** Only the restaurants created by the user will be showed.
  ** Create new restaurant.
  ** Read restaurant detail information.
  ** Edit, delete function on main page and detail page.
  ** Alert modal will show if delete button is clicked. 
  ** Search restaurants with keywords of name or location or category.
  ** Sort by A-Z or Z-A of English name, category, rating and location.
  ** Back to top button will appear after the index page is scrolled. User can click it to go back to the top.  
* User can logout and session will be deleted.  

## Authors

* [Zoey Liu](https://github.com/umbrally) 
