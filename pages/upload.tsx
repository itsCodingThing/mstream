import { useState } from "react";
import styled from "styled-components";
import { BsCloudUpload } from "react-icons/bs";
import {
    Button,
    Card,
    CardBody,
    CardText,
    CardTitle,
    Col,
    Container,
    Modal,
    ModalBody,
    ModalFooter,
    Row,
    Spinner,
} from "reactstrap";

import NavigationBar from "@/components/NavigationBar";
import Page from "@/components/Page";

import { url } from "@/utils/url";

interface FileDetails {
    name: string;
    size: number;
}

interface FileSelectorState {
    isFileSelected: boolean;
    fileDetails?: FileDetails;
    blob?: Blob;
}

const UploadIconContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: white;
`;

const UploadText = styled.span`
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
`;

const UploadIcon = styled(BsCloudUpload)`
    height: 5rem;
    width: 5rem;
`;

const UploadSpinner = styled(Spinner)`
    height: 4rem;
    width: 4rem;
`;

const UploadBox = styled.div`
    padding: 1rem;
    background-color: white;
`;

function Upload() {
    const fileSelectorInitialState: FileSelectorState = {
        isFileSelected: false,
    };

    const [fileSelectorState, setFileSelectorState] = useState(fileSelectorInitialState);
    const [modal, setModalState] = useState({ isOpen: false });
    const [persentage, setPersentage] = useState(0);

    async function openFile(): Promise<File> {
        return new Promise((resolve) => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "audio/mp3";
            input.addEventListener(
                "change",
                () => {
                    if (input.files != null) {
                        resolve(input.files[0]);
                    }
                },
                true
            );
            input.click();
        });
    }

    const onClickSelect = async () => {
        try {
            const file = await openFile();
            setFileSelectorState({
                isFileSelected: true,
                fileDetails: { name: file.name, size: Number((file.size / (1024 * 1024)).toFixed(2)) },
                blob: file,
            });
        } catch (error) {
            setFileSelectorState(fileSelectorInitialState);
        }
    };

    const onClickUpload = async () => {
        const xhr = new XMLHttpRequest();

        xhr.onloadend = () => {
            if (xhr.status === 200) {
                console.log("successful");
                setModalState({ isOpen: false });
                setFileSelectorState(fileSelectorInitialState);
            } else {
                console.log("problem");
            }
        };

        xhr.onerror = (e) => {
            console.log(e);
        };

        xhr.upload.onprogress = (e) => {
            const completed = Math.floor((e.loaded / e.total) * 100);
            setPersentage(completed);
        };

        // @ts-ignore
        xhr.open("POST", `${url}/upload/${fileSelectorState.fileDetails.name}`);
        xhr.send(fileSelectorState.blob);
        setModalState({ isOpen: true });
    };

    const onClickCancel = () => {
        setFileSelectorState(fileSelectorInitialState);
    };

    return (
        <Page>
            <NavigationBar />
            <Container>
                <Row className="my-3 text-center">
                    <Col>
                        {fileSelectorState.isFileSelected && fileSelectorState.fileDetails ? (
                            <Card>
                                <CardBody>
                                    <CardTitle>{fileSelectorState.fileDetails.name}</CardTitle>
                                    <CardText>{`${fileSelectorState.fileDetails.size} MB`}</CardText>
                                    <Button className="mx-1" color="primary" onClick={onClickUpload}>
                                        Upload
                                    </Button>
                                    <Button className="mx-1" color="primary" onClick={onClickCancel}>
                                        Cancel
                                    </Button>
                                </CardBody>
                            </Card>
                        ) : (
                            <UploadBox onClick={onClickSelect}>
                                <UploadIconContainer>
                                    <UploadIcon />
                                </UploadIconContainer>
                                <h3>Click To Upload 👆</h3>
                            </UploadBox>
                        )}
                    </Col>
                </Row>
                <Modal isOpen={modal.isOpen}>
                    <ModalBody className="text-center">
                        <UploadSpinner color="primary" size="lg" />
                    </ModalBody>
                    <ModalFooter className="text-center">
                        <UploadText>Uploading {persentage}%</UploadText>
                    </ModalFooter>
                </Modal>
            </Container>
        </Page>
    );
}

export default Upload;
