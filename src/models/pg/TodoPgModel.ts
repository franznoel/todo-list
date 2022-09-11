import { Todo } from '@interfaces/Todo';
import knexDb from './pgKnex';

const TodoPgModel = knexDb('todo');

const getAll = async () => {
  const allTodos = await TodoPgModel.select('*');
  return allTodos;
};

const add = async (newTodo: Todo) => {
  const insertedTodo = await TodoPgModel
    .returning(['id', 'description'])
    .insert(newTodo);
  return insertedTodo;
};

const update = async (todoId: string, todoEdit: Todo) => {
  const updatedTodo = await TodoPgModel
    .returning(['id', 'description'])
    .where({ id: todoId })
    .update(todoEdit);
  return updatedTodo;
};

const remove = async (todoId: string) => {
  const removedTodo = await TodoPgModel
    .returning(['id', 'description'])
    .where({ id: todoId })
    .del();
  return removedTodo;
};

export default {
  getAll,
  add,
  update,
  remove,
};
