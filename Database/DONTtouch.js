import {pool} from "../database.js";
import fs from "fs";
async function testDBConnection() {
    try{
        const sql = fs.readFileSync("content.sql", "utf-8");
        await pool.query(sql);
        console.log("Database connection and initialization successful.");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}
testDBConnection();