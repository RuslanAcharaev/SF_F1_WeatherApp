import React from 'react';

import '../styles/Location.css';
import PropTypes from 'prop-types';

function Location(props) {
    return (
        <div className="location-container">
            <p>{props.weather.name}</p>
        </div>
    );
}

Location.propTypes = {
    weather: PropTypes.shape({
        name: PropTypes.string,
    }),
};

export default Location;
