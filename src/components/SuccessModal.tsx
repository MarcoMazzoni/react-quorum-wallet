import * as React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  ModalProps
} from 'reactstrap';
import { TransactionReceiptCustom } from '../interfaces/Send.interface';
import Truncate from 'react-truncate';
import Measure, { ContentRect } from 'react-measure';
import copy from 'copy-to-clipboard';

interface SuccessModalProps extends ModalProps {
  receipt: TransactionReceiptCustom;
}

export class SuccessModal extends React.Component<SuccessModalProps> {
  copyToClipboard(text: string) {
    copy(text);
  }

  renderReceipt(receipt: TransactionReceiptCustom, contentRect: ContentRect) {
    return Object.entries(receipt).map(key => {
      let field: string = key[0].toString();
      let value: string = key[1].toString();
      if (field === 'transactionHash' || field === 'blockHash')
        return (
          <h4 className="font-weight-normal">
            {field}{' '}
            <span className="font-weight-bold">
              <a href="#" onClick={() => this.copyToClipboard(value)}>
                <Truncate
                  lines={1}
                  ellipsis={<span>... </span>}
                  width={contentRect.bounds ? contentRect.bounds.width : 0}
                >
                  {value}
                </Truncate>
              </a>
            </span>
          </h4>
        );
      return (
        <h4 className="font-weight-normal">
          {field}: <span className="font-weight-bold">{value}</span>
        </h4>
      );
    });
  }

  render() {
    const divClassName = 'pl-lg-4';
    return (
      <Modal {...this.props} size="lg" className="modal" centered>
        <ModalHeader>
          <h2 className="mb-0">Transaction Successful!</h2>
        </ModalHeader>
        <ModalBody>
          <FormGroup tag="fieldset">
            <Measure bounds>
              {({ measureRef, contentRect }) => (
                <div ref={measureRef} className={divClassName}>
                  {this.renderReceipt(this.props.receipt, contentRect)}
                </div>
              )}
            </Measure>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={this.props.onExit}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
