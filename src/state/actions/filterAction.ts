import { SHOW_FILTER, HIDE_FILTER, TOGGLE_FILTER } from '../../helpers/actionTypes';

export const showFilter = () => ({
  type: SHOW_FILTER,
});

export const hideFilter = () => ({
  type: HIDE_FILTER,
});

export const toggleFilter = () => ({
  type: TOGGLE_FILTER,
});
