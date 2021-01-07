import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import fetch from "unfetch";

import Header from "@/components/Header";
import NavigationBar from "@/components/NavigationBar";
import Page from "@/components/Page";

import homeStyles from "@/styles/Home.module.css";

import { url } from "@/utils/url";

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
                    <ListGroupItem
                        tag="button"
                        action
                        key={_id}
                        onClick={() => onClickListItem(_id)}
                        active={activeBtn === _id}
                    >
                        {filename}
                    </ListGroupItem>
                ))}
            </ListGroup>
        );
    } else {
        return <h2>No Songs Available</h2>;
    }
}

function Home() {
    const [response, updateResult] = useState({ load: true, list: [], error: false });
    const [activeBtn, setActiveBtn] = useState("0");
    const router = useRouter();

    useEffect(() => {
        let isMounted = true;

        fetch(url, {
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.ok) {
                    isMounted && updateResult({ load: false, list: res.response, error: false });
                } else {
                    isMounted && updateResult({ load: false, list: response.list, error: false });
                }
            })
            .catch(() => {
                isMounted && updateResult({ load: false, list: [], error: true });
            });

        return () => {
            isMounted = false;
        };
    }, []);

    const onClickListItem = (id: string) => {
        setActiveBtn(id);
        router.push(`/${id}`);
    };

    return (
        <Page>
            <NavigationBar />
            <Container>
                <Row className="mb-3 text-center">
                    <Col>
                        <Header />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className={homeStyles.listContainer}>
                            {response.load ? (
                                <h1>Wait Loading List</h1>
                            ) : (
                                <PlayList
                                    list={response.list}
                                    onClickListItem={onClickListItem}
                                    activeBtn={activeBtn}
                                />
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </Page>
    );
}

export default Home;
