# nodejs-challenge
Simple browser-based chat application using Node.JS

![alt text](https://info.jobsity.com/hs-fs/hubfs/jobsity-logo-email@2x.png)

## Installation

- Download or clone the repo
- Run `npm install`
- Run `npm start`
(`npm start` *will try to initialize the React-App in Port 3000 and Node js in Port 5000, so please keep these ports free* )
- The MongoDB data are running in chatusers-2bz1s.gcp.mongodb.net, so don't worry about that, if you want to see the writes in database, the credentials are in `/src/server.js line 21`

## Requirements Reached

- [x] Allow registered user to log (also new users will can register)
- [x] Allow users to post messages as command using `/stock=stock_code`
- [x] create decoupled bot that get the csv from stooq.com and post in chat (stock bot don't save in database)
- [x] keep Confidential information secure (passwords encryption using "bcryptjs" )
- [x] chat ordered by timestamps, limit to 50 messages
- [x] **Have more that one chat**
- [x] **Handle error from stock bot**

## Requirements Pending

- [x] ~~Unit Testing~~ (Done after deadline) Run `npm test`

## Author

Sebastian Galvis [Linkedin](https://www.linkedin.com/in/js-galvis-h/).

