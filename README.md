## This is a full-stack e-commerce app built using the MERN stack (MongoDB, Express, React, and Node.js).

### [demo](https://plants.alexdruzina.com/)

### Client Side 🛠
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![MUI](https://img.shields.io/badge/Material UI-00599C?style=for-the-badge&logoColor=white)
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)



### Server Side 🛠
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/mongoose-red?style=for-the-badge&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)



## Project structure

```
├── client   
│   ├── public
│   │   ├── index.html
│   │   ├── _redirects -> Allows react-router on netlify
│   ├── src
│   ├── package.json
│   ├── .env 		->create your own
├── server   
│   ├── models
│   ├── routes
│   ├── index.js  -> main entrypoint for server side
│   ├── package.json
│   ├── .env		->create your own
│   ├──Procfile	-> heroku start

```



## Configure Heroku

- [Log in](https://id.heroku.com/login) to your account, or [set up a new one](https://signup.heroku.com/)
- Create a new app on Heroku

### Connect to Github

Next, you can configure deploys with Github. If you prefer to deploy without using Github, you can read [Heroku's deployment documentation](https://devcenter.heroku.com/categories/deployment).

- In the **Deploy** tab, select the option to **Connect this app to GitHub**
- Select the branch you want to deploy your app from.

### Set Environment Variables
 - edit config vars from your app's Settings tab in the Heroku Dashboard.
###### For this projects add: `MONGO_URL`, `PASS_SEC`, `JWT_SEC`, `STRIPE_KEY` and `CLIENT_ORIGIN`

> 💡 You can only connect Heroku apps to a single GitHub repository

## Next steps
More information about all of the configuration steps as well as guidance on maintaining and monitoring your app can be found in [the tutorial](https://discord.com/developers/docs/tutorials/hosting-on-heroku).

If you run into any problems, feel free to [open an issue](https://github.com/discord/heroku-sample-app/issues) in this repo.

## Configure Netlify

- [Log in](https://app.netlify.com/) to your account, or [set up a new one](https://app.netlify.com/signup)
- In the console, choose `Add new site` and then `Import an existing project` to configure your app.
- Select the `GitHub` provider. Netlify will ask you to authenticate with GitHub.

### Deploy
- For the `Branch to deploy` option, select `deploy`. If you don't have a `deploy` branch
   yet, create one off of `main` so that you can verify the Netlify deployment.
- For the `Build command` option, input whatever command you use to generate
   a build of the site (e.g. `npm run build`).
-  For the `Publish directory` option, input the directory that houses your built
   assets. For React sites, this directory is typically called `build/`.
- Select `Deploy site` and view your deployed site at the link Netlify provides.

### Set Environment Variables
 - edit config vars from your app's Settings tab in the Netlify Dashboard.
###### For this projects add: `MONGO_URL`, `PASS_SEC`, `JWT_SEC`, `STRIPE_KEY` and `CLIENT_ORIGIN`

If your deployment was successful, Netlify will automatically deploy your site
when changes are made to the `deploy` branch.


### Local Usage

To start the server,go to the `server` directory:
create `.env` file:
```
REACT_APP_BASE_URL= http://localhost:5000/ (for example)
REACT_APP_STRIPE= Public key from stripe
```
then run:
```
npm start
```
To start the client side,go to `client` directory:
create `.env` file :
```
MONGO_URL=mongodb+srv://user:password@sqlauthority.5s3yxjh.mongodb.net/shop?retryWrites=true&w=majority
PASS_SEC= decode
JWT_SEC=decode
STRIPE_KEY=  Secret key from stripe
CLIENT_ORIGIN= http://localhost:3000/ (for example)
```

then run:
```
npm start
```
