/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    //add
    await knex.raw(`
        DROP TRIGGER IF EXISTS new_dispute_trigger ON "Dispute";

        CREATE OR REPLACE FUNCTION notify_new_dispute() 
        RETURNS TRIGGER AS $$
        BEGIN
            PERFORM pg_notify('new_message', json_build_object('event', 'insert', 'data', to_json(NEW))::text);
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
    
        CREATE TRIGGER new_dispute_trigger
        AFTER INSERT ON "Dispute"
        FOR EACH ROW
        EXECUTE PROCEDURE notify_new_dispute();
    `);

    //delete
    await knex.raw(`
        DROP TRIGGER IF EXISTS notify_delete_dispute ON "Dispute";

        CREATE OR REPLACE FUNCTION notify_delete_dispute() 
        RETURNS TRIGGER AS $$
        BEGIN
            PERFORM pg_notify('new_message', json_build_object('event', 'delete', 'data', to_json(OLD))::text);
            RETURN OLD;
        END;
        $$ LANGUAGE plpgsql;
    
        CREATE TRIGGER delete_dispute_trigger
        AFTER DELETE ON "Dispute"
        FOR EACH ROW EXECUTE PROCEDURE notify_delete_dispute();
    `);
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.raw(`DROP TRIGGER IF EXISTS new_dispute_trigger ON "Dispute";`);
    await knex.raw(`DROP TRIGGER IF EXISTS delete_dispute_trigger ON "Dispute";`);
    await knex.raw(`DROP FUNCTION IF EXISTS notify_new_dispute;`);
    await knex.raw(`DROP FUNCTION IF EXISTS notify_delete_dispute;`);
}
