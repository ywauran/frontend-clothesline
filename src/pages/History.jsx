import React, { useState, useEffect } from "react";
import { app } from "../config/index";
import { getDatabase, ref, onValue } from "firebase/database";
import Calculate from "./Calculate";

const db = getDatabase(app);
const History = () => {
  const [temp, setTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [time, setTime] = useState(0);
  const [lightIntensity, setLightIntensity] = useState(0);
  const [rain, setRain] = useState(0);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
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
      console.log(data);
      setData(data);
    });
  };

  const openModalCalculate = (
    _temperature,
    _humidity,
    _lightIntensity,
    _rain
  ) => {
    setOpen(true);
    setTemp(_temperature);
    setHumidity(_humidity);
    setLightIntensity(_lightIntensity);
    setRain(_rain);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="p-6">
        <h1 className="mb-4 text-4xl font-bold text-center">
          Riwayat Sistem Jemuran Pakaian Otomatis
        </h1>
        <div className="flex items-center justify-start my-4">
          <div>
            Tampil{" "}
            <span className="bg-[#CEA434] mx-2 px-4 py-1 text-sm rounded-lg font-medium">
              5
            </span>{" "}
            Data
          </div>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-black uppercase bg-gray-200 border-b border-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  Tanggal
                </th>
                <th scope="col" className="px-6 py-3">
                  Suhu
                </th>
                <th scope="col" className="px-6 py-3">
                  Kelembapan
                </th>
                <th scope="col" className="px-6 py-3">
                  Cahaya
                </th>
                <th scope="col" className="px-6 py-3">
                  Hujan
                </th>
                <th scope="col" className="px-6 py-3">
                  Jemuran
                </th>
                <th scope="col" className="px-6 py-3">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 5).map((item, number) => (
                <>
                  <tr
                    key={number + 1}
                    className="bg-white border-b border-gray-400"
                  >
                    <td className="px-6 py-4">{1 + number}</td>
                    <td className="px-6 py-4">{item.value.time}</td>
                    <td className="px-6 py-4">{item.value.temp}</td>
                    <td className="px-6 py-4">{item.value.humidity}</td>
                    <td className="px-6 py-4">{item.value.lightIntensity}</td>
                    <td className="px-6 py-4">{item.value.rain}</td>
                    <td className="px-6 py-4">
                      {item.value.rain >= 1000 ? "Terjemur" : "Ditarik"}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          openModalCalculate(
                            item.value.temp,
                            item.value.humidity,
                            item.value.lightIntensity,
                            item.value.rain
                          )
                        }
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between mt-4">
            <p>Menampilkan 0 data dari 100 data</p>
            <div className="flex space-x-2">
              <button className="bg-[#CEA434] px-4 py-2 text-sm rounded-lg font-medium">
                Sebelumnya
              </button>
              <p className="bg-[#CEA434] p-2 text-sm rounded-full font-medium">
                0
              </p>
              <button className="bg-[#CEA434] px-4 py-2 text-sm rounded-lg font-medium">
                Selanjutnya
              </button>
            </div>
          </div>
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
            <Calculate
              _humidity={humidity}
              _lightIntensity={lightIntensity}
              _rain={rain}
              _temperature={temp}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
