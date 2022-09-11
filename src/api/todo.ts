
const successJsonResponse = (body: any) => ({
  statusCode: 200,
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body)
})

export const todoGet = async (event: any) => {
  console.log('something', event);
  return successJsonResponse({ greetings: "Hello World! TODO GET" });
};

export const todoPost = async () => {
  return successJsonResponse({ greetings: "Hello World! TODO POST" });
};

export const todoPut = async () => {
  return successJsonResponse({ greetings: "Hello World! TODO PUT" });
};

export const todoDelete = async () => {
  return successJsonResponse({ greetings: "Hello World! TODO DELETE" });
};

