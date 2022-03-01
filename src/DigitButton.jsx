import React from 'react'
import { ACTIONS } from './App'

const DigitButton = ({ dispatch, digit }) => {
	return (
		<button
			className="number-color"
			onClick={() =>
				dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: digit } })
			}
		>
			{digit}
		</button>
	)
}

export default DigitButton
