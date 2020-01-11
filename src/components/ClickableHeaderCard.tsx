import * as React from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input,
  CustomInput,
  Container
} from 'reactstrap';
import { nodeList, getAccountListFromNode } from '../contract/utils';
import { QuorumNode } from '../interfaces/Node.interface';
import { AppState } from '../store/configureStore';
import { AppActions } from '../interfaces/Actions.interface';
import { changeNode } from '../actions/nodes';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import { LinkStateProps, LinkDispatchProps } from '../views/Home';

interface ClickableCardProps {
  cardTitle: string;
  cardContent: string;
  iconColor: string;
  iconType: string;
}

interface ClickableCardState {
  modal: boolean;
  radio: string;
}

type Props = ClickableCardProps & LinkStateProps & LinkDispatchProps;

export class ClickableHeaderCard extends React.Component<
  Props,
  ClickableCardState
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modal: false,
      radio: ''
    };
    this.toggle = this.toggle.bind(this);
    this.onRadioSelect = this.onRadioSelect.bind(this);
    this.onConfirmClickAccount = this.onConfirmClickAccount.bind(this);
    this.onConfirmClickNode = this.onConfirmClickNode.bind(this);
  }

  toggle() {
    const oldState: boolean = this.state.modal;
    this.setState({ modal: !oldState });
  }

  onConfirmClickNode() {
    let nodeName: string = this.state.radio;
    this.props.startChangeNode(nodeName);
    /*
    getAccountListFromNode(nodeName).then(accountList => {
      this.setState({ accounts: accountList });
      //this.props.startChangeAccount(accountList[0]);
    });
    */
    this.toggle();
  }

  onConfirmClickAccount() {
    //this.props.startChangeAccount(this.state.radio);
    this.toggle();
  }

  onRadioSelect(val: string) {
    this.setState({ radio: val });
  }

  listNodes() {
    return nodeList.map((node: string) => {
      return (
        <FormGroup check>
          <Label check>
            <Input
              type="radio"
              name="radio1"
              onClick={() => this.onRadioSelect(node)}
            />{' '}
            {node}
          </Label>
        </FormGroup>
      );
    });
  }

  listAccounts() {
    return this.props.node.accounts.map((account: string) => {
      return (
        <FormGroup check>
          <Label check>
            <Input
              type="radio"
              name="radio1"
              onClick={() => this.onRadioSelect(account)}
            />{' '}
            {account}
          </Label>
        </FormGroup>
      );
    });
  }

  isQuorum(): boolean {
    if (this.props.cardTitle.includes('Quorum')) return true;
    return false;
  }

  componentDidMount() {}

  showList() {
    if (this.isQuorum()) {
      return this.listNodes();
    } else {
      return this.listAccounts();
    }
  }

  render() {
    return (
      <>
        <Card
          onClick={this.toggle}
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
        </Card>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader
            toggle={this.toggle}
            className="text-uppercase text-muted mb-0"
          >
            {this.isQuorum() ? 'Choose Quorum Node' : 'Choose address'}
          </ModalHeader>
          <ModalBody>
            <FormGroup tag="fieldset">
              <legend>
                {' '}
                {this.isQuorum() ? 'Connect to:' : 'Login with:'}
              </legend>
              {this.showList()}
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
              onClick={() => {
                this.isQuorum()
                  ? this.onConfirmClickNode()
                  : this.onConfirmClickAccount();
              }}
            >
              Confirm
            </Button>{' '}
            <Button color="danger" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
