// FollowButton.jsx
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { addFriend, removeFriendById } from "../api/friends";

const FollowButtonStyle = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isFollowing"
})`
  width: 120px;
  height: 50px;
  background: ${({ isFollowing }) =>
    isFollowing ? "rgba(255, 160, 122, 0.7)" : "#F5F5F5"};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  border: none;
  cursor: pointer;
  font-size: 18px;
  font-family: 'Pretendard';
  font-weight: 500;
  color: black;
`;

const FollowButton = ({ friendUserId, initialFriendshipId }) => {
  const [isFollowing, setIsFollowing] = useState(true); // 초기 모두 팔로잉
  const [friendshipId, setFriendshipId] = useState(initialFriendshipId ?? null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsFollowing(!!initialFriendshipId);
    setFriendshipId(initialFriendshipId ?? null);
  }, [initialFriendshipId]);

  const toggleFollow = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (isFollowing) {
        // 언팔로우
        if (!friendshipId) throw new Error("친구 관계 ID가 없습니다.");
        await removeFriendById(friendshipId);
        setIsFollowing(false);
        setFriendshipId(null);
      } else {
        // 팔로우
        const res = await addFriend(friendUserId);
        setFriendshipId(res.friendshipId);
        setIsFollowing(true);
      }
    } catch (err) {
      console.error("팔로우/언팔 오류:", err);
      alert(err?.response?.data?.message || err.message || "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FollowButtonStyle isFollowing={isFollowing} onClick={toggleFollow}>
      {isFollowing ? "팔로잉" : "팔로우"}
    </FollowButtonStyle>
  );
};

export default FollowButton;
