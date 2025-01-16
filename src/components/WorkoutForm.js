import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

function WorkoutForm() {
  const { dispatch } = useWorkoutContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/workouts/`, {
      method: "POST",
      body: JSON.stringify(workout),
      headers: { "Content-Type": "application/json" },
    });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (res.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields([]);
      console.log("new wotkout added");
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };
  return (
    <form
      className="p-4 bg-light border rounded shadow-sm"
      style={{ maxWidth: "600px", margin: "auto" }}
      onSubmit={handleSubmit}
    >
      <h3 className="text-center mb-4">Add a New Workout</h3>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Workout Title
        </label>
        <input
          type="text"
          id="title"
          className={`form-control ${
            emptyFields.includes("title") && "is-invalid"
          }`}
          placeholder="Enter workout title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="load" className="form-label">
          Load (kg)
        </label>
        <input
          type="number"
          id="load"
          className={`form-control ${
            emptyFields.includes("load") && "is-invalid"
          }`}
          placeholder="Enter load"
          value={load}
          onChange={(e) => setLoad(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="reps" className="form-label">
          Reps
        </label>
        <input
          type="number"
          id="reps"
          className={`form-control ${
            emptyFields.includes("reps") && "is-invalid"
          }`}
          placeholder="Enter reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Add Workout
      </button>
      {error && (
        <div className="mt-3 text-danger text-center border border-danger p-2 rounded">
          {error}
        </div>
      )}{" "}
    </form>
  );
}

export default WorkoutForm;
