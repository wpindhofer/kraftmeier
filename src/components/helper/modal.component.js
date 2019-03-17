import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default class Modal extends Component {

    handleClose(a) {
        this.props.onClose(a);
    };

    render() {
        // Render nothing if the "show" prop is false
/*        if (!this.props.show) {
            return null;
        }*/

        return (
            <div>
                <Dialog
                    open={this.props.show}
                    onClose={() => this.handleClose(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{this.props.dialogTitle}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.props.dialogText}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleClose(true)} color="primary" autoFocus>
                            {this.props.buttonOk}
                        </Button>
                        <Button onClick={() => this.handleClose(false)} color="primary">
                            {this.props.buttonNotOk}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>




/*
            <div className="modal fade" animation={false}>>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Modal Header</h4>
                            <button type="button" className="close"
                                    onClick={() => this.props.onClose()}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <p>{this.props.children}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" onClick={() => this.props.onClose()}>Close
                            </button>
                            {/!*data-dismiss="modal"*!/}
                        </div>
                    </div>

                </div>
            </div>
*/


        );
    }
}