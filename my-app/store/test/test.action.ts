import { useDispatch } from 'react-redux';
import { Action, ActionWithPayload, createAction } from '../../utils/reducer/reducer.utils';
import { ACTION_TYPES, Test } from './test.types';
import { selectItemsReducer } from './test.selector';

export type SetItemAction = ActionWithPayload<ACTION_TYPES.SET_ITEMS, Test>;

export type TestAction = SetItemAction;

//Các component sẽ gọi vào các action này, các action này sẽ callback các selector
export const setItemAction = (test: Test) => {
    const payload = selectItemsReducer(test);
    return createAction(ACTION_TYPES.SET_ITEMS, payload);
}