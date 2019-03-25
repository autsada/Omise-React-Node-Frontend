import React from "react";

import Backdrop from "./Backdrop";
import Modal from "./Modal";

const MessageDetails = ({ closeModal, charge }) => {
  return (
    <React.Fragment>
      {(!charge || !charge.amount) && <p>Oops...something went wrong!!</p>}
      {charge && charge.amount && (
        <div>
          <Backdrop />
          <Modal charge={charge} closeModal={closeModal} />
        </div>
      )}
    </React.Fragment>
  );
};

export default MessageDetails;
