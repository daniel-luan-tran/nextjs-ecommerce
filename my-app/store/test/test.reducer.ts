import { TestAction } from "./test.action";
import { ACTION_TYPES} from "./test.types";

const TEST_INITIAL_STATE = {
    id: 1,
    text: "",
};

export const testReducer = (state = TEST_INITIAL_STATE, action = {} as TestAction) => {
    switch (action.type) {
        case ACTION_TYPES.SET_ITEMS:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state
            //throw new Error(`Unhandled type ${type} in cartReducer`);
    }
};