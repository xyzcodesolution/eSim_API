import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";

const InsidePlanItem = ({ activeTime, endTime, status, voice, storage }) => (
  <Container>
    <Row>
      <Col>
        <h6>Your Plan Detail</h6>
      </Col>
      <Col>
        <p>Active it on {activeTime}</p>
      </Col>
    </Row>
    <Row>
      <Col>
        <h6>
          Voice <p className="text-warning">{voice} MINUTES</p>
        </h6>
      </Col>
      <Col>
        <p>Ends on {endTime}</p>
      </Col>
    </Row>
    <Row>
      <Col>
        <h6>
          Data <font color="blue">{storage}GB</font>
        </h6>
      </Col>
      <Col>
        <b>
          <font color={status ? "lightgreen" : "grey"}>
            {status ? "ACTIVE" : "INACTIVE"}
          </font>
        </b>
      </Col>
    </Row>
    <Row>
      <Row>
        <Col>
          <h6 className="text-warning">VOICE USED</h6>
        </Col>
        <Col>
          <h6 className="text-primary">DATA USAGE</h6>
        </Col>
      </Row>
      <Row>
        <Col>
          <ProgressBar variant="warning" animated now={80} />
        </Col>
        <Col>
          <ProgressBar animated now={70} />
        </Col>
      </Row>
    </Row>
  </Container>
);

export default InsidePlanItem;