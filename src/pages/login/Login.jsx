import logo from "../../assets/logo.png";
import styled from "styled-components";
import "../../styles/TextStyle.css";
import google from "../../assets/google.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://eccteam1-env.eba-fpmvb3id.us-east-1.elasticbeanstalk.com",
  headers: { "Content-Type": "application/json" },
});

export const Login = () => {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const { data } = await api.post("/auth/login", { loginId, password });

      const token =
        data?.accessToken ||
        data?.access_token ||
        data?.token ||
        data?.data?.accessToken;

      if (!token) {
        console.warn("[로그인 응답] 토큰 키를 찾지 못함:", data);
        alert("로그인 응답에 토큰이 없습니다. 서버 응답 형식 확인 필요");
        return;
      }

      window.token = token;
      const nickname = data.nickname || "닉네임";
      window.user = { ...(window.user || {}), nickname };
      window.sessionStorage.setItem("accesstoken", data.accessToken);
      window.sessionStorage.setItem("nickname", nickname);
      window.sessionStorage.setItem("userId", data.userId);
      navigate("/loginok");
    } catch (err) {
      const status = err.response?.status;
      console.error("[로그인 실패]", status, err.response?.data || err.message);
      if (status === 401) {
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      } else {
        alert("로그인 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <Container>
      <HomeLogo src={logo} alt="linkrap image" />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoginBox>
          <div
            className="heading2"
            style={{
              textAlign: "center",
              letterSpacing: 2,
              lineHeight: "150%",
            }}
          >
            집게로 꼭 쥐고 있던 링크,
            <br />
            이제 다시 꺼내볼까요?
          </div>
          <InfoWrapper className="body2">
            <div style={{ paddingLeft: 10 }}>아이디</div>
            <TextBox
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
            />
          </InfoWrapper>
          <InfoWrapper className="body2">
            <div style={{ paddingLeft: 10 }}>비밀번호</div>
            <TextBox
              type="password"
              style={{ fontSize: 30 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
            />
          </InfoWrapper>
          <LoginButton className="heading4" onClick={handleLogin}>
            로그인
          </LoginButton>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Line />
            <div>OR</div>
            <Line />
          </div>
          <GoogleButton className="body2">
            <img
              src={google}
              alt="google signin"
              style={{ width: 45, height: 45 }}
            />
            Sign in with Google
          </GoogleButton>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              letterSpacing: 2,
              gap: 10,
              fontSize: 20,
            }}
          >
            Don't have an account?
            <JoinButton onClick={() => navigate("/signup")}>
              Join now
            </JoinButton>
          </div>
        </LoginBox>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 100px;
  padding-top: 50px;
`;
const HomeLogo = styled.img`
  width: 500px;
  height: 500px;
`;

// 주황색 박스
const LoginBox = styled.div`
  border-radius: 100px;
  width: 700px;
  height: 800px;
  background-color: rgba(255, 160, 122, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 35px;
`;

// 아이디, 비밀번호 받는 텍스트 박스
const TextBox = styled.input`
  width: 515px;
  height: 50px;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  border-width: 0;
  font-size: 20px;
  padding-left: 15px;
  outline: none;
`;

// 텍스트 + 텍스트박스
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const LoginButton = styled.button`
  border-radius: 30px;
  background-color: #ffbda2;
  padding: 10px;
  width: 150;
  display: flex;
  justify-content: center;
  color: #ffffff;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  width: 154px;
  border-width: 0;
  cursor: pointer;
`;

const Line = styled.div`
  background-color: #000000;
  width: 130px;
  height: 0;
  border-top: 1px solid #000000;
`;

// 구글 로그인 버튼
const GoogleButton = styled.button`
  border-radius: 5px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 350px;
  gap: 23px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  border-width: 0;
  cursor: pointer;
`;

const JoinButton = styled.button`
  all: unset;
  color: #ff6148;
  cursor: pointer;
  border-bottom: 2px solid #ff6148;
`;
