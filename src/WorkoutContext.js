import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

const WorkoutReducer = (state, actoin) => {
  switch (actoin.type) {
    case "SET_WORKOUTS":
      return {
        workouts: actoin.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [actoin.payload, ...state.workouts],
      };
      case "DELETE_WORKOUT":
        return{
          workouts: state.workouts.filter((workout)=>workout._id !== actoin.payload._id)
        }
    default:
      return {
        state,
      };
  }
};
export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(WorkoutReducer, {
    workouts: [],
  });
  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};
