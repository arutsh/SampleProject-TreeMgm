# Django-React-minikube-sample
Base Sample project for django and react with minikube


To run backend for development :

```
docker-compose --env-file ./env/.env.dev  up -d
```

where .env.dev file contains env variables (including db credentials )


To create super user

```
docker-compose -f docker-compose-deploy.yml --env-file ./env/.env.prod run --rm django sh -c "python manage.py createsuperuser"

```

To stop container:

```
docker-compose -f docker-compose-deploy.yml down

```
# SampleProject-TreeMgm
