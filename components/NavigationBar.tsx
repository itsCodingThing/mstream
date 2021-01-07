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

import navigationBarStyles from "@/styles/NavigationBar.module.css";

function NavigationBar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand>mstream</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-3 text-center" navbar>
                    <NavItem>
                        <Link href="/">
                            <NavLink className={navigationBarStyles.routeLink}>Home</NavLink>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link href="/upload">
                            <NavLink className={navigationBarStyles.routeLink}>Upload</NavLink>
                        </Link>
                    </NavItem>
                </Nav>
                <div className={navigationBarStyles.inputGroupContainer}>
                    <InputGroup>
                        <Input />
                        <InputGroupAddon addonType="append">
                            <Button color="primary">Search</Button>
                        </InputGroupAddon>
                    </InputGroup>
                </div>
            </Collapse>
        </Navbar>
    );
}

export default NavigationBar;
