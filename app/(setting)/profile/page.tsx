import Profile from "../components/dashboard";
import { getUserId } from "../action";

export default async function Page() {
  const userInfo = await getUserId()
  return(
    <Profile user={userInfo}/>
  )
}
