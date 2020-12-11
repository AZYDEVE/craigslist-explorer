import React, { useEffect, useState } from "react";
import "./filter.css";
import Toggle from '../toggle';

const Filter = (props) => {
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(9999);
  const [bedrooms, setBedrooms] = useState("1");
  const [area, setArea] = useState(100);
  const [toggleState, setToggleState] = useState(false);
  const [oldFilter, setOldFilter] = useState({});

  const compareFilter = (oldFilter, newFilter) => {
    if (
      oldFilter.minPrice === newFilter.minPrice &&
      oldFilter.maxPrice === newFilter.maxPrice &&
      oldFilter.bedrooms === newFilter.bedrooms &&
      oldFilter.area === newFilter.area
    ) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    const currentState = {
      minPrice, maxPrice, bedrooms, area
    };
    if (!oldFilter.minPrice) {
      setOldFilter(currentState)
      return;
    }
    if (compareFilter(oldFilter, currentState)) {
      return;
    } else {
      setToggleState(true);
      setOldFilter(currentState)
      props.updateFilter(currentState)
    }
  }, [minPrice, maxPrice, bedrooms, area, props, oldFilter])

  const toggleSwitch = (state) => {
    setToggleState(state);
    if (state) {
      props.updateFilter({ minPrice, maxPrice, bedrooms, area })
    } else {
      props.updateFilter({})
    }
  }

  return (
    <div className="filter">
      <div className="toggle-wrapper">
        Search Filter
        <Toggle enabled={toggleState} update={toggleSwitch} />
      </div>
      <div className="price">
        $<input onChange={(event) => setMinPrice(event.target.value)} min="1" max="9999" type='number' value={minPrice} /> -  $<input onChange={(event) => setMaxPrice(event.target.value)} min="1" max="9999" type='number' value={maxPrice} /> <span>Rent</span>
      </div>
      <div className="bedrooms">
        <select value={bedrooms} onChange={(event) => setBedrooms(event.target.value)} name="bedrooms">
          <option value="1">+1</option>
          <option value="2">+2</option>
          <option value="3">+3</option>
          <option value="4">+4</option>
          <option value="5">+5</option>
          <option value="6">+6</option>
        </select>
        <span>BR</span>
      </div>
      <div className="area">
        + <input max="9999" step='50' onChange={(event) => setArea(event.target.value)} min="1" type='number' value={area} /><span>ft²</span>
      </div>
      <div className="minimize">
        <span>^</span>
      </div>
    </div>
  );
};

export default Filter;
