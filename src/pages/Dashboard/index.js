import { Container } from 'reactstrap';

import Breadcrumb from '../../components/Breadcrumb'
import CardUser from './card-user';

const Dashboard = props => {

  document.title='Dashboard | Gars9n - Digital Menu & Ordering System';

  return (
    <>
      <div className='page-content'>
        <Container fluid>
          <Breadcrumb
            title='Home'
            BreadcrumbItem='Dashboard'
          />
          <CardUser />
        </Container>
      </div>
    </>
  )
}

export default Dashboard