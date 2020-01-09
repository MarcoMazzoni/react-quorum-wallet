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
  Input
} from 'reactstrap';
import { nodeList, getAccountListFromNode } from '../contract/utils';
import { QuorumNode } from '../interfaces/Node.interface';
import { AppState } from '../store/configureStore';
import { AppActions } from '../interfaces/Actions.interface';
import { changeNode, changeAccount } from '../actions/nodes';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

interface ClickableCardProps {
  cardTitle: string;
  cardContent: string;
  iconColor: string;
  iconType: string;
}

interface ClickableCardState {
  modal: boolean;
  accounts: string[];
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
      accounts: []
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const oldState: boolean = this.state.modal;
    this.setState({ modal: !oldState });
  }

  listNodes() {
    return nodeList.map((node: string) => {
      return (
        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1" /> {node}
          </Label>
        </FormGroup>
      );
    });
  }

  componentDidMount() {
    let nodeName: string = this.props.node.name;
    getAccountListFromNode(nodeName).then(accountList => {
      this.setState({ accounts: accountList });
    });
  }

  isQuorum(): boolean {
    if (this.props.cardTitle.includes('Quorum')) return true;
    return false;
  }

  showList() {
    if (this.isQuorum()) {
      return this.listNodes();
    } else {
      return this.state.accounts.map((account: string) => {
        return (
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio1" /> {account}
            </Label>
          </FormGroup>
        );
      });
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
            <Button color="success" onClick={this.toggle}>
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

interface LinkStateProps {
  node: QuorumNode;
}
interface LinkDispatchProps {
  startChangeNode?: (node: QuorumNode) => void;
  startChangeAccount?: (account: string) => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: ClickableCardProps
): LinkStateProps => ({
  node: state.node
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: ClickableCardProps
): LinkDispatchProps => ({
  startChangeNode: bindActionCreators(changeNode, dispatch),
  startChangeAccount: bindActionCreators(changeAccount, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClickableHeaderCard);
