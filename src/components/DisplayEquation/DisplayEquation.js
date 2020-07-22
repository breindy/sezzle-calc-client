import React from 'react';
import './DisplayEquation.scss';

const DisplayEquation = (props) => {
	return (
		<div>
			<div className="equation">{props.equation}</div>
		</div>
	);
};

export default DisplayEquation;
