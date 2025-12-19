import User from '../User.js';
import clientController from './clientController.js';
import adminController from './adminController.js';
export default class authenticationController{
    constructor(){}
    async verifyLogin(req, res){
        const { username, password } = req.body;
        let rows = await User.searchUserEntity(username);
        let user = rows[0];
        if(rows.length === 0){
            return null;
        }
        else if (user.id[0] === 'a'){
            if(user.password === password){
                const ControllerAD = new adminController();
                ControllerAD.loginAsAdmin(req,res);
            }
            else{
                return res.render('Login' , { success: false, field: "password", message: "Incorrect password" });
            }
        }
        else{
            if(user.password === password){
                const ControllerCL = new clientController();
                ControllerCL.loginAsClient(req,res);
            }
            else{
                return res.render('Login' , { success: false, field: "password", message: "Incorrect password" });
            }
        }
       
    }
}