const InsideItem = (props) => {
  const { icon, orderID, phone, coverage, title, status } = props;
  return (
    <div className="flex w-full items-center shadow-[1px_2px_5px_grey] p-2 rounded-lg mb-3">
      <img src={"/images/" + icon} className="rounded-circle mr-3" alt="" />
      <div className="flex flex-col px-2 items-start justify-between w-full">
        <h3 className="m-0">{title}</h3>
        <div className="flex items-center w-full justify-between">
          <div className="flex flex-col items-start justify-between">
            <p className="m-0">order#</p>
            <p className="m-0">{orderID}</p>
          </div>
          <div className="flex flex-col items-end justify-between">
            <p className="m-0">Status</p>
            <h6 className="m-0">
              {status ? (
                <font color="lightgreen">ACTIVE</font>
              ) : (
                <font color="grey">INACTIVE</font>
              )}
            </h6>
          </div>
        </div>
        <div className="flex items-center w-full justify-between">
          <div className="flex flex-col items-start justify-between">
            <p className="m-0">Coverage</p>
            <p className="m-0">{coverage}</p>
          </div>
          <div className="flex flex-col items-end justify-between">
            <p className="m-0">Phone #</p>
            <p className="m-0">{phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InsideItem;
