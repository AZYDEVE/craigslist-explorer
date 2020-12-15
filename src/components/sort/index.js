import React, { useState, useEffect } from "react";
import "./sort.css";

const Sort = (props) => {
  const [amount, setAmount] = useState("10");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [oldSort, setOldSort] = useState({});

  // Compare the sort so we know when to update the feed
  const compareSorting = (oldSort, newSort) => {
    if (
      oldSort.amount === newSort.amount &&
      oldSort.sortBy === newSort.sortBy &&
      oldSort.sortOrder === newSort.sortOrder
    ) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const currentState = { amount, sortBy, sortOrder };
    if (!oldSort.amount) {
      setOldSort(currentState);
      return;
    }
    if (compareSorting(oldSort, currentState)) {
      return;
    } else {
      setOldSort(currentState);
      props.updateSorting(currentState);
    }
  }, [amount, sortBy, sortOrder, oldSort, props]);

  const handleKeyDown = (ev, order) => {
    if (ev.key === " " || ev.key === "Enter" || ev.key === "Spacebar") {
      if (props.changeMode) {
        ev.preventDefault();
        setSortOrder(order);
      }
    }
  };

  return (
    <div className="sort">
      <div className="amount">
        <select
          aria-label="Option menu for items to show in feed"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          onBlur={(event) => setAmount(event.target.value)}
          name="amount"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="40">40</option>
          <option value="60">60</option>
          <option value="80">80</option>
          <option value="100">100</option>
        </select>
        <span>𓁹</span>
      </div>
      <div className="sort-by">
        <span>Sort by</span>
        <select
          aria-label="Option menu to pick sort-by value"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          onBlur={(event) => setSortBy(event.target.value)}
          name="amount"
        >
          <option value="date">date</option>
          <option value="price">price</option>
          <option value="bedrooms">bedrooms</option>
          <option value="area">area</option>
        </select>
      </div>
      <div className="asc-desc">
        <span
          tabIndex="0"
          role="button"
          onKeyDown={(event) => handleKeyDown(event, "asc")}
          className={sortOrder === "asc" ? "active" : ""}
          onClick={() => setSortOrder("asc")}
        >
          asc ↑
        </span>
        <span>|</span>
        <span
          tabIndex="0"
          role="button"
          onKeyDown={(event) => handleKeyDown(event, "desc")}
          className={sortOrder === "desc" ? "active" : ""}
          onClick={() => setSortOrder("desc")}
        >
          desc ↓
        </span>
      </div>
    </div>
  );
};

export default Sort;
