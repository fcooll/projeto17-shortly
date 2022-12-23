import bcrypt from "bcrypt";
import * as signRepository from "../repositories/signRepository.js";

async function signup(req, res){
    const user = req.body;

    try {
        
        const result = await signRepository.emailValidate(user.email);
        if(result > 0){
            return res.status(409).send("E-mail já utilizado!");
        }

        const { name, email, password } = user
        const passwordCrypt = bcrypt.hashSync(password, 10);

        signRepository.insertUser(name, email, passwordCrypt);

        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

}

export { signup };
