import * as React from 'react';
import { Card, CardBody, CardTitle, Row, Col, Alert } from 'reactstrap';

interface ClickableCardProps {
  cardTitle: string;
  cardContent: string;
  iconColor: string;
  iconType: string;
}

interface ClickableCardState {
  showMenu: boolean;
}

export class ClickableHeaderCard extends React.Component<
  ClickableCardProps,
  ClickableCardState
> {
  constructor(props: ClickableCardProps) {
    super(props);
    this.state = {
      showMenu: false
    };
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu() {
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  render() {
    return (
      <>
        <Card
          onClick={this.showMenu}
          style={{ cursor: 'pointer' }}
          className="card-stats mb-4 mb-xl-0"
        >
          <CardBody>
            <Row>
              <div className="col">
                <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                  {this.props.cardTitle}
                </CardTitle>
                <span className="h2 font-weight-bold mb-0">
                  {this.props.cardContent}
                </span>
              </div>
              <Col className="col-auto">
                <div className={this.props.iconColor}>
                  <i className={this.props.iconType} />
                </div>
              </Col>
            </Row>
          </CardBody>
          {this.state.showMenu ? (
            <Alert color="primary">
              This is a primary alert — check it out!
            </Alert>
          ) : null}
        </Card>
      </>
    );
  }
}
