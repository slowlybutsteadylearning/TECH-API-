
# GLOBAL TECH HUB
![image](https://e7.pngegg.com/pngimages/73/246/png-clipart-computer-icons-internet-of-things-symbol-organization-research-symbol-miscellaneous-angle.png)

A new startup just hired you as the senior backend developer and you are tasked to create a 
web app providing digital services ranging from shared work-space, an academy that 
provides upskills for four different courses (Backend Development, Data Science, Front-End 
Development and Machine Learning) and Outsourcing services.

## END POINTS
User must be able to:
1. Sign Up
2. Login
3. Register for at least a course in the Global Tech Academy
4. See all services provided by the company
5. Edit his/her personal information including previous course registered
6. Book a space in the Hub.
Note: 3,5 routes must be protected.
Admin must be able to:
1. Sign Up
2. Login
3. See the total number of students registered in the academy
4. Approve a specific student that paid for a course
5. Get the total amount of all approved students

## ENDPOINTS

users

- `POST` https://techhub.herokuapp.com//signup:
- `POST` https://techhub.herokuapp.com/login
- `GET` https://techhub.herokuapp.com//services
- `GET` https://techhub.herokuapp.com/courses
- `GET` https://techhub.herokuapp.com/register
- `PUT` https://techhub.herokuapp.com/update
- `GET` https://techhub.herokuapp.com/bookings
  admin
- `POST` https://techhub.herokuapp.com/api/signup
- `POST` https://techhub.herokuapp.com/api/login
- `P0ST` https://techhub.herokuapp.com/api/course
- `P0ST` https://techhub.herokuapp.com/api/upload
- `P0ST` https://techhub.herokuapp.com/api/upload
- `P0ST` https://techhub.herokuapp.com/api/registrations
- `GET` https://techhub.herokuapp.com/api/totalcount
- `PUT` https://techhub.herokuapp.com/api/users/:id
- `GET` https://techhub.herokuapp.com/api/sum

# How to use this project

Also install these packages

```
npm init -y
```

```
npm i express MySQL dotenv bcrypt jsonwebtoken joi color
```

Run this program with this command

```
npm run dev
```
Create your .env file

```
PORT=4666
DB_HOST=***
DB_NAME=***
DB_PASSWORD=***
DB_PORT=***
DB_USER=***
```

### API documentation
Click the link below to view the postman documentation

https://documenter.getpostman.com/view/25486084/2s93Y6ufVt