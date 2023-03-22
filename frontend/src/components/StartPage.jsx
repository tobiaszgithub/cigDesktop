import { Link } from "react-router-dom";

const StartPage = () => {
  return (
    <>
      <div>Welcome to Cloud Integration in Go Desktop.</div>
      <div>First go to: <Link to={"/settings"}>Settings</Link> and add Cloud Integration Tenants.</div>
      <div>Once the configuration has been added, the systems will be visible in the menu on the left.</div>
    </>
  )
};

export default StartPage;