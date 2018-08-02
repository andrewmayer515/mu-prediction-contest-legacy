# mu-prediction-contest
A node.js app that scraps the contents of [muscoop.com](https://www.muscoop.com/) using [Puppeteer](https://github.com/GoogleChrome/puppeteer#readme) to calculate prediction contest winners

## Setup:
Download the latet LTS version of [Node](https://nodejs.org/en/)
```
$ git clone https://github.com/andrewmayer515/mu-prediction-contest.git
$ cd mu-prediction-contest
$ npm install
```

## Run Options

In the project directory, you can run the following commands:

Normal usage (headless browser):
```
$ npm start
```
Alias to `npm start`: 

```javascript
$ node run start
```

To have the Chromium browser open on launch, you can run the following: 

```
$ node run debug
```

### Login
If you want/need the app to sign in to your [muscoop.com](https://www.muscoop.com/) profile, you can create an `auth.json` file under the config folderand provide your username/password (refer to `auth-example.json` for formatting). You must then append `:login` to the above node script commands:

```
$ node run start:login
```
```
$ node run debug:login
```
