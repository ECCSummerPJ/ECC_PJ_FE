import styled from 'styled-components';
import { Link } from "react-router-dom";
import profile from "../../assets/profile.jpg";
import CardFollowButton from "./CardFollowButton"; 

const CardWrapper = styled.div`
  width: 320px;
  height: 120px;
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 32px;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 1;
`;

const ProfileImage = styled.img`
  width: 55px;
  height: 55px;
  border-radius: 50%;
`;

const Username = styled(Link)`
  width: 139px;
  text-align: center;
  color: black;
  font-size: 20px;
  font-family: 'Pretendard';
  font-weight: 600;

  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default function FriendCard({ friend }) { 
  return (
    <CardWrapper>
      <ProfileContainer>
        <ProfileImage src={profile} alt="친구 프로필" /> 
        <Username 
          to={`/friends/${friend.friendUserId}`} 
          state={{ 
            nickname: friend.friendNickname, 
            friendUserId: friend.friendUserId,
            initialFriendshipId: friend.friendshipId
          }}
        >
          {friend.friendNickname}
        </Username>
      </ProfileContainer>
      <CardFollowButton 
        friendUserId={friend.friendUserId}
        initialFriendshipId={friend.friendshipId}
      />
    </CardWrapper>
  );
}