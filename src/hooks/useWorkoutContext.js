import { useContext } from "react";
import { WorkoutContext } from "../WorkoutContext";

export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext);

  if (!context)
    throw Error(
      "useWorkoutContexr must be inside the WorkoutContextProvider tag"
    );
  return context; 
};
