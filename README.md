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

# Login Page
![image](https://user-images.githubusercontent.com/8033523/182104306-f8fc9325-f476-4dbb-9ac9-7d6df2b1c7c2.png)

# Signup Page
![image](https://user-images.githubusercontent.com/8033523/182104349-82112728-10b4-4c27-8c8e-82969552b7ff.png)

# Posts Page
![image](https://user-images.githubusercontent.com/8033523/182104418-f873f5d3-e583-432e-981e-90a0f7170d80.png)

# Create New Post Page
![image](https://user-images.githubusercontent.com/8033523/182104453-e19c5e0b-2ba5-4cf7-928b-b98ce7eed9fa.png)

# Create New Comment Dropdown
![image](https://user-images.githubusercontent.com/8033523/182104599-fa578330-a190-48f1-843b-3d80ff0c5ef5.png)

# Edit Comment and Post Dropdowns
![image](https://user-images.githubusercontent.com/8033523/182104750-0e7fde18-03b3-4828-ba44-b31972f9eb97.png)


# Challenges
* Some challenges we ran into as a group while building our app was the styling that had to be done on some buttons. When we were happy with styling for a button and got the CSS to how we want it, we quickly realized that it messed up the functionality somewhere on our button. Going back and forth between styling and functionality was challenging but worth it.
* Getting the like/unlike to work how we wanted it when clicking on an empty heart vs clicking on a filled out heart was extremely tricky to us we thought.

# Future Features
* Liking Comments
* Search Bar to search tags/users
* more detailed profile pages
