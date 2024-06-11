import { useEffect, useState } from "react";
import PlanItem from "../components/PlanItem";
import VoicePlanItem from "../components/VoicePlanItem";
import Button from "react-bootstrap/esm/Button";
import { useParams } from "react-router-dom";
// import Flags from "country-flag-icons/react/3x2";
import axios from "axios";

const Plan = () => {
  const { package_id } = useParams();
  const baseUrl = process.env.REACT_APP_API_URL;
  const [template, setTemplate] = useState([]);
  const [totalCost, setTotalCost] = useState("0");
  const [dataSize, setDataSize] = useState("0");

  useEffect(() => {
    getPackageById();
  }, []);

  const getPackageById = async () => {
    try {
      const data = await axios.post(
        `${baseUrl}/api/esim/prepaid_package_template`,
        {
          listPrepaidPackageTemplate: {
            locationzoneid: package_id,
          },
        }
      );
      // setTemplate(data.data.result ? data.data.result[0] : null);
      const res = data.data.result;
      res.sort((a, b) => a.cost - b.cost);
      setTemplate(res);
    } catch (error) {
      console.log("Error");
    }
  };

  const getDataSizeAndTotalCost = (data, cost) => {
    setDataSize(data);
    setTotalCost(cost);
  }

  const voiceArr = [
    {
      title: "MINUTES",
      subTitle: "",
      value: "0",
      subValue: "0.00",
    },
    {
      title: "MINUTES",
      subTitle: "",
      value: "100",
      subValue: "10.00",
    },
    {
      title: "MINUTES",
      subTitle: "",
      value: "200",
      subValue: "17.00",
    },
  ];
  return (
    <div className="w-full px-3">
      {template.length > 0 ? (
        <>
          <div className="flex items-center">
            <img
              src="/images/Vector.png"
              className="rounded-circle mr-3"
              alt=""
            />
            {/* {Flags.US()} */}
            <div className="flex flex-col items-start justify-between py-2">
              <p className="m-0">{template[0].location_name}</p>
              <h3 className="m-0">{template[0].package_name}</h3>
              <p className="m-0">VALID FOR {template[0].perioddays} DAYS</p>
            </div>
          </div>
          <fieldset>
            {template.map((item, index) => (
              <PlanItem {...item} onClick={()=>getDataSizeAndTotalCost(item.giga_data, item.cost)} key={index} />
            ))}
          </fieldset>

          <div className="voice">
            <h4 className="text-center">ADD VOICE MINUTE</h4>
            {voiceArr.map((item, index) => (
              <VoicePlanItem {...item} key={index} />
            ))}
          </div>

          <div
            className="px-4 py-3 w-full"
            style={{ backgroundColor: "#00274C" }}
          >
            <div className="flex items-center w-full justify-between">
              <div className="flex flex-col w-[60%] items-start justify-between text-white ">
                <h4>{dataSize} GB</h4>
                <h6>100 MINUTES</h6>
              </div>
              <div className="flex flex-col w-[40%] items-start border-l border-white pl-2 justify-between text-white">
                <p>TOTAL</p>
                <h4>${totalCost} USD</h4>
              </div>
            </div>
            <Button variant="outline-light mt-3" className="w-full">
              Buy Now
            </Button>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
export default Plan;
