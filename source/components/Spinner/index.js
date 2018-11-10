// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';
import PropTypes from 'prop-types';

export default class Spinner extends Component {
    static propTypes = {
        isSpinning: PropTypes.bool.isRequired,
    };
    render () {
        const { isSpinning } = this.props;

        return (
            isSpinning? <div className = { Styles.spinner } /> : null
        );
    }
}
