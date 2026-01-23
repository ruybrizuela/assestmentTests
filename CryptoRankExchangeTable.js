import React, {useState, useEffect} from "react";
import { cryptocurrencyList } from "../cryptocurrency-list";

function Table({amount}) {
  const [currencyList, setCurrencyList] = useState(cryptocurrencyList)
  const getNumberOfCoins = (rate) => {
    if(!amount) return '0.00000000'
    return (amount*rate).toFixed(8)
  }
  useEffect(()=>{
    getNumberOfCoins()
  },[amount])
  return (
    <div className="card card-text mt-10 mx-4">
      <table className="mb-0">
        <thead>
          <tr>
            <th>Cryptocurrency</th>
            <th>Exchange Rate</th>
            <th>Number of Coins</th>
          </tr>
        </thead>
        <tbody data-testid="exchange-data">
          {
            currencyList.map((curr) => (
            <tr>
              <td>{curr.name}</td>
              <td>1 USD = {curr.rate} {curr.code}</td>
              <td>{(amount === "" ||
                amount === null ||
                amount > 17042.67 ||
                amount < 0.01) ? "n/a" :getNumberOfCoins(curr.rate)}</td>
            </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
