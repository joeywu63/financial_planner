# YOUR PRODUCT/TEAM NAME

 > _Note:_ This document is meant to be written during (or shortly after) your initial planning meeting.     
 > It does not really make sense for you to edit this document much (if at all) while working on the project - Instead, at the end of the planning phase, you can refer back to this document and decide which parts of your plan you are happy with and which parts you would like to change.


## Iteration XX

 * Start date: FILL IN THE DATE WHEN YOU HAD YOUR FIRST TEAM PLANNING MEETING
 * End date: FILL IN THE DATE WHEN YOU ARE PLANNING TO HAVE YOUR REVIEW MEETING

## Process

(Optional:) Quick introduction

#### Roles & responsibilities

Describe the different roles on the team and the responsibilities associated with each role. 
 * Roles should reflect the structure of your team and be appropriate for your project. Not necessarily one role to one team member.

List each team member and:
 * A description of their role(s) and responsibilities including the components they'll work on and non-software related work
 * 3 technical strengths and weaknesses each (e.g. languages, frameworks, libraries, development methodologies, etc.)

#### Team Rules

Describe your team's working culture.

Communications:
 * What is the expected frequency? What methods/channels are appropriate? 
 * If you have a partner project, what is your process (in detail) for communicating with your partner?
 
Meetings:
 * How are people held accountable for attending meetings, completing action items? Is there a moderator or process?
 
Conflict Resolution:
 * List at least three team scenarios/conflicts you discussed in lecture and how you decided you will resolve them. Indecisions? Non-responsive team members? Any other scenarios you can think of?


#### Events

Describe meetings (and other events) you are planning to have:
 * When and where? Recurring or ad hoc? In-person or online?
 * What's the purpose of each meeting?
 * Other events could be coding sessions, code reviews, quick weekly sync meeting online, etc.


#### Partner Meetings
You must have at least 2 meetings with your project partner - an initial planning meeting discussing the features you will build this iteration and a sprint demo meeting to review what you've done. Describe the meetings here:
* When and where will you meet?
* What do you intend to discuss(**note you will have meeting minutes in the review document**)?

#### Artifacts

List/describe the artifacts you will produce in order to organize your team.       

 * Artifacts can be To-Do lists, Task boards, schedule(s), etc.
 * We want to understand:
   * How do you keep track of what needs to get done?
   * How do you prioritize tasks?
   * How do tasks get assigned to team members?


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

#### Artifacts

List/describe the artifacts you will produce in order to present your project idea.

 * Artifacts can be text, code, images, videos, interactive mock-ups and/or any other useful artifact you can think of.
 * Make sure to explain the purpose of each artifact (i.e. Why is it on your to-do list? Why is it useful for your team?)
 * Be concise, yet precise.         
   For example: "Build the website" is not precise at all, but "Build a static home page and upload it somewhere, so that it is publicly accessible" is much clearer.