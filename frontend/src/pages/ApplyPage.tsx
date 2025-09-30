import { useEffect, useState } from "react";
import ApplyForm from "../components/ApplyForm";

const ApplyPage = () => {
  const [initialPosition, setInitialPosition] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pos = params.get("position");
    if (pos) setInitialPosition(pos);
  }, []);

  return <ApplyForm initialPosition={initialPosition} />;
};

export default ApplyPage;
