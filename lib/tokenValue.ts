import { cookies } from "next/headers";

// this code have the same function with getFeCookies,
// but im not sure if there is any part of the code that already use
// getCookies method, so i just create the new function because the getFeCookies will be use in a function with diffrent approach if the token was null
export const getCookies = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("_token");
  return token?.value || null;

};

// same function with code above, but with slightly diffrent response is the token was null
export const getFeCookies = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("_token");
  if (token) {
    return token;
  }
  throw new Error("Cokkies not found");
};
