import React from 'react';

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';
import { QuorumNode } from '../interfaces/Node.interface';
import { ClickableHeaderCard } from './ClickableHeaderCard';

interface HeaderProps {
  node: QuorumNode;
}

class Header extends React.Component<HeaderProps> {
  constructor(props: HeaderProps) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="2">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Balance
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            2,356
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fas fa-chart-pie" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="2">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Transactions
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            350,897
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="2">
                  <ClickableHeaderCard
                    cardTitle="Quorum Node"
                    cardContent={this.props.node.name}
                    iconColor="icon icon-shape bg-yellow text-white rounded-circle shadow"
                    iconType="fas fa-cloud"
                  />
                </Col>
                <Col lg="6" xl="6">
                  <ClickableHeaderCard
                    cardTitle="Account Address"
                    cardContent={this.props.node.account}
                    iconColor="icon icon-shape bg-green text-white rounded-circle shadow"
                    iconType="fas fa-user"
                  />
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
