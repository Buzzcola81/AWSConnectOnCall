const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB();
const params = {
  TableName: process.env.DynamoDBTableName,
};

const handler = async (event) => {
  try {
    const scanresult = await dynamodb.scan(params).promise();
    const findoncall = await scanresult.Items
      .map(result => AWS.DynamoDB.Converter.unmarshall(result))
      .filter(user => user.rank === event.Details.Parameters.lookuprank && user.team === event.Details.Parameters.lookupteam);
    const response = {
      mobile: findoncall[0].mobile.substring(1),
    };
    return Promise.resolve(response);
  } catch (e) {
    return Promise.reject(e);
  }
};

module.exports = {
  handler,
};
