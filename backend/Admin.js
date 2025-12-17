import User from "./User.js";
import {viewAllAuctions, viewReportedAuction, viewReportedUsers,viewAllClients} from "../Database/database.js";
export default class Admin extends User {

    static async viewAllAuctions(){
        const rows = await viewAllAuctions();
        return rows;
    }

    async viewReportedAuctions(){
        const rows = await viewReportedAuction();
        return rows;
    }
 
    async viewReportedUsers(){
        const rows = await viewReportedUsers();
        return rows;
    }


    async viewAllClients(){
        const rows = await viewAllClients();
        return rows;
    }
}