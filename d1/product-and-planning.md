# YOUR PRODUCT/TEAM NAME
> _Note:_ This document is meant to evolve throughout the planning phase of your project.    
 > That is, it makes sense for you commit regularly to this file while working on the project (especially edits/additions/deletions to the _Highlights_ section).
 > Most importantly, it is a reflection of all the planning you work you've done in the first iteration.
 > **This document will serve as an agreement between your team and your partner.**

## Product Details

#### Q1: What are you planning to build?

 * Short (1 - 2 min' read)
 * Start with a single sentence, high-level description of the product.
 * Be clear - Describe the problem you are solving in simple terms.
 * Be concrete. For example:
    * What are you planning to build? Is it a website, mobile app,
   browser extension, command-line app, etc.?      
    * When describing the problem/need, give concrete examples of common use cases.
 * Focus on *what* your product does, and avoid discussing *how* you're going to implement it.      
   For example: This is not the time or the place to talk about which programming language and/or framework you are planning to use.
 * **Feel free (and very much encouraged) to include useful diagrams, mock-ups and/or links**.

##### High-Level Description

Our product will be a website that will allow prospective medical school applicants in Canada to **calculate the cumulative cost of the application process**, and to **notify them of alternatives and deadlines** for various steps in the process.

##### Problem Description

The problem we hope to address is **poor accessibility of information regarding the financial aspect of medical school applications**. There are two main types of information that are of particular interest. The first is information regarding the ***various costs involved in the medical school application process**, such as transcript costs, exam preparation resources, and interview preparation, which differ based on instutition, mehod of preparation, location and so on. The second is information on **cheaper alternatives available to the applicant** for various steps in the application process, for example, a cheaper MCAT prep course or a business that provides a cheaper interview prep consultation. The problem is important because the cost of the entire application process can easily reach in excess of 10,000 CAD, which places heavy strain on financially-struggling applicants.

##### Product Description

Based on the problem, our solution/product will be a **website** that calculates and displays the cumulative cost of their planned application process, which will be the sum of the costs incurred from the following categories throughout the overall process:

* MCAT and MCAT preparation (specify)
* Applications
* Interviews
* Travel, accommodation and attire

For each category, the website will display several options and their cost, as provided to us by our partners. It will also provide a medium for administrators to update cost information with ease.

In addition to the primary functionality of calculating cost and identifying lower-cost alternatives, our product will also allow users to create a profile, save/update their selected options and associated cost information and track their application process by checking off completed portions of their application. Finally, the product will also include a e-mail notification system that sends users information about upcoming deadlines and _alternative resources with lower cost(?)_.

* **Q: What exactly should users be notified of?**

##### Mockups/Lo-fi Prototypes

TBD

#### Q2: Who are your target users?

 * Short (1 - 2 min' read max)
 * Be specific (e.g. a 'a third-year university student studying Computer Science' and not 'a student')
 * Feel free (but not obligated) to use personas.         
   You can create your personas as part of this Markdown file, or add a link to an external site (for example, [Xtensio](https://xtensio.com/user-persona/)).

 Our primary target users are financially-struggling students planning to, or currently in the process of applying to any medical school within Canada. Since our product focuses on centralizing cost information and delivering information on lower-cost alternatives, it is designed primarily with financially struggling prospective students in mind. However, prospective medical school students in general (regardless of financial status) can be considered secondary target users of our product.

#### Q3: Why would your users choose your product? What are they using today to solve their problem/need?

 * Short (1 - 2 min' read max)
 * We want you to "connect the dots" for us - Why does your product (as described in your answer to Q1) fits the needs of your users (as described in your answer to Q2)?
 * Explain the benefits of your product explicitly & clearly. For example:
    * Save users time (how much?)
    * Allow users to discover new information (which information? And, why couldn't they discover it before?)
    * Provide users with more accurate and/or informative data (what kind of data? Why is it useful to them?)
    * Does this application exist in another form? If so, how does your differ and provide value to the users?
    * How does this align with your partner's organization's values/mission/mandate?

##### Why this product?

Our product fits the needs of our users because it addresses both problems described in Q1. Firstly, by creating a tool to calculate the overall cost of the application & interview process, we centralize a vast amount of important information and improve accessibility to information that is otherwise scattered around multiple different resources. This includes information such as application fees for different institutions, transcript fees, fees to obtain additional documents required by certain instutitions, and so on. Secondly, by offering multiple options for each component of the application and having a notification system, we improve accessibility for information on cheaper alternative resources, thus helping financially-struggling students cut down on costs.

##### User Benefits

We outline the benefits of our product below:

* **Saves users time**
   * By centralizing cost information, users no longer need to look up the necessary information from multiple different sources.
   * By saving the cost information and application steps on the users' profile, users no longer need to save and look up the information they've found elsewhere, or look it up every time they need it.
      * This saves a tremendous amount of time throughout the entire application process, which can be quite lengthy.
* **Facilitates financial planning**
   * By having access to total cost and cost breakdown, it is much easier for users to budget around the application process.
   * Checking off parts of the application process that are complete means always-relevant cost sum and breakdown, regardless of application stage.
* **Provide users with more choice**
   * By displaying alternatives and multiple options, users can analyze and assess the options available to them (in terms of various exam preparation resources, interview preparation services etc), and choose the one that fits their situation the best.
   * Previously, users would likely have to actively seek out different options (e.g. visiting MDConsultants and BeMo individually to get information on their services), thus making it easy to miss alternatives.
   * This also helps with financial planning, with regards to minimizing cost
* **Lowers risk of unexpected costs**
   * By outlining all the costs associated with the process, there is less chance users are burdened by surprise costs they have not account for.
* **Improves user organization**
   * A personalized profile and notification system means that users are less likely to miss deadlines and other pieces of crucial information, such as alternative resources. Therefore users are able to plan better.
* **Improves successful application rate**

##### Similar Resources

The following are resources similar to (but not the same as) our product:

* https://schools.studentdoctor.net/cost_calculator/index
* https://medicalschoolhq.net/medical-school-applications-cost-estimator/
* https://mdm.ca/tools/medical-school-cost-calculator

Our product diffrentiate ourselves from these tools with the personalized aspect - allowing users to save, update and track their application process, and by actively notifying users of deadlines (and alternatives?). In addition, our product is tailored to students applying to Canadian institutions, and thus includes information on fees specific to Canada and Canadian medical schools, as opposed to information limited to the US for two of the above resources.

Our partners currently use MentorCity, which is a mentoring software for **WHAT FOR?**

#### Q4: How will you build it?

 * Short (1-2 min' read max)
 * What is the technology stack? Specify any and all languages, frameworks, libraries, PaaS products or tools.
 * How will you deploy the application?
 * Describe the architecture - what are the high level components or patterns you will use? Diagrams are useful here.
 * Will you be using third party applications or APIs? If so, what are they?
 * What is your testing strategy?

##### Tech Stack
 - Javascript
 - React
 - Firebase
    - Firestore
    - Authentication
    - Hosting

##### Deployment
We will be deploying the webapp through firebase hosting. This will allow our partner to easily rollback to previous versions in case there are any issues with new releases. This service is offered within Firebase, so every administrative service will be in one place and very easy to manage.

##### Architecture
*System*
draw diagram of how Firebase auth,

*Database*
User
Expense
Alternative
UserProgress

##### Testing Strategy
We will be using react-testing-library to unit test our frontend. Since we are using firebase as our backend, we don't necessarily need tests for that aspect.

#### Q5: What are the user stories that make up the MVP?

 * At least 5 user stories concerning the main features of the application - note that this can broken down further
 * You must follow proper user story format (as taught in lecture) ```As a <user of the app>, I want to <do something in the app> in order to <accomplish some goal>```
 * If you have a partner, these must be reviewed and accepted by them
 * The user stories should be written in Github and each one must have clear acceptance criteria


- As a medical school applicant, I want to see how much a typical application would cost so I can start planning a budget for the upcoming year.

   - The ability to navigate through different stages of the medical school application
   - For each stage, show:
      - The price of different aspects within the stage
      - A link to a resource possibly explaining the price or showing next steps (e.g. A link to MCAT registration)

- As an application admin, I want to change the MCAT test fee in the system to accurately reflect the new changes made this year.
   - The ability to modify the business rules found in the database
   - The ability to log in as an administrator
      - Some security rules as to who is an admin and what they can do  
   - The interface should not rely on technical skills, and should ideally not intimidate someone who isn't technologically savvy
      - A prebuilt set of options (representing different fees found in the database) - The idea here is to avoid free text when wanting to change something,
        my initial thought is a dropdown of several stages like the transcript request fee at UofT, the MCAT textbook price etc... Of course this isn't
        a decision we should take now, just something to keep in mind.

- As an application admin, I want to see what users think about this application, so I can see how we can improve it.
   - The ability to offer a survey for users when they finish using the tool
   - The ability for an admin to view results in a user-friendly way
      - Again, it is important to make these features accessible
      - The ability to present statistical data (Flowcharts, diagrams etc...)

- As a budget-conscious medical school applicant, I want to see what alternatives I have for several stages of the application (such as interview preparation) in order to try and save money.
   - The ability to navigate through different stages of the medical school application
   - For each stage, show:
      - The price of different aspects within the stage
      - Prioritize showing cheaper alternatives (Or whatever the client would want us to push towards) and more information about these

- As a medical school applicant, I would like to exit the page and log back in tomorrow to pick up on the progress I made within the tool.
   - The ability to sign in
      - Store username/email
      - Store password
         - Security concerns: How we will handle encryption
      - Provide mechanism to recover password
         - Could send an email to the one they signed up with or do recovery questions
   - The ability to store user interactions with the software
      - Store what information they have filled in and what choices they have made
      - Store at what point they were before they exited the application  

- As a forgetful applicant, I would like to be reminded of upcoming deadlines in order to not mess up my medical school prospects.
   - The ability to store crucial deadlines about several stages in the application
   - The ability to send mass emails to users who consent
      - The ability to opt in to this option for users
         - This entails a settings screen for a user to change information
      - The ability to automatically send emails to users about upcoming deadlines
         - The ability to store user emails

## Process Details

#### Roles & responsibilities

Describe the different roles on the team and the responsibilities associated with each role.
 * Roles should reflect the structure of your team and be appropriate for your project. Not necessarily one role to one team member.

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

List each team member and:
 * A description of their role(s) and responsibilities including the components they'll work on and non-software related work
 * 3 technical strengths and weaknesses each (e.g. languages, frameworks, libraries, development methodologies, etc.)

 | Team member | Role | Responsibilities      | Strengths    | Weaknesses    |
 |-------------|------|-----------------------|--------------|---------------|
 | Julia Xu | QA | Checking code, Finding bugs | JavaScript, Python, SQL | UX, Firebase, Scrum |
 | Sandro Seryani | Scrum Master | Lead scrums, Apply Agile principles | JavaScript, React, Scrum methodologies | Deployment, Automated Testing, UX Design|
 | Lucas Gismondi | Tech Lead | Third party tool support, architecture | JavaScript, React, Firebase, Frontend Unit Tests | Deployment, UX Design |
 | Joey Wu | Customer relations | Manage partner meetings & communication | Python, C, Shell | React, Databases, Agile methodologies |
 | Tianze Xu | UX | Support UI dev. across user stories | Python, JavaScript, React, SQL | Firebase, Testing, Deployment |
 | Wendy Hua | Product Manager | Manage product backlog & development process | Javascript, React, Automated frontend testing (Puppeteer) | Firebase, Deployment

#### Team Rules

Describe your team's working culture.

Communications:
 * What is the expected frequency? What methods/channels are appropriate?

We are using the Slack app for general communications. Team members are expected to check for new messages on the app at least once per day. The Slack workspace is divided into channels for organization.

For voice or video calls, we will use Facebook or Zoom.

 * If you have a partner project, what is your process (in detail) for communicating with your partner?

The main line of communication with the partner is through email, such as to provide updates on the project or arrange meetings. Our team representative will email the partner on behalf of the team, cc-ing the rest of the team members.

Once every 2 weeks, there will be an in-person meeting with the partner.

Meetings:
 * How are people held accountable for attending meetings, completing action items? Is there a moderator or process?

Team members are responsible for attending the weekly meetings. We will allow some lenience for hectic schedules, but if a team member repeatedly misses meetings, we will go to the TA. At the meetings, we will have a time where we take turns talking about our progress from the previous week. If we could not complete tasks we were responsible for (tracked through meistertask), we will look at the causes. If it is due to unexpected technical challenges, we will take it into account in workload estimates of future tasks. Then we will have take time to prioritize and assign tasks for the preceeding week.

Conflict Resolution:
 * List at least three team scenarios/conflicts you discussed in lecture and how you decided you will resolve them. Indecisions? Non-responsive team members? Any other scenarios you can think of?

   * There is disagreement on how to accomplish a task (technical implementation, scope etc.): In one of the weekly meetings, we would have a discussion about the strengths of each option. Then, we would take a vote. If a team member still feels strongly about the result, we would repeat the discussion process.
   * There is a task nobody wants to take on: If the task is large, we would subdivide it among the team. Otherwise, we would access the strengths and weakness of each member to decide who would have the easist time accomplishing the task. At the same time, we would make sure such "undesirable" tasks do not always go to the same person.
   * A team member is writing poor quality code: In one of the weekly meetings, we would discuss what we find lacking and offer suggestions to improve the quality of the code.
   * A team member is non-responsive/not contributing at all: If a team member is irresponsive, they will be told of the issue. If it becomes persistent, we will report to the TA.

#### Events

Describe meetings (and other events) you are planning to have:
 * When and where? Recurring or ad hoc? In-person or online?

The team will have meetings once per week, on Fridays at 12 pm to 1 pm at Bahen, unless it has been decided that we will not be meeting that week.

The team will have online voice call meetings as necessary, for more urgent conversations or when it is more convenient than an in-person meeting.

 * What's the purpose of each meeting?

The purpose of team meetings is to keep everyone up-to-date on the state of the project, to assign new tasks for the upcoming week, and to review completed work.

 * Other events could be coding sessions, code reviews, quick weekly sync meeting online, etc.

We are not currently planning on having specialized events, because the most important team activities are covered in regular weekly meetings and beyond that, we would like to dedicate more time to coding.

#### Partner Meetings
You must have at least 2 meetings with your project partner - an initial planning meeting and a document review meeting. Describe the meetings here:
* When and where?
* What did you discuss during the meeting (**note you must have meeting minutes**)?
* What were the outcomes of each meeting?

**_Meeting 1_**  
**Time and Location**  
Friday, Oct 4, 12-1pm @ David Naylor Building room 314

**Minutes**  
*Attendees:*
* Team members: Alex Eng, Joey Wu, Julia Xu, Lucas Gismondi, Sandro Seryani, Tianze Xu, Wendy Hua
* Project partners: Ike Okafor, Lauren Phillips

*Discussion Key Points:*  
* Determined what the project partners want in an MVP (bolded items are top priority).
   * Website/web application that will calculate the cost of applying to med school.
   * **A way to calculate and display cost data, resources such as med school links, and free/cheaper alternatives such as subsidization programs**.
      * There is no api we need to access to get the cost data, so we would have a way for admins (project partners) to add cost data to our database.
   * **User profiles where med school application cost data can be saved**.
      * Currently the project partners are able to export user profiles to an excel file. This includes information such as the user's first name, last name, email, and whether they are a mentee or mentor.
   * Email notifications for upcoming start dates, deadlines, interviews etc.
* Determined resources that would be provided by the project partners.
   * Data for the cost of applying to med school, updated perhaps once every application round.
   * Dates for which emails should be sent.
   * An excel file that contains user information.
   * Data from MentorCity, such as resources including med school links, and free/cheaper alternatives to costs.
   * Initial design kketches
   * Funds for future hosting
* Thought of ways we would approach the requirements.
   * No existing codebase from the project partners to integrate with, will create standalone product.
      * Project partners currently use MentorCity as a platform for prospective students where they are paired with a mentor.
      * MentorCity provides a page of resources we should link to.
   * Cleared up meaning of "just-in time format" from the requirements.
      * It means to allow students receive information in a timely manner.
      * For example, once they've receieved an interview offer, they should receive an email with perhaps a link to our product so they can find out about the related fees quickly. They should also be informed of time frames, such as the set time frames for applying for MCAT.
   * Design-wise
      * Lauren will create design sketches.
   * Hosting
      * Project partners have not mapped out a detailed budget, but they do have the funds necessary for hosting.
      * This will allow us to choose platforms that work well with our product.

*Outcomes:*
* Team members got better understanding of scope and requirements for project.
* Team members and project partners came to a mutual understanding.

*Next Steps:*
* Project partners will need to ask their users for consent for us to access their profiles with the excel file.
* Team members will email Adam for advice.

***Meeting 2: Document Review Meeting***  
Date: Oct 11, 2019.  
Location: Medical Sciences Building.  
Team attendees: Joey Wu, Julia Xu, Lucas Gismondi.  
Partner attendees: Lauren Phillips.  

Discussion:
* Discussion of exact feature requirements:
    * The most important feature is the calculator.
    * Including: ability to export costs document.
* Comparison to similar websites.
* Timing of the notification system:
    * 2-3 weeks before the application due date, test due date, or scheduled interview.
    * For interviews, include notification on arranging accommodations, and only for people who indicate they have an interview.
* Layout of cost selection:
    * Each costs section contains multiple selections. After choosing a selection, a box of alternative options is displayed beside the selection area.
* Alternatives for textbooks:
    * Ike has a library of affordable books that can be linked to.
* What is the purpose of the document export?
    * Students can print, or send to parents.
* Overlap with CRM.
    * Do not want to students to repeatedly enter the same info.
* Student selects what info they would like to be reminded of?
    * Yes.
* Notification of MentorCity users to sign up.
    * Want all users from MentorCity to be notified of the new platform. Download first name, last name, or emails, or alternatively, send invitation link so students could sign up themselves.
* Notifying new users of MentorCity after the initial release:
    * Lauren will talk to MentorCity and ask.
    * Link to website will be added to MentorCity resources section.
* Other info that needs to be transferred?
    * No.
* Rest of the meeting was going through the product planning document with the partner. There were no issues during this review. Notes:
    * Firebase was accepted as a user database technology.
    * Number of total users: 300-400. Monthly, maybe 100-200. Usage is very seasonal.
* Follow up:
    * Lauren will send an email with specifics on costs, alternatives, and deadlines.
    * Future meetings will be once every 2 weeks.
    * Further communication through email.
    * Final product planning document sent before Monday.

Outcomes:
* Clarification of features and usage details.
* Agreement on product planning document.
* Arrangement of further communications.

#### Artifacts

List/describe the artifacts you will produce in order to organize your team.       

 * Artifacts can be To-Do lists, Task boards, schedule(s), etc.
 * We want to understand:
   * How do you keep track of what needs to get done?
   * How do you prioritize tasks?
   * How do tasks get assigned to team members?

----
### Highlights
**Note this section is optional**
YOUR ANSWER GOES HERE ...

Specify 3 - 5 key decisions and/or insights that came up during your meetings
and/or collaborative process.

 * Short (5 min' read max)
 * Decisions can be related to the product and/or the team process.
    * Mention which alternatives you were considering.
    * Present the arguments for each alternative.
    * Explain why the option you decided on makes the most sense for your team/product/users.
 * Essentially, we want to understand how (and why) you ended up with your current product plan.
