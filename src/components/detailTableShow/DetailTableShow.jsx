import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { Table, Button } from "react-bootstrap";
import { detailTable } from "../../state/detailTable";

import styles from "./detailTableShow.module.scss";

import axios from "axios";

export default function DetailTableShow({ table }) {
  const [length, setLength] = useState(0);
  const [tableRowNum, setTableRowNum] = useState(0);
  const [start, setStart] = useState(30);
  const [targetTable, setTargetTable] = useState(null);
  const [detailTables, setDetailTables] = useRecoilState(detailTable);

  useEffect(() => {
    const fetchData = async () => {
      const lengthRequest = await axios(
        "http://13.58.245.200:3002/length/" + table
      );
      const target = await axios(
        "http://13.58.245.200:3002/" + table + "?end=30"
      );
      setLength(lengthRequest.data);
      setTargetTable(target.data);
      setTableRowNum(target.data.length);
    };
    fetchData();
  }, []);

  const loadMore = async () => {
    const data = await axios.get(
      "http://13.58.245.200:3002/" +
        table +
        "?start=" +
        start +
        "&end=" +
        (start + 30)
    );
    setStart((prev) => prev + 30);
    setTargetTable((prev) => [...prev, ...data.data]);
    setTableRowNum(targetTable.length);
  };

  const removeTable = () => {
    setDetailTables(detailTables.filter((el) => el !== table));
    console.log(detailTables);
  };
  if (!targetTable) {
    return <></>;
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1em",
        }}
      >
        <h1>{table}</h1>
        <div style={{ margin: " 1em" }}>
          <span>table total rows: {length} </span>
          <span> table current rows : {tableRowNum}</span>
          <Button
            style={{ marginLeft: "1em" }}
            variant="danger"
            onClick={removeTable}
          >
            Remove
          </Button>
        </div>
      </div>
      <div className={styles.table}>
        <Table striped bordered hover style={{ margin: "0", padding: "1em" }}>
          <thead style={{ postion: "fixed" }}>
            <tr>
              {Object.keys(targetTable[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {targetTable.map((el, index) => {
              return (
                <tr key={index} scope="row">
                  {Object.keys(el).map((key, index) => {
                    if (index === 0) {
                      return (
                        <td style={{ padding: "0.5em" }}>
                          <p>{el[key]}</p>
                        </td>
                      );
                    }
                    return (
                      <td style={{ padding: "0.5em" }}>
                        <p>{el[key]}</p>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
        <p onClick={loadMore} style={{ textAlign: "center" }}>
          <b>click this to load 30 more</b>
        </p>
      </div>
    </>
  );
}
