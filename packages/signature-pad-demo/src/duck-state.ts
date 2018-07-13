import { Reducer } from "redux";
import { FSA } from "flux-standard-action";
/**
 * quick store[$key]."setState"
 * TODO:
 *  - Shallow Equals
 */
export default <S extends {}, M extends {} = {}>(
  store_key: string,
  defaultState: S,
) => {
  type ActionType = FSA<Partial<S>, M>;

  const type = `@${store_key}-set-state`;

  const reducer: Reducer<S> = (state = defaultState, action: ActionType) => {
    if (action.type === type) {
      return Object.assign({}, state, action.payload);
    }
    return state;
  };
  const action = (payload: Partial<S>, meta?: M) => ({
    type,
    payload,
    meta: meta || {},
  });
  const selector = <X extends {} = {}>(state: X): S => ({
    ...state[store_key],
  });
  return {
    reducer,
    reducerMap: { [store_key]: reducer },
    type,
    action,
    selector,
  };
};
