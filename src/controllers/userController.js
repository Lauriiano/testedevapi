import { User } from "../models/user.js";
import JWT from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();

export const newRegister = async (req, res) => {

    let {nome, email, senha} = req.body

    if(!nome || !email || !senha) {
        res.json({error: "preencha todos os campos"});
    }

    let userExist = await User.findOne({where: { email }});

    if(!userExist) {
        try{
            let newUser = await User.create({nome, email, senha});

            const token = JWT.sign(
                {id: newUser.id, email: newUser.email},
                process.env.JWT_SECRET_KEY.toString()
            );           

            res.status(201);
            res.json({id: newUser.id, nome: newUser.nome , token});
       }catch(e){
           res.json({error: "houve um problema ao executar essa ação, verifique a conexão com o banco"});
       }
    }

    res.json({error: 'Email ja cadastrado'});
    

}

export const login = async (req, res) => {

    let {email, senha} = req.body

    if(!email || !senha) {
        res.json({error: "preencha todos os campos"});
    }

    console.log('EMAIL: ' + email)
    console.log('SENHA: ' + senha)

    let userExist = await User.findOne({where: {email, senha}});

    if(userExist) {
        const token = JWT.sign(
            {id: userExist.id, email: userExist.email},
            process.env.JWT_SECRET_KEY.toString()
        );

       res.json({status: true, token});
       return;
    }

    res.json({error: 'Usuário não encontrado'});

}