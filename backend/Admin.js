import User from "./User.js";
export default class Admin extends User {

    async viewAllAuctions(){
        try {
         const [rows] = await pool.query("SELECT * FROM auctions");
        res.json(rows);
        } 
        catch (err) {
        res.status(500).json({ error: err.message });
        }
    }

    viewReportedAuctions(){
        //DATABASE TO VIEW REPORTED AUCTIONS ????
    }
 
    viewReportedUsers(){
        //DATABASE TO VIEW REPORTED USERS ????
    }

    searchForSpecificUser(clientID){
        //DATABASE TO SEARCH FOR A SPECIFIC USER ????
    }

    viewAllClients(){
        //DATABASE TO VIEW ALL CLIENTS ????
    }
}