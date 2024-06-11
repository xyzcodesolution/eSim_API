import { Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Flags from "country-flag-icons/react/1x1";
import "swiper/css";
import "swiper/css/virtual";
import PackageItem from "../components/PackageItem";
// import { useSelector } from 'react-redux';

const Landing = () => {
  // const auth = useSelector(x => x.auth.value);
  // Create array with 1000 slides
  const [slides, setSlides] = useState([]);
  const [packageList, setPackageList] = useState([]);
  const baseUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    package_data();
    country_data();
  }, []);

  const package_data = async () => {
    try {
      const data = await axios.post(
        `${baseUrl}/api/esim/prepaid_package_template`,
        {
          listPrepaidPackageTemplate: {
            resellerId: "428",
          },
        }
      );
      // console.log(data.data.result);
      setPackageList(data.data.result);
    } catch (error) {
      console.log("Error");
    }
  };
  const country_data = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      const countries = data.map((country) => ({
        name: country.name.common,
        flag: Flags[country.cca2]({ title: country.name.common }),
      }));
      return setSlides(countries);
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };
  return (
    <div className="w-[100%] bg-gray-200">
      <div className="about text-center bg-white p-1">
        <h2>Ready to Roam?</h2>
        {/* <h1>Hi {auth?.email}!</h1> */}
        <p>
          Explore our range of flexible plans and start your journey with ARKA
          ROAM today, Stay connected, stay global!
        </p>
      </div>

      <div className="w-[70%] mx-auto mt-3">
        <input type="search" placeholder="search" className="form-control" />
      </div>

      <div className="text-center my-3 w-[100%]">
        <Button
          className="border-white w-[30%] mx-1"
          variant="secondary"
          size="lg"
        >
          LOCAL
        </Button>
        <Button
          className="border-white w-[30%] mx-1"
          style={{ backgroundColor: "#00274C" }}
          size="lg"
        >
          GLOBAL
        </Button>
        <Button
          className="border-white w-[30%] mx-1"
          variant="secondary"
          size="lg"
        >
          REGIONAL
        </Button>
      </div>

      <Swiper modules={[Virtual]} spaceBetween={1} slidesPerView={6} virtual>
        {slides.map((item, index) => (
          <SwiperSlide key={index} virtualIndex={index}>
            <div className="flex flex-col items-center">
              <div className="w-[70px]">{item.flag}</div>
              <p className="text-center text-[10px]">{item && item.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="px-3 mt-1 h-[500px] overflow-y-auto">
        {packageList.map((item, index) => (
          <PackageItem key={index} data = {item} />
        ))}
      </div>

      <div className="text-center w-full">
        <Button
          className="border-black m-auto mt-2 mb-2"
          style={{ backgroundColor: "#00274C" }}
        >
          Load more +
        </Button>
      </div>
    </div>
  );
};

export default Landing;
