import Joi from "joi";
import { createValidator } from "express-joi-validation";

const validator = createValidator();

const schema = {
	auth: {
		login: Joi.object({
			email: Joi.string()
				.email({ tlds: { allow: ["se", "com"] } })
				.required()
				.min(6)
				.max(64),
			password: Joi.string().required().min(3).max(32)
		}),
		register: Joi.object({
			email: Joi.string()
				.email({ tlds: { allow: ["se", "com"] } })
				.required()
				.min(6)
				.max(64),
			password: Joi.string().required().min(3).max(32),
			username: Joi.string().required().max(64).min(3)
		})
	},
	friends: {
		get: Joi.object({}),
		add: Joi.object({
			username: Joi.string().required().max(64).min(3)
		}),
		accept: Joi.object({
			id: Joi.number().required().integer().greater(0)
		}),
		remove: Joi.object({
			id: Joi.number().required().integer().greater(0)
		})
	},
	todos: {
		get: Joi.object({}),
		addList: Joi.object({
			title: Joi.string().required().max(64).min(3)
		}),
		addTodo: Joi.object({
			todolistId: Joi.number().required().integer().greater(0),
			content: Joi.string().required().max(64).min(3)
		}),
		toggleTodo: Joi.object({
			// todolistId: Joi.number().required().integer().greater(0),
			todoId: Joi.number().required().integer().greater(0)
		}),
		removeTodo: Joi.object({
			// todolistId: Joi.number().required().integer().greater(0),
			todoId: Joi.number().required().integer().greater(0)
		})
	}
};

const validate = {
	auth: {
		login: validator.body(schema.auth.login),
		register: validator.body(schema.auth.register)
	},
	friends: {
		get: validator.query(schema.friends.get),
		add: validator.body(schema.friends.add),
		accept: validator.body(schema.friends.accept),
		remove: validator.body(schema.friends.remove)
	},
	todos: {
		get: validator.query(schema.todos.get),
		addList: validator.body(schema.todos.addList),
		addTodo: validator.body(schema.todos.addTodo),
		toggleTodo: validator.body(schema.todos.toggleTodo),
		removeTodo: validator.body(schema.todos.removeTodo)
	}
};

export default validate;
