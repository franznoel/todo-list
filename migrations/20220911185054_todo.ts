import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await knex.schema.createTable('todo', (table) => {
    table.uuid('id').unique().notNullable().primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table.boolean('isDone');
    table.string('description');

    const useTimestamps = true;
    const defaultToNow = true;
    table.timestamps(useTimestamps, defaultToNow);
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('todo');
}
