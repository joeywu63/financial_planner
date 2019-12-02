# FINANCIAL PLANNER FOR CANADIAN MED-SCHOOL APPLICANTS 

## Description 

 Our product will be a website that will allow prospective medical school applicants in Canada to **calculate the cumulative cost of the application process**, and to **notify them of alternatives and deadlines** for various steps in the process.
 The problem we hope to address is **poor accessibility of information regarding the financial aspect of medical school applications**. There are two main types of information that are of particular interest. The first is information regarding the **various costs involved in the medical school application process**, such as transcript costs, exam preparation resources, and interview preparation, which differ based on instutition, mehod of preparation, location and so on. The second is information on **cheaper alternatives available to the applicant** for various steps in the application process, for example, a cheaper MCAT prep course or a business that provides a cheaper interview prep consultation. The problem is important because the cost of the entire application process can easily reach in excess of 10,000 CAD, which places heavy strain on financially-struggling applicants.

## Key Features

#### About Us
The About Us page includes a description of our partners: the UofT Faculty of Medicine Community of Support, as well as a link to sign up for their mentorship program.

#### User Profile
The User Profile page allows users to view and edit their stored name and email.
Users also have the ability to change their account password.

#### Calculator Page
The Calculator Page displays to users all expenses related to the medical school application process, in an easy to follow step by step process.

At each step, the user is given a list of options to choose from for each category of expense. The total cost updates dynamically upon selection. This allows users to get an overview of how much the application process will cost them. The options chosen by users are saved upon switching to a different category.

The calculator also includes alternative options (if available), organized under each category
or category if they are available.

#### Admin Page
Overtime, the expense data currently stored in the system could become outdated. We are giving admins to the site the ability to create, update, and delete current expense information on the Admin Page. Once updated, users who visit the site will be able to view the new expense information.

#### Exporting Cost Breakdown
The last page of the calculator will allow users to see the breakdown of their expenses after they finish checking off their expenses in the calculator. Users will have an option to export the breakdown to an excel file so they can have a copy even when not logged in to the app.

## How to use the app
1. Visit https://med-school-calculator.firebaseapp.com
2. When first visiting the site, you will need to create an account. Click the 'Sign Up' button
3. Once the sign up process is complete, you will be redirected to the calculator page where you
can navigate to other pages via the navigation bar at the top of the page.

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

#### Technical Requirements:

This application was written in JavaScript using the React library. To set up the application
locally and to deploy it, you will need to install the correct version of `Node.js` for your operating system, which comes with the `npm` tool used to install React, and all other packages 
required for this application.

#### Setting up on local server
1. Ask for access to the codebase and Firebase project.
2. Install ```Node.js```, which comes with the ```npm``` tool
3. Clone the project from GitHub with ```git clone https://github.com/csc301-fall-2019/team-project-uoft-faculty-of-medicine.git```
4. Navigate to the source directly with ```cd team-project-uoft-faculty-of-medicine/med-school-calculator```
5. Install all necessary packages with ```npm install```
6. Start a local development server on localhost with ```npm start```

#### Deploy via Firebase Hosting
1. Ensure you are on the branch you wish to deploy, typically master.
2. Navigate to the source directly with ```cd team-project-uoft-faculty-of-medicine/med-school-calculator```
3. Create a production build with ```npm run build```
4. Deploy the application with ```firebase deploy```
5. Visit the link Firebase generates.

 ## Licenses 

We will be licensing our code under the MIT license. The main reason for using this license is so that our partners are able to freely do what they wish with the codebase (modify, sell copies of the software, publish etc.) without our team being liable for any damages.