# Sample Project Tree Management


## Option 1 withou docker containers
### To set up and start backend in dev env


```
cd backend
python -m venv python-env

#Install required packages
pip install -r requirements.txt


cd app

#start django server
python manage.py runserver


```

to access follow: http://127.0.0.1:8000/


### To login django admin 

```
email: n.arutshyan@gmail.com
pass: admin
```

p.s. sqlite is used for db. file is included in repo

### To setup and start frontend in dev env

```
#from project root folder 
cd frontend

npm install 
npm run dev

```

to access follow: http://127.0.0.1:3000/


p.s. all env variables are included in repo as well



## Option 2: With docker container:

To start docker compose in dev environment 

```

docker-compose  --env-file env/.env.dev  up --build

```

To create super user: 

```
docker-compose --env-file ./env/.env.dev run --rm django  sh -c "python manage.py createsuperuser"

```

To stop container:

```
docker-compose down
```