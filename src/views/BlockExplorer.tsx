import * as React from 'react';
import { QuorumNode } from '../interfaces/Node.interface';
import { AppState } from '../store/configureStore';
import Header from '../components/Header';
import {
  Container,
  Card,
  CardHeader,
  Row,
  CardBody,
  Button,
  Input,
  FormGroup,
  Col,
  CardFooter
} from 'reactstrap';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../interfaces/Actions.interface';
import { bindActionCreators } from 'redux';
import { startChangeNode, startChangeAccount } from '../actions/nodes';
import { connect } from 'react-redux';
import { getWeb3ProviderFromNode } from '../contract/utils';
import { ResultExplorerCard } from '../components/ResultExplorerCard';
import { Transaction } from 'web3-eth';
import Web3 from 'web3';


interface BlockExplorerProps {}
interface BlockExplorerState {
  showCards: boolean;
  txList: Transaction[];
}
type Props = BlockExplorerProps & LinkStateProps & LinkDispatchProps;

class BlockExplorer extends React.Component<Props, BlockExplorerState> {
  blockRef: React.RefObject<HTMLInputElement>;
  txRef: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.state = {
      showCards: false,
      txList: []
    };
    this.blockRef = React.createRef();
    this.txRef = React.createRef();
    this.onSearchClick = this.onSearchClick.bind(this);
    this.onClearClick = this.onClearClick.bind(this);
    this.showResponseCards = this.showResponseCards.bind(this);
    this.searchByTxHash = this.searchByTxHash.bind(this);
  }

  async searchByTxHash(txHash: string) {
    let txList: Transaction[] = [];
    let web3: Web3 = getWeb3ProviderFromNode(this.props.node.name);
    let response: Transaction = await web3.eth.getTransaction(txHash);
    txList.push(response);
    return txList;
  }

  async onSearchClick() {
    let txHash: string = '';
    let responseList: Transaction[] = [];
    if (this.txRef.current) {
      txHash = this.txRef.current.value;
      responseList = await this.searchByTxHash(txHash);
      this.setState({ showCards: true, txList: responseList });
    }
  }

  onClearClick() {
    this.setState({ showCards: false });
  }

  showResponseCards() {
    return this.state.txList.map((value: Transaction, index: number) => {
      return <ResultExplorerCard transaction={value} />;
    });
  }

  componentDidMount() {
    document.body.classList.add('bg-default');
  }

  render() {
    return (
      <>
        <Header {...this.props} />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="justify-content-center">
            <Col xl="12">
              <Card className="bg-secondary shadow border-0">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Explorer
                      </h6>
                      <h2 className="mb-0">Search a Transaction!</h2>
                      <h4 className="mb-0">
                        Insert a block hash or a transaction hash.
                      </h4>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="11">
                        <FormGroup>
                          <label className="form-control-label">
                            Block Hash
                          </label>
                          <Input
                            type="text"
                            placeholder="Enter block hash"
                            innerRef={this.blockRef}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="11">
                        <FormGroup>
                          <label className="form-control-label">
                            Transaction Hash
                          </label>
                          <Input
                            type="text"
                            innerRef={this.txRef}
                            placeholder="Enter tx hash"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </CardBody>

                <CardFooter className="bg-transparent">
                  <div className="text-center">
                    <Button
                      className="mt-4"
                      color="default"
                      type="button"
                      onClick={this.onSearchClick}
                    >
                      Search
                    </Button>
                    <Button
                      className="mt-4"
                      color="primary"
                      type="button"
                      onClick={this.onClearClick}
                    >
                      Clear
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5 justify-content-center">
            <Col xl="7">
              {this.state.showCards ? this.showResponseCards() : ''}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export interface LinkStateProps {
  node: QuorumNode;
}
export interface LinkDispatchProps {
  startChangeNode: (nodeName: string) => void;
  startChangeAccount: (account: string) => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: BlockExplorerProps
): LinkStateProps => ({
  node: state.node
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: BlockExplorerProps
): LinkDispatchProps => ({
  startChangeNode: bindActionCreators(startChangeNode, dispatch),
  startChangeAccount: bindActionCreators(startChangeAccount, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(BlockExplorer);
