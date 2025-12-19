import User from '../User.js';
import clientController from './clientController.js';
import adminController from './adminController.js';
export default class AuthenticationController{
    constructor(){}
    static async verifyLogin(req, res){
        const { username, password } = req.body;
        let rows = await User.searchUserEntity(username);
        let user = rows[0];
        if(rows.length === 0){
            return null;
        }
        else if (user.id[0] === 'a'){
            if(user.password === password){
                ControllerAD = new adminController();
                ControllerAD.loginasadmin(req,res);
            }
            else{
                return false;
            }
        }
        else{
            if(user.password === password){
                ControllerCL = new clientController();
                ControllerCL.loginAsClient(req,res);
            }
            else{
                return false;
            }
        }
       
    }
}