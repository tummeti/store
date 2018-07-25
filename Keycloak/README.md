#Run a Keycloak docker image, specifying the admin credentials and port
docker run -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin1 -p 8080:8080 jboss/keycloak

#Access the admin console at
[http://localhost:8080/auth](http://localhost:8080/auth)

#Create a new Realm
![Realm](1CreateRealm.png)

#Create two Clients - one for the application and one for the service
![Clients](2CreateTwoClients.png)

#Edit the Application Client
![Application Cleint](3EditAppClient.png)

#Edit the Service Client
![Service client](4EditServiceClient.png)

#Create a user
![Create User](5CreateUser.png)

