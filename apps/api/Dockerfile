FROM alpine:latest
RUN apk add --no-cache openjdk21 nodejs bash
WORKDIR /app

COPY . .

RUN addgroup -S automaat && adduser -S automaat -G automaat && chown -R automaat:automaat /app
USER automaat

EXPOSE 8080
CMD ["./mvnw"]
