import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import Header from "../components/Header";
import Button from "../components/Button";
import { DiaryDispatchContext } from "../App";
import Editor from "../components/Editor";
import { setPageTitle } from "../util";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const data = useDiary(id);

  const { onUpdate, onDelete } = useContext(DiaryDispatchContext);

  const onClickDelete = () => {
    if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")) {
      onDelete(id);
      navigate("/", { replace: true });
    }
  };

  const onSubmit = (data) => {
    if (window.confirm("일기를 정말 수정할까요?")) {
      const { date, content, emotionId } = data;
      onUpdate(id, date, content, emotionId);
      navigate("/", { replace: true });
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setPageTitle(`${id}번 일기 수정하기`);
  });

  if (!data) {
    return <div>일기를 불러오고 있습니다...</div>;
  } else {
    return (
      <div>
        <Header
          title={"일기 수정하기"}
          leftChild={<Button text={"< 뒤로 가기"} onClick={goBack} />}
          rightChild={
            <Button
              type={"negative"}
              text={"삭제하기"}
              onClick={onClickDelete}
            />
          }
        />
        <Editor initData={data} onSubmit={onSubmit} />
      </div>
    );
  }
};

export default Edit;
