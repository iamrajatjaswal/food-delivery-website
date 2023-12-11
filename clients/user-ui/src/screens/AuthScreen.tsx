import Login from "../shared/Auth/Login";

const AuthScreen = () => {
  return (
    <div className="w-full fixed top-0 left-0 h-screen z-50 flex items-center justify-center bg-[#00000027]">
      <div className="w-[500px] bg-slate-900 rounded shadow-sm p-3">
        <Login />
      </div>
    </div>
  );
};

export default AuthScreen;
