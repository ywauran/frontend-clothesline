import React, { useState, useEffect } from "react";
import { app } from "../config/index";
import { getDatabase, ref, onValue, set } from "firebase/database";
import Calculate from "./Calculate";
import ImageOne from "../assets/img/image_one.png";
import ImageTwo from "../assets/img/image_two.png";
import ImageThree from "../assets/img/image_three.png";
import ImageFour from "../assets/img/image_four.png";
import { deffuzification } from "../utils/algorithm";

const db = getDatabase(app);
const Home = () => {
  const [open, setOpen] = useState(false);
  const [temp, setTemp] = useState("1");
  const [humidity, setHumidity] = useState("2");
  const [lightIntensity, setLightIntensity] = useState("3");
  const [data, setData] = useState([]);
  const [rain, setRain] = useState(0);
  const [clotheslineState, setClotheslineState] = useState("inside");
  const [_deffuzification, setDefuzzificationResult] = useState("");

  const getData = () => {
    const dbRef = ref(db, "pakaian");
    onValue(dbRef, (snapshot) => {
      let data = [];
      snapshot.forEach((childSnapshot) => {
        let key = childSnapshot.key;
        let value = childSnapshot.val();

        data.push({
          key: key,
          value: value,
        });
      });

      data.sort((a, b) => new Date(b.value.time) - new Date(a.value.time));

      const { temp, humidity, lightIntensity, rain } = data[0].value;
      setTemp(temp);
      setHumidity(humidity);
      setLightIntensity(lightIntensity);
      setRain(rain);

      const calculateResult = () => {
        // Perform the necessary calculations using the updated data
        // Replace the placeholder code with your actual calculation logic
        const result = humidity + temp + rain + lightIntensity;
        setDefuzzificationResult(result);

        // Update the servo status in Firebase based on the result
        const statusRef = ref(db, "servo/jemuran/status");
        set(statusRef, result !== 0 ? 1 : 0);
      };
      calculateResult();
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const handlePullClothesline = () => {
    setClotheslineState("onRoof");
    setRain(0); // Update the rain value
    // Send data to Firebase with a value of 0
    const statusRef = ref(db, "servo/jemuran/status");
    set(statusRef, 0);
  };

  const handleRedry = () => {
    setClotheslineState("outside");
    setRain(1); // Update the rain value
    // Send data to Firebase with a value of 1
    const statusRef = ref(db, "servo/jemuran/status");
    set(statusRef, 1);
  };

  return (
    <>
      <div>
        <h1 className="text-4xl font-bold text-center">
          Sistem Jemuran Pakaian Otomatis
        </h1>
        <div className="flex items-center justify-center mt-4 space-x-36">
          <div className="flex items-center space-x-4">
            <img src={ImageFour} alt="" className="w-16" />
            <div>
              <h3 className="text-lg font-semibold">Suhu :</h3>
              <p className="text-2xl font-bold">{temp}&deg;C</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <img src={ImageThree} alt="" className="w-16" />
            <div>
              <h3 className="text-lg font-semibold">Kelembapan :</h3>
              <p className="text-2xl font-bold">{humidity}% RH</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <img src={ImageTwo} alt="" className="w-16" />
            <div>
              <h3 className="text-lg font-semibold">Intensitas Cahaya:</h3>
              <p className="text-2xl font-bold">{lightIntensity} LUX</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <div className="rounded-full bg-[#193153] py-12 px-16">
            <div className="flex flex-col items-center justify-center">
              <img src={ImageOne} alt="" className="w-24" />
              <div className="bg-[#CEA343] rounded-md w-20 text-center font-semibold">
                {rain >= 1000 ? "Tidak" : "Ya"}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-3xl font-bold text-center">
            {clotheslineState === "outside"
              ? "Jemuran Anda ada di luar"
              : "Jemuran Anda sudah berada di atap, Jangan Khawatir!"}
          </h2>
        </div>
        <div className="flex flex-col mt-4 space-y-6">
          <p className="text-sm text-center">
            *Lakukan secara manual lewat tombol dibawah ini
          </p>
          <div className="flex items-center justify-center space-x-6">
            <button
              className="bg-[#193153] text-white rounded-xl py-2 px-4"
              onClick={handlePullClothesline}
            >
              Tarik Jemuran
            </button>
            <button
              className="bg-[#193153] text-white rounded-xl py-2 px-4"
              onClick={handleRedry}
            >
              Jemur Ulang
            </button>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={() => setOpen(!open)}
              className="rounded-xl py-2 px-4 bg-[#193153] text-white"
            >
              Tampilkan Perhitungan
            </button>
          </div>
        </div>
        <div
          className={`${
            open ? "flex" : "hidden"
          } items-center justify-center bg-gray-500 bg-opacity-50 fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full`}
        >
          <div className="">
            <div className="w-full rounded-lg shadow bg-[#CEA343] ">
              <div className="flex items-start justify-between p-4 border-b rounded-t">
                <h3 className="text-xl font-semibold text-center text-gray-900">
                  Perhitungan Algoritma
                </h3>
                <button
                  onClick={() => setOpen(false)}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="staticModal"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <Calculate
                  _humidity={humidity}
                  _lightIntensity={lightIntensity}
                  _rain={rain}
                  _temperature={temp}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
