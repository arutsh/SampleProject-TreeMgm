FROM node:14

# set inotify and start the node application, replace yar with your command
# RUN echo "fs.inotify.max_user_watches=524288 >> /etc/sysctl.conf"


WORKDIR /
COPY ./package.json  /package.json
COPY ./package-lock.json /package-lock.json

RUN npm install 
RUN npm fund

# COPY ./public /public
# COPY ./src /src
# COPY ./index.html /index.html
# COPY ./postcss.config.js /postcss.config.js
# COPY ./vite.config.js /vite.config.js 
COPY . .
# USER noro

EXPOSE 3000
# trying to add to git
CMD ["npm", "run", "dev"]

