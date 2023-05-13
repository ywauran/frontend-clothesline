import React, { useState, useEffect } from "react";
import { app } from "../config/index";
import { getDatabase, ref, set } from "firebase/database";
import {
  getHumidity,
  getTemperature,
  getIsRain,
  getLightIntensity,
  fuzzyRules,
  deffuzification,
} from "../utils/algorithm";

const db = getDatabase(app);
const Calculate = ({
  modal,
  _humidity,
  _temperature,
  _rain,
  _lightIntensity,
}) => {
  const [openModal, setOpenModal] = useState(modal);
  const [humidity, setHumidity] = useState(getHumidity(_humidity));
  const [temperature, setTemperature] = useState(getTemperature(_temperature));
  const [isRain, setIsRain] = useState(getIsRain(_rain));
  const [lightIntensity, setLightIntensity] = useState(
    getLightIntensity(_lightIntensity)
  );
  const [_fuzzyRules, setFuzzyRules] = useState([]);
  const [_deffuzification, setDefuzzificationResult] = useState("");

  useEffect(() => {
    const humidityData = getHumidity(_humidity);
    const temperatureData = getTemperature(_temperature);
    const isRainData = getIsRain(_rain);
    const lightIntensityData = getLightIntensity(_lightIntensity);

    setHumidity(humidityData);
    setTemperature(temperatureData);
    setIsRain(isRainData);
    setLightIntensity(lightIntensityData);

    const rules = fuzzyRules(
      temperatureData,
      humidityData,
      lightIntensityData,
      isRainData
    );
    setFuzzyRules(rules);

    const result = deffuzification(rules);
    setDefuzzificationResult(result);
    const statusRef = ref(db, "servo/jemuran/status");
    set(statusRef, result !== 0 ? 1 : 0);
  }, [_humidity, _temperature, _rain, _lightIntensity]);

  return (
    <>
      <div className="p-6 space-y-6 bg-[#CEA434]">
        <div>
          <h4>Fuzzifikasi</h4>
          <div className="grid grid-cols-4 p-3 bg-white rounded-md">
            <div>
              <h5 className="font-bold">Suhu</h5>
              <p>Dingin : {temperature.cold.toFixed(2)}</p>
              <p>Normal : {temperature.normalTemperature.toFixed(2)}</p>
              <p>Panas : {temperature.hot.toFixed(2)}</p>
            </div>
            <div>
              <h5 className="font-bold">Kelembapan</h5>
              <p>Kering : {humidity.dry.toFixed(2)}</p>
              <p>Normal : {humidity.normalHumidity.toFixed(2)}</p>
              <p>Lembap : {humidity.moist.toFixed(2)}</p>
            </div>
            <div>
              <h5 className="font-bold">Cahaya</h5>
              <p>Terang : {lightIntensity.bright.toFixed(2)}</p>
              <p>Mendung : {lightIntensity.overcast.toFixed(2)}</p>
              <p>Gelap : {lightIntensity.dark.toFixed(2)}</p>
            </div>
            <div>
              <h5 className="font-bold">Hujan</h5>
              <p>Hujan : {isRain.Rain.toFixed(2)}</p>
              <p>Tidak Hujan : {isRain.noRain.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div>
          <h4>Inferensi</h4>
          <div className="grid grid-cols-10 gap-4 p-3 bg-white rounded-md">
            {_fuzzyRules.map((item, index) => (
              <div key={index} className="p-2 border-2 border-black">
                <h4>
                  <strong>Aturan ke-{index + 1}</strong>
                </h4>
                <p>Value: {item.value.toFixed(2)}</p>
                <p>Z: {item.z}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4>Defuzzifikasi</h4>
          <div className="p-3 bg-white rounded-md">
            {parseInt(_deffuzification)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Calculate;
