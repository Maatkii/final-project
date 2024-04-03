import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import "./style.css";
function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container
        fluid
        style={{
          background: "linear-gradient(45deg, #00000094, transparent)",
          marginTop: "-11px",
          height: "79px",
          padding: "0px 53px",
        }}
      >
        <Navbar.Brand
          className="Name"
          style={{ paddingLeft: "157px", paddingRight: "25px" }}
          href="#"
        >
          NameOfApp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{
              maxHeight: "100px",
              paddingLeft: "14px",
            }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">How It Works</Nav.Link>
            <Nav.Link href="#action2">Browse Jobs</Nav.Link>
          </Nav>
          <Form className="d-flex  form-sign">
            <Nav.Link href="#action1">Log In</Nav.Link>
            <Nav.Link href="#action2">Sing Up</Nav.Link>
          </Form>
          <Button
            style={{ padding: "5px 25px", margin: "52px" }}
            variant="dark"
          >
            Post Project
          </Button>{" "}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
