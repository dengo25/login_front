import React, { useState } from "react";

import { Button, Grid, TextField } from "@mui/material";

const AddTodo = (props) => {
  const [item, setItem] = useState({ title: "" });
  const addItem = props.addItem; //부모로부터 전달받은 addItem 함수

  //버튼 클릭 시 실행되는 함수
  const onButtonClick = () => {
    addItem(item); //입력된 할 일 항목 부모에 전달
    setItem({ title: "" }); //입력 필드 초기화
  };

  //입렫 필드 변경 시 상태 업데이트
  const onInputChange = (e) => {
    setItem({ title: e.target.value });//입력 값으로 상태 변경
    console.log(item); //현재 상태 콘솔에 출력
  };

  //엔터 키 입력 시 버튼 클릭 함수 실행
  const enterKeyEventHandler = (e) => {
    if (e.key === "Enter") {
      onButtonClick(); //엔터키로 항목 추가
    }
  };

  return (
    <Grid container style={{ marginTop: 20 }}>
      <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
        <TextField
          placeholder="Add Todo here"
          fullWidth
          onChange={onInputChange} //입력 변경 이벤트 핸들러
          onKeyPress={enterKeyEventHandler} //엔터 키 입력 핸들러
          value={item.title}
        />
      </Grid>
      <Grid xs={1} md={1} item>
        <Button
          fullWidth
          style={{ height: "100%" }}
          color="secondary"
          variant="outlined"
          onClick={onButtonClick}
        >
          +
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddTodo;
