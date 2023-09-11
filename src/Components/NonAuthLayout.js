import PropTypes from 'prop-types'
import { withRouter } from "react-router-dom"

const NonAuthLayout = (props) => {
  return (
    <>{props.children}</>
  );
}

NonAuthLayout.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object
}

export default withRouter(NonAuthLayout)