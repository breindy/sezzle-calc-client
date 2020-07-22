import React, { Component } from 'react';
import './ClearButton.scss';

const ClearButton = (props) => (
	<div className="clear-btn" onClick={props.handleClear}>
		{props.children}
	</div>
);

export default ClearButton;
