import React from 'react';
import svgicons from '../assets/images/icons.svg'

const url = svgicons;
const Icon = (props) => (
    <svg className={`icon icon-${props.icon}`}>
        <use xlinkHref={`${url}#icon-${props.icon}`} />
    </svg>
);

export default Icon;