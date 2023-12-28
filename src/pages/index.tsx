import { MovieList, getFilms } from "@/api";
import { Card } from "@/components/Card/Card";
import { useContext, useEffect, useState } from "react";
import { Hourglass } from "react-loader-spinner";
import { Header } from "@/components/Header/Header";
import { Theme } from "@/store/theme";
import { Footer } from "@/components/Footer";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home() {
  const [films, setFilms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const { currentTheme } = useContext(Theme);

  const data = useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const response = await getFilms(String(currentPage));
      setFilms(response.movies);
      setCurrentPage((prev) => prev + 1);
      setLoading(false);
    };
    fetch();
  }, []);

  const fetchMoreData = async () => {
    setCurrentPage((prev) => prev + 1);
    const response = await getFilms(String(currentPage));
    setFilms((prev) => [...prev, ...response.movies]);
  };

  return (
    <div
      className={`pt-20`}
      style={{
        backgroundColor: `${currentTheme == "black" ? "black" : "white"}`,
      }}>
      <Header arrowBack={false} />
      {!loading ? (
        <main className="min-h-screen flex justify-center">
          <section className="flex flex-col items-center container py-20">
            <div className="flex items-center-center w-full mb-10 flex-col">
              <h1
                className={`text-5xl  mx-auto justify-center ${
                  currentTheme == "black" ? "text-white" : "text-black"
                } mb-2 font-extrabold`}>
                FILMS
              </h1>
            </div>
            <InfiniteScroll
              dataLength={films?.length}
              next={fetchMoreData}
              hasMore={true}
              loader={""}>
              <div className="flex flex-wrap justify-center mb-20">
                {films?.map((item: MovieList, index) => (
                  <Card
                    key={index}
                    id={item?.id}
                    rating={String(item?.rating)}
                    genre={item?.genres[0]}
                    description={item.description_full || item.summary}
                    title={item?.title}
                    year={item?.year}
                    medium_cover_image={item.medium_cover_image}
                  />
                ))}
              </div>
            </InfiniteScroll>
          </section>
        </main>
      ) : (
        <div className="flex justify-center items-center min-w-full min-h-screen">
          <Hourglass
            height="300"
            width="300"
            radius="9"
            color="#4d50bf"
            ariaLabel="loading"
          />
        </div>
      )}
      <Footer />
    </div>
  );
}
