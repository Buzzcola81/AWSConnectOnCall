const AWS = require('aws-sdk');

const sns = new AWS.SNS();
const smsparams = {
  attributes: {
    DefaultSenderID: process.env.SMSSenderId,
  },
};

const dynamodb = new AWS.DynamoDB();
const params = {
  TableName: process.env.DynamoDBTableName,
};

const updateoncallusers = (result) => {
  const updatedbparams = {
    Key: {
      id: {
        N: result.id.toString(),
      },
    },
    AttributeUpdates: {
      rank: {
        Value: {
          S: result.rank.toString(),
        },
      },
    },
    TableName: process.env.DynamoDBTableName,
  };
  return dynamodb.updateItem(updatedbparams).promise();
};

const rotateOnCallDB = (result, index, array) => {
  const updatedresult = result;
  updatedresult.rank -= 1;
  if (updatedresult.rank === 0) {
    const team = array.filter(datacopy => datacopy.team === updatedresult.team);
    updatedresult.rank = team.length;
  }
  return updatedresult;
};

const sendsms = (updatedrosteritem) => {
  const message = `You are now the primary OnCall engineer this week for ${updatedrosteritem.team} team`;
  const mobilenumber = updatedrosteritem.countrycode + updatedrosteritem.mobile.substring(1);
  return (updatedrosteritem.rank === 1)
    ? sns.publish({
      Message: message,
      MessageStructure: 'string',
      PhoneNumber: mobilenumber,
    }).promise()
    : Promise.resolve();
};

const handler = async () => {
  try {
    await sns.setSMSAttributes(smsparams).promise();
    const scanresult = await dynamodb.scan(params).promise();
    const updatedroster = await scanresult.Items
      .map(result => AWS.DynamoDB.Converter.unmarshall(result))
      .map(rotateOnCallDB);
    const promises = updatedroster.map(updateoncallusers);
    await Promise.all(promises);
    const snspromises = updatedroster.map(sendsms);
    await Promise.all(snspromises);
  } catch (e) {
    return Promise.reject(e);
  }
  return Promise.resolve();
};

module.exports = {
  handler,
  rotateOnCallDB,
};
