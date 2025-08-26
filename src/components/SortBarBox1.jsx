import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { getCategories } from "../api/categories";
import { CategoryList } from "./CategoryList";

const Box = styled.div`
  width: 129px;
  background: white;
  border-radius: 10px;
  border: 1px solid #909090;
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BoxDivider = styled.div`
  width: 128px;
  height: 0;
  margin-top: 8px;
  border-top: 1px solid #909090;
`;

const BoxItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  font-size: ${(props) => (props.$small ? 13 : 15)}px;
  line-height: 14px;
  cursor: ${(props) => (props.$clickable ? "pointer" : "default")};
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalWrapper = styled.div`
  z-index: 1000;
`;

export const SortBarBox1 = ({ selectedCategory, onCategoryChange }) => {
  const [categories, setCategories] = useState([]);
  const [openMore, setOpenMore] = useState(false);

  useEffect(() => {
      const loadCategories = async () => {
        try {
          const data = await getCategories();
          console.log("스크랩 응답:", data);
    
          setCategories(Array.isArray(data) ? data : []); 
        } catch (err) {
          console.error("스크랩 목록 불러오기 실패:", err);
        }
      };
      loadCategories();
    }, []);

    
  return (
    <div>
      <Box>
        {categories.map((cat =>
          <div 
            key={cat.categoryId}>
            <BoxItem
              $clickable
              style={{
                fontWeight: selectedCategory === cat.categoryId ? 'bold' : 'normal',
              }}
                onClick={() => {
                  onCategoryChange(cat.categoryId);
                }}
              >
                {cat.categoryName}
              </BoxItem>
            <BoxDivider />
          </div>
        ))}
        <BoxItem 
          $small
          $center
          $clickable
          onClick={() => setOpenMore(true)}
        >
          더보기
        </BoxItem>
      </Box>

      {openMore &&
        createPortal(
          <Overlay onClick={() => setOpenMore(false)}>
            <ModalWrapper onClick={(e) => e.stopPropagation()}>
              <CategoryList
                onClose={() => setOpenMore(false)}
                onSave={(value) => {
                  console.log("새 카테고리 저장:", value);
                  onCategoryChange(value);
                  setOpenMore(false);
                }}
              />
            </ModalWrapper>
          </Overlay>,
          document.body 
        )
      }
    </div>
  );
};
