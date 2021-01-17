import { useState } from "react";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";

import NavigationBar from "@/components/NavigationBar";
import Page from "@/components/Page";

import styled from "styled-components";
import { IAudioResponse } from "@/utils/interfaces";

const CustomListGroup = styled(ListGroup)`
    overflow-y: auto;
    height: 75vh;
`;

function PlayList() {
    const LIST_OF_SONGS = gql`
        query {
            songsList {
                title
                id
                audioBlobID
            }
        }
    `;
    const [activeBtn, setActiveBtn] = useState("");
    const router = useRouter();
    const onClickListItem = (id: string) => {
        setActiveBtn(id);
        router.push(`/${id}`);
    };

    const { loading, data, error } = useQuery<IAudioResponse>(LIST_OF_SONGS);

    const padString = (value: string) => {
        const len = 35;
        if (value.length > len) {
            const newValue = value.slice(0, len);
            return newValue.concat("...");
        } else {
            return value;
        }
    };

    if (loading) {
        return <h2>Wait Loading List</h2>;
    }

    if (error) {
        return <h2>Some Error Loading Please Refresh</h2>;
    }

    if (data && data.songsList.length) {
        return (
            <CustomListGroup>
                {data.songsList.map(({ id, title, audioBlobID }) => (
                    <ListGroupItem
                        tag="button"
                        action
                        key={id}
                        onClick={() => onClickListItem(audioBlobID)}
                        active={activeBtn === id}
                    >
                        {padString(title)}
                    </ListGroupItem>
                ))}
            </CustomListGroup>
        );
    } else {
        return <h2>No Songs Available</h2>;
    }
}

const ListContainer = styled.div`
    height: 60%;
    margin-top: 2rem;
`;

function Home() {
    return (
        <Page>
            <NavigationBar />
            <Container>
                <Row>
                    <Col>
                        <ListContainer>
                            <PlayList />
                        </ListContainer>
                    </Col>
                </Row>
            </Container>
        </Page>
    );
}

export default Home;
