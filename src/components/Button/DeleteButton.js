import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteButton = ({deleteRows, selected, ...props}) => {
  const [open, setOpen] = React.useState(false);

  const handleDelete = (e) => {
    e.preventDefault();
    deleteRows();
    handleClose();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        {...props}
        variant="outlined"
        disabled={selected.length > 0 ? false : true}
        onClick={handleClickOpen}
      >
        DELETE
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Delete Records ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete record[s] ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            size="large"
            variant="outlined"
            color="primary"
            style={{ padding: "7px 50px" }}
          >
            cancel
          </Button>
          <Button
            onClick={handleDelete}
            size="large"
            variant="outlined"
            color="primary"
            style={{ padding: "7px 50px" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteButton;
