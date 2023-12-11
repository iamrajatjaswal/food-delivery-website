import styles from "@/src/utils/style";
import NavItems from "../NavItems";

const Header = () => {
  return (
    <header className="w-full  bg-[#0F1524] ">
      <div className="w-[90%] m-auto h-[80px] flex items-center justify-between">
        <h1 className={`${styles}`}>Code Academy</h1>
        <NavItems />
      </div>
    </header>
  );
};

export default Header;
