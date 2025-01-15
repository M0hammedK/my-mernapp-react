import { useWorkoutContext } from "../hooks/useWorkoutContext";

function WorkoutDetails({ workout }) {
  const { dispatch } = useWorkoutContext();

  const handleClick = async () => {
    const res = await fetch(`${import.meta.env.BACKEND_PORT}/api/workouts/` + workout._id, {
      method: "DELETE",
    });

    const json = await res.json();

    if (res.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <div
      className="card mb-3 shadow-sm border-0"
      style={{ maxWidth: "600px", margin: "auto" }}
    >
      <div className="card-body bg-light">
        <h5 className="card-title text-center text-uppercase fw-bold">
          {workout.title}
        </h5>
        <h6 className="card-subtitle mb-3 text-muted text-center">
          {new Date(workout.createdAt).toLocaleDateString()}
        </h6>
        <div className="d-flex justify-content-between px-3">
          <p className="card-text">
            <strong>Reps:</strong> {workout.reps} times
          </p>
          <p className="card-text">
            <strong>Load:</strong> {workout.load} Kg
          </p>
        </div>
        <div className="text-center mt-3">
          <button
            className="btn btn-dark btn-sm delete-hover"
            onClick={handleClick}
          >
            Delete Workout
          </button>
        </div>
      </div>
    </div>
  );
}

export default WorkoutDetails;
