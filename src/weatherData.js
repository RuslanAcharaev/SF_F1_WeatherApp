import axios from 'axios';
import { DateTime } from 'luxon';

const API_KEY = 'f3c08131b6e28c539ce348cfe38cbe18';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

const getWeatherData = (request, params) => {
    const url = new URL(request, BASE_URL);
    let searchParams = new URLSearchParams({
        ...params,
        appid: API_KEY,
        units: 'metric',
        lang: 'ru',
    });

    url.search = searchParams.toString();
    return axios.get(url.href).then((response) => response.data);
};

const formatDate = (seconds, offset, format = 'HH:mm') =>
    DateTime.fromSeconds(seconds + offset, { zone: 'utc' })
        .setLocale('ru')
        .toFormat(format);
const cleanCurrent = (data) => {
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
        name,
        weather,
        wind: { speed },
        dt,
        timezone,
    } = data;
    const { description: details } = weather[0];
    const formattedTime = formatDate(dt, timezone);

    return {
        temp: temp.toFixed(0),
        feels_like: feels_like.toFixed(0),
        temp_min: temp_min.toFixed(0),
        temp_max: temp_max.toFixed(0),
        humidity,
        pressure: (pressure * 0.75).toFixed(0),
        name,
        speed: speed.toFixed(1),
        details,
        dt,
        timezone,
        lat,
        lon,
        formattedTime,
    };
};

const cleanForecast = (seconds, offset, data) => {
    const today = data
        .filter((f) => f.dt > seconds)
        .slice(0, 5)
        .map((f) => ({
            temp: f.main.temp.toFixed(0).replace('-0', '0'),
            title: formatDate(f.dt, offset),
            details: f.weather[0].description,
        }));

    const groupedByDate = data.reduce((acc, f) => {
        const date = f.dt_txt.split(' ')[0];
        if (!acc[date]) acc[date] = [];
        acc[date].push(f);
        return acc;
    }, {});

    function getAverageTemp(groupedData, date) {
        const temps = groupedData[date]?.map((f) => f.main.temp) || [];
        if (temps.length === 0) return null;
        const averageTemp =
            temps.reduce((sum, temp) => sum + temp, 0) / temps.length;
        return averageTemp.toFixed(0).replace('-0', '0');
    }

    const daily = Object.keys(groupedByDate).map((date) => {
        const dayData = groupedByDate[date][0];
        return {
            temp: getAverageTemp(groupedByDate, date),
            title: formatDate(dayData.dt, offset, 'ccc'),
            details: dayData.weather[0].description,
        };
    });

    return { today, daily };
};
const getCleanData = async (params) => {
    const cleanedCurrentData = await getWeatherData('weather', params).then(
        cleanCurrent
    );

    const { dt, lat, lon, timezone } = cleanedCurrentData;

    const cleanedForecastData = await getWeatherData('forecast', {
        lat: lat,
        lon: lon,
    }).then((d) => cleanForecast(dt, timezone, d.list));

    return { ...cleanedCurrentData, ...cleanedForecastData };
};

export default getCleanData;
