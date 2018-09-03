# mu-prediction-contest
[![Build Status](https://travis-ci.org/andrewmayer515/mu-prediction-contest.svg?branch=master)](https://travis-ci.org/andrewmayer515/mu-prediction-contest)
[![Coverage Status](https://coveralls.io/repos/github/andrewmayer515/mu-prediction-contest/badge.svg?branch=master)](https://coveralls.io/github/andrewmayer515/mu-prediction-contest?branch=master)

A node.js script that scraps the contents of [muscoop.com](https://www.muscoop.com/) using [Puppeteer](https://github.com/GoogleChrome/puppeteer#readme) to calculate prediction contest winners

## Rules
For this project, I based the prediction contest rules off of [this muscoop.com post](https://www.muscoop.com/index.php?topic=10.0).

## Setup:
Download the latet LTS version of [Node](https://nodejs.org/en/), then run the following:
```
$ git clone https://github.com/andrewmayer515/mu-prediction-contest.git
$ cd mu-prediction-contest
$ npm install
```

## Configuration
To configure new prediction contest results, you will need to create a `key.js` file under the data folder to enter the postgame results into (refer to [key-example.js](https://github.com/andrewmayer515/mu-prediction-contest/blob/master/data/key-example.js) for formatting). It may be easier to copy the contents of [key-example.js](https://github.com/andrewmayer515/mu-prediction-contest/blob/master/data/key-example.js) into `key.js` to start off.

The results object in `key.js` is comprised of two parts: Questions and the URL.

### Questions
A standard question has 4 main parts: an identifier, text, answer, and the type of question:
```
question1: {
    text: 'Total Game Points:',
    answer: 167,
    type: CONSTANTS.NUMBER,
}
```
#### Identifier
In the example, this is `question1`. Every question will need a unique numerical value after the word 'question'. This is used to parse out the contents of the user comment on the line that starts with '1.'

Additionally, this can be substituted with `bonus`. The `bonus` key acts as a bonus question for the prediction contest, where the prediction must be exact in order for the guess to be correct. Only one `bonus` object can exist in the `key.js` file at a time.

#### Text
In the example, this is `text: 'Total Game Points:'`. The string here is used on when the app outputs the results.

#### Answer
In the example, this is `answer: 167`. This value will need to be looked up post game for the given question and is used in calculating which user has the closest (or exact) answer to a given question. The formatting of this may be different for different types of questions. Refer to [key-example.js](https://github.com/andrewmayer515/mu-prediction-contest/blob/master/data/key-example.js) for examples.

#### Type
In the exaple, this is `type: CONSTANTS.NUMBER`. This designates the type of question being asked. There are currently 3 supported types:
*  `CONSTANTS.NUMBER` - The answer is a number.
*  `CONSTANTS.PLAYER` - The answer is a player name.
*  `CONSTANTS.PLAYER_NUMBER` - The answer is both a number and a player name.


## Run Options

In the project directory, you can run the following commands:

Normal usage (headless browser):
```
$ npm start
```

To have the Chromium browser open on launch, you can run the following: 

```
$ node run debug
```

### Login
If you want/need the app to sign in to your [muscoop.com](https://www.muscoop.com/) profile, you can create an `auth.json` file under the data folder and provide your username/password (refer to [auth-example.json](https://github.com/andrewmayer515/mu-prediction-contest/blob/master/data/auth-example.json) for formatting). You must then append `:login` to the above node script commands:

```
$ node run start:login
```
```
$ node run debug:login
```

## Maintenance
Since some of the questions may refer to an individual player on the roster, the roster found in [src/common/constants](https://github.com/andrewmayer515/mu-prediction-contest/blob/master/src/common/constants.js) will need to be updated with the player names in a given year.
