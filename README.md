# Welcome to the Polagram README!
Polagram was built with the intentions of being an Instagram clone. At Polagram you can expect to be able to do all the things you would be able to do on Instagram like commenting on posts, posting posts with images and captions, and liking posts!

# Technologies Used
* Frontend: React
* Backend: PostgreSQL, Python
* Heroku(website hosting)

# Live Site Demo
[DEMO LINK](https://polagrampython.herokuapp.com/)

# Installation
Clone Polagram into your desired directory:
* run `npm install` in the `react-app` (frontend) directory to install required dependencies
* run `pipenv install` in the main root directory to install (backend) required dependencies
* create an `.env` file in the root of the directory and refer to the `.env.example` file provided for you
* refer to [SEQUELIZE DOCUMENTATION](https://sequelize.org/docs/v6/other-topics/migrations/) on how to create a database
* to run the app in development mode `CD` into the root directory and `flask run` (make sure you ran `pipenv shell`)
* next `CD` into `react-app` (frontend) and npm start, wait a minute for the localhost to start up, and you have Polagram up and running!

# Wiki Docs
[DATABASE SCHEMA](https://github.com/john0123456789/Polagram/wiki/DATABASE-SCHEMA)

[FEATURE LIST](https://github.com/john0123456789/Polagram/wiki/FEATURE-LIST)

[USER STORIES](https://github.com/john0123456789/Polagram/wiki/USER-STORIES)

# Challenges
* Some challenges we ran into as a group while building our app was the styling that had to be done on some buttons. When we were happy with styling for a button and got the CSS to how we want it, we quickly realized that it messed up the functionality somewhere on our button. Going back and forth between styling and functionality was challenging but worth it.
* Also wrapping our heads around the `likes` and `followers` join tables conceptually and getting those to work and figuring out the relationships was a real doozy. But once we got one to work, the other shortly followed.

# Future Features
* Liking Comments
* Search Bar to search tags/users
