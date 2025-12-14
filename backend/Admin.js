import User from "./User.js";
export default class Admin extends User {

    async viewAllAuctions(){
        const [rows] = await pool.query('SELECT * FROM auctions');
        return rows;
    }

    async viewReportedAuctions(){
        const [rows] = await pool.query(
        'SELECT * FROM auctions WHERE suspicious > ?',
        [5]);
        return rows;
    }
 
    async viewReportedUsers(){
        const [rows] = await pool.query(
        'SELECT * FROM auctions WHERE suspicious > ?',
        [5]);
        return rows;
    }

    async searchForSpecificUser(clientID){
        const [rows] = await pool.query(
        'SELECT * FROM clients WHERE clientID = ?',
        [clientID]);
        return rows;
    }

    async viewAllClients(){
        const [rows] = await pool.query('SELECT * FROM clients');
        return rows;
    }
}