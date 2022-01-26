import React, { useState, useRef } from "react";
import styled from "styled-components";
import Chevron from "./Chevron";

const StyledAccordion = styled.div`
 display: flex;
  flex-direction: column;
`

const StyledTitle = styled.p`
  font-weight: 600;
  font-size: 14px;
  text-align: left;
`

const StyledContent  = styled.div`
  background-color: white;
  transition: max-height 0.6s ease;
  `
const StyledButton = styled.button`
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 5px 18px;
  display: flex;
  align-items: center;
  border: none;
  outline: none;
  transition: background-color 0.6s ease;
  
`

function Accordion(props) {
  const [active, setActive] = useState("");
  const [height, setHeight] = useState("0px");
  const [rotate, setRotate] = useState(false);
  const content = useRef(null);

  function toggleAccordion() {
    setActive(active === "" ? "active" : "");
    setHeight(
      active === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
    setRotate(
      active === "active" ? true : false
    );
  }

  return (
    <StyledAccordion>
      <StyledButton active={active} onClick={toggleAccordion}>
        <StyledTitle >{props.title}</StyledTitle>
        <Chevron rotate={rotate} width={10} fill={"#777"} />
      </StyledButton>
      <StyledContent
        ref={content}
        style={{ maxHeight: `${height}` }}
      >
        <div
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
      </StyledContent>
    </StyledAccordion>
  );
}

export default Accordion;
