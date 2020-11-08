import React from "react";
import { Button, Col, Container, Row } from "reactstrap";
import Header from "../components/Header";

export default function Upload() {
  const onClickUpload = () => {
    let inputEle = document.createElement("input");
    inputEle.type = "file";
    inputEle.addEventListener(
      "change",
      async (e) => {
        const file = inputEle.files[0];

        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (e) => {
          const completed = Math.floor((e.loaded / e.total) * 100);
          console.log(completed);
        };

        xhr.onloadend = () => {
          if (xhr.status === 200) {
            console.log("successful");
          } else {
            console.log("problem");
          }
        };

        xhr.onerror = (e) => {
          console.log(e);
        };

        xhr.open("POST", `/api/music/${file.name}`);
        xhr.send(file);
      },
      { once: true },
    );

    inputEle.click();
  };

  return (
    <Container>
      <Row className="mb-3 text-center">
        <Col>
          <Header />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button color="primary" onClick={onClickUpload}>
            Select File
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
