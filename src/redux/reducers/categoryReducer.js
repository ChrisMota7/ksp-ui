export const SET_CATEGORIES = "SET_CATEGORIES";
export const ADD_PROBLEM = "ADD_PROBLEM";

export const defaultState = {
    categories: [],
    problems: []
};

const categoryReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_CATEGORIES:
            return {
                ...state,
                categories: action.payload  
            };
        case ADD_PROBLEM:
            return {
                ...state,
                problems: action.payload 
            };
        default:
            return state;    
    }
};

export default categoryReducer;

export const selectCategories = (state) => state.categoryReducer.categories
