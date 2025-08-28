import axios from "axios";

export const api = axios.create({
  baseURL: "http://eccteam1-env.eba-fpmvb3id.us-east-1.elasticbeanstalk.com",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = window.token;

  console.log("토큰 요청", config.method?.toUpperCase(), config.url, {
    hasToken: !!token,
    authHeader: token ? `Bearer ${String(token).slice(0, 10)}...` : null,
  });

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    config.headers.Authorization = "";
  }
  return config;
});

// 로그인 풀려있을 경우 로그인 페이지로 보내도록 설정
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;
    if (status === 401) {
      window.location.replace("/");
    }
    return Promise.reject(err);
  }
);
