docker build . -t orderservice
docker run -p 8080:5252 orderservice
http://localhost:8080/weatherforecast