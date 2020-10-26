Node JS Assignment

Job portal where the employees can apply for the available opening positions in the company. Also, the project managers can add an opening for the project.
A position have the following values:
•   Project Name
•   Client Name 
•   Technologies
•   Role
•   Job Description
•   Status (open/closed)
•   Created by
Status will determine if the position is visible to the employees of the company or not. A project manager can update the position state when the position is no longer available.
The portal will support 2 kinds of users:
1.  Project Managers
2.  Employees
If an employee is interested in a position, he/she can apply for the same.
The following are implemented:
1.  A web server using express framework.
2.  Following REST APIs:

•   See a list of available openings in the company 
This API fetches the high-level details of each opening (Project Name, Role, Technology) and returns them as a result.
There are two APIs implemented for the same - 
a. /jobdetails/employee - This API fetch the high level details of all the jobs that are currently opened.
b. /jobdetails/manager - This API fetch the high level details of all the jobs which are added by the manager who is logged in.
Users can see the full details of the job by clicking on View Details

•   Check the details of any opening (using a valid identifier)
This API fetches all the details relating to a specific opening. 
API URL implemented - /jobdetails
When a user clicks on the View Details for a particular job then this API is called to show the full details of the job.
For employee the Apply button is shown and for Manager the option to Open and Close the Job is present

•   Apply for the opening
This API allows the employees to show interest in a specific opening. Apply with the help of token of a logged in employee user. Save the entry in the database. Once applied, same user cannot apply again for the opening and relevant message should be displayed in the response.
When an employee applies for a position, a notification should be sent to the recruiter. To imitate a notification, you can log it onto the console. Explore custom events for handling this notification. 
API URL implemented - /jobdetails/apply
The user can apply to a particular job by clicking on Apply button shown in front of each job. If he has already applied for the job a message will be displayed to him for the same.
When a job is applied successfully then a message is displayed on console using event emitter.

•   Add an opening
This API allows the recruiter to add a job opening. This should add an entry in database. Make sure to implement relevant validations to facilitate this change. In case of an invalid ID return relevant error code with description
The form for adding the job can be get by the URL - /addjob
API URL for adding job - /addjob/new
Manager can add a job by filling add job form, Proper validations are done for the same

•   Update an opening
This API allows the recruiter to update the opening, if the opening position is closed, a notification should be sent to the employee who has shown an interest. To imitate a notification, you can log it onto the console. Explore custom events for handling this notification.
API URL - /addjob/update
The Manager can change the status of the job by selecting the status from the drop down present in the detailed view of job details.
When the status is set as closed, a notification is showed on console implemented using event emitter.

•   Login
The user needs to login using a password and userId present in the database. The API should return a valid token on successful authentication which can be used for further requests.
API URL - /login to show the login form
API URL - /login/user to actually perform login operation. JWT Strategy and Passport JS is used to perform Authentication

•   Register
The user needs to register using his details. It can accept different types of user roles (employee, manager). Profile picture can also be uploaded, and it should be saved in a specified folder on server. Use file system for storing the profile picture images.
API URL - /register to show register page
API URL - /register/new to perform register operation
The profile picture is stored in the uploads folder
 
   The correct HTTP verbs are used to implement the APIs.   
   Relevant status code are returned for success and errors. 

3.  Created frontend using EJS containing the following pages.
a.  Register
b.  Login
c.  Opening list
d.  Opening detail – can also apply to it.
e.  Create and update an opening 
Additionally, there is a header with navigation, relevant user information, logout button.
4.  Middlewares are used for the below items
a.  Validations
b.  Errors
c.  Authorization
5.  Created authentication mechanism using PassportJS and JWT strategy.
6.  Authorized the following APIs
a.  Create an Opening – Manager
b.  Update an Opening – Manager of the opening
c.  Apply for Opening – Authenticated employee 
d.  Available Openings – Authenticated employee
e.  Details of an opening - Authenticated employee
f.  Login – Open to all
g.  Register – Open to all
7.  Written unit tests using mocha and chai for the above-mentioned APIs.
8.  Used best practices for code structuring.
9.  Used relevant schema in Mongo DB / any other relational database and hosted them over any free cloud service (e.g : https://mlab.com/ or mongodb atlas cloud for mongodb).
10. Created a readme file and provided a brief explanation of approach followed.
11. Took assumptions wherever necessary.

Note : Error page created which displays any invalid URL entered in browser or accessing unauthorized data, validations , etc.






