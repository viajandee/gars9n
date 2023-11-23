import React from "react";
import { Row, Col, Card, CardImg, CardText } from "reactstrap";
import pic from "../../assets/images/users/pic.jpg";

function DashboardImage() {
  const textStyle = {
    position: "absolute",
    top: "12%",
    left: "6%",
    padding: "5px",
    borderRadius: "20px",
    fontSize: "37px",
    fontWeight: "bold",
    color: "white",
    textTransform: "capitalize",
  };

  return (
    <>
      <Row>
        <Col sm='12'>
          <Card>
            <CardImg
              src={pic}
              alt=''
              style={{
                borderRadius: "5px",
                color: "red",
              }}
            />
            <CardText style={textStyle}>
              <p>get the right deal with,</p>
              <p>Garson App.</p>
            </CardText>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default DashboardImage;
