import prisma from "@/lib/prisma";
import { getCookies } from "@/lib/tokenValue";
import { checkJwt } from "@/lib/jwt";

interface UserInfo {
  id: string;
  email: string;
  user: string;
  token: string;
}

// const getUserInfo = async (id: string) => {
//   try {
//     const user = await prisma.user.findUnique({
//       where: {
//         id: id,
//       },
//     });
//   } catch (err: any) {}
// };

export const getUserId = async (): Promise<UserInfo> => {
  const token = await getCookies();

  if (!token || !token.value) {
    throw new Error("Authentication token is missing.");
  }

  try {
    const decoded = await checkJwt(token.value);

    if (!decoded) {
      throw new Error("Invalid token payload.");
    }

    const payload = {
      id: decoded.id,
      email: decoded.email,
      user: decoded.user,
      token: decoded.token
    };

    return payload;
  } catch (err) {
    console.error("JWT decoding error:", err);
    throw new Error("Failed to authenticate user.");
  }
};
