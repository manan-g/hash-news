import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
let adders = [0, 1, 2, 3, 4];

const StyledPage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 4px 0px;
`;

const StyledButton = styled.button`
  margin: 5px;
  height: 30px;
  width: 30px;
  background-color: ${(props) =>
    props.page == props.currentPage
      ? props.theme.color.orange
      : props.theme.color.lightBlue};
  color: ${(props) =>
    props.page == props.currentPage
      ? props.theme.color.white
      : props.theme.color.dullBlue};
  border: 0px;
  border-radius: 3px;

  :hover {
    cursor: pointer;
  }
`;

export default function Pagination({ currentPage, setCurrentPage, maxPage }) {
  const [start, setStart] = useState(currentPage);

  const handleDecrease = (e) => {
    setStart((prev) => {
      if (prev > 0) return prev - 1;
      else return prev;
    });
  };
  const handleIncrease = (e) => {
    setStart((prev) => {
      if (prev + 4 < maxPage) return prev + 1;
      else return prev;
    });
  };
  useEffect(() => {
    if (maxPage) {
      if (parseInt(start) + 4 > maxPage) setStart(maxPage - 4);
    }
    return () => {};
  }, [maxPage]);

  return (
    <StyledPage>
      <StyledButton onClick={handleDecrease}>{'<<'}</StyledButton>
      {adders.map((value) => (
        <Link
          key={value + parseInt(start)}
          to={`/list/${value + parseInt(start)}`}
        >
          <StyledButton
            page={value + parseInt(start)}
            currentPage={currentPage}
            onClick={() => {
              setCurrentPage(value + parseInt(start));
            }}
          >
            {value + parseInt(start) + 1}
          </StyledButton>
        </Link>
      ))}
      <StyledButton onClick={handleIncrease}>{'>>'}</StyledButton>
    </StyledPage>
  );
}
