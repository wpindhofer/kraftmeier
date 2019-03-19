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
                        <Button variant="contained" onClick={() => this.handleClose(true)}>
                            {this.props.buttonOk}
                        </Button>
                        <Button variant="contained" onClick={() => this.handleClose(false)}
                                color="secondary">
                            {this.props.buttonNotOk}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}