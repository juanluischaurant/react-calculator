import React from 'react'
import { ACTIONS } from './App'

const DecimalButton = ({ dispatch, digit }) => {
	return (
		<button
			className="decimal-button"
			onClick={() =>
				dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: digit } })
			}
		>
			{digit}
		</button>
	)
}

export default DecimalButton
