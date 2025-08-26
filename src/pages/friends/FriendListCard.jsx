import styled from "styled-components";
import { useState, useEffect } from "react";
import { getFriends } from "../../api/friends";
import FriendCard from "./FriendCard"; 

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  max-height: 500px;

  background: #FFE3D7;
  border-radius: 30px;
  padding: 20px;
  gap: 20px;

  display: grid;
  grid-template-columns: repeat(3, 1fr);

  justify-items: center;
  align-items: center;

  overflow-y: auto;
  overflow-x: hidden;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  /* 1024px 이하 2개, 600px 이하 1개 */
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;


export default function FriendListCard() {
  const [friends, setFriends] = useState([]);
  
  useEffect(() => {
    const loadFriends = async () => {
      try {
        const data = await getFriends();
        console.log("친구 목록 응답:", data);
    
        setFriends(Array.isArray(data) ? data : []); 
      } catch (err) {
        console.error("친구 목록 불러오기 실패:", err);
      }
    };
    loadFriends();
  }, []);

  return (
    <Container>
      {friends.map((friends) => (
        <FriendCard key={friends.friendshipId} friend={friends} />
      ))}
    </Container>
  );
}

