### Installation
Node version 15.5.1 was used to build this project. If you have nvm, you can run `nvm use` in the project to set it.

#### Mac/Linux

In the main directory, run

`npm install`

`npm start`

This will install dependencies in both client and api folders and start both servers in one terminal. Feel free to run them in separate terminals if you like.

The node server will run on port 8080 and the webpack dev server will run on port 3000.

#### Windows

If you are using windows, you will have to go into both folders separately and install packages there due to the postinstall script creating subshells. You can still run `npm start` in the main directory to run both servers in one terminal.

### Technologies/Architecture

I created a very basic express app to serve up the json api.

I separated the client and api code into their own respective folders that way they can both be deployed and ran independently of each other. Both folders contain their own package.json files. In the main folder, I added concurrently so we can run both in one tab in the terminal.

React was used to build out the components. There was quite a bit of state involved between the image carousel and the image selector so using react helped with the state management. I broke out a couple of smaller components to make them more reusable.

### Features and things to note
- Minimum specs in assignment was complete
- Did the first bonus where the last item always occupy the last slot
- Due to the lack of time, the right arrow is not aligned correctly when the number of images in the carousel changes
- Minimal css since it wasn't part of the spec
- Would have liked to add unit testing for the components but didn't have time