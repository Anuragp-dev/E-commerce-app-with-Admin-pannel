import React from 'react'
import { Modal } from 'antd';

// coustom models for opens for conformations
const CustomModal = (props) => {
    const { open, hideModal , performAction , title } = props;
  return (
    <Modal
        title="Confirmation"
        open={open}
        onOk={performAction}
        onCancel={hideModal}
        okText="Ok"
        cancelText="Cancel"
      >
        <p>{ title }</p>

     // model confirmation 
      </Modal>
  )
}

export default CustomModal
