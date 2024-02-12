FROM --platform=linux/amd64 node:18

COPY ./scrapy-service /app
COPY ./docker/scrapy-service/entrypoint.sh /usr/local/bin/docker-entrypoint.sh

RUN apt-get update \
    && apt-get install -y wget gnupg cron supervisor \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /usr/share/keyrings/googlechrome-linux-keyring.gpg \
    && sh -c 'echo "deb [arch=amd64 signed-by=/usr/share/keyrings/googlechrome-linux-keyring.gpg] https://dl-ssl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-khmeros fonts-kacst fonts-freefont-ttf libxss1 dbus dbus-x11 \
      --no-install-recommends \
    && service dbus start \
    && rm -rf /var/lib/apt/lists/* \
    && groupadd -r pptruser && useradd -rm -g pptruser -G audio,video pptruser

WORKDIR /app
RUN npm install
RUN chmod +x /usr/local/bin/docker-entrypoint.sh


#ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
RUN npm run dev