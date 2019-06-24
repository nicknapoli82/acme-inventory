import React from 'react';

export default function Navbar(name, quantity, linkTo) {
  return(
    <div>
      <a href={linkTo}><button>{name} ({quantity})</button></a>
    </div>
  );
}
