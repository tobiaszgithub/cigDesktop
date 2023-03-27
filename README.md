# README

## About
Using this app it is possible to manage and query Cloud Integration artifacts of design time and runtime.
At the moment, this application solves the problem of transferring/transporting integration flows between different tenants. The application can also be used to move iflow in the same tenant.

The main advantages of using the app:
- When you do an iflow transport – no need to create configuration parameters from scratch.
- When you do an iflow transport for the first time to target system – the configuration parameters are taken from source system
- The transported integration is transferred as a new version to the target system. You have access to earlier versions.
- It is possible to change the Id and Name of the iflow during transport.
- intuitive interface

## Live Development

To run in live development mode, run `wails dev` in the project directory. This will run a Vite development
server that will provide very fast hot reload of your frontend changes. If you want to develop in a browser
and have access to your Go methods, there is also a dev server that runs on http://localhost:34115. Connect
to this in your browser, and you can call your Go code from devtools.

## Building

To build a redistributable, production mode package, use `wails build`.
