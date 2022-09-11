import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("todo").del();

    // Inserts seed entries
    await knex("todo").insert([
        { isDone: false, description: "Buy banana for the monkey" },
        { isDone: false, description: "Do oil change for Mercedes Benz" },
        { isDone: false, description: "Finish code assessment" }
    ]);
};
