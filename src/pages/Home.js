import { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

function Home() {
  const { workouts, dispatch } = useWorkoutContext();

  useEffect(() => {
    const getWorkouts = async () => {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/workouts/`);
      const json = await res.json();
      if (res.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };
    getWorkouts();
  }, [dispatch]);
  return (
    <div className="container">
      <div className="row">
        {/* Left Column - Workouts */}
        <div className="col-md-8">
          <div className="text-center">
            {workouts &&
              workouts.map((workout) => (
                <WorkoutDetails key={workout._id} workout={workout} />
              ))}
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="col-md-4">
          <WorkoutForm />
        </div>
      </div>
    </div>
  );
}

export default Home;
