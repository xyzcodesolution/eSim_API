import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
const PackageItem = (props) => {
  const fromButtonHandler = (pack_id) => {
    console.log(pack_id);
  }
  return (
    <div className="flex w-full justify-between items-center mb-2 border-2 bg-white border-black rounded-md">
      <img src="/images/world.png" className="w-[15%] h-auto m-auto" alt="" />
      <div className="text-center p-2 py-4 border-l-2 border-r-2 border-black h-full w-[20%] flex flex-col justify-center">
        <p className="m-0 font-bold">{props.data.giga_data} GB</p>
        <p className="m-0 text-[12px]">{props.data.location_name}</p>
      </div>
      <div className="p-3 flex flex-col items-center w-[45%]">
        <h6>{props.data.perioddays} DAYS</h6>
        <h2 className="text-[20px] font-bold text-center">{props.data.package_name}</h2>
        <Button className="border-black w-[90%]" onClick={(e) => { fromButtonHandler(props.data.package_id) }} style={{ backgroundColor: "#00274C" }}>
          <Link to={`/plan/${props.data.location_id}`} className="text-white no-underline" style={{ backgroundColor: "#00274C" }}>
            FROM € {props.data.cost} EUR
          </Link>
        </Button>
      </div>
    </div>
  );
};
export default PackageItem;
