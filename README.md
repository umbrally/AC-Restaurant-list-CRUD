# Restaurant Pocket List

Favorite restaurants lis 

# Snapshot

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Install node.js by nvm
* download nvm-setup.zip from nvm-windows on github and then unzip it
* install LTS version of node.js
```
$ nvm install 10.16.0
```

### Installing

1. Download this project 
```
$ git clone https://github.com/umbrally/AC-Restaurant-list-CRUD.git
```

2. Install packages used in this project
```
$ npm install
```
4. Import seed data
```
$ node ./models/seeds/restaurantSeeder.js
```

5. [http://localhost:3000](http://localhost:3000) on your browser
```
$ npm run dev
```


## Features

* Create new restaurant
* Read restaurant detail information
* Edit, delete function on main page and detail page.
* Alert modal will show if delete button is clicked. 
* Search restaurants with keywords of name or location or category.
* Sort by A-Z or Z-A of English name, category, rating and location.

## Authors

* [Zoey Liu](https://github.com/umbrally) 