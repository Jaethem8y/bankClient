import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { detailTable } from "../../state/detailTable";
import { Table } from "react-bootstrap";
import styles from "./dataDict.module.scss";
import { requestUrl } from "../../state/url";

export default function DataDict() {
  const [dataDict, setDataDict] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemCode, setItemCode] = useState("");
  const [meaning, setMeaning] = useState("");
  const [detailTables, setDetailTables] = useRecoilState(detailTable);

  const itemCodeRef = useRef(null);
  const meaningRef = useRef(null);

  useEffect(() => {
    const fetchDataDict = async () => {
      try {
        const data = await axios.get(requestUrl + "/data_dict");
        setDataDict(data.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchDataDict();
  }, []);

  const getDetailTables = (e) => {
    if (!detailTables.includes(e.target.innerText)) {
      setDetailTables([...detailTables, e.target.innerText]);
    }
    console.log(detailTables);
  };

  const onClick = () => {
    // console.log(itemCodeRef.current.value);
    // console.log(meaningRef.current.value);
    setItemCode(itemCodeRef.current.value);
    setMeaning(meaningRef.current.value);
    const fetchDataDict = async () => {
      try {
        const data = await axios.get(
          requestUrl +
            "/data_dict?item_code=" +
            itemCode +
            "&meaning=" +
            meaning
        );
        setDataDict(data.data);
      } catch (e) {}
    };
    fetchDataDict();
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
        <div>
          <input type="text" placeholder="item_code" ref={itemCodeRef} />
          <input type="text" placeholder="meaning" ref={meaningRef} />
          <button onClick={onClick}>Search</button>
        </div>
      </div>
      <div className={styles.table}>
        <Table striped bordered hover style={{ margin: "0", padding: "1em" }}>
          <thead style={{ postion: "fixed" }}>
            <tr>
              {Object.keys(dataDict[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
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
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
