import React, { useState } from 'react';

import '../styles/Search.css';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

function Search(props) {
    const [city, setCity] = useState('');

    const handleSubmit = () => {
        if (city !== '') props.setQuery({ q: city });
    };

    const handleLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                props.setQuery({ lat: latitude, lon: longitude });
            });
        }
    };

    return (
        <>
            <div className="search-container">
                <div className="search-form">
                    <Form.Control
                        type="text"
                        placeholder="Название города"
                        value={city}
                        onChange={(e) => setCity(e.currentTarget.value)}
                    />
                    <Button
                        variant="outline-light"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Найти
                    </Button>
                </div>
                <div className="search-geo">
                    <Button
                        variant="outline-light"
                        size="sm"
                        onClick={handleLocation}
                    >
                        Точное местоположение
                    </Button>
                </div>
            </div>
        </>
    );
}

Search.propTypes = {
    setQuery: PropTypes.func.isRequired,
};

export default Search;
