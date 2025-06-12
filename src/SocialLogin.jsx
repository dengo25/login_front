import React from "react";
import { Navigate } from "react-router-dom";

//소셜 로그인 이후에 백엔드에서 전달해준 토큰을 저장하고 적절한 페이지로 이동시키는 역할
//백엔드는 로그인 성공여부와 함꼐 토큰을 url에 담아서 프론트엔드로 리디렉션

//소셜 로그인 성공 후 리다이렉션 처리
const SocialLogin = (props) => {
    //쿼리 파라미터에서 특정 값을 추출
  const getUrlParameter = (name) => {
    let search = window.location.search; //현재 url의 쿼리스트링
    let params = new URLSearchParams(search); //URLSearchParams로 파싱
    return params.get(name); //주어진 name의 파라미터 값을 반환
  };

  const token = getUrlParameter("token"); //쿼리 파라미터에서 토큰 값 추출

  console.log("토큰 파싱: " + token);

  if (token) {
    console.log("로컬스토리지에 토큰 저장" + token);
    localStorage.setItem("ACCESS_TOKEN", token); //토큰을 로컬 스토리지에 저장

    // 홈 페이지로 리다이렋견, 이전 위치(state)와 함께 전달
    return (
      <Navigate
        to={{
          pathname: "/",
          state: { from: props.location },
        }}
      />
    );
  } else {

      //토큰이 없을 경우 로그인 페이지로 리다이렉션
    return (
      <Navigate
        to={{
          pathname: "/login",
          state: { from: props.location },
        }}
      />
    );
  }
};

export default SocialLogin;
