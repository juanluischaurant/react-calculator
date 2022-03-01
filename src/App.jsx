import { useReducer, useState } from 'react'
import './App.css'
import DecimalButton from './DecimalButton'
import DigitButton from './DigitButton'
import OperationButton from './OperationButton'

// import Counter from './components/Counter'

export const ACTIONS = {
	ADD_DIGIT: 'add-digit',
	CLEAR_ACTION: 'clear-action',
	DELETE_DIGIT: 'delete-digit',
	CHOOSE_OPERATION: 'choose-operation',
	EVALUATE: 'evaluate'
}

function reducer(state, { type, payload }) {
	switch (type) {
		case ACTIONS.ADD_DIGIT:
			if (state.overwrite) {
				return {
					...state,
					overwrite: false,
					currentOperand: payload.digit
				}
			}

			if (payload.digit === '0' && state.currentOperand === '0') return state

			if (payload.digit === '.' && state.currentOperand == null) return state

			if (payload.digit === '.' && state.currentOperand.includes('.'))
				return state

			return {
				...state,
				currentOperand: `${state.currentOperand || ''}${payload.digit}`
			}

		case ACTIONS.CLEAR_ACTION:
			return {}

		case ACTIONS.DELETE_DIGIT:
			if (state.overwrite)
				return {
					overwrite: false,
					currentOperand: null
				}

			if (state.currentOperand == null) return state

			if (state.currentOperand.length === 1)
				return { ...state, currentOperand: null }

			return {
				...state,
				currentOperand: state.currentOperand.slice(0, -1)
			}

		case ACTIONS.CHOOSE_OPERATION:
			if (state.currentOperand == null && state.previousOperand == null) {
				// console.log(state)
				return state
			}
			if (state.previousOperand == null) {
				return {
					...state,
					operation: payload.operationSign,
					previousOperand: state.currentOperand,
					currentOperand: null
				}
			}
			if (state.currentOperand == null) {
				return {
					...state,
					operation: payload.operationSign
				}
			}

			if (state.previousOperand !== null && state.currentOperand !== null) {
				return {
					...state,
					previousOperand: computeResult(state),
					operation: payload.operationSign,
					currentOperand: null
				}
			}
			return state
		// case end

		case ACTIONS.EVALUATE:
			if (
				state.operation == null ||
				state.currentOperand == null ||
				state.previousOperand == null
			) {
				return state
			}

			return {
				currentOperand: computeResult(state),
				previousOperand: null,
				operation: null,
				overwrite: true
			}

		default:
			break
	}
}

function computeResult({ currentOperand, previousOperand, operation }) {
	const prev = parseFloat(previousOperand)
	const curr = parseFloat(currentOperand)

	if (isNaN(prev) || isNaN(curr)) return ''

	let computation = ''

	switch (operation) {
		case '/':
			computation = prev / curr
			break

		case '*':
			computation = prev * curr
			break

		case '+':
			computation = prev + curr
			break

		case '-':
			computation = prev - curr
			break
	}

	return computation.toString()
}

const INTEGER_FORMATER = new Intl.NumberFormat('en-us', {
	maximumFractionDigits: 0
})

function formatInteger(operand) {
	if (operand == null) {
		return
	}

	const [integer, decimal] = operand.split('.')

	if (decimal == null) return INTEGER_FORMATER.format(integer)

	return `${INTEGER_FORMATER.format(integer)}.${decimal}`
}

function App() {
	// {state, dipatch that calls reducer}
	const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
		reducer,
		{
			// currentOperand: 0
		}
	)

	return (
		<div className="calculator">
			<div className="output">
				<div className="previous-operand">
					{formatInteger(previousOperand)} {operation}
				</div>
				<div className="current-operand">{formatInteger(currentOperand)}</div>
			</div>
			<button
				className="span-two"
				onClick={() => dispatch({ type: ACTIONS.CLEAR_ACTION })}
			>
				AC
			</button>
			<button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
				DEL
			</button>
			<OperationButton
				operationSign={'/'}
				dispatch={dispatch}
			></OperationButton>
			<DigitButton digit={'1'} dispatch={dispatch}></DigitButton>
			<DigitButton digit={'2'} dispatch={dispatch}></DigitButton>
			<DigitButton digit={'3'} dispatch={dispatch}></DigitButton>
			<OperationButton
				operationSign={'*'}
				dispatch={dispatch}
			></OperationButton>
			<DigitButton digit={'4'} dispatch={dispatch}></DigitButton>
			<DigitButton digit={'5'} dispatch={dispatch}></DigitButton>
			<DigitButton digit={'6'} dispatch={dispatch}></DigitButton>
			<OperationButton
				operationSign={'+'}
				dispatch={dispatch}
			></OperationButton>{' '}
			<DigitButton digit={'7'} dispatch={dispatch}></DigitButton>
			<DigitButton digit={'8'} dispatch={dispatch}></DigitButton>
			<DigitButton digit={'9'} dispatch={dispatch}></DigitButton>
			<OperationButton
				operationSign={'-'}
				dispatch={dispatch}
			></OperationButton>
			<DecimalButton digit={'.'} dispatch={dispatch}></DecimalButton>
			<DigitButton digit={'0'} dispatch={dispatch}></DigitButton>
			<button
				className="span-two"
				onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
			>
				=
			</button>
		</div>
	)
}

export default App
