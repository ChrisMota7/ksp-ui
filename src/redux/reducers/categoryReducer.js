export const SET_CATEGORIES = "SET_CATEGORIES";
export const ADD_PROBLEM = "ADD_PROBLEM";
export const SET_DASHBOARD = "SET_DASHBOARD";
export const SET_CATEGORIES_ALL = "SET_CATEGORIES_ALL";

export const defaultState = {
    categoriesAll: [],
    categories: [],
    problems: [],
    dashboard: [],
};

const categoryReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_CATEGORIES_ALL:
            return {
                ...state,
                categoriesAll: action.payload  
            };
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
        case SET_DASHBOARD:
            return {
                ...state,
                dashboard: action.payload 
            };    
        default:
            return state;    
    }
};

export default categoryReducer;

export const selectCategories = (state) => state.categoryReducer.categories
export const selectCategoriesAll = (state) => state.categoryReducer.categoriesAll
export const selectDashboard = (state) => state.categoryReducer.dashboard
