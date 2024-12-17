import React from "react";

function useToggle(isOn = false) {
  const [on, setOn] = React.useState(isOn);

  const toggle = () => {
    setOn((isOn) => !isOn);
  };

  return [on, toggle];
}

export default useToggle;
