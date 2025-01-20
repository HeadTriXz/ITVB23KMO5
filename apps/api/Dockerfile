FROM debian:bullseye-slim
RUN apt-get update && apt-get install -y \
    nodejs \
    npm \
    bash \
    git \
    curl \
    wget \
    gnupg \
    lsb-release \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Add the Adoptium GPG key and repository
RUN wget -qO- https://packages.adoptium.net/artifactory/api/gpg/key/public | tee /usr/share/keyrings/adoptium.asc
RUN echo "deb [signed-by=/usr/share/keyrings/adoptium.asc] https://packages.adoptium.net/artifactory/deb $(lsb_release -cs) main" > /etc/apt/sources.list.d/adoptium.list

# Install Temurin JDK
RUN apt-get update && apt-get install -y temurin-21-jdk && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .

RUN groupadd -r automaat && useradd -r -m -g automaat automaat && \
    chown -R automaat:automaat /app

USER automaat

RUN chmod +x mvnw

EXPOSE 8080
CMD ["./mvnw"]
