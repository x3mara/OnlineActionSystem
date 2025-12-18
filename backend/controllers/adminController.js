import session from "express-session";
import User from "../User.js";
export default class adminController{


    async login(req, res){
        const { username, password } = req.body;
            const sessionAdmin = await User.verifyLogin(username, password);
            if (sessionAdmin==false){
                res.render('Login' , { success: false, field: "password", message: "Incorrect password" });
            }
            else if (sessionAdmin==null){
                res.render('Login' , { success: false, field: "username", message: "Username does not exist" });
            }
            else{
                req.session.user= sessionAdmin;
                res.render('AdminDashboard', { success: true, field: "", message: "Successfully logged in" });
            }
            
    }

    async showCredentials(req, res){
        const {username} = req.body;
        let client = await User.searchClient(username);
        let userIDdisplay = client[0].userID;
        let usernamedisplay = client[0].username;
        let emaildisplay = client[0].email;
        let suspended = client[0].suspended;
        let suspicious = client[0].suspicious;
        let points = client[0].points;
        let level = client[0].level;
        res.render("nameOfScreen",{userIDdisplay, usernamedisplay, emaildisplay, suspended, suspicious, points, level});
    }
    
    async viewAllAuctions(req, res){
        const auctions = await Admin.viewAllAuctions();
        return res.render("nameOfScreen", { auctions });
    }

    async viewReportedAuctions(req, res){
        reportedAuctions = await Admin.viewReportedAuctions();
        res.render("nameOfScreen", { reportedAuctions });
    }

    async viewReportedUsers(req, res){
        rows = await Admin.viewReportedUsers();
        res.render("nameOfScreen", { rows });
    }

    async searchForSpecificUser(req, res){
        const { username } = req.body;  
        let user = await User.searchUser(username);
        if(user.length === 0){
            res.render("nameOfScreen", { message: "User not found" });
            return;
        }
        if(user[0].roles !== "Client"){
            res.render("nameOfScreen", { message: "User is not a client" });
            return;
        }
        let client = await User.searchClient(username); 
        res.render("nameOfScreen", { client });
    }

    async viewAllClients(req, res){
        const clients = await Admin.viewAllClients();
        res.render("nameOfScreen", { clients });
    }
}