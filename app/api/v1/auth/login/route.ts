import prisma from "@/lib/prisma";
import * as jwt from "jsonwebtoken"

export async function POST(request: Request) {
    try {
        const data = await request.json();

        const checkAccount = await prisma.auth.findFirst({
            where: {
                email: data.email,
            },include: {
              user: true
            }
        });

        if (!checkAccount) {
            return Response.json({
                error: "Account not found",
            });
        }
      
        const payload = {
            id: checkAccount.id,
            email: checkAccount.email,
            user: checkAccount.user.name
          }
        const token = 'Bearer ' + jwt.sign(payload, "rahasia", {
            expiresIn: "1d",
        });
        
        return Response.json({ email: token });
    } catch (err) {
        return Response.json({ error: err });
    }
}
