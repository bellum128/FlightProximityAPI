FROM node:17

WORKDIR "/opt/FlightProximityAPI/"
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 6129
CMD [ "npm", "start" ]
