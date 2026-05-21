# Formative Two: Creative Authentication 
<img src="../dv200_formativetwo_authentication/frontend/carnival-authentication/src/assets/GITHUBBANNERAUTH.png" alt="Header image" width="100%" height="auto">

# About The Carnival themed creative authentication
This Creative authentication method allows users to sign up an account after "popping" 6 balloons that reveal 6 tokens that each have a different animal on them. The users need to enter a username, email then their pattern password that cant be shorter than 6 tokens or longer than 12, after entering it and signing up, it clears the input for the user to re enter ensuring they've remembered the pattern. After signing up the user is stored in the database, and a JWT token is generated. Users are also able to swap to log in and log into their existing accounts.

# Built With
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Node.js](https://img.shields.io/badge/-Node.js-5FA04E?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/-Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/-Mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/-Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![BCrypt](https://img.shields.io/badge/-BCRYPT-000000?style=for-the-badge&&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) 
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) 
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

<img src="../dv200_formativetwo_authentication/frontend/carnival-authentication/src/assets/homepageMockup.png" alt="Header image" width="100%" height="auto">

# Table of Contents
- [How to install](#how-to-install)
- [What This Project Does](#what-this-project-does)
- [Demo video](#demo-video)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## How to install
To try this webapp locally, follow these steps:

Clone The Repo

```text
[https://github.com/RhichelleStrauss/dv200_formativetwo_authentication.git]
```
1. Install backend
```
cd backend
npm install
node server.js
```
2. Install frontend
```
cd frontend
cd creative-authentication
npm install
npm run dev
```


## What this project does
- This project adds a fun flare to logging in and signing up with cute patterns and some memory games.
- Numerous combinations are able to be made safely
- This project is also a safe and secure way to handle authentication

## Mockups 
<img src="../dv200_formativetwo_authentication/frontend/carnival-authentication/src/assets/welcomePageMockup.png" alt="Header image" width="100%" height="auto">

## Demo Video
https://drive.google.com/drive/folders/16W-HocJo5goc0UN5jbWZkQJ0ebQyAhZe?usp=sharing



## Acknowledgements

- [Tsungai Katsuro](https://github.com/TsungaiKats) - top tier lecturer for teaching me


## API reference

#### Pandascore API
Official Documentation: https://docs.pandascore.co/

#### Leaguepedia API
Leaguepedia Cargo API. https://lol.fandom.com/wiki/Help:Cargo

#### Get all LoL Leagues 
Used to populate the dashboard dropdown filter.

```http
GET /lol/leagues?per_page=100
```

#### Get Upcoming matches
Used to display the schedule on the dashboard.

```http
GET /lol/matches/upcoming?filter[league_id]=${leagueID}&sort=begin_at&per_page=10
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `leagueID`      | `int` | **Required**. The PandaScore ID of the selected league |

#### Get Team Match History
Used in the Team Overview modal to calculate the 'W/L' streak.

```http
GET /lol/matches/past?filter[opponent_id]=${teamID}&per_page=5
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `teamID`      | `int` | **Required**.  ID of the team to fetch results for |

#### Get Team League History

```http
GET /teams/${teamID}/leagues
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `teamID`      | `int` | **Required**.  ID of the team to fetch results for |

#### Get Playstyle data
Used to calculate percentages for the Radar Chart (Sweep rate, Comebacks).

```http
GET /teams/${teamID}/matches?per_page=50
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `teamID`      | `int` | **Required**.  ID of the team to analyze |


#### Get Historical Timeline (Cargo)
Used via local proxy to fetch 20 games of historical stats for line charts.

```http
GET /api/cargo?tables=${table}&fields=${fields}&where=${where}&limit=20
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `table`      | `string` | **Required**.  Either ScoreboardGames or ScoreboardPlayers to analyze |
| `fields`      | `int` | **Required**.  Columns to fetch (Kills, Gold, etc.) |
| `where`      | `string` | **Required**.  SQL filter (e.g. Link = 'Faker') to analyze |

#### Environment variables
To run this project, you will need to add the following environment variables to your .env file:

REACT_APP_PANDASCORE_TOKEN

PORT (Default: 5000 for the Cargo Proxy)

## License
[MIT](https://choosealicense.com/licenses/mit/)