import { useState } from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  const [name, setName] = useState("");
  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <Link to={`/room/?name=${name}`}>
        <button
          onClick={() => {
            // join room logic here
          }}
        >
          Join
        </button>
      </Link>
    </div>
  );
};

export default Landing;
