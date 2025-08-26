// FriendInfoCard.jsx
import styled from "styled-components";
import profileImage from "../../assets/profile.jpg";
import FollowButton from "../../components/FollowButton";
import { useLocation } from "react-router-dom";

/* ===== 프로필 카드 ===== */
const ProfileWrapper = styled.div`
  width: 1232px;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
`;

const ProfileInfoGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 360px;
`;

const ProfileTextGroup = styled.div`
  width: 455px;
  display: inline-flex;
  flex-direction: column;
`;

const EmailText = styled.div`
  height: 32px;
  color: black;
  font-size: 24px;
  font-family: Pretendard;
  font-weight: 400;
`;

const IdText = styled.div`
  height: 43px;
  color: black;
  font-size: 40px;
  font-family: Pretendard;
  font-weight: 700;
`;

export default function FriendInfoCard() {
  const location = useLocation();
  const { nickname, friendUserId, initialFriendshipId } = location.state || {};
  
  return (
    
    <ProfileWrapper>
      <ProfileInfoGroup>
        <ProfileImage src={profileImage} alt="프로필" />
        <ProfileTextGroup>
          <IdText>{nickname}</IdText>
        </ProfileTextGroup>
      </ProfileInfoGroup>
      <FollowButton 
        friendUserId={friendUserId} 
        initialFriendshipId={initialFriendshipId}  
      />
    </ProfileWrapper>
  );
}

