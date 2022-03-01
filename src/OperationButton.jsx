import React from 'react'
import { ACTIONS } from './App'

const OperationButton = ({ dispatch, operationSign }) => {
	return (
		<button
			onClick={() =>
				dispatch({
					type: ACTIONS.CHOOSE_OPERATION,
					payload: { operationSign: operationSign }
				})
			}
		>
			{operationSign}
		</button>
	)
}

export default OperationButton
