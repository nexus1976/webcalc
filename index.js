const operationEnum = {
	'unset': 0,
	'add': 1,
	'subtract': 2,
	'multiply': 3,
	'divide': 4
};
let result_text = '';
let operation = operationEnum.unset;
let operand1 = 0;
let operand2 = 0;
let operationExecuting = false;
let resetText = false;

document.addEventListener('DOMContentLoaded', e => {
	result_text = '0';
	setTxtResults();
});
document.addEventListener('keyup', e => {
	console.log('keyup', e);
	let nbr = Number(e.key);
	let isNumber = !isNaN(nbr);
	if (nbr === 0 && e.code === 'Space') {
		isNumber = false;
	}
	if (isNumber) {
		numberClick(nbr);
	} else if (e.key === '.') {
		addDecimal();
	} else if (e.key === 'Escape') {
		doCE();
	} else if (e.key === '+') {
		doAdd();
	} else if (e.key === '-') {
		doSubtract();
	} else if (e.key === '*') {
		doMultiply();
	} else if (e.key === '/' || e.key === 'd' || e.key === 'D') {
		doDivide();
	} else if (e.key === 'Enter' || e.key === '=') {
		doEquals();
	} else if (e.code === 'Space') {
		changeSign();
	}
});

const numberClick = (number) => {
	if (resetText) {
		result_text = '0';
		resetText = false;
	}
	if (number !== undefined && number !== null) {
		if (number === 0) {
			if (result_text !== '0') {
				result_text += `${number}`;
			}
		} else {
			if (result_text !== '0') {
				result_text += `${number}`;
			} else {
				result_text = `${number}`;
			}
		}
	}
	setTxtResults();
};
const doMultiply = () => {
	doOperation(operationEnum.multiply);
};
const doAdd = () => {
	doOperation(operationEnum.add);
};
const doSubtract = () => {
	doOperation(operationEnum.subtract);
};
const doDivide = () => {
	doOperation(operationEnum.divide);
};
const doOperation = (executingOperation) => {
	operation = executingOperation;
	operationExecuting = true;
	resetText = true;
	operand1 = Number(result_text);	
};
const doCE = () => {
	result_text = '0';
	operation = operationEnum.unset;
	operand1 = 0;
	operand2 = 0;
	operationExecuting = false;
	resetText = false;
	setTxtResults();
};
const setTxtResults = () => {
	// console.log('result_text', result_text); // this is a change this is another
	document.getElementById('txtResults').value = result_text;
};
const changeSign = () => {
	if (result_text !== '0' && !resetText) {
		if (result_text.startsWith('-')) {
			result_text = result_text.substring(1);
		} else {
			result_text = '-' + result_text;
		}
		setTxtResults();
	}
};
const doEquals = () => {
	if (operationExecuting) {
		operand2 = Number(result_text);
		let result = 0;
		try {
			switch (operation) {
				case operationEnum.add:
					result = operand1 + operand2;
					break;
				case operationEnum.subtract:
					result = operand1 - operand2;
					break;
				case operationEnum.multiply:
					result = operand1 * operand2;
					break;
				case operationEnum.divide:
					result = operand1 / operand2;
					break;
				default:
					result = null;
					break;
			}			
		} catch {
			result = null;
		}
		if (result === null) {
			result_text = 'Error';
			resetText = true;
		} else {
			result_text = `${result}`;
		}
		operationExecuting = false;
		operand1 = 0;
		operand2 = 0;
		setTxtResults();
	}	
};
const addDecimal = () => {
	if (resetText) {
		result_text = '0.';
		resetText = false;
		setTxtResults();
	} else if (result_text && result_text !== 'Error' && !result_text.includes('.')) {
		result_text += '.';
		setTxtResults();
	}
}
