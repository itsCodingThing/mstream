import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { gql, useQuery, NetworkStatus } from "@apollo/client";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import styled from "styled-components";
import { BsArrowRepeat } from "react-icons/bs";

import NavigationBar from "@/components/NavigationBar";
import Page from "@/components/Page";

import { IAudioResponse } from "@/utils/interfaces";

const CustomListGroup = styled(ListGroup)`
    overflow-y: auto;
    height: 75vh;
    border-radius: 0;
`;

const ListRefreshIcon = styled(BsArrowRepeat)`
    height: 2rem;
    width: 2rem;
`;

const ListHeaderTitle = styled.span`
    font-size: 1.5rem;
`;

const ListHeader = styled(ListGroup)`
    background-color: skyblue;
    border-radius: 0;
    padding: 0 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const ListContainer = styled.div`
    height: 60%;
    margin-top: 2rem;
    border-radius: 0;
`;

function PlayList() {
    // Query for fetching audio list
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
    const { loading, data, error, refetch, networkStatus } = useQuery<IAudioResponse>(LIST_OF_SONGS, {
        notifyOnNetworkStatusChange: true,
    });

    const onClickRefresh = () => {
        refetch();
    };

    const onClickListItem = (id: string) => {
        setActiveBtn(id);
        router.push(`/${id}`);
    };

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

    if (data?.songsList.length) {
        return (
            <>
                <ListHeader>
                    <ListHeaderTitle>Playlist</ListHeaderTitle>
                    <ListRefreshIcon onClick={onClickRefresh} />
                </ListHeader>
                <CustomListGroup>
                    {networkStatus !== NetworkStatus.refetch &&
                        data.songsList.map(({ id, title, audioBlobID }) => (
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
            </>
        );
    } else {
        return <h2>No Songs Available</h2>;
    }
}

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
