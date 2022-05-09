import React, { useState, useEffect } from "react";
import styles from "./Datatable.module.css";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    renderCell: (params) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <img width="32px" src={params.row.image} />
        <span>{params.row.name}</span>
      </div>
    ),
  },
  {
    field: "symbol",
    headerName: "Symbol",
    flex: 1,
    renderCell: (params) => <span>{params.row.symbol.toUpperCase()}</span>,
  },
  {
    field: "current_price",
    headerName: "Price ($)",
    flex: 1,
    renderCell: (params) => <span>${params.row.current_price}</span>,
  },
  {
    field: "price_change_percentage_24h",
    headerName: "Change (%)",
    type: "number",
    flex: 1,
    renderCell: (params) => (
      <span
        style={
          params.row.price_change_percentage_24h.toString()[0] === "-"
            ? {
                backgroundColor: "#e63946",
                padding: "6px",
                width: "3rem",
                color: "#fff",
              }
            : params.row.price_change_percentage_24h.toString()[0] === "0"
            ? {
                backgroundColor: "gray",
                padding: "6px",
                width: "3rem",
                color: "#fff",
              }
            : {
                backgroundColor: "#606c38",
                padding: "6px",
                width: "3rem",
                color: "#fff",
              }
        }
      >
        {params.row.price_change_percentage_24h.toFixed(2)}%
      </span>
    ),
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
      data.push(
        {
          id: "123123123",
          image:
            "https://uretkenakademi.com/wp-content/uploads/2021/12/logo.svg",
          name: "UretkenAkademi",
          current_price: 100000000000,
          symbol: "UA",
          price_change_percentage_24h: 0,
        },
        {
          id: "123123123321",
          image:
            "https://static.wixstatic.com/media/87fc30_47d3addbcbe34086926ffdaba9b21280~mv2.png/v1/crop/x_0,y_59,w_946,h_473/fill/w_131,h_60,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/ALB_20_216_VENTURES_LOGO-son-01_edited_p.png",
          name: "APY Ventures",
          current_price: 100000000000,
          symbol: "APY",
          price_change_percentage_24h: 0,
        }
      );
      setCoins(data);
    } catch (e) {
      alert("Api error");
    }
  };
  useEffect(() => {
    fetchCoins();
  }, []);
  console.log(coins);
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
