import React, { useEffect, useState } from "react";
import CardProjects from "../components/CardProjects";
import axios from "axios";

export default function Home() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await axios.get("http://localhost:3100/project/");
      setProjects(response.data);
    })();
  }, []);
  return (
    <div>
      <div className="d-flex flex-wrap justify-content-center gap-5 p-5">
        {projects.map((elem, i) => (
          <CardProjects title={elem.title} description={elem.description} />
        ))}
      </div>
    </div>
  );
}
