# FINANCIAL PLANNER FOR CANADIAN MED-SCHOOL APPLICANTS

## Iteration 01 - Review & Retrospect

 * When: 2019 Nov 13
 * Where: Online

## Process - Reflection

#### Decisions that turned out well

 - **Having weekly meetings in person**.  We think this is the team decision that made the most positive impact, 
 since it provides an opportunity to keep all team members on the same page with regards to progress, discuss upcoming tasks
 and voice their opinions about anything related to the product/process on a regular basis. Having this weekly meeting in person at the same time also greatly lowers the likelihood that someone forgets about the meeting or decides not to attend.

 - **Using Slack for communication**. Being able to create separate channels for different purposes, such as to discuss work related
 to deliverables, work related to assignments, discussion within subteams, and non work-related topics has been greatly beneficial
 for our team communication and organization. It reduces confusion that could potentially be caused by unrelated messages in the
 same place. Being able to pin messages and resources also improves efficiency by reducing the need to dig through old messages. 
 Lastly, having a channel to discuss unrelated topics without disrupting work channels also helps improve team spirit.

 - **Pull request approval process**. Every pull request into master must be reviewed and approved by at least 2 other team
 members. This is beneficial for two reasons. Firstly, it improves code quality is improved as bugs, code smells and other potential problems are much more likely to be caught. The process is done on GitHub which also allows reviewers to leave comments for specific
 sections of code, facilitating the fixing process. Secondly, it provides team members with an additional opportunity to familiarize
 themselves on parts of the codebase they are not working on, since at least one of the reviewers are likely to be working on another
 feature branch.

  - **Disable push to master**. This greatly reduces the possibility of going through merge hell, which is especially important since
 we've started working in smaller teams on different feature branches.

#### Decisions that did not turn out as well as we hoped

 - **Meistertask as task management platform**: We had planned to use Meistertask as our platform for organizing and prioritizing tasks, as well as using it to assess the remaining amount of work that needs to be done. However we did not end up using it very
 often and it was not updated in a timely manner. We believe that one reason was because team members usually had a clear idea of
 their personal responsibilities within the iteration, and thus felt that referring to and updating the task board was unnecessary. 
 Another reason was that we did not label tasks with deadlines and priority level, thus essentially reducing it to a place where
 one shared what they were working on, which became redundant since we also had weekly meetings.

 - **Specialized roles in the team**: We initially created 6 roles within the team, meaning that essentially each person had a unique
 role within the team. We found that many roles, such as UX lead, testing and QA went unutilized or became redundant, as all team members did testing and QA to some capacity through our review process, and UX was not our focus for this iteration.

#### Planned changes

- **Setting internal deadlines**. One decision we neglected to make, but we think is important in retrospect is setting mini internal deadlines for tasks, instead of having 'soft' deadlines, such as project demo day and deliverable due dates. We think this is important because it would reduce 'crunch' on the days leading up to the soft deadlines, which we experienced throughout this iteration. Implementing this change would also help us better utilize our MeisterTask board.

- **More personal responsiility in updating MeisterTask**. We have decided to place more emphasis on keeping the task board up to date, and ensuring that team members working on a task are responsible for updating the status of that task on the task board in a 
timely manner. We think this is an important change to make because having an accurate depiction of the task board is instrumental
in helping us estimate how much work needs to be done, how much time it will take, whether we need to cut back on certain features, and also help us plan our time ahead more effectively.

## Product - Review

#### Goals and/or tasks that were met/completed:

 *add screenshot from meistertask*

 Completed tasks, in order of importance:
 - Import cost data into Firestore
 - Be able to retrieve cost data (from Firestore)
 - Display expense on calculator page, including its name and cost
 - Be able to select/unselect expense
 - Display dynamically updating cost sum based on expense selection
 - Create interface to add, update and delete expenses from database
 - Create interface to add, update and delete alternative resources from database
 - Display user information on profile page
 - Create interface to edit user information
 - Display expenses on calculator by cost type (MCAT, Application, Interview)
 - Be able to create accounts for the site
 - Create login functionality, with user authentication

 Completed tasks that weren't originally planned:
 - Create rules limiting access to Firestore

 We decided to add this task due to an incident with Firestore (our database) that occurred on the day before the project demo. 
 We hit our daily read operation quota (50K reads), thus rendering all our data inaccessible until the next day. Since we shouldn't
 even be close to hitting the limit, we initially had suspicions that unauthorized parties may have accessed our database. Even 
 though this likely wasn't the case, we decided to prompty create access rules on our database in Firestore so that only we (and
 other approved users) could access the data.

#### Goals and/or tasks that were planned but not met/completed:

 - Display page with cost breakdown at the end of the calculator. 
 
 We could not complete this task due to the incident with Firestore described above, since we were working on it the day
 before the project demo.

#### How was your product demo?
 
 **Preparation**: We prepared for our demo by planning who would demo which parts and testing it ourselves before demo-ing to our partners. We also did a walkthrough of how the targeted user would likely navigate through the system. Originally we had planned to merge all our feature branches into master the day before the demo and demo all features simultaneously on one computer, but due to the database incident we decided to instead demo feature branches separately.
 
 **Features demo-ed**: We were able to demo the basic functionalities, including the profile page (editing profile and password), calculator page (being able to see the cost of expenses organized by type of expense, select/deselect expenses and view dynamically updated cost), admin page (adding, editing, deleting expenses) and login flow (creating a profile, logging in). 
 
 **Demo results**: Our partners were satisfied with the progress made so far. The only **change request** they made was that the order of the sections under the calculator needed to be changed to fit their requirements (to MCAT -> Application -> Interview
 from Application -> MCAT -> Interview). We also raised the question of whether users should be able to use the calculator feature without having to sign in first, since it seemed logical, but our partners agreed with the way it was currently implemented (requiring login to use the feature). 
 
 **What we learned**: 
 - We learned that it is important to know our limits and manage our partners' expectations with regards to to-be-implemented features. During the demo, our partners were very open to any possible additional features we suggested (such as being able to manually enter costs along with selecting a predefined cost), but we realized that implementing all of the features with sufficient quality would take signficantly more time than we have. 
 - We also learned how to explain our work and work process to people without technical backgrounds. During the demo we were asked
 about security with regards to user data, and we had to explain to our partners the access rules we had put in place on our database
 in non-technical terms.

## Meeting Highlights

Going into the next iteration, our main insights are:

 1. **Better time management**. We aim to accomplish this through two main changes. As discussed in the Process changes section, we aim to keep our task board much more detailed and up-to-date, since time management will be critical for this iteration given other work that we have. Having an up-to-date task board will enable us to plan ahead much more efficiently, because we know what/how much needs to be done. Furthermore, setting smaller deadlines reduces crunch and also improves our time management.

 2. **Focusing on usability**. Last iteration, we focused on basic functionality and getting things working. This iteration, we
 will place much more emphasis on usability and user experience with our product. We recognize that in order for a product to be successful, it must be flexible, handle, prevent and recover from errors well, give users control and freedom, and be aesthetically
 pleasing and consistent.

 3. **Managing expectations**. As mentioned, we will likely not be able to implement all the additional features suggested during
 the project demo, and thus we know tp assess our own limits and work with our partners to manage their/our expectations, and communicating what features we will and won't be able to deliver by the end of the project. 

 4. **Inter-team communication** Since we're working in subteams for separate feature, we recognize that we must focus more on communication *between* the subteams as well as within them. This will be important in terms of not overlapping work and keeping
 up to date on the status of the product as a whole.

