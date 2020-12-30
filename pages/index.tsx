import React, { SyntheticEvent, useEffect, useState } from "react";
import { Button, Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { useRouter } from "next/router";
import fetch from "unfetch";

import homeStyles from "../styles/Home.module.css";
import Header from "../components/Header";

interface Song {
  filename: string;
  length: number;
  _id: string;
  chunkSize?: string;
  uploadDate: Date;
}

interface PlayListProps {
  list: Song[];
  onClickListItem: (id: string) => void;
  activeBtn: string;
}

function PlayList({ list, onClickListItem, activeBtn }: PlayListProps) {
  if (list.length) {
    return (
      <ListGroup>
        {list.map(({ _id, filename }) => (
          <ListGroupItem tag="button" action key={_id} onClick={() => onClickListItem(_id)} active={activeBtn === _id}>
            {filename}
          </ListGroupItem>
        ))}
      </ListGroup>
    );
  } else {
    return <h2>No Songs Available</h2>;
  }
}

export default function Root() {
  const [response, updateResult] = useState({ load: true, list: [], error: false });
  const [activeBtn, setActiveBtn] = useState("0");
  const router = useRouter();

  useEffect(() => {
    fetch(`https://mstream-node.herokuapp.com/`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.ok) {
          updateResult({ load: false, list: res.response, error: false });
        } else {
          updateResult({ load: false, list: response.list, error: false });
        }
      })
      .catch(() => {
        updateResult({ load: false, list: [], error: true });
      });
  }, []);

  const onClickListItem = (id: string) => {
    setActiveBtn(id);
    router.push(`/${id}`);
  };

  const onClickUploadBtn = (event: SyntheticEvent) => {
    event.preventDefault();
    router.push("/upload");
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
          <Button color="primary" onClick={onClickUploadBtn}>
            Upload
          </Button>
          <div className={homeStyles.listContainer}>
            {response.load ? (
              <h1>Wait Loading List</h1>
            ) : (
              <PlayList list={response.list} onClickListItem={onClickListItem} activeBtn={activeBtn} />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
