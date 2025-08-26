import styled from "styled-components";
import { Link } from "react-router-dom";
import profile from "../../assets/profile.jpg";
import { api } from "../../lib/api";
import { useState, useEffect } from "react";

export default function ProfileCard() {
  const [isProfile, setIsProfile] = useState({});

  useEffect(() => {
    api
      .get(`/profile`)
      .then((res) => {
        setIsProfile(res.data);
        console.log("마이페이지 조회:", res.data);
      })
      .catch((err) => {
        console.log("조회 실패: ", err.response?.data || err.message);
      });
  }, []);

  return (
    <ProfileWrapper>
      <ProfileInfoGroup>
        {/* <ProfileImageBg /> */}
        <ProfileImage src={profile} alt="프로필" />
        <ProfileTextGroup>
          <EmailText>{isProfile.email || ""}</EmailText>
          <IdText>{isProfile.nickname || ""}</IdText>
        </ProfileTextGroup>
      </ProfileInfoGroup>
      <Link to={`/mypage/edit`} style={{ textDecoration: `none` }}>
        <ProfileButton>프로필/회원정보 수정</ProfileButton>
      </Link>
    </ProfileWrapper>
  );
}

const ProfileWrapper = styled.div`
  width: 1232px;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
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

const ProfileButton = styled.div`
  width: 180px;
  height: 40px;
  padding: 15px 45px;
  background: #ffe3d7;
  border-radius: 50px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  display: flex;
  justify-content: center;
  align-items: center;

  color: #ff6148;
  font-size: 20px;
  font-family: Pretendard;
  font-weight: 500;
`;
