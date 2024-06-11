import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const QrInfoItem = ({ activeTime, endTime, status, voice, storage }) => (
  <Container>
    <Row>
      <Col sm={3}>
        <img src="/images/qr.png" alt="" className="w-full" />
      </Col>
      <Col sm={9}>
        <div className="rounded-lg px-3 m-2 border-1 flex items-center relative">
          <h6>SM-Sp</h6>
          <p>consumer.roam.global</p>
          <img
            src="/images/paste.png"
            className="w-5 absolute right-2"
            alt=""
          />
        </div>
        <div className="rounded-lg px-3 m-2 border-1 flex items-center relative">
          <h6>SM-Sp</h6>
          <p>consumer.roam.global</p>
          <img
            src="/images/paste.png"
            className="w-5 absolute right-2"
            alt=""
          />
        </div>
        <p className="text-[14px] pl-5">
          copy this information and enter details manually to install eSim.
          *Make sure your device has a stable internet connection before
          installing.
        </p>
      </Col>
    </Row>
  </Container>
);
export default QrInfoItem;