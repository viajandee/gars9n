import React from "react";
import { Row, Col, Container } from "reactstrap";
import { Link } from "react-router-dom";
import Breadcrumb from "../Breadcrumbs";

const EmailAlertTemplte = (props) => {
  document.title = "Alert Email | Gars9n - React Admin & Dashboard Template";

  return (
    <>
      <div className='page-content'>
        <Container fluid>
          <Breadcrumb title='Email' BreadcrumbItem='Alert Email' />
          <Row className='email-template'>
            <Col md={12}>
              <table
                className='body-wrap'
                style={{
                  fontFamily: "Helvetica Neue,Helvetica,Arial,sans-serif",
                  boxSizing: "border-box",
                  fontSize: "14px",
                  width: "100%",
                  backgroundColor: "#2a30",
                  margin: "0",
                }}
                bgcolor='#f6f6f6'>
                <tbody>
                  <tr
                    style={{
                      fontFamily: "Helvetica Neue,Helvetica,Arial,sans-serif",
                      boxSizing: "border-box",
                      fontSize: "14px",
                      margin: "0",
                    }}>
                    <td
                      style={{
                        fontFamily: "Helvetica Neue,Helvetica,Arial,sans-serif",
                        boxSizing: "border-box",
                        fontSize: "14px",
                        verticalAlign: "top",
                        margin: "0",
                      }}
                      valign='top'></td>
                    <td
                      className='container'
                      width='600'
                      style={{
                        fontFamily: "Helvetica Neue,Helvetica,Arial,sans-serif",
                        boxSizing: "border-box",
                        fontSize: "14px",
                        verticalAlign: "top",
                        display: "block",
                        maxWidth: "600px",
                        clear: "both",
                        margin: "0 auto",
                      }}
                      valign='top'>
                      <div
                        className='content'
                        style={{
                          fontFamily:
                            "Helvetica Neue,Helvetica,Arial,sans-serif",
                          boxSizing: "border-box",
                          fontSize: "14px",
                          maxWidth: "600px",
                          display: "block",
                          margin: "0 auto",
                          padding: "20px",
                        }}>
                        <table
                          className='main'
                          width='100%'
                          cellPadding='0'
                          cellSpacing='0'
                          style={{
                            fontFamily:
                              "Helvetica Neue,Helvetica,Arial,sans-serif",
                            boxSizing: "border-box",
                            fontSize: "14px",
                            borderRadius: "7px",
                            backgroundColor: "#fff",
                            margin: "0",
                            boxShadow: "0 0.75rem 1.5rem rgba(18,38,63,.03)",
                          }}>
                          <tbody>
                            <tr
                              style={{
                                fontFamily:
                                  "Helvetica Neue,Helvetica,Arial,sans-serif",
                                boxSizing: "border-box",
                                fontSize: "14px",
                                margin: "0",
                              }}>
                              <td
                                className='alert alert-warning'
                                style={{
                                  fontFamily:
                                    "Helvetica Neue,Helvetica,Arial,sans-serif",
                                  boxSizing: "border-box",
                                  fontSize: "16px",
                                  verticalAlign: "top",
                                  color: "#fff",
                                  fontWeight: "500",
                                  textAlign: "center",
                                  borderRadius: "3px 3px 0px 0px",
                                  backgroundColor: "red",
                                  margin: "0",
                                  padding: "20px",
                                }}
                                align='center'
                                valign='top'>
                                Warning: Welcome In My App
                              </td>
                            </tr>
                            <tr
                              style={{
                                fontFamily:
                                  "Helvetica Neue,Helvetica,Arial,sans-serif",
                                boxSizing: "border-box",
                                fontSize: "14px",
                                margin: "0",
                              }}>
                              <td
                                className='content-wrap'
                                style={{
                                  fontFamily:
                                    "Helvetica Neue,Helvetica,Arial,sans-serif",
                                  boxSizing: "border-box",
                                  fontSize: "14px",
                                  verticalAlign: "top",
                                  margin: "0",
                                  padding: "20px",
                                }}
                                valign='top'>
                                <table
                                  width='100%'
                                  cellPadding='0'
                                  cellSpacing='0'
                                  style={{
                                    fontFamily:
                                      "Helvetica Neue,Helvetica,Arial,sans-serif",
                                    boxSizing: "border-box",
                                    fontSize: "14px",
                                    margin: "0",
                                  }}>
                                  <tbody>
                                    <tr
                                      style={{
                                        fontFamily:
                                          "Helvetica Neue,Helvetica,Arial,sans-serif",
                                        boxSizing: "border-box",
                                        fontSize: "14px",
                                        margin: "0",
                                      }}>
                                      <td
                                        className='content-block'
                                        style={{
                                          fontFamily:
                                            "Helvetica Neue,Helvetica,Arial,sans-serif",
                                          boxSizing: "border-box",
                                          fontSize: "14px",
                                          verticalAlign: "top",
                                          margin: "0",
                                          padding: "0 0 20px",
                                          justifyContent: "center",
                                          color: "black",
                                        }}
                                        valign='top'>
                                        Welcome In Garson App
                                      </td>
                                    </tr>

                                    <tr
                                      style={{
                                        fontFamily:
                                          "Helvetica Neue,Helvetica,Arial,sans-serif",
                                        boxSizing: "border-box",
                                        fontSize: "14px",
                                        margin: "0",
                                      }}></tr>

                                    <tr
                                      style={{
                                        fontFamily:
                                          "Helvetica Neue,Helvetica,Arial,sans-serif",
                                        boxSizing: "border-box",
                                        fontSize: "14px",
                                        margin: "0",
                                      }}>
                                      <td
                                        className='content-block'
                                        style={{
                                          textAlign: "center",
                                          fontFamily:
                                            "Helvetica Neue,Helvetica,Arial,sans-serif",
                                          boxSizing: "border-box",
                                          fontSize: "14px",
                                          verticalAlign: "top",
                                          margin: "0",
                                          padding: "0",
                                        }}
                                        valign='top'>
                                        © {new Date().getFullYear()} Garson
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default EmailAlertTemplte;
