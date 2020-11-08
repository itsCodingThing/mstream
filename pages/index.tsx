import React, { useState } from "react";
import { Button, Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";

import homeStyles from "../styles/Home.module.css";
import { connectToDb } from "../database/db";

export const getStaticProps: GetStaticProps = async () => {
  const { gfs } = await connectToDb();
  const docs = await gfs.find().toArray();

  return {
    props: {
      data: JSON.parse(JSON.stringify(docs)),
    },
  };
};

export default function Root({ data }) {
  const [btnId, setBtnId] = useState("0");
  const router = useRouter();

  const onClickListItem = (id: string) => {
    setBtnId(id);
    router.push(`/${id}`);
  };

  const onClickUploadBtn = (e) => {
    e.preventDefault();
    router.push("/upload");
  };

  return (
    <Container>
      <Row className="mb-3 text-center">
        <Col>
          <span className={`${homeStyles.header} display-4`}>mstream</span>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button color="primary" onClick={onClickUploadBtn}>
            Upload
          </Button>
          <div className={homeStyles.listContainer}>
            {data.length ? (
              <ListGroup>
                {data.map(({ _id, filename }) => (
                  <ListGroupItem
                    tag="button"
                    action
                    key={_id}
                    onClick={() => onClickListItem(_id)}
                    active={btnId === _id}
                  >
                    {filename}
                  </ListGroupItem>
                ))}
              </ListGroup>
            ) : (
              <h1>upload new songs</h1>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
