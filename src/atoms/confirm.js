import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

const Transition = React.forwardRef(function Transition(
  { direction = 'up', ...props },
  ref
) {
  return <Slide direction={direction} ref={ref} {...props} />;
});

export function Confirm({
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  direction = 'up',
  onConfirm = () => {},
  onCancel = () => {},
  onClose = () => {},
  open = true,
  title = 'Are you sure?',
  toggle = () => {},
  subtitle = 'Confirm that you really want to do this',
  disableSave = false,
  errors,
  ...props
}) {
  const [isOpen, setOpen] = React.useState(false);

  function handleCancel() {
    callAll(onCancel(), setOpen(false), onClose());
  }

  async function handleConfirm() {
    const result = await onConfirm();

    if (Object.keys(errors).length > 0) {
      return;
    } else {
      callAll(setOpen(false), onClose());
    }
  }

  React.useEffect(() => {
    if (open && typeof open === 'boolean') {
      setOpen(open);
    }
  }, [open]);

  return (
    <Dialog
      open={isOpen}
      onClose={handleCancel}
      TransitionComponent={Transition}
      TransitionProps={{ direction }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {props.children ? (
          props.children
        ) : (
          <DialogContentText id="alert-dialog-description">
            {subtitle}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm} color="primary" disabled={disableSave}>
          {confirmText}
        </Button>
        <Button onClick={handleCancel} color="primary" autoFocus>
          {cancelText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

Confirm.propTypes = {
  open: PropTypes.bool,
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),
  onConfirm: PropTypes.func.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  title: PropTypes.element,
  subtitle: PropTypes.element,
};

export default Confirm;
