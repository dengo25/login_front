import React from "react";
import { Container, Grid, Typography, TextField, Button } from "@mui/material";
import { signup } from "./service/ApiService";
import { Link } from "react-router-dom";

function SignUp() {

    //폼 제출 핸들러 정의
    const handleSubmit = (event) => {
        event.preventDefault(); //기본 폼 제출 동작(페이지 새로고침) 방지

        const data = new FormData(event.target); //폼 데이터 객체 생성
        const username = data.get("username"); // 입력된 사용자명 가져오기
        const password = data.get("password"); // 입력된 비밀번호 가져오기

        //signup API 호출 후 로그인 페이지로 이동
        signup({ username: username, password: password }).then((response) => {
            console.log(response);
            window.location.href = "/login"; //회원가입 성공 후 로그인 페이지로 리다이렉트
        });
    };

    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
            <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h5">
                            계정 생성
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="fname"
                            name="username"
                            variant="outlined"
                            required
                            fullWidth
                            id="username"
                            label="아이디"
                            autoFocus //페이지 진입 시 자동 포커싱
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="패스워드"
                            type="password" //입력값 숨김 처리
                            id="password"
                            autoComplete="current-password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            계정 생성
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Link to="/login" variant="body2">
                            이미 계정이 있습니까? 로그인 하세요.
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default SignUp;
