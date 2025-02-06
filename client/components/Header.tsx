import Link from "next/link";
import { FaHome } from "react-icons/fa";

const Header = () => {
  return (
    <div className="flex justify-around bg-slate-400 py-6 fixed top-0 left-0 right-0 z-50 shadow-md text-xl font-bold">
      <div>
        <h1>
          <Link className="flex items-center space-x-2" href={"/"}>
            <FaHome size={30} /> <span>Home</span>
          </Link>
        </h1>
      </div>
      <div>
        <h1>
          <Link href={"/login"}>Login</Link>
        </h1>
      </div>
      <div>
        <h1>
          <Link href={"/register"}>Register</Link>
        </h1>
      </div>
    </div>
  );
};

export default Header;
