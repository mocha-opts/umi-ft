import React, { useState } from "react";

export const Demo = (props: { id: any }) => {
  console.log(props.id);
  const [vendorId, setVendorId] = useState(props.id);

  return <div>{vendorId}</div>;
};
