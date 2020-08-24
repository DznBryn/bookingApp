const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json({ extended: false }));

mongoose
	.connect(
		`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@project1.izxzb.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
		{
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => {
		console.log('Connected');
	})
	.catch((error) => {
		console.log(error);
	});

app.use(
	'/api',
	graphqlHTTP({
		schema: graphQlSchema,
		rootValue: graphQlResolvers,
		graphiql: true,
	})
);

app.listen(PORT);
