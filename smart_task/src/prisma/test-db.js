import { db } from "./db.js";

try {
    const tasks = await db.orm.public.Task.all();

    console.log("DATABASE CONNECTED SUCCESSFULLY");
    console.log("TASKS:", tasks);

    await db.close();
} catch (error) {
    console.error("DATABASE CONNECTION FAILED");
    console.error(error);
}