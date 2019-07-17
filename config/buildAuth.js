require('dotenv').config();
global.fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');

const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_KEY = process.env.SECRET_KEY;
const REGION = process.env.REGION;
const USER_POOL = process.env.USERPOOL_ID;
const CLIENT_ID = process.env.CLIENT_ID;
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

AWS.config.update({
  region: 'us-west-2',
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
  },
});

if (ACCESS_KEY === undefined || SECRET_KEY === undefined) {
  throw new Error(
    'Pre-build script could not authenticate because `AWS-related` environmental variables were not provided.'
  );
}

if (USERNAME === undefined || PASSWORD === undefined) {
  throw new Error(
    '[PRISMA]: Requires authentication. Please supply USERNAME and PASSWORD as ENV'
  );
}

const Cognito = new AWS.CognitoIdentityServiceProvider({
  apiVersion: '2016-04-18',
});

const params = {
  AuthFlow: 'ADMIN_NO_SRP_AUTH',
  ClientId: CLIENT_ID,
  UserPoolId: USER_POOL,
  AuthParameters: {
    USERNAME: USERNAME,
    PASSWORD: PASSWORD,
  },
};

async function getTempJWT() {
  return new Promise((res, rej) => {
    Cognito.adminInitiateAuth(params, (err, data) => {
      if (err) {
        console.log(err);
        rej(err);
      }
      const { AuthenticationResult } = data;
      const { IdToken } = AuthenticationResult;
      res({ jwt: IdToken });
    });
  });
}

async function exportTempJWT(jwt) {
  const destination = path.resolve(__dirname, './tempjwt.json');
  fs.unlink(destination, err => {
    fs.appendFile(destination, JSON.stringify(jwt), err => {
      if (err) throw err;
      console.log(`The data has been written to disk`);
    });
  });
}

async function getTemporaryAuthCreds() {
  const jwt = await getTempJWT();
  return jwt;
}

module.exports = getTemporaryAuthCreds;
