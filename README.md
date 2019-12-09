

# acml2019
Heroku App link:
    http://weathify.herokuapp.com/

Dependencies:-
Back-end :-
axios--> responsible for sending requests to another server .
bcryptjs---> responsible for encrypting the users' passwords .
cors ---> used to connecet our node js app with front-end .
express----> the server that handles all the back-end requests .
dotenv---> used to save environment variables into process.env
Front-end :-
axios--> responsible for sending requests to another server .
bootstrap ---> CSS framework .
react-----> UI library .
react-dom----> is responsible for rendering .
react-router-dom----> used for routing in our front-end app

-------------------------------------------------------------------------------------------------------------------------------------------
Config:-
our config file is .env file
our configration consists of 3 keys, spotify client ID, spotify client secret, open-weather-map key

------------------------------------------------------------------------------------------------------------------------------------------

Docker :-
2 images one Dockerfile at the client and one at app . 
our idea is that we want to divide our application into 2 parts :- 1 for express app and 2 for client.

-------------------------------------------------------------------------------------------------------------------------------------------
Docker-compose :- binding our ports to our 2 containers then the docker-compose build the 2 applications and bind them by the
default network
