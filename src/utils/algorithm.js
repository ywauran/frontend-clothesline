const getCold = (temp) => {
  if (temp < 20) {
    return 1;
  } else if (temp >= 20 && temp <= 24) {
    return (24 - temp) / (24 - 20);
  } else {
    return 0;
  }
};

const getTemperatureNormal = (temp) => {
  if (temp >= 20 && temp <= 24) {
    return (temp - 20) / (24 - 20);
  } else if (temp >= 24 && temp <= 28) {
    return (28 - temp) / (28 - 24);
  } else {
    return 0;
  }
};

const getHot = (temp) => {
  if (temp >= 24 && temp <= 28) {
    return (temp - 24) / (28 - 24);
  } else if (temp > 28) {
    return 1;
  } else {
    return 0;
  }
};

const getDry = (humidity) => {
  if (humidity < 45) {
    return 1;
  } else if (humidity >= 45 && humidity <= 60) {
    return (60 - humidity) / (60 - 45);
  } else {
    return 0;
  }
};

const getNormalHumidity = (humidity) => {
  if (humidity >= 45 && humidity <= 60) {
    return (humidity - 45) / (60 - 45);
  } else if (humidity >= 60 && humidity <= 75) {
    return (75 - humidity) / (75 - 60);
  } else {
    return 0;
  }
};

const getMoist = (humidity) => {
  if (humidity >= 60 && humidity <= 75) {
    return (humidity - 60) / (75 - 60);
  } else if (humidity > 75) {
    return 1;
  } else {
    return 0;
  }
};

const getBright = (lightIntensity) => {
  if (lightIntensity < 600) {
    return 1;
  } else if (600 <= lightIntensity && lightIntensity <= 700) {
    return (700 - lightIntensity) / (700 - 600);
  } else {
    return 0;
  }
};

const getOvercast = (lightIntensity) => {
  if (600 <= lightIntensity && lightIntensity <= 700) {
    return (lightIntensity - 600) / (700 - 600);
  } else if (700 <= lightIntensity && lightIntensity <= 800) {
    return (800 - lightIntensity) / (800 - 700);
  } else {
    return 0;
  }
};

const getDark = (lightIntensity) => {
  if (700 <= lightIntensity && lightIntensity <= 800) {
    return (lightIntensity - 700) / (800 - 700);
  } else if (lightIntensity > 800) {
    return 1;
  } else {
    return 0;
  }
};

const getRain = (rain) => {
  if (900 <= rain && rain <= 1000) {
    return (1000 - rain) / (1000 - 900);
  } else if (rain <= 900) {
    return 1;
  } else {
    return 0;
  }
};

const getnoRain = (rain) => {
  if (rain >= 1000) {
    return 1;
  } else if (900 <= rain && rain <= 1000) {
    return (rain - 900) / (1000 - 900);
  } else {
    return 0;
  }
};

export const getTemperature = (temp) => {
  const data = {
    cold: getCold(temp),
    normalTemperature: getTemperatureNormal(temp),
    hot: getHot(temp),
  };

  return data;
};

export const getHumidity = (humidity) => {
  const data = {
    dry: getDry(humidity),
    normalHumidity: getNormalHumidity(humidity),
    moist: getMoist(humidity),
  };

  return data;
};

export const getLightIntensity = (lightIntensity) => {
  const data = {
    bright: getBright(lightIntensity),
    overcast: getOvercast(lightIntensity),
    dark: getDark(lightIntensity),
  };

  return data;
};

export const getIsRain = (rain) => {
  const data = {
    Rain: getRain(rain),
    noRain: getnoRain(rain),
  };
  return data;
};

export const fuzzyRules = (temperature, humidity, lightIntensity, IsRain) => {
  const result = [];

  const { cold, normalTemperature, hot } = temperature;
  const { dry, normalHumidity, moist } = humidity;
  const { bright, overcast, dark } = lightIntensity;
  const { Rain, noRain } = IsRain;

  const R1 = Math.min(cold, dark, dry, noRain);
  result.push({ value: R1, z: 0 });

  const R2 = Math.min(cold, overcast, dry, noRain);
  result.push({ value: R2, z: 0 });

  const R3 = Math.min(cold, bright, dry, noRain);
  result.push({ value: R3, z: 90 });

  const R4 = Math.min(cold, dark, normalHumidity, noRain);
  result.push({ value: R4, z: 0 });

  const R5 = Math.min(cold, overcast, normalHumidity, noRain);
  result.push({ value: R5, z: 0 });

  const R6 = Math.min(cold, bright, normalHumidity, noRain);
  result.push({ value: R6, z: 90 });

  const R7 = Math.min(cold, dark, moist, noRain);
  result.push({ value: R7, z: 0 });

  const R8 = Math.min(cold, overcast, moist, noRain);
  result.push({ value: R8, z: 0 });

  const R9 = Math.min(cold, bright, moist, noRain);
  result.push({ value: R9, z: 90 });
  //belum fix
  const R10 = Math.min(normalTemperature, dark, dry, noRain);
  result.push({ value: R10, z: 0 });

  const R11 = Math.min(normalTemperature, overcast, dry, noRain);
  result.push({ value: R11, z: 90 });

  const R12 = Math.min(normalTemperature, bright, dry, noRain);
  result.push({ value: R12, z: 90 });

  const R13 = Math.min(normalTemperature, dark, normalHumidity, noRain);
  result.push({ value: R13, z: 0 });

  const R14 = Math.min(normalTemperature, overcast, normalHumidity, noRain);
  result.push({ value: R14, z: 90 });

  const R15 = Math.min(normalTemperature, bright, normalHumidity, noRain);
  result.push({ value: R15, z: 90 });

  const R16 = Math.min(normalTemperature, dark, moist, noRain);
  result.push({ value: R16, z: 0 });

  const R17 = Math.min(normalTemperature, overcast, moist, noRain);
  result.push({ value: R17, z: 90 });

  const R18 = Math.min(normalTemperature, bright, moist, noRain);
  result.push({ value: R18, z: 90 });
  // BLM FIX
  const R19 = Math.min(hot, dark, dry, noRain);
  result.push({ value: R19, z: 0 });

  const R20 = Math.min(hot, overcast, dry, noRain);
  result.push({ value: R20, z: 0 });

  const R21 = Math.min(hot, bright, dry, noRain);
  result.push({ value: R21, z: 0 });

  const R22 = Math.min(hot, dark, normalHumidity, noRain);
  result.push({ value: R22, z: 0 });

  const R23 = Math.min(hot, overcast, normalHumidity, noRain);
  result.push({ value: R23, z: 90 });

  const R24 = Math.min(hot, bright, normalHumidity, noRain);
  result.push({ value: R24, z: 90 });

  const R25 = Math.min(hot, dark, moist, noRain);
  result.push({ value: R25, z: 0 });

  const R26 = Math.min(hot, overcast, moist, noRain);
  result.push({ value: R26, z: 90 });

  const R27 = Math.min(hot, bright, moist, noRain);
  result.push({ value: R27, z: 90 });

  return result;
};

export const deffuzification = (result) => {
  let numerator = 0;
  let denominator = 0;

  for (let i = 0; i < result.length; i++) {
    numerator += result[i].value * result[i].z;
    denominator += result[i].value;
  }

  const nilai = numerator / denominator;
  if (isNaN(nilai)) {
    return 0;
  } else {
    return numerator / denominator;
  }
};
