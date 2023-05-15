import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, BreadcrumbItem } from "reactstrap";

const Breadcrumb = props => {
  return (
    <Row>
      <Col xs='12'>
        <div className='page-title-box d-sm-flex align-items-center justify-content-between'>
          <h4 className='mb-0 font-size-18'>{props.BreadcrumbItem}</h4>
          <div className='page-title-right'>
            <ol className='breadcrumb m-0'>
              <BreadcrumbItem>
                <Link to='#'>{props.title}</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>
                <Link to='#'>{props.BreadcrumbItem}</Link>
              </BreadcrumbItem>
            </ol>
          </div>
        </div>
      </Col>
    </Row>
  )
}

Breadcrumb.propTypes = {
  BreadcrumbItem: PropTypes.string,
  title: PropTypes.string
}

export default Breadcrumb