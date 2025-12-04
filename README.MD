Question 1: Study Planner Application
Module: Introduction to Web Development with HTML, CSS & JavaScript

Scenario
You have been hired to develop a browser-based Study Planner for Nigerian students preparing for exams. The planner should help users organize their study sessions by subjects, priorities, and deadlines. It must allow users to add, mark, and manage their study tasks efficiently.

What You Will Build
A responsive web page using HTML, CSS, and JavaScript that helps users plan and track their study activities.

Core Features
1. Add Study Task
Collect:
Subject (e.g., Mathematics, Biology)
Priority (High, Medium, Low)
Study Date
2. View Study Plan
Display all study tasks in a list with color-coded priorities:
High Priority: Red
Medium Priority: Orange
Low Priority: Green
Each task should display subject, priority, date, and completion status.
3. Mark as Completed
Checkbox or button to mark a study task as "Completed."
Completed items should have a strikethrough or faded appearance.
4. Delete Task
Allow users to remove a study task from the list.
5. Filter Tasks
Filter by: All, Completed, or Pending study tasks.
6. Data Persistence
Save study tasks using localStorage.
Automatically load saved data on page refresh.
Folder Structure
study-planner/
├── index.html
├── style.css
└── script.js
Steps to Complete
HTML: Create form inputs (Subject, Priority dropdown, Date) and container to list study tasks.
CSS: Add layout styling, priority colors, and clear distinction between completed and pending tasks.
JavaScript:
Add new tasks dynamically.
Toggle completion status.
Delete and filter tasks.
Persist all data with localStorage.
Test:
Add at least 3 study tasks with different priorities.
Mark one as completed, delete another, and refresh to confirm persistence.
Optional (Bonus Points)
Use icons for better UI/UX:

Font Awesome CDN:
https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css
Use icons for delete (fa-trash), complete (fa-check), and priority indicators.
Setup Instructions
Build locally on your computer.
Open index.html in a web browser (Chrome or Firefox).
Do not use online code editors.
Question 2: Business Expense Tracker
Task: Business Expense Tracker Function

Requirements:

Create a function trackExpense(budget, action, amount)
If action is "spend", check if budget is enough:
If yes, subtract amount and return a message like "✅ You spent ₦${amount}. Remaining budget: ₦${newBudget}."
If no, return "❌ Insufficient budget. Cannot complete transaction."
If action is "add", add amount to budget and return a message like "💰 You added ₦${amount}. New budget: ₦${newBudget}."
Add a condition that prevents expenses over ₦50,000 in a single transaction for security reasons.
Name your file: question_2.js

