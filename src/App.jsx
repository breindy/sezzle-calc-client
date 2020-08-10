import React, { useState, useEffect } from 'react';
import './App.scss';

import Button from './components/Button/Button';
import DisplayEquation from './components/DisplayEquation/DisplayEquation';
import Input from './components/Input/Input';
import ClearButton from './components/ClearButton/ClearButton';
import Recent from './components/Recent/Recent';

const App = () => {
	const [ input, setInput ] = useState('');
	const [ isEvaluated, setIsEvaluated ] = useState(false);
	const [ equation, setEquation ] = useState('');
	const [ previousExpr, setPreviousExpr ] = useState('');
	const [ currentExpr, setCurrentExpr ] = useState('');
	const [ operator, setOperator ] = useState(undefined);
	const [ recent, setRecent ] = useState([]);
	useEffect(() => {
		getRecentData();
	}, []);

	useEffect(
		() => {
			if (isEvaluated) {
				//save input and equation to DB
				fetch('https://hidden-wave-54655.herokuapp.com/insert', {
					headers: {
						'Content-type': 'application/json'
					},
					method: 'POST',
					body: JSON.stringify({
						input: equation,
						output: input,
						calculation: equation + ' = ' + input
					})
				})
					.then(handleError)
					.catch((error) => {
						console.log(error);
					});
			}

			setIsEvaluated(false);
			setEquation('');
			handleClear();
		},
		[ isEvaluated ]
	);

	useEffect(
		() => {
			getRecentData();
		},
		[ recent ]
	);

	const handleError = (response) => {
		if (!response.ok) {
			throw Error(`${response.status} - ${response.statusText}`);
		}
		return response;
	};

	const getRecentData = async () => {
		try {
			let result = await fetch('https://hidden-wave-54655.herokuapp.com/recent');
			let recentData = await result.json();
			setRecent(recentData.data);
		} catch (e) {
			console.log(e);
		}
	};

	/*
		Calculator Operations
	*/

	const addZero = (val) => {
		if (input == '') {
			setInput('0');
			setEquation(val);
		}
		if (input !== '') {
			setInput((prevInput) => prevInput + val);
			updateDisplay(val);
		}
		if (input == '0') {
			setInput(val);
			setEquation(val);
		}
	};

	const addDecimal = (val) => {
		if (input.indexOf('.') === -1) {
			setInput((prevInput) => prevInput + val);
			updateDisplay(val);
		}
		if (input == '') {
			setInput('0' + val);
			setEquation('0' + val);
		}
	};

	const handleClear = () => {
		setPreviousExpr('');
		setCurrentExpr('');
		setInput('');
		setOperator('');
		setEquation('');
	};

	const addToInput = (number) => {
		setInput((prevInput) => prevInput + number);
		updateDisplay(number);
	};

	const chooseOperator = (operation) => {
		if (input === '') {
			return;
		}
		setOperator(operation);
		setEquation(input);
		setInput('');
		updateDisplay(operation);
	};

	const evaluate = () => {
		let computation;
		const previous = parseFloat(equation);
		const current = parseFloat(input);
		if (isNaN(previous) || isNaN(current)) {
			return;
		}

		if (operator === '+') {
			computation = (previous + current).toFixed(2);
		} else if (operator === '-') {
			computation = (previous - current).toFixed(2);
		} else if (operator === '*') {
			computation = (previous * current).toFixed(2);
		} else if (operator === '/') {
			computation = (previous / current).toFixed(2);
		}
		setInput(parseFloat(computation));
		setOperator(undefined);
		setIsEvaluated(true);
	};

	const updateDisplay = (element) => {
		setEquation((prevEquation) => prevEquation + element);
	};

	return (
		<div className="App">
			<div className="calc-wrapper">
				<DisplayEquation equation={equation} />
				<Input input={input} />
				<div className="row">
					<Button handleClick={addToInput}>7</Button>
					<Button handleClick={addToInput}>8</Button>
					<Button handleClick={addToInput}>9</Button>
					<Button handleClick={chooseOperator}>/</Button>
				</div>

				<div className="row">
					<Button handleClick={addToInput}>4</Button>
					<Button handleClick={addToInput}>5</Button>
					<Button handleClick={addToInput}>6</Button>
					<Button handleClick={chooseOperator}>*</Button>
				</div>

				<div className="row">
					<Button handleClick={addToInput}>1</Button>
					<Button handleClick={addToInput}>2</Button>
					<Button handleClick={addToInput}>3</Button>
					<Button handleClick={chooseOperator}>+</Button>
				</div>

				<div className="row">
					<Button handleClick={addDecimal}>.</Button>
					<Button handleClick={addZero}>0</Button>
					<Button handleClick={evaluate}>=</Button>
					<Button handleClick={chooseOperator}>-</Button>
				</div>

				<div className="row">
					<ClearButton handleClear={handleClear}>Clear</ClearButton>
				</div>
			</div>
			<Recent recent={recent} />
		</div>
	);
};

export default App;
