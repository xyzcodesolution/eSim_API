import Header from "./Header";
import Footer from "./Footer";
import { Alert } from "../components/Alert";

const Main = ({ children }) => {
  return (
    <div className="max-w-[580px] shadow-lg m-auto">
      <Header></Header>
      <Alert />
      <main className="w-[100%]">{children}</main>
      <Footer></Footer>
    </div>
  );
};
export default Main;