import { api } from "../lib/api"; 

export const getFriends = async () => {
  const res = await api.get("/friends");
  return res.data;
};

export const addFriend = async (friendUserId) => {
  const { data } = await api.post("/friends", { friendUserId });
  // { friendshipId, friendUserId, friendNickname }
  return data;
};

export const removeFriendById = async (friendshipId) => {
  const { data } = await api.delete(`/friends/${friendshipId}`);
  return data;
};

export const findFriendshipByFriendId = async (friendUserId) => {
  const list = await getFriends();
  return list.find((f) => Number(f.friendUserId) === Number(friendUserId)) || null;
};

// export const getFriendScraps = async ( friendUserId ) => {
//   const res = await api.get(`/friend/${friendUserId}/scraps`);
//   return res.data;
// };

export const getFriendScraps = async (friendUserId) => {
  try {
    const res = await api.get(`/friend/${friendUserId}/scraps`);
    return res.data;
  } catch (err) {
    console.error("❌ API 호출 실패", err.response?.status, err.response?.data);
  }
};
