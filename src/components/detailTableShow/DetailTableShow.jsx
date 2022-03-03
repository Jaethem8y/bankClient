import { useState, useEffect } from "react";
import axios from "axios";

export default function DetailTableShow({ table }) {
  const [length, setLength] = useState(0);
  const [start, setStart] = useState(30);
  useEffect(() => {
    const fetchData = async () => {
      const lengthRequest = await axios(
        "http://13.58.245.200:3002/length/" + table
      );
      setLength(lengthRequest.data);
    };
    fetchData();
  }, []);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>{table}</h1>
        <p>table total rows: {length}</p>
        <p>table current rows : {start}</p>
      </div>
    </>
  );
}
