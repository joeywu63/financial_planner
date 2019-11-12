# FINANCIAL PLANNER FOR CANADIAN MED-SCHOOL APPLICANTS

## Iteration 2

 * Start date: Nov 1, 2019
 * End date: Nov 15, 2019

## Process

(Optional:) Quick introduction

#### Roles & responsibilities


Below are the roles we will have for our team, and a short description of the responsibilities associated with each role, as well as who they will be working with.

 * Customer relations
   * Communicates with our partners on behalf of the whole team.
   * Updates our partners on the current progress.
   * Addresses questions, concerns, expectations and roadmaps for upcoming deliverables with our partners.
   * Schedules upcoming meetings with our partners.

 * Tech lead
   * Responsible for managing the technical scope of the project.
   * Mentors the rest of the team on the chosen tech stack.
   * Identifies the tasks that should be prioritized and provides estimations on the complexity of each.
   * Identifies potential problems, alternative solutions and other technical caveats that may arise in the project.

 * Quality assurance & testing lead
   * Executing tests and reviewing results after every update to the project.
   * Documenting bugs and technical issues.
   * Communicating bugs and technical issues with the rest of the team.
   * Help team members troubleshoot bugs and technical issues.

 * User experience lead
   * Identifies usability problems in user interfaces.
   * Conducts usability testing throughout the project with prototypes of varying fidelity.
   * Communicates potential usability problems to the rest of the team.
   * Identify ways to modify user interfaces to improve usability.

 * Product manager
   * Manage the product backlog by prioritizing and adding tasks.
   * Guide the development process by creating actionable user stories.
   * Ensure that completed work fulfills the user stories and acceptance criteria.

 * Scrum master
   * Identify obstacles in development and guides the team in overcoming them.
   * Ensures that milestones and deliverables are achieved in a timely manner.
   * Facilitates meetings and communication within the team.

Below is a table which outlines each team member's role(s) and responsibilities outside of coding, as well as their technical strengths and weaknesses (e.g. languages, frameworks, libraries, development methodologies, etc.)

 | Team member | Role | Responsibilities      | Strengths    | Weaknesses    |
 |-------------|------|-----------------------|--------------|---------------|
 | Julia Xu | QA | Checking code, Finding bugs | JavaScript, Python, SQL | UX, Firebase, Scrum |
 | Sandro Seryani | Scrum Master | Lead scrums, Apply Agile principles | JavaScript, React, Scrum methodologies | Deployment, Automated Testing, UX Design|
 | Lucas Gismondi | Tech Lead | Third party tool support, architecture | JavaScript, React, Firebase, Frontend Unit Tests | Deployment, UX Design |
 | Joey Wu | Customer relations | Manage partner meetings & communication | Python, C, Shell | React, Databases, Agile methodologies |
 | Tianze Xu | UX | Support UI dev. across user stories | Python, JavaScript, React, SQL | Firebase, Testing, Deployment |
 | Wendy Hua | Product Manager | Manage product backlog & development process | Javascript, React, Automated frontend testing (Puppeteer) | Firebase, Deployment|
 | Alex Eng | QA | Test code for bugs & code verification | JavaScript, Python, C | React, Firebase, UX |

#### Team Rules

**Group Communications**:

We are using the Slack app for general communications. Team members are expected to check for new messages on the app at least once per day. The Slack workspace is divided into channels for organization.

For voice or video calls, we will use Facebook or Zoom.

**Partner Communications**:

The main line of communication with the partner is through email, such as to provide updates on the project or arrange meetings. Our team representative will email the partner on behalf of the team, cc-ing the rest of the team members.

Once every 2 weeks, there will be an in-person meeting with the partner.

**Meetings**:

Team members are responsible for attending the weekly meetings. We will allow some lenience for hectic schedules, but if a team member repeatedly misses meetings, we will reach out to them, and go to the TA if they are still unresponsive. At the meetings, we will have a time where we take turns talking about our progress from the previous week. If we could not complete tasks we were responsible for (tracked through meistertask), we will look at the causes. If it is due to unexpected technical challenges, we will take it into account in workload estimates of future tasks. Then we will have take time to prioritize and assign tasks for the preceeding week.

**Conflict Resolution**:
 
 Below are several hypothetical scenarios/conflicts that may arise, and how we will resolve them.

   * There is disagreement on how to accomplish a task (technical implementation, scope etc.): In one of the weekly meetings, we would have a discussion about the strengths of each option. Then, we would take a vote. If a team member still feels strongly about the result, we would repeat the discussion process.
   * There is a task nobody wants to take on: If the task is large, we would subdivide it among the team. Otherwise, we would access the strengths and weakness of each member to decide who would have the easist time accomplishing the task. At the same time, we would make sure such "undesirable" tasks do not always go to the same person.
   * A team member is writing poor quality code: In one of the weekly meetings, we would discuss what we find lacking and offer suggestions to improve the quality of the code.
   * A team member is non-responsive/not contributing at all: If a team member is irresponsive, they will be told of the issue. If it becomes persistent, we will report to the TA.


#### Events

**Meetings**:

The team will have meetings once per week, on Fridays at 12 pm to 1 pm at Bahen, unless it has been decided that we will not be meeting that week, or that we have a partner meeting that week.

The team will have online voice call meetings as necessary, for more urgent conversations or when it is more convenient than an in-person meeting.

The purpose of team meetings is to keep everyone up-to-date on the state of the project, to assign new tasks for the upcoming week, and to review completed work.

Two members of the team will be expected to complete code reviews for each Pull Request. We will also hold quick online sync meetings when necessary.


#### Partner Meetings

**Meeting Descriptions**:

**_Meeting 1_**  
**Time and Location**  
Friday, Nov 1, 12-1pm @ David Naylor Building room 314

//TODO: Wendy will add minutes for the meeting before 11:59pm Nov 11

**_Meeting 2_**  
**Time and Location**  
Friday, Nov 15, 12-1pm @ David Naylor Building room 314

#### Artifacts   

 * The team will be utilizing MeisterTask, a task management platform for teams.
 * We will use MeisterTask to assign, organize and prioritize tasks between team members.
 * We will also use MeisterTask to keep track of outstanding items that are not yet done.
 * We will utilize MeisterTask's ability to assign deadlines for items which aids in keeping team members on schedule for deliverables.
 * The team will prioritize tasks by keeping them in an ordered list as well as adding highlight tags to each, stating whether they are of high, medium or low priority.
 * Tasks will be assigned to team members according to their experience, priority and schedules. 


#### Deployment and Github Workflow

Describe your Git / GitHub workflow. Essentially, we want to understand how your team members shares a codebase, avoid conflicts and deploys the application.

 * Be concise, yet precise. For example, "we use pull-requests" is not a precise statement since it leaves too many open questions - Pull-requests from where to where? Who reviews the pull-requests? Who is responsible for merging them? etc.
 * If applicable, specify any naming conventions or standards you decide to adopt.
 * Describe your overall deployment process from writing code to viewing a live applicatioon
 * What deployment tool(s) are you using and why
 * Don't forget to **explain why** you chose this workflow or particular aspects of it!

##### Github Workflow
When a team member begins writing code for a feature, they must create a branch off master and push their changes to the new branch.
Once they are satisfied with their work, they will create a pull request to be reviewed by any two other members on the team. The two members
reviewing the code will be responsible for two things. 
1. Checking out the code and ensuring the feature satisfies the acceptance criteria
2. The architecture/styling of the code follows some basic standards, which are the following:
    - Any function that needs to directly access the firebase database must be in a file that lives in the 'model' directory
    - Any function, within a react component, that needs to pull data, must call the function from a repository file in the respective components directory
    - Any constant for a component must live within a constants file in the respective components directory

Note: The reason for this type of architecture is that both the backend and frontend are clearly separated. This allows for the backend to be easily swapped with another backend.
    
Once the pull request is approved, the member who issued the pull request is responsible for merging their work.
There could be conflicts with master when merging, so they will also be responsible for resolving conflicts.

We have disabled directly merging to master without a pull request for our project, so team members will be forced to go through the process described above.
The reason we chose to go this route is because this will ensure there are less bugs, higher quality code, and more team members are aware of changes.

##### Deployment
We are using firebase hosting for our project. ```firebase deploy``` is the only command we need to deploy our website.
Once the deployment process is complete from running this command, we will be able to see our changes on a live website.
We chose firebase hosting and firebase in general because of its ease of use. Firebase will save us 
a significant amount of time when having to deploy which will allow our team to focus on the product and ensure it's the best
it can be given the amount of time we have.


## Product

#### Goals and tasks

 * Describe your goals for this iteration and the tasks that you will have to complete in order to achieve these goals.
 * Order the items from most to least important.
 * Feel free (but not obligated) to specify some/all tasks as user stories.

For this iteration, we aim to deliver a basic version of our product with the core functionality completed and usable
by both groups of our intended users (med school applicants and our partners at the Faculty of Medicine). Applicants will be
able to navigate through a financial planner divided into three sections, view and select from a list of costs for each section, 
and see the summation of costs as they navigate through the planner. Admins (our partners) will be able to edit the name and
cost associated with each option at will, as well as adding and deleting options.

As we aim to work on the core functionality and deliver a basic, usable version of the product, styling of the product will not be included as part of this iteration.

Below is the list of tasks we intend to complete for this iteration, ordered by importance:

- Import cost data provided by our partners into Firestore
- Be able to retrieve each cost item from our database
- Be able to display it on a webpage organized by cost type (MCAT, Application, Interview)
- Be able to display the sum of costs of selected options dynamically
- Creating an interface allowing admins to add, delete and update individual expenses
- Creating a login (authentication) system
- Creating an account registration system
- Be able to display a breakdown of costs by type, with net cost at the end

#### Artifacts

List/describe the artifacts you will produce in order to present your project idea.

 * Artifacts can be text, code, images, videos, interactive mock-ups and/or any other useful artifact you can think of.
 * Make sure to explain the purpose of each artifact (i.e. Why is it on your to-do list? Why is it useful for your team?)
 * Be concise, yet precise.         
   For example: "Build the website" is not precise at all, but "Build a static home page and upload it somewhere, so that it is publicly accessible" is much clearer.

The following are artifacts we will produce in order to present our project idea.

- **Diagrams of our data model**.  We will sketch a logical data model in our initial planning meeting, so that team members
can discuss and come to a consensus with how to best structure our data. Later they will be converted to diagrams and
illustrated in our product and planning document. This will be used to explain to our partners how data is organized in our database, which is important since they will likely be updating the database after the product is complete and delivered, and knowing
our data model will make working with the database much easier.