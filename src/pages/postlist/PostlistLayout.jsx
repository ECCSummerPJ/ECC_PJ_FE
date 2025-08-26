import styled from "styled-components";
import PostCategory from "../../components/PostCategory";
import SortBar from "../../components/SortBar";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getScraps, getCategoryScraps } from "../../api/scraps";

const FrameWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 10px;
  border: 1px solid #909090;
`;

const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Item = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 15px 35px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Title = styled.div`
  color: black;
  font-size: 22px;
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  margin-bottom: 5px;
`;

const Description = styled.div`
  color: #767676;
  font-size: 18px;
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
`;

const Divider = styled.div`
  width: 100%;
  height: 0;
  border-bottom: 1px solid #909090;
  margin-top: 15px;
  margin-bottom: 0px;
`;

const ContentItem = ({ title, description, onClick }) => (
  <Item onClick={onClick} style={{ cursor: "pointer" }}>
    <TextWrapper>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </TextWrapper>
  </Item>
);

export default function PostlistLayout() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const [scraps, setScraps] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    const loadScraps = async () => {
      try {
        let data;
        console.log(selectedCategory);
        if (selectedCategory) {
          data = await getCategoryScraps(selectedCategory, {
            favorite: activeTab === "favorites" ? true : undefined,
          });
        } else {
          data = await getScraps({
            favorite: activeTab === "favorites" ? true : undefined,
          });
        }
        console.log("스크랩 응답:", data);

        setScraps(Array.isArray(data) ? data : []);
        setTotalPages(Math.ceil((data?.length || 0) / pageSize));
        setCurrentPage(1);
      } catch (err) {
        console.error("스크랩 목록 불러오기 실패:", err);
      }
    };
    loadScraps();
  }, [selectedCategory, activeTab]);

  const filteredScraps = scraps.filter((scrap) => {
    if (activeTab === "favorites" && !scrap.favorite) return false;
    return true;
  });

  const pagedScraps = filteredScraps.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    // 중앙정렬
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <HeaderWrapper>
          <PostCategory activeTab={activeTab} onTabClick={setActiveTab} />
          <SortBar
            selectedCategory={selectedCategory}
            onCategoryChange={(categoryId) => {
              setSelectedCategory((prev) => (prev === categoryId ? null : categoryId));
            }}
          />
        </HeaderWrapper>
        <FrameWrapper>
          <InnerWrapper>
            {pagedScraps.length > 0 ? (
              pagedScraps.map((item, index) => (
                <div key={item.scrapId} style={{ width: "100%" }}>
                  <ContentItem
                    title={item.scrapTitle}
                    description={item.scrapMemo}
                    onClick={() => navigate(`/post/${item.scrapId}`)}
                  />
                  {index !== pagedScraps.length - 1 && <Divider />}
                </div>
              ))
            ) : (
              <div style={{ color: "#767676", fontSize: "16px" }}>
                스크랩이 없습니다.
              </div>
            )}
          </InnerWrapper>
        </FrameWrapper>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
