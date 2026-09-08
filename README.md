# System Manager Plugins
The official repository of [System Manager](https://github.com/FireBlade211/System-Manager) plugins.

For more info on how to submit your plugin to the repository, see the *Publish your Plugin* page under the *How-to Guides* section of the official documentation.

## Online Plugin Browser
The online plugin browser allows you to view **System Manager** plugins through a website. I don't have servers or a domain yet and GitHub Pages can only serve static content, so for now you'll have to host it yourself.

1. Clone the repository.
```pwsh
git clone https://github.com/FireBlade211/System-Manager-Plugins.git
```
2. Install `node.js` if you haven't already.
3. Open the `site` folder within the cloned repository.
4. Run `npm i` to install dependencies.
5. Run `node index.js` to start the server.
6. The plugin browser will now be accessible [here](http://localhost:3000).
