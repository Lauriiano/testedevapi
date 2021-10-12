import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const Auth = {
    private: (req, res, next) => {
        let success = false;

        if(req.headers.authorization) {

            const [type, token] = req.headers.authorization.split(' ');

            if(type === 'Bearer') {
                try{
                    const decoded = JWT.verify(
                        token, 
                        process.env.JWT_SECRET_KEY.toString()
                    );
                    success = true;
                }catch(e) {}
            }

        }

        if(success) {
            next();
        } else {
            res.status(403); // Não permitido
            res.json({error: "Não autorizado"});
        }
    }
}