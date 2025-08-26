// FriendInfo.jsx
import styled from "styled-components";
import FriendInfoCard from "./FriendInfoCard";
import FriendPostListLayout from "./FriendPostListLayout";
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFriendScraps } from "../../api/friends";

const FriendContentWrapper = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  
  display: flex;
  flex-direction: column;
  gap: 50px;

  justify-items: center;
  align-items: center;
  justify-content: flex-start;
`;

export default function FriendInfo() {
  const location = useLocation();
  const { nickname, friendUserId, initialFriendshipId } = location.state || {};

  // 문제가 되는 코드
  const id = useParams();
  const [friendPosts, setFriendPosts] = useState([]);

  // useEffect(() => {
  //   const loadFriendPosts = async () => {
  //     try {
  //       const data = await getFriendScraps(id); 
  //       console.log("친구 스크랩 목록:", data);
  //       setFriendPosts(data);
  //     } catch (err) {
  //       console.error("친구 스크랩 불러오기 실패:", err);
  //     }
  //   };
  //   loadFriendPosts();
  // }, [id]);

  return (
    <FriendContentWrapper>
      <FriendInfoCard
        userId={nickname}
        friendUserId={friendUserId}
        initialFriendshipId={initialFriendshipId}
      />
      <FriendPostListLayout posts={friendPosts} />
    </FriendContentWrapper>
  );
}

