import { useReducer } from 'react'
import React from 'react'

const ACTIONS = {
	ADD_FIVE: 'add-five',
	ADD_ONE: 'sum-one',
	TO_ZERO: 'to-zero',
	SUBTRACT_ONE: 'subtract-one',
	SUBTRACT_FIVE: 'subtract-five'
}

function reducerFunction(state, action) {
	switch (action.type) {
		case ACTIONS.ADD_FIVE:
			return { counter: state.counter + 5 }

		case ACTIONS.ADD_ONE:
			return { counter: state.counter + 1 }

		case ACTIONS.TO_ZERO:
			return { counter: 0 }

		case ACTIONS.SUBTRACT_ONE:
			return { counter: state.counter - 1 }

		case ACTIONS.SUBTRACT_FIVE:
			return { counter: state.counter - 5 }

		case ACTIONS.default:
			return state
	}
}

const Counter = () => {
	const [state, dispatch] = useReducer(reducerFunction, { counter: 0 })
	return (
		<div>
			<div>{state.counter}</div>
			<div>
				<button onClick={() => dispatch({ type: ACTIONS.ADD_FIVE })}>+5</button>
				<button onClick={() => dispatch({ type: ACTIONS.ADD_ONE })}>+1</button>
				<button onClick={() => dispatch({ type: ACTIONS.TO_ZERO })}>0</button>
				<button onClick={() => dispatch({ type: ACTIONS.SUBTRACT_ONE })}>
					-1
				</button>
				<button onClick={() => dispatch({ type: ACTIONS.SUBTRACT_FIVE })}>
					-5
				</button>
			</div>
		</div>
	)
}

export default Counter
