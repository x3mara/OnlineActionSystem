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
    
}