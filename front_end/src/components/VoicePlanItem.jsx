import { useState } from "react";

const VoicePlanItem = (props) => {
  const { title, subtitle, value, subValue } = props;
  const [selected, setSelected] = useState(false);

  const planSelect = () => {
    setSelected(true);
  };

  return (
    <div
      onClick={planSelect}
      className="flex items-center rounded-lg hover:border-gray-600 hover:shadow-md border-1 border-black  mb-2 w-full"
    >
      <label className="flex items-center w-full has-[:checked]:bg-blue-100 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200 rounded-lg px-2 hover:cursor-pointer">
        <input
          type="radio"
          name="payment_method"
          className="checked:border-indigo-500 hidden"
        />
        <div className="flex flex-col w-[40%]">
          <p className="m-0">{title}</p>
          <h1 className="pr-20 border-r-[1px] border-gray-900 m-0">{value}</h1>
        </div>
        <div className="flex flex-col w-[60%] items-end">
          <h1 className="m-0">€ {subValue}</h1>
        </div>
      </label>
    </div>
  );
};
export default VoicePlanItem;
