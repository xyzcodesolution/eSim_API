import { useState } from "react";

const PlanItem = (props) => {
  const {
    // location_name,
    perioddays,
    giga_data,
    cost,
    package_name,
    onClick
    // package_id,
  } = props;

  const handleClick = () => {
    onClick(giga_data, cost);
  }

  return (
    <div
      onClick={handleClick}
      className="flex items-center rounded-lg transition-all duration-300 hover:bg-gray-200 hover:shadow-md border-1 selection:bg-blue-400 border-black hover:cursor-pointer mb-2 w-full"
    >
      <label className="px-2 flex w-full has-[:checked]:bg-blue-100 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200 rounded-lg hover:cursor-pointer">
        <input type="radio" name="payment_method" className="checked:border-indigo-500 hidden" />
        <div className="flex flex-col w-[40%]">
          <p className="m-0">{package_name}</p>
          <h1 className="pr-20 border-r-[1px] border-gray-900 m-0">
            {giga_data > 10 ? giga_data : ` ${giga_data}`} GB
          </h1>
        </div>
        <div className="flex flex-col w-[60%] items-end">
          <p className="m-0">Valid for {perioddays} Days</p>
          <h1 className="m-0">€ {cost}</h1>
        </div>
      </label>
    </div>
  );
};
export default PlanItem;
