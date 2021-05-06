﻿# Welcome to QCfirst

The final programming project of CS355
<a href="https://qcfirst-1.jihoonk1116.repl.co/index.html"> [liva app] host by Repl.it</a>
<br>(Both of the student and the instructor sides can be accessed from the index page, choosing the role.)

<a href="https://github.com/ganiasif98/ganiasif98.github.io/tree/master/Final">Student side source code</a> - Asif Gani<br>
<a href="https://github.com/jihoonk-1116/jihoonk-1116.github.io/tree/master/finalProject">Instructor side source code</a> - Chihoon Kim


# Visual Designs of QC first
* [User management Deliverable](#d4)
* [CSS Deliverable](#d3)
* [Site](#sitemap)
* [Login Page](#login)
* [Sign-up Page](#sign-up)
  

* [Student](#student)
    * [Student-Overview](#student-overview)
    * [Add classes](#add-class)
    * [Edit-Profile-Window](#edit-student-profile)
    * [Enroll-Class](#enroll-class)
  
  
* [Instructor](#ins)
    * [Overview](#overview-ins)
    * [My Schedule](#schedule)
    * [Roaster](#roaster)
    * [Student Details Mini-window](#student-details-ins)
    * [Class Details Mini-window](#class-details-ins)
    * [Add a new class Mini-window](#add-mini-ins)
    * [Remove class Mini-window](#remove-mini-ins)
   
## Site Map 
# <a name="sitemap"></a>
![sitemap](imgs/sitemap.png)

## Login Page 
# <a name="login"></a>
![login](imgs/login.png)
Log-in page decides that a user is a student or an instructor. <a href="instructor\index.html" target="_blank">[Code]</a><a href="https://jihoonk-1116.github.io/final/index.html" target="_blank"> [Page]</a>

## Sign-up page
# <a name="sign-up"></a>
![sign-up](imgs/signup.png)
Users who want to sign-up are required their unique given number. <a href="instructor\signup.html" target="_blank">[Code]</a><a href="https://jihoonk-1116.github.io/final/signup.html" target="_blank"> [Page]</a>

# Student side

### Overview page
# <a name="student"></a>
![student-overview](imgs/Student-Overview.png)
On this page you are able to view the information about the student, view their schedule for that semester, and a link to add classes. 
<a href="Student\student_overview.html" target="_blank">[Code]</a><a href="https://ganiasif98.github.io/Final/student_overview.html" target="_blank"> [Page]</a>

### Edit Profile Mini Window
# <a name="edit-student-profile"></a>
![edit-student-profile](imgs/Edit-Profile.png)
This is a window that will be opened when the edit profile button is clicked, and here you can update the information about the student.
<a href="Student\edit_profile.html" target="_blank">[Code]</a><a href="https://ganiasif98.github.io/Final/edit_profile.html" target="_blank"> [Page]</a>

### Add Class
# <a name="add-class"></a>
![add-class](imgs/Add-Class.png)
Here students can search classes depending upon which college they go to, the semester they want to search classes from, as well as the course #, or name. Also have the option to modify the search or clear the search.
<a href="Student\search_class.html" target="_blank">[Code]</a><a href="https://ganiasif98.github.io/Final/search_class.html" target="_blank"> [Page]</a>

### Enroll Class
# <a name="enroll-class"></a>
![enroll-class](imgs/Enroll-Class.png)
Here students can view all the classes that corresponds to the given search in the previous window By the clicking the 3 dots you are redirected to another link where you can add the class.
<a href="Student\enroll_class.html" target="_blank">[Code]</a><a href="https://ganiasif98.github.io/Final/enroll_class.html" target="_blank"> [Page]</a>

### Detail Page 1
<a href="Student\class_detail.html" target="_blank">[Code]</a><a href="https://ganiasif98.github.io/Final/class_detail.html" target="_blank"> [Page]</a>

### Detail Page 2
<a href="Student\class_detail2.html" target="_blank">[Code]</a><a href="https://ganiasif98.github.io/Final/class_detail2.html" target="_blank"> [Page]</a>

# Instructor side <a name="ins"></a>
### Overview page <a name="overview-ins"></a>
![overview](imgs/overview.png)
This page gives overall information about a instructor's class. 

### My Schedule <a name="schedule"></a>
![schedule](imgs/schedule.png)
Instructors enable to check his or her schedules visually on this page.

### Roster <a name="roaster"></a>
![roaster](imgs/roster.png)
Instructors can access students' information who register the instructor's class. 

### Student Details Mini-window <a name="student-details-ins"></a>
##### *All of these Mini-window designs are using 8-grid for desktop, tablet <br>and 4-grid for mobile.
![student-details](imgs/student-details.png)
This mini-window is for checking a student details, and is connected with the roaster page.

### Class Details Mini-window <a name="class-details-ins"></a>
![class-details](imgs/class-details.png)
This mini-window is for checking a class details, and is part of the overview page. 

### Add a new class Mini-window <a name="add-mini-ins"></a>
![add-mini](imgs/Add-mini.png)
This mini-window is for adding a new class, and is part of the overview page.

### Remove class Mini-window <a name="remove-mini-ins"></a>
![remove-mini](imgs/remove-mini.png)<br>
This mini-window is for confirming removing a class before deleting, and is part of the overview page. 

## CSS Deliverable <a name="d3"></a>

#### Differences between wireframes and deliverable

Kim: When I drew the wireframes for this project, I felt that designing of website is not harder than my expectation because wireframing can be depicted as I thinking. When I writing HTML code, also, I felt that designing is not hard. The CSS deliverable, but, is totally different level. I spent a half-day aligning the index page's layout. After I decided that my CSS ability is not enough to implement, I used the Bootstrap framework. It is really powerful in terms of aligning content, designing the layout, and even responsiveness. Because of it, I can complete the CSS deliverable following my wireframes.  The biggest difference between the two is that designing a web page is impossible without understanding CSS, HTML, and several features such as display, box model, grid layout, selector, etc. Also,  implementation of responsiveness can be done with several techniques such as shrink font size, margin and padding, modifying the layout, and its design.

Asif: Overall, when I drew up the wireframe for this project, I felt the design would be as hard as creating the wireframe and so the wireframe was only portraying what I was thinking at that moment. As I progressed into the design portion and I started doing CSS, the design portion felt not as overwhelming as the wireframe. We felt that including bootstrap into our HTML made the design much smoother and I was able to include small details in the html that made the design much easier to navigate. I was able to add the class details and the edit profile using bootstrap instead of having seperate html files for each. 

## User management Deliverable <a name="d4"></a>

This app is used Nodejs and Express for the backend server, and mongoDB for database. User management required us to implement input validation and a few of APIs, such as creating new user data, checking the user authentication, updating the user profile on the profile section. 

 #### Front-end user validation
 
 
 
 #### Log-in & sign-up and authentication system
  For the system, we need to implement user APIs to handle user data with our DB. First, the model for user schema is needed to store in MongoDB. The schema is composed of like the figure: <br>
  
  ![image](https://user-images.githubusercontent.com/76544061/117223641-14e69c00-addc-11eb-8317-5c52e41a82d0.png)
  
  
 The code and email fields are unique so that a user has one unique code and eamil. Then, /signup API is implemented to save user information. We used 'bicypto' to encrypt password and 'mongoose' to interact with our database. The logic stream for the API like this: 
 Parse request -> encrypt password using bcypt -> code check using mongoose method(findOne()) -> if the code is valid -> Create user and save -> if the user's code and email is not duplicate value -> Server response to the frontend with JSON data. <br>
 
 ![image](https://user-images.githubusercontent.com/76544061/117224785-cb4b8080-adde-11eb-9f8f-6720e0f7e66d.png)


Next API is /login API. It supports a user who wants log in the website with his email and password. The request for the API begins with user's role, email and password. Then, The API checks the user is registered using findOne() method. If the user was registered before signing in, a JSON Web Token is being issued for the user with the secret key what we made. Then, the token data is being returned, and the frontend parse the response using .json() method. If the token is not error, the token is being stored it in localStorage.
<br>

![image](https://user-images.githubusercontent.com/76544061/117225836-49108b80-ade1-11eb-8884-0354714d652c.png)


Third API is /getuserinfo API. This API is to update overview's profile section and to manipulate DOM contents dynamically depending on the user who successes log in. For acquiring the user data, the token that is created before must be handed over to the backend and be attached requested header. <br>

![image](https://user-images.githubusercontent.com/76544061/117226266-406c8500-ade2-11eb-97d2-5b33731c602f.png) 

Then the server can check and use the token to validate the user and get user data from database. At this part, JWT decode() method is used with server secret key that we initialized before. If the token is valid(the user is a registered user), then the user information is being returned as JSON data. If the response is successfully transferred to the frontend, then it manipulates HTML contents using selecting class and id.   <br>

![image](https://user-images.githubusercontent.com/76544061/117227055-fb495280-ade3-11eb-8591-832d51e02f68.png)

#### Our Feedback

Chihoon:

Asif:
 

#### Contributors:
Chihoon Kim (https://github.com/jihoonk-1116)<br>
Asif Gani (https://github.com/ganiasif98)
