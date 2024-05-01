"use client";

import { StyleProvider } from "@ant-design/cssinjs";

export const AntStyleProvider = ({ children }) => {
  return <StyleProvider hashPriority="high">{children}</StyleProvider>;
};
