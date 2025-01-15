import AccountForm from "../components/account";
import { getUserId } from "../../action";

export default async function Page() {
  try {
    const userInfo = await getUserId();
    return <AccountForm user={userInfo} />;
  } catch (err) {
    console.error("Error in Page component:", err);
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load user data. Please log in again.</p>
      </div>
    );
  }
}
