import React from "react";
import styled from "styled-components";

const ToolTipText = styled("span")({
  visibility: "hidden",
  width: "200px",
  backgroundColor: "#000000",
  color: "#ffffff",
  textAlign: "center",
  borderRadius: "6px",
  padding: "5px 0",
  position: "absolute",
  zIndex: 1,
  bottom: "150%",
  left: "50%",
  marginLeft: "-100px",
  ":after": {
    content: '""',
    position: "absolute",
    top: "100%",
    left: "50%",
    marginLeft: "-5px",
    borderWidth: "5px",
    borderStyle: "solid",
    borderColor: "black transparent transparent transparent"
  }
});

const ToolTipContainer = styled("div")({
  position: "relative",
  ":hover span": {
    visibility: "visible"
  }
});

function ToolTip({ children, toolTipText }) {
  return (
    <ToolTipContainer>
      {children}
      <ToolTipText>{toolTipText}</ToolTipText>
    </ToolTipContainer>
  )
}

export default ToolTip;
