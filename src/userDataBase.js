require('dotenv').config();
const { DynamoDBClient, ListTablesCommand } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand, GetCommand, QueryCommand, UpdateCommand, DeleteCommand } = require("@aws-sdk/lib-dynamodb");
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.DB_ACCESS_KEY
const secretAccessKey = process.env.DB_SECRET_KEY
const jwt = require('jsonwebtoken');

const marshallOptions = {
    // Whether to automatically convert empty strings, blobs, and sets to `null`.    
    convertEmptyValues: false, // false, by default.    
    // Whether to remove undefined values while marshalling.    
    removeUndefinedValues: true, // false, by default.    
    // Whether to convert typeof object to map attribute.    
    convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
    // Whether to return numbers as a string instead of converting them to native JavaScript numbers.    
    wrapNumbers: false, // false, by default.
};

const translateConfig = { marshallOptions, unmarshallOptions };

const client = new DynamoDBClient({
    region: region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }
});

const ddbDocClient = DynamoDBDocumentClient.from(client, translateConfig);

// get user from userTable by email
const getSuperUser = async (userEmail) => {
    const params = {
        TableName: "userTable",
        Key: {
            email: userEmail,
        },
    };

    try {
        const data = await ddbDocClient.send(new GetCommand(params));
        console.log(data);
        return data.Item;
    } catch (err) {
        console.log("Error", err.stack);
    }
}

// get user from userTable by email
const getUser = async (userEmail) => {
    const params = {
        TableName: "userTable",
        Key: {
            email: userEmail,
        },
    };

    try {
        const data = await ddbDocClient.send(new GetCommand(params));
        // console.log(data.Item);
        // console.log("Success - item added or updated", data);
        return data.Item;
    } catch (err) {
        console.log("Error", err.stack);
    }
}

// deleteUser in userTable by email
const deleteUser = async (userEmail) => {
    const params = {
        TableName: "userTable",
        Key: {
            email: userEmail,
        },
    };

    try {
        const data = await ddbDocClient.send(new DeleteCommand(params));
        // console.log("Success - item added or updated", data);
        return data;
    } catch (err) {
        console.log("Error", err.stack);
    }
};

module.exports = {
    getUser,
    getSuperUser,
    deleteUser
};