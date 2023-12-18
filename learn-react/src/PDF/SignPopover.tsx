import React, { useState } from "react";
import { Button, Popover, Modal } from "antd";
import DrawSign from "./DrawSign";
interface SignPopoverProps {
  svg: string;
  onNewSignature: (sign: string) => void;
}
const SignPopover: React.FC<SignPopoverProps> = ({ svg, onNewSignature }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onCreateSignature = (sign: string) => {
    onNewSignature(sign);
    setIsModalOpen(false);
  };
  const content = (
    <div style={{ backgroundColor: "white" }}>
      <div dangerouslySetInnerHTML={{ __html: svg }} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Button>Use Signature</Button>
        <Button onClick={showModal}>New Signature</Button>
      </div>
    </div>
  );
  return (
    <div>
      <Modal
        style={{ zIndex: 2147483647 }}
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <DrawSign onSign={onCreateSignature} />
      </Modal>
      {svg ? (
        <Popover placement="bottom" content={content}>
          <Button>Sign PDF</Button>
        </Popover>
      ) : (
        <Button onClick={showModal}>New Signature</Button>
      )}
    </div>
  );
};

export default SignPopover;
