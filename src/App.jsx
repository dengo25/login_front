import "./App.css";
import Todo from "./Todo";
import React, { useState, useEffect } from "react";
import {
    Container,
    List,
    Paper,
    Grid,
    Button,
    AppBar,
    Toolbar,
    Typography,
} from "@mui/material";
import AddTodo from "./AddTodo";
import { call, signout } from "./service/ApiService";

function App() {
    const [items, setItems] = useState([]); //할 일 목록 상태
    const [loading, setLoading] = useState(true); //로딩 상태

    // 컴포넌트 마운트 시 할 일 목록 불러오기
    useEffect(() => {
        call("/todo", "GET", null)
            .then((response) => {
                setItems(response.data); //받은 데이터를 상태로 설정
            })
            .catch((error) => {
                console.error("Error fetching todo items:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []); //빈 배열로 인해 한 번만 실행

    // 새 항목 추가
    const addItem = (item) => {
        call("/todo", "POST", item).then((response) => setItems(response.data)); //서버에 post 후 목록 업데이트
    };

    const editItem = (item) => {
        call("/todo", "PUT", item).then((response) => setItems(response.data));
    };

    const deleteItem = (item) => {
        call("/todo", "DELETE", item).then((response) => setItems(response.data));
    };

    //할 일 목록이 있을 경우 화면에 표시할 컴포넌트 구성
    let todoItems = items.length > 0 && (
        <Paper style={{ margin: 16 }}>
            <List>
                {items.map((item) => (
                    <Todo
                        item={item} //todo 항목 전달
                        key={item.id} //고유 키
                        editItem={editItem} //수정 함수 전달
                        deleteItem={deleteItem} //삭제 함수 전달
                    />
                ))}
            </List>
        </Paper>
    );

    let navigationBar = (
        <AppBar position="static">
            <Toolbar>
                <Grid justifyContent="space-between" container>
                    <Grid item>
                        <Typography variant="h6">오늘의 할일</Typography>
                    </Grid>
                    <Grid item>
                        <Button color="inherit" raised onClick={signout}>
                            로그아웃
                        </Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );

    let todoListPage = (
        <div>
            {navigationBar}
            <Container maxWidth="md">
                <AddTodo addItem={addItem} />
                <div className="TodoList">{todoItems}</div>
            </Container>
        </div>
    );

    let loadingPage = <h1> 로딩중.. </h1>;
    let content = loadingPage;

    if (!loading) {
        content = todoListPage;
    }

    return <div className="App">{content}</div>;
}

export default App;
