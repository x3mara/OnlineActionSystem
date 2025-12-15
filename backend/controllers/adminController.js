import User from "../User.js";
export default class adminController{


    async login(inputUsername, inputPassword){
    
            this.sessionAdmin = await User.verifyLogin(inputUsername, inputPassword);
            if (this.sessionAdmin==false){
                return "Incorrect password";
            }
            else if (this.sessionAdmin==null){
                return "Username does not exist";
            }
            else{
                return "Login successful";
            }
        }
    
}