import { Container } from "reactstrap";

import Breadcrumbs from "../../Components/Breadcrumbs";
import CardUser from "./card-user";
import DashboardImage from "./Dashboard-image";

const Dashboard = () => {
  document.title = "Dashboard | Gars9n - Digital Menu & Ordering System";

  return (
    <>
      <div className='page-content'>
        <Container fluid>
          <Breadcrumbs title='Home' BreadcrumbItem='Dashboard' />
          <CardUser />
          <DashboardImage />
        </Container>
      </div>
    </>
  );
};

export default Dashboard;
