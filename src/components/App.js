import React, { useEffect, useState } from 'react';

import '../styles/App.css';
import Search from './Search';
import Location from './Location';
import Weather from './Weather';
import WeatherForecast from './WeatherForecast';
import getCleanData from '../weatherData';

function App() {
    const [query, setQuery] = useState({ q: 'moscow' });
    const [weather, setWeather] = useState(null);

    const getData = async () => {
        await getCleanData({ ...query }).then((data) => {
            setWeather(data);
        });
    };

    useEffect(() => {
        getData();
    }, [query]);

    return (
        <>
            <div className="main-grid">
                <div className="main-container">
                    <Search setQuery={setQuery} />
                    {weather && (
                        <>
                            <Location weather={weather} />
                            <Weather weather={weather} />
                            <WeatherForecast
                                title="Прогноз на день"
                                data={weather.today}
                            />
                            <WeatherForecast
                                title="Прогноз на 5 дней"
                                data={weather.daily.slice(-5)}
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default App;
