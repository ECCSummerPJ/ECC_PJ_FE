import { useState, useEffect } from "react";
import { getScrapsReminder } from "../api/scraps";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 40px 20px;
  background: rgba(255, 160, 122, 0.6);
  border-radius: 30px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  width: fit-content;
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
  gap: 15px;
`;

const Title = styled.div`
  font-size: 36px;
  font-weight: 700;
  font-family: Pretendard, sans-serif;
  color: black;
`;

const Subtitle = styled.div`
  font-size: 24px;
  font-weight: 400;
  font-family: Pretendard, sans-serif;
  color: black;
  line-height: 1.2;
`;

const ListWrapper = styled.div`
  background: rgba(255, 245, 242, 0.7);
  border-radius: 30px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const ListItem = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ItemTitle = styled.div`
  font-size: 20px;
  font-weight: 400;
  font-family: Pretendard, sans-serif;
  color: black;
  line-height: 30px;
`;

const ItemSubtitle = styled.div`
  font-size: 18px;
  font-weight: 400;
  font-family: Pretendard, sans-serif;
  color: #767676;
  line-height: 30px;
`;

export default function LinkMind() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadScrapsReminder = async () => {
      try {
        const data = await getScrapsReminder();
        console.log("링마인드 목록:", data);
        setReminders(data);
      } catch (err) {
        console.error("링마인드 불러오기 실패:", err);
      }
    };
    loadScrapsReminder();
  }, []);

  return (
    <Container>
      <TitleGroup>
        <Title>링마인드</Title>
        <Subtitle>
          놓친 링크,
          <br />
          다시 찝어드려요!
        </Subtitle>
      </TitleGroup>

      <ListWrapper>
        {reminders.length === 0 ? (
          <div>리마인드가 없어요!</div>
        ) : (
          reminders.map((item, i) => (
            <ListItem key={i}>
              <ItemTitle>{item.scrapTitle}</ItemTitle>
              <ItemSubtitle>{item.scrapMemo}</ItemSubtitle>
            </ListItem>
          ))
        )}
      </ListWrapper>
    </Container>
  );
}
