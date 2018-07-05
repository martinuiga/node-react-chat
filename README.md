# node-react-webchat

## Frontend

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### Important
Add ``.env`` file to \frontend
``REACT_APP_SOCKET_ADDR=http://localhost:3003`` the port should be the same as backend socket.io port

## Backend

### Install

``npm install``

### Docker

First run: ``docker run -p 5984:5984 --name couch -d couchdb``

Stop:``docker stop couch``

Rerun: ``docker start couch``

Web interface: ``localhost:8082``

---

Show running containers: ``docker ps`` all: ``docker ps -a``

Show installed images: ``docker images``

Remove container: ``docker rm couch`` image: ``docker rmi couchdb``

### Run

* Dev: ``npm start``
* Prod: ``npm run deploy``

#### Custom settings
``.env`` file

* PORT=1234
