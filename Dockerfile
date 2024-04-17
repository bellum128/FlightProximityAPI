FROM node:17

WORKDIR "/opt/FlightDisplayAPI/"
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 6129
CMD [ "npm", "start" ]
