import Accordion from "react-bootstrap/Accordion";

const CustomAccordion = ({ data }) => (
  <Accordion defaultActiveKey="0">
    {data.map((item, index) => (
      <Accordion.Item className="mt-2 border" eventKey={index} key={index}>
        <Accordion.Header>{item.title}</Accordion.Header>
        <Accordion.Body>{item.content}</Accordion.Body>
      </Accordion.Item>
    ))}
  </Accordion>
);

export default CustomAccordion;
