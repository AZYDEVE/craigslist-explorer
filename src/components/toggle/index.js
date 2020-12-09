import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./toggle.css";

const Toggle = (props) => {
  const [toggleClass, setToggleClass] = useState("off");

  const setInitialState = () => {
    if (props.enabled) {
      toggleSwitch(true);
    }
  }

  useEffect(setInitialState, [props.enabled])


  const toggleSwitch = (state) => {
    if (state instanceof Boolean) {
      if (state) {
        setToggleClass('on');
      } else {
        setToggleClass('off');
      }
      return;
    }
    if (toggleClass === "off") {
      setToggleClass('on');
    }
    else {
      setToggleClass('off');
    }
  }

  return (
    <div className="toggle">
      <div onClick={toggleSwitch} className={"SwitchControl " + toggleClass}>
        <div className="SwitchControl--slider">
          <div className="SwitchControl--knob"></div>
        </div>
      </div>
    </div>
  );
};

export default Toggle;
