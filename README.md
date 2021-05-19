# NuzlockeTracker

## Motivation
The Nuzlocke Challenge is a different way to play the popular game series Pokemon to increase the difficulty of the playthrough. While undertaking this challenge, the player must abide by a few mandatory rules and any custom rules they place onto themselves. I, and most players, will keep these rules in a txt file or written down on paper. I decided to create a web application that keeps track of these rules. Although, I added more functionality to further the use of the website. These features include tracking the Pokemon that you catch, receive, miss, "die," or store. A possible goal set at the beginning of development was to compile this data and create a summary for each of the last 10 playthroughs. This goal was successfully achieved and added as a feature. User accounts to track this data are an available feature, too.

## Tech/framework used

<b>Built with</b>
- [Python](https://docs.python.org/3/)
- [PostgreSQL](https://www.postgresql.org/docs/13/index.html)
- [Django](https://www.djangoproject.com/)
- [Django Rest Framework](https://www.django-rest-framework.org/)
- [PyJWT](https://pyjwt.readthedocs.io/en/latest/)
- [Yarn](https://classic.yarnpkg.com/en/docs/)
- [React with Typescript](https://create-react-app.dev/docs/adding-typescript/)

## Installation

This project was run on Windows 10.

<b>Building the Server</b>

It is best to use the python `virtualenv` tool to build locally:

```sh
$ python -m venv env
$ .\env\Scripts\activate
$ cd backend
$ pip install -r requirements.txt
$ python manage.py runserver
```

Then visit `http://localhost:8000` to view the app.

<b>Frontend Directions</b>

Installing Yarn

```
cd frontend
npm install --global yarn
```

Further instructions [here.](https://github.com/jacobhandy3/NuzlockeTracker/tree/main/frontend)

