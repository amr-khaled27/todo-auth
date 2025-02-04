import { AuthContextType } from "@/app/providers/AuthProvider";
type SignOutProps = {
  authContext: AuthContextType | undefined;
  setClickedSignOut?: React.Dispatch<React.SetStateAction<boolean>> | null;
};

const SignOut = ({ authContext, setClickedSignOut }: SignOutProps) => {
  return (
    <button
      onClick={() => {
        if (setClickedSignOut) {
          setClickedSignOut(true);
        }
        authContext?.signOut();
      }}
      className="bg-red-500 fixed top-4 right-4 text-white p-2 rounded hover:bg-red-600"
    >
      Sign Out
    </button>
  );
};

export default SignOut;
