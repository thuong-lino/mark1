# MARK-1 Project

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg)](code_of_conduct.md)
[![License: MIT](https://img.shields.io/github/license/vintasoftware/django-react-boilerplate.svg)](LICENSE.txt)

## Running

### Tools

- Setup [editorconfig](http://editorconfig.org/), [prospector](https://prospector.landscape.io/en/master/) and [ESLint](http://eslint.org/) in the text editor you will use to develop.

### Setup

- Inside the `backend` folder, do the following:
  - Create a copy of `mark1/settings/local.py.example`:  
    `cp mark1/settings/local.py.example mark1/settings/local.py`
  - Create a copy of `.env.example`:
    `cp .env.example .env`

#### Setup and run the frontend app

- Open a new command line window and go to the project's directory
- `npm install`
- `npm run start`
  - This is used to serve the frontend assets to be consumed by [django-webpack-loader](https://github.com/django-webpack/django-webpack-loader) and not to run the React application as usual, so don't worry if you try to check what's running on port 3000 and see an error on your browser

#### Setup the backend app

- Open new terminal
- Open the `/backend/.env` file on a text editor and do one of the following:
  - Uncomment the line `DATABASE_URL=sqlite:///backend/db.sqlite3`
- Open a new command line window and go to the project's directory
- Create a new virtualenv with either [virtualenv](https://virtualenv.pypa.io/en/latest/)`pip install virtualenv` then: `virtualenv venv` or `python -m venv venv`
- Make sure the virtualenv is activated `source mark1-venv/bin/activate` (exist `(venv)`on your directory)
- Please make sure you have already setup PostgreSQL on your environment before installing the requirements `brew install postgresql`

  > Run `make compile_install_requirements` to install the requirements

  > In case you wish to use a Conda virtual environment, please remove the line `export PIP_REQUIRE_VIRTUALENV=true; \` from `Makefile`

#### Run the backend app

- Activate the environment `source mark1-venv/bin/activate`
- With the virtualenv enabled, go to the `backend` directory
- Run the project:
  `python manage.py runserver`
- Open a browser and go to `http://localhost:8000` to see the project running

[DONE]

##### OPTIONAL\*

#### Setup Celery

- Open a command line window and go to the project's directory
- `workon mark1` or `source mark1-venv/bin/activate` depending on if you are using virtualenvwrapper or just virtualenv.
- `python manage.py celery`

#### Mailhog

- For development, we use Mailhog to test our e-mail workflows, since it allows us to inspect the messages to validate they're correctly built
  - Docker users already have it setup and running once they start the project
  - For non-Docker users, please have a look [here](https://github.com/mailhog/MailHog#installation) for instructions on how to setup Mailhog on specific environments
    > The project expects Mailhog SMTP server to be running on port 1025, you may alter that by changing `EMAIL_PORT` on settings

### Testing

`make test`

Will run django tests using `--keepdb` and `--parallel`. You may pass a path to the desired test module in the make command. E.g.:

`make test someapp.tests.test_views`

### Adding new pypi libs

Add the libname to either `requirements.in` or `dev-requirements.in`, then either upgrade the libs with `make upgrade` or manually compile it and then, install.
`pip-compile requirements.in > requirements.txt` or `make upgrade`
`pip install -r requirements.txt`

## Deployment

### Setup

This project comes with an `app.json` file, which can be used to create an app on Heroku from a GitHub repository.

Before deploying, please make sure you've generated an up-to-date `requirements.txt` file containing the Python dependencies. This is necessary even if you've used Docker for local runs. Do so by following [these instructions](#setup-the-backend-app).

After setting up the project, you can init a repository and push it on GitHub. If your repository is public, you can use the following button:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

If you are in a private repository, access the following link replacing `$YOUR_REPOSITORY_LINK$` with your repository link.

- `https://heroku.com/deploy?template=$YOUR_REPOSITORY_LINK$`

Remember to fill the `ALLOWED_HOSTS` with the URL of your app, the default on heroku is `appname.herokuapp.com`. Replace `appname` with your heroku app name.

### Sentry

[Sentry](https://sentry.io) is already set up on the project. For production, add `SENTRY_DSN` environment variable on Heroku, with your Sentry DSN as the value.

You can test your Sentry configuration by deploying the boilerplate with the sample page and clicking on the corresponding button.

### Sentry source maps for JS files

The `bin/post_compile` script has a step to push Javascript source maps to Sentry, however some environment variables need to be set on Heroku.

You need to enable Heroku dyno metadata on your Heroku App. Use the following command on Heroku CLI:

- `heroku labs:enable runtime-dyno-metadata -a <app name>`

The environment variables that need to be set are:

- `SENTRY_ORG` - Name of the Sentry Organization that owns your Sentry Project.
- `SENTRY_PROJECT_NAME` - Name of the Sentry Project.
- `SENTRY_API_KEY` - Sentry API key that needs to be generated on Sentry. [You can find or create authentication tokens within Sentry](https://sentry.io/api/).

After enabling dyno metadata and setting the environment variables, your next Heroku Deploys will create a release on Sentry where the release name is the commit SHA, and it will push the source maps to it.

## Linting

- Manually with `prospector` and `npm run lint` on project root.
- During development with an editor compatible with prospector and ESLint.

## Pre-commit hooks

- Run `pre-commit install` to enable the hook into your git repo. The hook will run automatically for each commit.
- Run `git commit -m "Your message" -n` to skip the hook if you need.

## Opinionated Settings

Some settings defaults were decided based on Vinta's experiences. Here's the rationale behind them:

### `CELERY_ACKS_LATE = True`

We believe Celery tasks should be idempotent. So for us it's safe to set `CELERY_ACKS_LATE = True` to ensure tasks will be re-queued after a worker failure. Check Celery docs on ["Should I use retry or acks_late?"](https://docs.celeryproject.org/en/latest/faq.html#should-i-use-retry-or-acks-late) for more info.

## Features Catalogue

### Frontend

- `react` for building interactive UIs
- `react-dom` for rendering the UI
- `react-router` for page navigation
- `webpack` for bundling static assets
- `webpack-bundle-tracker` for providing the bundled assets to Django
- Styling
  - `bootstrap` for providing responsive stylesheets
  - `react-bootstrap` for providing components built on top of Bootstrap CSS without using plugins
  - `node-sass` for providing compatibility with SCSS files
- State management and backend integration
  - `axios` for performing asynchronous calls
  - `cookie` for easy integration with Django using the `csrftoken` cookie
  - `redux` for easy state management across the application
  - `connected-react-router` for integrating Redux with React Router
  - `history` for providing browser history to Connected React Router
  - `react-redux` for integrating React with Redux
  - `redux-devtools-extension` for inspecting and debugging Redux via browser
  - `redux-thunk` for interacting with the Redux store through asynchronous logic
- Utilities
  - `lodash` for general utility functions
  - `classnames` for easy working with complex CSS class names on components
  - `prop-types` for improving QoL while developing providing basic type-checking for React props
  - `react-hot-loader` for improving QoL while developing through automatic browser refreshing

### Backend

- `django` for building backend logic using Python
- `djangorestframework` for building a REST API on top of Django
- `django-webpack-loader` for rendering the bundled frontend assets
- `django-js-reverse` for easy handling of Django URLs on JS
- `psycopg2` for using PostgreSQL database
- `sentry-sdk` for error monitoring
- `python-decouple` for reading environment variables on settings files
- `celery` for background worker tasks
- `django-debreach` for additional protection against BREACH attack
- `whitenoise` and `brotlipy` for serving static assets

[MIT License](LICENSE.txt)
