import { dropDownSlice as slice } from '../slices/dropDownSlice';
import { dispatch } from '../store';
import { getCurrenciesApi } from '../../../_apis_/dropDown';

export function getCurrencies() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const { data } = await getCurrenciesApi();

      dispatch(slice.actions.getCurrenciesSuccess(data));
    } catch (err: unknown) {
      dispatch(slice.actions.hasError(err));
    }
  };
}
