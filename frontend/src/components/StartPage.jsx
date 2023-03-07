import { Link } from "react-router-dom";

const StartPage = () => {
  return (
    <>
      <div>Welcome to Cloud Integration in Go Desktop</div>
      <div>First go to: <Link to={"/settings"}>Settings</Link></div>
    </>
  )
};

export default StartPage;