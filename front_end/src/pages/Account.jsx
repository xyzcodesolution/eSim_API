import CustomAccordion from "../components/CustomAccordion";
import Button from "react-bootstrap/Button";

const Account = () => {
  const actionBtns = [
    {
      title: "My  eSims",
      content: "",
    },
    {
      title: "Billing",
      content: "",
    },
    {
      title: "Order History",
      content: "",
    },
    {
      title: "Rewards",
      content: "",
    },
    {
      title: "Help Support",
      content: "",
    },
    {
      title: "FAQs",
      content: "",
    },
    {
      title: "Currency",
    },
    {
      title: "Language",
      content: "",
    },
  ];
  return (
    <div className="w-full bg-white px-4">
      <div className="flex w-full bg-white mt-4 m-auto justify-between items-center shadow-[1px_2px_10px_-5px] p-2 mb-2 rounded-lg">
        <div className="flex items-center">
          <img
            className="avatar rounded-circle w-20"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
            alt=""
          />
          <div className="flex flex-col ml-5">
            <h5>Your Name</h5>
            <h6>Your@gmail.com</h6>
          </div>
        </div>
        <h5>EDIT</h5>
      </div>
      <div>
        <CustomAccordion data={actionBtns} />
      </div>
      <Button
        size="lg"
        className="w-full my-4"
        style={{ backgroundColor: "#00274C" }}
      >
        logout
      </Button>
    </div>
  );
};
export default Account;
