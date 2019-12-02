# YOUR PRODUCT/TEAM NAME

> _Note:_ This document is intended to be relatively short. Be concise and precise. Assume the reader has no prior knowledge of your application and is non-technical. 

## Description 
 Our product will be a website that will allow prospective medical school applicants in Canada to **calculate the cumulative cost of the application process**, and to **notify them of alternatives and deadlines** for various steps in the process.
 The problem we hope to address is **poor accessibility of information regarding the financial aspect of medical school applications**. There are two main types of information that are of particular interest. The first is information regarding the **various costs involved in the medical school application process**, such as transcript costs, exam preparation resources, and interview preparation, which differ based on instutition, mehod of preparation, location and so on. The second is information on **cheaper alternatives available to the applicant** for various steps in the application process, for example, a cheaper MCAT prep course or a business that provides a cheaper interview prep consultation. The problem is important because the cost of the entire application process can easily reach in excess of 10,000 CAD, which places heavy strain on financially-struggling applicants.

## Key Features
#### User Profile
The User Profile page allows users to view and edit their stored name and email.
Users also have the ability to change their account password.

#### Calculator Page
The Calculator Page displays to users all expenses related to the medical school application process, in an easy to follow step by step process.
At each step, the user is given a list of options to choose from for each type of expense. Once users select their desired expense options, the calculators total cost will update.
This allows users to get an overview of how much the application process will cost them. The options chosen by users will be saved in our database for the users future reference.

#### Admin Page
Overtime, the expense data currently stored in the system could become outdated. We are giving admins to the site the ability to create, update, and delete current expense information on the Admin Page. Once updated, users who visit the site will be able to view the new expense information.

#### Exporting Cost Breakdown
The last page of the calculator will allow users to see the breakdown of their expenses after they finish checking off their expenses in the calculator. Users will have an option to export the breakdown to a csv file so they can have a copy even when not logged in to the app.

## Instructions
1. Visit https://med-school-calculator.firebaseapp.com
2. When first visiting the site, you will need to create an account. Click the 'Sign Up' button
3. Once the sign up process is complete you will be redirected to a blank page with 3 clickable buttons on the top left of the screen

#### Profile Usage
1. Click on the Profile button on the top left of the page.
2. To edit your profile, click 'Edit Profile', make your changes and click submit or cancel.
3. To change your password, click 'Edit Password', insert new password and confirm new password, then click submit or cancel.

#### Calculator Usage
1. Click on the Calculator button on the top left of the page.
2. Click on one of 'Interview Process', 'Application Submission', 'MCAT' to select your expenses.
3. Once you are satisfied with your selection of expenses, you can view the total cost for the application process in the 'Breakdown' tab.

#### Admin Usage
1. To gain access to Admin functionality please Logout and login with user: lucas.m.gismondi@gmail.com pass: 1234abcd
2. Click the Admin button on the top left of the screen.
3. To create an expense Type, scroll to the bottom of page and click 'Add Type', insert name and click submit, or click cancel.
4. To edit an expense Type, click edit next to the Type you would like to edit, insert new name and click submit, or click cancel.
5. To delete an expense Type, click delete next to the Type you would like to delete .
6. To create an expense Sub Type, scroll to the Type you want to add a Sub Type to and click 'Add Sub Type', insert name and click submit, or click cancel.
7. To edit an expense Sub Type, click edit next to the Sub Type you would like to edit, insert new name and click submit, or click cancel.
8. To delete an expense Sub Type, click delete next to the Sub Type you would like to delete.
3. To create an Expense, scroll to the Type/Sub Type you want to add an Expense to and click 'Add Expense', insert name and click submit, or click cancel.
4. To edit an Expense, click edit next to the Expense you would like to edit, insert new name and click submit, or click cancel.
5. To delete an Expense, click delete next to the Expense you would like to delete.

All changes are automatically saved
 
## Development requirements
* If a developer were to set this up on their machine or a remote server, what are the technical requirements (e.g. OS, libraries, etc.)?
* Briefly describe instructions for setting up and running the application (think a true README).

#### Local
1. Ask for access to the codebase and Firebase project.
2. ```git clone https://github.com/csc301-fall-2019/team-project-uoft-faculty-of-medicine.git```
3. ```cd team-project-uoft-faculty-of-medicine/med-school-calculator```
4. ```npm install```
5. ```npm start```

#### Deploy to Firebase Hosting
1. Ensure you are on the branch you wish to deploy, typically master.
2. ```cd team-project-uoft-faculty-of-medicine/med-school-calculator```
3. ```npm run build```
4. ```firebase deploy```
5. Visit the link Firebase generates.

 ## Licenses 

 Keep this section as brief as possible. You may read this [Github article](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/licensing-a-repository) for a start.

 * What type of license will you apply to your codebase?
 * What affect does it have on the development and use of your codebase?
 * Why did you or your partner make this choice?

We will be licensing our code with the MIT license. The main reason for using this license is so that our partners are able to freely do what they wish with the codebase (modify, sell copies of the software, publish etc.) without our team being liable for any damages.