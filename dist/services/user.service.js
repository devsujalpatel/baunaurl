import { db } from "../db/index.js";
import { usersTable } from "../models/user.model.js";
import { eq } from "drizzle-orm";
export async function getUserByEmail(email) {
    try {
        const [existingUser] = await db
            .select({
            id: usersTable.id,
            firsname: usersTable.firstname,
            lastname: usersTable.lastname,
            email: usersTable.email,
            salt: usersTable.salt,
            hashedPassword: usersTable.password,
        })
            .from(usersTable)
            .where(eq(usersTable.email, email));
        return existingUser;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
export async function createUser({ firstname, lastname, email, hashedPassword, salt, }) {
    try {
        const [newUser] = await db
            .insert(usersTable)
            .values({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            salt,
        })
            .returning({
            id: usersTable.id,
            firsname: usersTable.firstname,
            lastname: usersTable.lastname,
            email: usersTable.email,
        });
        return newUser;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
export async function getUserById(id) {
    try {
        const [user] = await db
            .select({
            id: usersTable.id,
            firsname: usersTable.firstname,
            lastname: usersTable.lastname,
            email: usersTable.email,
            salt: usersTable.salt,
            hashedPassword: usersTable.password,
        })
            .from(usersTable)
            .where(eq(usersTable.id, id));
        return user;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
