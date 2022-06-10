
const AWS = require('aws-sdk')
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

 AWS.config.update({ region: process.env.TABLE_REGION });
 const dynamodbCLI = new AWS.DynamoDB.DocumentClient();
exports.handler = async (event) => {
    try {
        var params = {
            TableName: 'aus_companies'
        };
        var result = await dynamodbCLI.scan(params).promise()
        console.log(JSON.stringify(result))
        return {
            statusCode: 200,
            headers: {
             "Access-Control-Allow-Origin": "*",
             "Access-Control-Allow-Headers": "*"
         }, 
            body: JSON.stringify(result),
        };
    } catch (error) {
        console.error(error);
    }
};
