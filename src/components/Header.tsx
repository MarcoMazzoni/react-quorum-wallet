import React from 'react';
// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';
import { ClickableHeaderCard } from './ClickableHeaderCard';
import { LinkStateProps, LinkDispatchProps } from '../views/Home';
import { getContractByNode } from '../contract/utils';

interface HeaderProps {}
interface HeaderState {
  balance: string;
}

type Props = HeaderProps & LinkStateProps & LinkDispatchProps;

class Header extends React.Component<Props, HeaderState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      balance: ''
    };
    this.getMyBalance = this.getMyBalance.bind(this);
  }

  getMyBalance() {
    let acc: string = this.props.node.accountSelected;
    if (acc !== '0x0') {
      getContractByNode(this.props.node.name)
        .methods.balanceOf(acc)
        .call()
        .then((response: string) => this.setState({ balance: response }));
    }
  }

  componentDidMount() {}

  render() {
    this.getMyBalance();
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
                            Balance (SCD)
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.state.balance}
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
                    node={this.props.node}
                    iconColor="icon icon-shape bg-yellow text-white rounded-circle shadow"
                    iconType="fas fa-cloud"
                    startChangeNode={this.props.startChangeNode}
                    startChangeAccount={this.props.startChangeAccount}
                  />
                </Col>
                <Col lg="6" xl="6">
                  <ClickableHeaderCard
                    cardTitle="Account Address"
                    cardContent={this.props.node.accountSelected}
                    node={this.props.node}
                    iconColor="icon icon-shape bg-green text-white rounded-circle shadow"
                    iconType="fas fa-user"
                    startChangeNode={this.props.startChangeNode}
                    startChangeAccount={this.props.startChangeAccount}
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
