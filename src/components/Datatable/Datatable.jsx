import React, { useState, useEffect } from "react";
import styles from "./Datatable.module.css";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "name", headerName: "Name", flex: 1 },
  { field: "symbol", headerName: "Symbol", flex: 1 },
  { field: "current_price", headerName: "Price", flex: 1 },
  {
    field: "price_change_percentage_24h",
    headerName: "Change",
    type: "number",
    flex: 1,
  },
];

const Datatable = () => {
  const [coins, setCoins] = useState([]);

  const fetchCoins = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      const data = await res.json();
      setCoins(data);
    } catch (e) {
      alert("Api error");
    }
  };
  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.table}>
        <DataGrid
          rows={coins}
          columns={columns}
          pageSize={7}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
};

export default Datatable;
