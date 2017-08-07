FROM mhart/alpine-node:7.6.0



# Add package.json
ADD app/src/package.json /src/package.json

#install node modules
RUN npm install

#Add the source code
ADD app/src /src

WORKDIR /app 
CMD ["npm", "run", "start"]
