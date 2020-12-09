import React, { useState } from "react";
import "./sort.css";

const Sort = (props) => {
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(999);
  const [amount, setAmount] = useState("1");
  const [area, setArea] = useState(100);

  return (
    <div className="sort">
      <div className="amount">
        <select value={amount} onChange={(event) => setAmount(event.target.value)} name="amount">
          <option value="10" selected>10</option>
          <option value="20" >20</option>
          <option value="40">40</option>
          <option value="60">60</option>
          <option value="80">80</option>
          <option value="100">100</option>
        </select>
        <span>𓁹</span>
      </div>
      <div className="sort-by">
      </div>
      <div className="asc-desc">

      </div>
    </div>
  );
};

export default Sort;
