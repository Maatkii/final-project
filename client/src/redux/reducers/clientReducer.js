import {
  ERROR,
  GET_FREELANCER_DETAILS,
  GET_TASK_PROPOSALS,
  LOADING,
  GET_MY_PROCESS,
} from "../constants/actions-types";

const initialState = {
  freelancerDetails: undefined,
  proposals: undefined,
  loading: false,
  error: undefined,
  process: undefined,
};

const clientReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_MY_PROCESS:
      return {
        ...state,
        process: payload,
      };
    case GET_TASK_PROPOSALS:
      return {
        ...state,
        proposals: payload,
      };
    case GET_FREELANCER_DETAILS:
      return {
        ...state,
        freelancerDetails: payload,
      };
    case ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default clientReducer;
