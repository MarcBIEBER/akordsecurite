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
const getSuperUser = async (req, res, next) => {
    if(req.user_decrypted.userType === "0") {
        next();
    } else {    
        res.status(403).send("Forbidden");
    }
}

// get user from userTable by email
const getIsAdmin = async (req, res, next) => {
    if(req.user_decrypted.userType === "1") {
        next();
    } else {    
        res.status(403).send("Forbidden");
    }
}

// get user from userTable by email
const getUser = async (userEmail) => {
    console.log(userEmail);
    const params = {
        TableName: "userTable",
        Key: {
            email: userEmail
        },
    };

    try {
        const data = await ddbDocClient.send(new GetCommand(params));
        return data.Item;
    } catch (err) {
        console.log("Error: getUser:\n", err.stack);
        return undefined;
    }
}

// updateUser in userTable
const updateUser = async (userEmail, updateExpression, expressionAttributeValues) => {
    const params = {
        TableName: "userTable",
        Key: {
            email: userEmail,
        },
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "ALL_NEW",
    };

    try {
        const data = await ddbDocClient.send(new UpdateCommand(params));
        return data;
    } catch (err) {
        console.error("Error", err.stack);
    }
};

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

// addItem in userTable
const addItemAtTable = async (item, table) => {

    const params = {
        TableName: table,
        Item: item
    };

    try {
        const data = await ddbDocClient.send(new PutCommand(params));
        return data;
    } catch (err) {
        console.log("Error", err.stack);
    }
};

module.exports = {
    getUser,
    getSuperUser,
    getIsAdmin,
    updateUser,
    deleteUser,
    addItemAtTable
};