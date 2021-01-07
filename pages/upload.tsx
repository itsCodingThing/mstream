import { useState } from "react";
import Image from "next/image";
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
import Header from "@/components/Header";

import uploadStyles from "@/styles/Upload.module.css";
import musicStyles from "@/styles/Music.module.css";

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

function Upload() {
    const fileSelectorInitialState: FileSelectorState = {
        isFileSelected: false,
    };

    const [fileSelectorState, setFileSelectorState] = useState(fileSelectorInitialState);
    const [modalState, setModalState] = useState({ isOpen: false });
    const [persentage, setPersentage] = useState(0);

    async function openFile(): Promise<File> {
        return new Promise((resolve) => {
            const input = document.createElement("input");
            input.type = "file";
            input.addEventListener("change", () => {
                resolve(input.files[0]);
            });
            input.click();
        });
    }

    const onClickSelect = async () => {
        try {
            const file = await openFile();
            console.log(file);

            setFileSelectorState({
                isFileSelected: true,
                fileDetails: { name: file.name, size: Math.floor(file.size / (1024 * 1024)) },
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
                <Row className="mb-3 text-center">
                    <Col>
                        <Header />
                    </Col>
                </Row>
                <Row className="mb-3 text-center">
                    <Col>
                        <Button color="primary" onClick={onClickSelect}>
                            Select File
                        </Button>
                    </Col>
                </Row>

                {fileSelectorState.isFileSelected ? (
                    <Row className="mb-3 text-center">
                        <Col>
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
                        </Col>
                    </Row>
                ) : (
                    <Row className="mb-3 text-center">
                        <Col>
                            <Card onClick={onClickSelect}>
                                <div className={uploadStyles.addImgContainer}>
                                    <Image src="/add-btn.svg" width={100} height={100} alt="add button" />
                                </div>
                            </Card>
                        </Col>
                    </Row>
                )}
                <Modal modalClassName={musicStyles.loader} isOpen={modalState.isOpen}>
                    <ModalBody className="text-center">
                        <Spinner color="primary" size="lg" />
                    </ModalBody>
                    <ModalFooter>Uploading {persentage}%</ModalFooter>
                </Modal>
            </Container>
        </Page>
    );
}

export default Upload;
