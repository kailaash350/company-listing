
const AWS = require('aws-sdk');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

 AWS.config.update({ region: process.env.TABLE_REGION });
 const dynamodbCLI = new AWS.DynamoDB.DocumentClient();
 exports.handler = async (event) => {
     var json = JSON.parse(event.body)
    const ind = json.industry
try {
          const params = {
            TableName: 'aus_companies',
            IndexName : 'industry-index',
            KeyConditionExpression: 'industry = :ind',
            ExpressionAttributeValues:{
                ':ind':ind
            }
}

        const result = await dynamodbCLI.query(params).promise()
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