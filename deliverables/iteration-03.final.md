# FINANCIAL PLANNER FOR CANADIAN MED-SCHOOL APPLICANTS

## Iteration 3

 * Start date: Nov 22, 2019
 * End date: Dec 1, 2019

### Changes from you `product.md`

 - No MentorCity integration:
    - Originally, our partners wanted us to import a list of users from MentorCity (A CRM they use to link medical school applicants with prospective tutors)
    and to use that list as a database for existing users. We changed that by creating an easy sign-up process for prospective users. 
    We made this change, because we believed that importing that list could prove time-consuming in different ways: The data migration could be tedious due to several mismatches between the way the MentorCity data is formatted versus the way it is stored in Firebase. Since the potential list could be large, and
    contain potentially 'useless' data (users who graduated, left medical school) we decided it would be better to start from an empty user database.  
 - Notification system: 
    - Our partners wanted an automated system to send mass emails to all the users on certain dates to remind them of upcoming important events/deadlines. 
    The decision to not implement this was a reduction in scope, as we believed our time would be better spent on the other core features and perfecting those instead of having several, incomplete features.
 - Significant deviation from the provided UI:
    - Our partners had sent us a sketch of a UI mockup for the initial prototype of the website. We since changed it compeletely, as the way they designed
    it seemed counterintuitive to the UX and difficult to code.
 - Rating system:
    - Our partners wanted a rating system to see how the users responded to the application. While we thought it was a good idea, our decision to cut this feature is simply a reduction of scope, as we did not want to waste time building this feature when the core functionality of the website was still 
    incomplete. 
 
### Handoff plan

For the project handoff, we plan to have a final meeting with our partners to discuss what we will
be handing off and how they can maintain and develop the product in the future. In this meeting we will discuss:

- Providing access to the codebase. We plan to create a private repository with our codebase on
GitHub, which we will provide our partners access to, and allow them to invite others as they see
fit. This also includes our readme file which outlines how new developers can set up the project locally.
- Providing access to our Firebase project, which stores all data for this project and doubles
as the deployment tool we use. Similar to above, we will add them as collaborators and allow them
to invite others as they see fit. 
- Ensuring our partners are aware of the tools, resources and instructions to set up the project locally and deploying it. These resources include our readme file, relevant Firebase guides (such as [local testing/deployment](https://firebase.google.com/docs/hosting/deploying)), and tools to set up the project locally (such as [Node.js and npm](https://nodejs.org/en/)).
- Ensuring our partners know how to connect our Firebase-hosted site to a custom domain, which
they have mentioned interest in doing in the future. We will provide them with the relevant Firebase
[guide] (https://firebase.google.com/docs/hosting/custom-domain) as a resource for this purpose
- Providing access to our task log on [MeisterTask](https://www.meistertask.com/app/project/bAdrMRN9/csc301) by inviting them as collaborators. Prior to the meeting we will populate the backlog with any lingering minor tasks and features that were cut/reduced to fit the scope. This allows our partners to better understand the features we have completed and delivered, as well as any outstanding tasks, issues or bottlenecks that could be optimized in the future.
- Providing our partners with points of contact after the project has been handed off. We will provide contact information for several group members that our partners can reach out to should
they encounter any technical difficulties with the project.

Prior to the handoff meeting, we will request our partners invite any individual(s) that will
be managing/maintaining/developing the product after the handoff. If any are present, we will 
go over the structure of our codebase briefly and discuss the above points in more technical detail.
If none are present (as has been the case for all regular partner meetings), we will simply go through the above points at a higher, more abstract level, and place more emphasis on the resources
available and how/where to access them.

Finally, we will provide our partners with a document or e-mail that summarizes all key points discussed during the meeting, links to key resources as well as our contact information, so all
relevant information can be referenced in one place.

