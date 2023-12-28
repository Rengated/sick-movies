import { FC, useContext } from "react";
import { useRouter } from "next/router";
import { Theme } from "@/store/theme";
import sun from "../../../public/static/sun.svg";
import Image from "next/image";
import arrow from "../../../public/static/arrow.png";
import { getStaticProps } from "next/dist/build/templates/pages";

interface HeaderProps {
  arrowBack: boolean;
}

export const Header: FC<HeaderProps> = ({ arrowBack }) => {
  const router = useRouter();

  const { currentTheme, toggleTheme } = useContext(Theme);

  const onArrowClick = () => {
    router.push("/");
  };
  return (
    <header
      className={`flex px-20 py-3  w-full py-1 border-b-2 justify-between items-center fixed top-0 left-0 max-sm:px-5`}
      style={{
        zIndex: 6,
        backgroundColor: `${currentTheme == "black" ? "white" : "black"}`,
        color: `${currentTheme == "black" ? "black" : "white"}`,
      }}>
      <h1 className="text-xl flex   leading-loose ">BEST MOVIES</h1>
      <div className="flex items-center">
        {arrowBack && (
          <Image
            src={arrow}
            alt="arrow"
            onClick={onArrowClick}
            className={` cursor-pointer ${
              currentTheme == "black" ? "" : "invert"
            }`}
          />
        )}
        <Image
          width={40}
          height={40}
          src={sun}
          className={`cursor-pointer ml-4 ${
            currentTheme == "black" ? "invert" : ""
          }`}
          alt="theme switch p-2"
          onClick={toggleTheme}
        />
      </div>
    </header>
  );
};
