import Button from "react-bootstrap/Button";
import InsideItem from "../components/InsideItem";
import CustomAccordion from "../components/CustomAccordion";
import InsidePlanItem from "../components/InsidePlanItem";
import QrInfoItem from "../components/QrInfoItem";

const Inside = () => {
  const cardData = {
    title: "UNITED ARAB EMIRATES",
    orderID: "AR-1959812",
    icon: "vector.png",
    phone: "+856789",
    coverage: "UAE",
    status: true,
  };
  const accordions = [
    {
      title: "Current Plan",
      content: (
        <InsidePlanItem
          activeTime={"30 May 2024"}
          endTime={"30 June 2024"}
          status={true}
          storage={"10.00"}
          voice={100}
        />
      ),
    },
    {
      title: "Show QR & Manual INFO",
      content: <QrInfoItem />,
    },
    {
      title: "Active Steps",
      content: "",
    },
    {
      title: "Replace eSIM",
      content: "",
    },
    {
      title: "Previous Plans",
      content: "",
    },
  ];
  return (
    <div className="px-3 w-full pt-4">
      <InsideItem {...cardData} />
      <Button
        size="lg"
        className="border-white w-full"
        style={{ backgroundColor: "#00274C" }}
      >
        TOP UP +
      </Button>
      <CustomAccordion data={accordions} />
    </div>
  );
};

export default Inside;
