import { useEffect, useState } from "react";
import styled from "styled-components";

interface IPlayerProps {
    url: string;
}

const PlayerContainer = styled.div`
    padding: 0;
    width: 100%;
    display: flex;
    justify-content: center;
`;

function Player(props: IPlayerProps) {
    const { url } = props;

    return (
        <PlayerContainer>
            <audio controls preload="metadata" autoPlay>
                <source src={url} type="audio/mp3" />
            </audio>
        </PlayerContainer>
    );
}

export default Player;
