import React, { Component } from 'react';
import './Button.scss';

const isOperator = (val) => {
	return !isNaN(val) || val === '.' || val === '=';
};

const Button = (props) => (
	<div
		className={`button-wrapper ${isOperator(props.children) ? null : 'operator'}`}
		onClick={() => props.handleClick(props.children)}
	>
		{/* make text show up for a button */}
		{props.children}
		{/* bacsed on which button it is will make a button a different color, number or operator for example */}
	</div>
);

export default Button;
