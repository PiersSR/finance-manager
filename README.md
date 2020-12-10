# *IMPORTANT*
If you have used this application prior to the 11th December 2020 you will need to delete your cookies for pr226.brighton.domains.
This is due to a now resolved issue that would have incorrectly set your cookie.

You can do remove a single cookie as follows:
* Google Chrome
    * Navigate to settings by clicking on the burger menu (the 3 vertical dots) in the top right corner of the window
    * Select 'Settings'
    * Find the 'Privacy and Security' section and select 'Cookies and other site data'
    * Find and select 'See all cookies and site data'
    * Use the search bar in the top right to search for 'pr226'
    * Delete the 'pr226.brighton.domains' cookie by clicking the delete icon

* Mozilla Firefox
    * Navigate to settings by clicking on the burger menu (the 3 vertical lines) in the top right corner of the window
    * Select 'Options'
    * Select 'Privacy and Security'
    * Find the 'Cookies and Site Data' section and select 'Manage Data...'
    * Use the search bar to search for 'pr226.brighton.domains'
    * Select the relevant cookie and click 'Remove Selected'


# The Money Management Tool
The money management tool is design to help make managing your personal finances easier.

## Features
* Add income sources and expenditures with custom categories and frequencies
* Edit custom incomes, expenses, frequencies, and categories by selecting a row in a data table and using the corresponding 'Edit' button
* Delete custom incomes, expenses, frequencies, and categories by selecting a row in a data table and using the corresponding 'Delete' button
* Chart visualisations of user data

## How to Use the App

### The Welcome Page
If this is your first time visiting the site, you will be greeted with a page asking you to enter your name.
The money management tool uses cookies to store your UserID. This means that on future visits to the page, you will not have to login. **WARNING: Because of this, Deleting your browser cookies will result in a loss of your data**
### The Configuration Section
The summary section includes summary data of you current incomes and expenses.

**Categories**
Categories can be used to sort income sources and expenditures.
To add a custom category, simply enter the desired category name into the '*Name*' input box under the '*Categories*' section, and click '*Add*'.
You can also edit categories by selecting a row from the table beneath the add button, entering a new name in the resulting input box, and clicking '*Edit*'.

**Frequencies**
Frequencies can be used to sort income sources and expenditures by time period.
To add a custom frequency, simply enter the desired category name into the '*Name*' input box under the 'Frequencies' section, and click add.
You can also edit categories by selecting a row from the table beneath the add button, entering a new name in the resulting input box, and clicking '*Edit*'.

**Income**
To add an income, select the '*Amount*' input box, enter a numeric value, for example, '*1000*'.
Then select a category and frequency to assign to this income source.
Finally click '*Add*'. 
Entered data will appear as part of a chart visualisation and also add a row to the data table.
**PLEASE NOTE: There is currently an issue with adding an income or expense immediately after adding a new category or frequency. To avoid this, please deselect and re-select newly created categories or frequencies when trying to add new income and expense records.**

**Expenses**
To add an income, select the 'Amount' input box, enter a numeric value, for example, '*200*'.
Then select a category and frequency to assign to this income source.
Finally click '*Add*'. 
Entered data will appear as part of a chart visualisation and also add a row to the data table.
**PLEASE NOTE: There is currently an issue with adding an income or expense immediately after adding a new category or frequency. To avoid this, please deselect and re-select newly created categories or frequencies when trying to add new income and expense records.**

### The Breakdowns Section
This area is designated to visualise your data. Once you have entered some income and expenses, you should see some pie charts appear, showing a summary of your finances, including income sources and expenses each broken down by category.

### The Data Section
This area shows the data you have entered, and allows you to edit or delete select rows.
To edit a row, select it using the corresponsing checkbox, enter a new value into the resulting input box, and hit '*Edit*'
To delete a row, select it as above, but instead, hit '*Delete*'

## Future possibilites
 - [ ] Banking API Integration
 - [ ] Login system
 - [ ] Feature separation
 - [ ] Customisable charts
 - [ ] CSS refactor
 - [ ] Error handling improvements

## Built with:
* [React](https://reactjs.org/) - Front-End Framework
* [Express.js](https://expressjs.com/) - Back-End Framework
* [MySQL](https://www.mysql.com/) - Database
* [Node](https://nodejs.org/en/)

## Authors
* Piers Rust