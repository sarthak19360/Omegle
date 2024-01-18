import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Room = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name");
  useEffect(() => {
    // logic to initialize user to the room
  }, []);
  return <div>Hi {name}</div>;
};

export default Room;
