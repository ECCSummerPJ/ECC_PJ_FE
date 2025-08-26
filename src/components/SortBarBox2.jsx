import styled from "styled-components";

const BoxContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const Box = styled.div`
  width: 129px;
  background: white;
  border-radius: 10px;
  border: 1px solid #909090;

  display: flex;
  flex-direction: column;
`;

const BoxDivider = styled.div`
  width: 100%;
  height: 0;
  border-top: 1px solid #909090;
`;

const BoxItem = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0px;

  color: "black";
  font-weight:  ${({ $active }) => ($active ? "700" : "400")};
  font-family: "Pretendard", sans-serif;
  font-size: 15px;
  line-height: 14px;
  gap: 8px;
  cursor: pointer;
`;

export const SortBarBox2 = ({ sortOrder, onSortChange }) => {
  return (
    <BoxContainer>
      <Box>
        <BoxItem
          $active={sortOrder === "latest"}
          onClick={() => onSortChange("latest")}
        >
          최신순
        </BoxItem>
        <BoxDivider />
        <BoxItem
          $active={sortOrder === "oldest"}
          onClick={() => onSortChange("oldest")}
        >
          오래된 순
        </BoxItem>
      </Box>
    </BoxContainer>
  );
};
