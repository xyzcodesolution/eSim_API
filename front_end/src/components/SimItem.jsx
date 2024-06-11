import Button from "react-bootstrap/Button";

const SimItem = (props) => {
  const { icon, orderID, date, title } = props;
  return (
    <div className="flex items-center shadow-[1px_2px_5px_grey] p-2 rounded-lg mb-3">
      <img src={"/images/" + icon} className="rounded-circle mr-3" alt="" />
      <div className="flex flex-col items-start justify-between">
        <h3 className="m-0">{title}</h3>
        <div className="flex items-center">
          <div className="flex flex-col items-start justify-between">
            <p className="m-0">order#</p>
            <p className="m-0">{orderID}</p>
          </div>
          <div className="flex flex-col items-start justify-between">
            <p className="m-0">Purchased Date</p>
            <p className="m-0">{date}</p>
          </div>
        </div>
        <Button
          size="sm"
          className="border-white"
          style={{ backgroundColor: "#00274C" }}
        >
          View Details & Topup
        </Button>
      </div>
    </div>
  );
};
export default SimItem;