import React from 'react';

import '../styles/WeatherForecast.css';
import PropTypes from 'prop-types';

function WeatherForecast(props) {
    return (
        <div className="weather-forecast-container">
            <div className="weather-forecast-title">
                <span>{props.title}</span>
            </div>
            <hr />
            <div className="weather-forecast-details">
                {props.data.map((item, index) => (
                    <div className="weather-forecast-interval" key={index}>
                        <span>{item.title}</span>
                        <span className="temp-value">
                            {item.temp > 0 ? `+${item.temp}` : item.temp}
                        </span>
                        <span className="weather-forecast-summary">
                            {item.details}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

WeatherForecast.propTypes = {
    title: PropTypes.string,
    temp: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    details: PropTypes.string,
    data: PropTypes.array.isRequired,
};

export default WeatherForecast;
