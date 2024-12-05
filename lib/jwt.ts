import * as jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET as string;

export async function checkJwt(token: string) {
    try {
        if (!token) return null;

        if (!token.startsWith("Bearer ")) return null;

        const bearerToken = token.split("Bearer ")[1];

        const decoded = jwt.verify(bearerToken, JWT_SECRET);
        
        return decoded;
    } catch (err) {
        return null;
    }
}
