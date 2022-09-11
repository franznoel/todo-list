import { APIGatewayEvent } from 'aws-lambda';
import TodoPgModel from "@models/pg/TodoPgModel";

const successJsonResponse = (body: any) => ({
  statusCode: 200,
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body)
})

const errorJsonResponse = (statusCode: number, body: any) => ({
  statusCode: 200,
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body)
})

export const todoGet = async () => {
  const allTodos = await TodoPgModel.getAll();
  console.log('allTodos', allTodos);
  return successJsonResponse(allTodos);
};

export const todoPost = async (httpEvent: APIGatewayEvent) => {
  const newTodo = JSON.parse(httpEvent?.body || '{}' as string);
  const [addedTodo] = await TodoPgModel.add(newTodo);
  return successJsonResponse(addedTodo);
};

export const todoPut = async (httpEvent: APIGatewayEvent) => {
  const todoId = httpEvent?.pathParameters?.id || '' as string;
  const todoEdit = JSON.parse(httpEvent.body || '{}' as string);
  const updatedTodo = await TodoPgModel.update(todoId, todoEdit);
  return successJsonResponse(updatedTodo);
};

export const todoDelete = async (httpEvent: APIGatewayEvent) => {
  const todoId = httpEvent?.pathParameters?.id as string;
  const [removedTodo] = await TodoPgModel.remove(todoId);
  console.log('removedTodo', removedTodo);
  const body = JSON.stringify({ errorMessage: "Already deleted" });
  return removedTodo ?
    successJsonResponse(removedTodo) :
    errorJsonResponse(400, body);
};
