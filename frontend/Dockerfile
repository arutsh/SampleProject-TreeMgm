FROM node:lts-alpine3.14

# set inotify and start the node application, replace yar with your command
# RUN echo "fs.inotify.max_user_watches=524288 >> /etc/sysctl.conf"

# 1. copy package.json and package-lock.json to /app dir
RUN mkdir /app
COPY package*.json /app
# COPY ./package-lock.json /package-lock.json
WORKDIR /app
RUN npm install 
RUN npm install react-scripts@3.4.1 -g 
RUN npm fund


COPY . .
# 5. Expose port 3000 on the container
EXPOSE 3000
# 6. Run the app
CMD ["npm", "run", "dev"]