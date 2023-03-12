const jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express';

class authenticateToken {
    public verifyAdminRole = (req: Request, res: Response, next: NextFunction) => {
        const authHeader : string | undefined = req.headers['authorization']
        const token: string | undefined = authHeader && authHeader.split(' ')[1]

        if (token == null) return res.status(401).json({message: "Unauthorized access"})

        jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
            if (err) return res.sendStatus(403)
            console.log(user,'.....')
            next()
        })
    }
}

export const authenticateTokens = new authenticateToken()