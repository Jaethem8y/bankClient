import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { detailTable } from "../../state/detailTable";
import { Table } from "react-bootstrap";
import styles from "./dataDict.module.scss";

export default function DataDict() {
  const [dataDict, setDataDict] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [start, setStart] = useState(30);
  const [detailTables, setDetailTables] = useRecoilState(detailTable);
  useEffect(() => {
    const fetchDataDict = async () => {
      try {
        const data = await axios.get(
          "http://13.58.245.200:3002/data_dict?end=30"
        );
        setDataDict(data.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchDataDict();
  }, []);

  const loadMore = async () => {
    const data = await axios.get(
      "http://13.58.245.200:3002/data_dict?start=" +
        start +
        "&end=" +
        (start + 30)
    );
    setStart((prev) => prev + 30);
    setDataDict((prev) => [...prev, ...data.data]);
  };

  const getDetailTables = (e) => {
    setDetailTables([...detailTables, e.target.innerText]);
  };

  if (loading)
    return (
      <div>
        <h1>Loading the Data</h1>
      </div>
    );

  if (error)
    return (
      <div>
        <h1 style={{ color: "red" }}>
          An error has occured. If error keeps occuring please contact Jaehyeok
          Choi @ jaehyeok.choi@drake.edu
        </h1>
      </div>
    );
  if (!dataDict) return null;

  return (
    <div>
      <div className={styles.tableDescription}>
        <h2>data_dict table</h2>
        <h2>current # of rows: {dataDict.length}</h2>
      </div>
      <div className={styles.table}>
        <Table striped bordered hover style={{ margin: "0", padding: "1em" }}>
          <thead style={{ postion: "fixed" }}>
            <tr>
              {Object.keys(dataDict[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
              <th>checkbox</th>
            </tr>
          </thead>
          <tbody className={styles.scrollTable}>
            {dataDict.map((el, index) => {
              return (
                <tr key={index} scope="row">
                  {Object.keys(el).map((key, index) => {
                    if (index === 0) {
                      return (
                        <td style={{ padding: "0.5em" }}>
                          <p onClick={getDetailTables}>{el[key]}</p>
                        </td>
                      );
                    }
                    return (
                      <td style={{ padding: "0.5em" }}>
                        <p>{el[key]}</p>
                      </td>
                    );
                  })}
                  <td key={index}> checkbox </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <p onClick={loadMore} style={{ textAlign: "center" }}>
          <b>click this to load 30 more</b>
        </p>
      </div>
    </div>
  );
}
