FROM eclipse-temurin:11-alpine
LABEL "com.openfirma-vendor"="Factoria Mucha"
LABEL "version"="0.6"
VOLUME /openfirma-disk
COPY target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
