############################################################
# Dockerfile to build Keycloak 
# Based on jboss/keycloak-postgres:2.5.1.Final
############################################################

#Grab keycloak's postgres image
FROM jboss/keycloak-postgres:2.5.1.Final

#Add in the exported json of the Semanto realm 
COPY realm-export.json .

ENTRYPOINT [ "/opt/jboss/docker-entrypoint.sh" ]

#Command used to import a previously exported json realm(s)
#If you have local changes to the Keycloak realm you wish to preserve,
#update "-Dkeycloak.migration.strategy=<X>" to be:
#   - IGNORE_EXISTING - Ignore importing if a realm of this name already exists.
#   - OVERWRITE_EXISTING - Remove existing realm and import it again with new data from the JSON file.
CMD ["-b", "0.0.0.0", "-Dkeycloak.migration.action=import", "-Dkeycloak.migration.provider=singleFile", "-Dkeycloak.migration.strategy=OVERWRITE_EXISTING", "-Dkeycloak.migration.file=realm-export.json"]
