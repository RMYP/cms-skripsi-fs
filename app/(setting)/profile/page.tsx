import Profile from "../components/dashboard";
import { getUserId } from "../action";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  console.log(await getUserId())
  return(
    <Profile value={id}/>
  )
}
