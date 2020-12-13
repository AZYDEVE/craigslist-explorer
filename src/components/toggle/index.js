import React, { useEffect, useState } from "react";
import "./toggle.css";

const Toggle = (props) => {

  const [toggleClass, setToggleClass] = useState("off");

  // Get initial state of parent element
  // Default value is false
  const setToggleState = () => {
    if (props.enabled) {
      toggleSwitch(true);
    } else {
      toggleSwitch(false);
    }
  }

  useEffect(setToggleState, [props.enabled])

  // Toggle the classNames
  const toggleSwitch = (state) => {
    if (state) {
      setToggleClass('on');
    } else {
      setToggleClass('off');
    }
  }

  return (
    <div className="toggle">
      <div onClick={() => props.update(toggleClass === 'on' ? false : true)} className={"SwitchControl " + toggleClass}>
        <div className="SwitchControl--slider">
          <div className="SwitchControl--knob"></div>
        </div>
      </div>
    </div>
  );
};

export default Toggle;
