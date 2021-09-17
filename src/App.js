import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.css";

import SwiperCore, {
  Pagination,
  Navigation,
  Autoplay,
  EffectFade,
} from "swiper";

import { getDogs } from "./dogapi";

import "./App.css";

// install Swiper modules
SwiperCore.use([Pagination, Navigation, Autoplay, EffectFade]);

function App() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    const fetchDogs = async () => {
      const doggies = await getDogs();

      setDogs(doggies);
    };

    fetchDogs();
  }, []);

  const scaleImg = (e) => {
    console.log(e.target);
    e.target.classList.toggle("imgScale");
  };

  return (
    <div className="App">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        effect={"fade"}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        style={{
          width: "80%",
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {dogs.map((dog, i) => (
          <SwiperSlide
            style={{
              backgroundColor: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ position: "relative" }}>
              <img
                src={dog.url}
                alt={dog.title}
                style={{
                  height: "400px",
                  minWidth: "200px",
                  width: "100%",
                  maxWidth: "500px",
                  transition: "all 300ms ease-in-out",
                }}
                onMouseOver={(e) => scaleImg(e)}
                onMouseOut={(e) => scaleImg(e)}
              />
              <h2 style={{ fontFamily: "Open Sans" }}>{dog.title}</h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default App;
