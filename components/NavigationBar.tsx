import { useState } from "react";
import Link from "next/link";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    InputGroup,
    InputGroupAddon,
    Button,
    Input,
} from "reactstrap";
import styled from "styled-components";

const InputGroupCotainer = styled.div`
    margin-left: auto;

    @media (max-width: 575.98px) {
        padding-top: 1rem;
    }
`;

const RouterLink = styled(NavLink)`
    cursor: pointer;
`;

function NavigationBar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand>mstream</NavbarBrand>
            <Nav className="mr-3">
                <NavItem>
                    <Link href="/">
                        <RouterLink>Home</RouterLink>
                    </Link>
                </NavItem>
                <NavItem>
                    <Link href="/upload">
                        <RouterLink>Upload</RouterLink>
                    </Link>
                </NavItem>
            </Nav>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <InputGroupCotainer>
                    <InputGroup>
                        <Input />
                        <InputGroupAddon addonType="append">
                            <Button color="primary">Search</Button>
                        </InputGroupAddon>
                    </InputGroup>
                </InputGroupCotainer>
            </Collapse>
        </Navbar>
    );
}

export default NavigationBar;
