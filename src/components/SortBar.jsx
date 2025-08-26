import { useState } from "react";
import styled, { keyframes } from "styled-components";
import downArrow from "../assets/icons/down-arrow.svg";
import { SortBarBox1, SortBarBox2 } from "./";

// 전체 Wrapper
const Container = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
  gap: 24px;
  position: relative;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  position: relative; /* 드롭다운 absolute 기준 */
`;

const Label = styled.div`
  color: #595959;
  font-size: 18px;
  font-family: 'Pretendard';
  font-weight: 400;
  line-height: 40px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
  transition: transform 0.2s;
  transform: ${({ open }) => (open ? "rotate(180deg)" : "rotate(0deg)")};
`;

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const DropdownWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 2px;
  z-index: 100;
  animation: ${slideDown} 0.1s ease forwards;
  border-radius: 10px;
  background: white;
`;

const SortBar = ({ selectedCategory, onCategoryChange }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [sortOrder, setSortOrder] = useState("latest");

  const handleClick = (btnId) => {
    setOpenDropdown(openDropdown === btnId ? null : btnId); // 토글만
  };

  return (
    <Container>
      <ButtonGroup>
        <Label onClick={() => handleClick(1)}>
          카테고리
          <Icon src={downArrow} alt="아이콘" open={openDropdown === 1} />
        </Label>
        {openDropdown === 1 && (
          <DropdownWrapper style={{ left: "-25px" }}>
            <SortBarBox1 
              selectedCategory={selectedCategory} 
              onCategoryChange={onCategoryChange} 
            />
          </DropdownWrapper>
        )}
      </ButtonGroup>

      <ButtonGroup>
        <Label onClick={() => handleClick(2)}>
          시간순
          <Icon src={downArrow} alt="아이콘" open={openDropdown === 2} />
        </Label>
        {openDropdown === 2 && (
          <DropdownWrapper style={{ left: "-35px" }}>
            <SortBarBox2
              sortOrder={sortOrder}
              onSortChange={(order) => {
                setSortOrder(order);   // 정렬 상태 변경
                setOpenDropdown(null); // 드롭다운 닫기
              }}
            />
          </DropdownWrapper>
        )}
      </ButtonGroup>
    </Container>
  );
};

export default SortBar;
