import styled from "styled-components";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";

export default function MostViewedCard() {
  const [isMostView, setIsMostView] = useState([]);

  useEffect(() => {
    api
      .get("/profile/statistics")
      .then((res) => {
        let list = res.data?.mostViewedScraps ?? [];
        list = [...list].sort((a, b) => b.viewCount - a.viewCount); // 정렬
        setIsMostView(list);
        console.log("가장 많이 본 게시물 순위:", list);
      })
      .catch((err) => {
        console.log("오류: ", err.response?.data || err.message);
        setIsMostView([]);
      });
  }, []);

  return (
    <CardWrapper>
      <CardTitle>가장 자주 본 스크랩</CardTitle>
      <CardList>
        {isMostView.map((item, idx) => (
          <CardItem key={item.scrapId ?? idx}>
            <CardItemNumber>{idx + 1}.</CardItemNumber>
            <CardItemText>{item.title}</CardItemText>
          </CardItem>
        ))}
      </CardList>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  width: 30vw;
  // height: 544px;
  border: 1px solid #d7d7d7;
  border-radius: 30px;
  padding: 54px 62px; /* 제목과 리스트 여백 확보 */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.div`
  color: black;
  font-size: 32px;
  font-family: Pretendard;
  font-weight: 700;
  margin-bottom: 66px; /* 제목과 리스트 사이 간격 */
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
`;

const CardItem = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
`;

const CardItemNumber = styled.div`
  color: black;
  font-size: 32px;
  font-family: Pretendard;
  font-weight: 700;
  margin-right: 12px;
`;

const CardItemText = styled.div`
  color: black;
  font-size: 20px;
  font-family: Pretendard;
  font-weight: 400;
`;
