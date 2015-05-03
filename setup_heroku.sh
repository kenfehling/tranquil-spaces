#!/bin/sh
APP="tranquil-spaces"

heroku config:add BUILDPACK_URL=https://github.com/mbuchetics/heroku-buildpack-nodejs-grunt.git --app $APP;
heroku config:set NODE_ENV=production --app $APP;