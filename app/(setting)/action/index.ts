import axios from "axios";
import prisma from "@/lib/prisma";
import { getCookies } from "@/lib/tokenValue";
import { checkJwt } from "@/lib/jwt";

const getUserInfo = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  } catch (err: any) {}
};

export const getUserId = async () => {
    const token = await getCookies()
    if(!token) {
        return null
    }
    
    const decoded = await checkJwt(token.value)
    return decoded
}