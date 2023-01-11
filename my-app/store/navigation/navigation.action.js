import { createAction } from '../../utils/reducer/reducer.utils';
import { NAVIGATION_ACTION_TYPES } from './navigation.reducer';

export const setCurrentNavigation = (navigation) => {
    return createAction(NAVIGATION_ACTION_TYPES.SET_CURRENT_NAVIGATION, navigation);
}