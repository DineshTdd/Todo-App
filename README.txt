Greetings sir!

Steps to be followed:
---------------------------
-->create a new project directory(npx creat-react-app)
-->copy "src" directory from extracted folder and paste it to newly created project directory
-->dependencies to be installed
	npm i --save react react-redux
--> npm start

Flow of my Todo App(Loading of index.html):
------------------------------
App initializes from index.js
Redux State Management is established(src->store)
index.js loads content from App.js file
App.js files load the todo component(src->todo)
Other components are loaded whenever necessary(src-> Components)

For persistent storage I have used localStorage itself.

Declaration
--------------
I declare that every line of code is written by me.
				-Dinesh T