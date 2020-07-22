import React from 'react';
import './Recent.scss';

const Recent = (props) => {
	const { recent } = props;
	const display = recent.map((elt) => (
		<div className="row">
			<div className="recent-calculation">{elt.result}</div>
		</div>
	));

	return <div className="recent-wrapper">{display}</div>;
};

export default Recent;
