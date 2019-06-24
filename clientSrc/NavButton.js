import React from 'react';

export default function NavButton(props) {
  const {name, quantity, active, setActive} = props;
  return(
    <button className={active === name ? "buttonActive" : ""} onClick={setActive} value={name}>{name} ({quantity})</button>
  );
}
