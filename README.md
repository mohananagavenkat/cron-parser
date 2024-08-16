Cron Expression Parser
======================

This is a command-line application written in Node.js that parses a cron string and expands each field to show the times at which it will run. The parser supports the standard cron format with five time fields (minute, hour, day of month, month, and day of week) plus a command.

Prerequisites
-------------

To run this application, the following need to be installed:

-   **Node.js**
-   **NPM**

Setup Instructions
------------------

Follow these steps to set up the project on your local machine:

### 1\. unzip the code

extract the zip provided and get into the folder

`cd cron-parser`


### 2\. Install Dependencies

Install the required dependencies using the following command.

`npm install`

This will install `jest` for test case execution.


### 3\. Running the Script

You can run the script by providing a cron string as a command-line argument.

`node index.js "*/15 0 1,15 * 1-5 /usr/bin/find"`

### 4\. Example Output

For the input `*/15 0 1,15 * 1-5 /usr/bin/find`, the output will be:

```
minute        0 15 30 45
hour          0
day of month  1 15
month         1 2 3 4 5 6 7 8 9 10 11 12
day of week   1 2 3 4 5
command       /usr/bin/find
```

Testing
-------

Run `npm test` for test case execution

