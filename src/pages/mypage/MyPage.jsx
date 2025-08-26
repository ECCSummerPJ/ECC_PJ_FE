import styled from "styled-components";
import ProfileCard from "./ProfileCard";
import MostScrapCard from "./MostScrapCard";
import MostViewedCard from "./MostViewedCard";

export function MyPage() {
  return (
    <PageWrapper>
      <ProfileCard />
      <CardSection>
        <div style={{ display: "flex", gap: 50, alignItems: "flex-start" }}>
          <MostViewedCard />
          <MostScrapCard />
        </div>
      </CardSection>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  // height: 100%;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 75px;
`;

const CardSection = styled.div`
  width: 1232px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
`;
