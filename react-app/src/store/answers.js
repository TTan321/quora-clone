// Types
const GET_ANSWERS = "answers/GET_ANSWERS"
const ADD_ANSWER = "answers/ADD_ANSWER"
const EDIT_ANSWER = "answer/EDIT_ANSWER"

// Actions
const loadAnswers = answers => {
    return {
        type: GET_ANSWERS,
        answers
    }
}

const postAnswer = answer => {
    return {
        type: ADD_ANSWER,
        answer
    }
}

const updateAnswer = answer => {
    return {
        type: EDIT_ANSWER,
        answer
    }
}

// Thunks
export const getAnswers = () => async dispatch => {
    const response = await fetch('/api/answers')
    if (response.ok) {
        const data = await response.json()
        dispatch(loadAnswers(data.answers))
        return { ...data }
    }
}

export const addAnswer = answer => async dispatch => {
    const response = await fetch(`/api/answers`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answer)
    });
    if (response.ok) {
        const data = await response.json()
        dispatch(postAnswer(data.answer))
        return { ...data }
    }
}

export const editAnswer = answer => async dispatch => {
    const response = await fetch(`/api/answers/${answer.answerId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answer)
    });
    if (response.ok) {
        const data = await response.json()
        dispatch(updateAnswer(data.answer))
        return { ...data }
    }
}

// Reducer
const answersReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ANSWERS: {
            const newState = {}
            action.answers.forEach(answer => {
                newState[answer.id] = answer
            })
            return newState
        }
        case ADD_ANSWER: {
            const newAnswer = {}
            newState[action.answer.id] = action.answer
            const newState = { ...state, ...newAnswer }
            return newState
        }
        case EDIT_ANSWER: {
            const newState = { ...state }
            newState[action.answer.id] = action.answer
            return newState
        }
        default: {
            return state
        }
    }
}

export default answersReducer
