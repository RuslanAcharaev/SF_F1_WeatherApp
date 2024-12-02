import React from 'react';

import '../styles/Weather.css';
import PropTypes from 'prop-types';

function Weather(props) {
    return (
        <div className="weather-container">
            <div className="weather-main">
                <span className="temp-value">
                    {props.weather.temp > 0
                        ? `+${props.weather.temp}`
                        : props.weather.temp}
                </span>
                <p>{props.weather.details}</p>
            </div>
            <div className="weather-details">
                <span className="temp-value">
                    Ощущается как{' '}
                    {props.weather.feels_like > 0
                        ? `+${props.weather.feels_like}`
                        : props.weather.feels_like}
                </span>
                <span>Скорость ветра: {props.weather.speed}м/с</span>
                <span>Влажность: {props.weather.humidity}%</span>
                <span>Давление: {props.weather.pressure} мм рт.ст.</span>
            </div>
        </div>
    );
}

Weather.propTypes = {
    weather: PropTypes.shape({
        temp: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        details: PropTypes.string,
        feels_like: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        speed: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        humidity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        pressure: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
};

export default Weather;
