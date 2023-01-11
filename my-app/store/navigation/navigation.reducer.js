export const NAVIGATION_ACTION_TYPES = {
    SET_CURRENT_NAVIGATION: 'SET_CURRENT_NAVIGATION',
  };
  
  export const NAVIGATION_INITIAL_STATE = {
      currentNavigation: null,
    };
    
    export const navigationReducer = (state = NAVIGATION_INITIAL_STATE, action = {}) => {
      const { type, payload } = action;
    
      switch (type) {
        case NAVIGATION_ACTION_TYPES.SET_CURRENT_NAVIGATION:
          return { ...state, currentNavigation: payload };
        default:
          return state;
      }
    };