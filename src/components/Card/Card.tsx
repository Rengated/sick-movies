import { FC, useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Theme } from "@/store/theme";

interface CardProps {
  id: number;
  title: string;
  year: number;
  medium_cover_image: string;
  description: string;
  rating: string;
  genre: string;
}

export const Card: FC<CardProps> = ({
  id,
  title,
  year,
  medium_cover_image,
  description,
  rating,
  genre,
}) => {
  const [mouseOver, setMouseOver] = useState(false);
  const { currentTheme } = useContext(Theme);
  const toggleMouseOver = () => setMouseOver((prev) => !prev);

  const router = useRouter();

  const onFilmClick = () => {
    router.push(`/movie/${id}`);
  };

  if (!description) {
    return null;
  }

  return (
    <div
      onMouseOver={toggleMouseOver}
      onMouseOut={toggleMouseOver}
      className=" hover:scale-105 mt-2  flex flex-row bg-white rounded-lg overflow-hidden border border-black basis-90 max-w-md object-cover rounded ml-5 mr-5 mb-6 cursor-pointer relative"
      onClick={onFilmClick}>
      <Image
        width={320}
        height={600}
        src={medium_cover_image}
        alt={title}
      />
      <div className="flex flex-col p-5 max-w-xs h-full bg-yellow-400">
        <span className="text-extrabold text-xl">
          {title} {year}
        </span>
        <span className="text-black font-extralight">
          {description?.slice(0, 60)}...
        </span>
        <span>
          Rating: <b>{rating}</b>
        </span>
        <div className="flex justify-beetwen mt-auto items-center max-sm:flex-col max-sm:items-start">
          <span className=" font-extrabold max-sm:mb-2">{genre}</span>
          <button className="border-2 border-black ml-auto mt-auto p-2 rounded-md hover:bg-black hover:text-white max-sm:ml-0">
            Go to the film
          </button>
        </div>
      </div>
    </div>
  );
};
