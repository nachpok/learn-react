import React, { useState } from "react";
import { Button, Popover, Modal } from "antd";
import DrawSign from "./DrawSign";
import { ElementType } from "./ReactPdf";
interface SignPopoverProps {
  svg: string;
  elementType: ElementType;
  setElementType: (newElementType: ElementType) => void;
  onNewSignature: (sign: string) => void;
  style: React.CSSProperties;
}
const SignPopover: React.FC<SignPopoverProps> = ({
  svg,
  onNewSignature,
  elementType,
  setElementType,
  style,
}) => {
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
    <div style={{ backgroundColor: "white", ...style }}>
      {" "}
      <div dangerouslySetInnerHTML={{ __html: svg }} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Button
          onClick={() => {
            elementType === ElementType.sign
              ? setElementType(ElementType.empty)
              : setElementType(ElementType.sign);
          }}
        >
          Use Signature
        </Button>

        <Button onClick={showModal}>New Signature</Button>
      </div>
    </div>
  );
  return (
    <div>
      <Modal
        style={{ zIndex: 9999999999 }}
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
          <Button
            type={elementType === ElementType.sign ? "primary" : "default"}
          >
            Sign PDF
          </Button>
        </Popover>
      ) : (
        <Button onClick={showModal}>New Signature</Button>
      )}
    </div>
  );
};

export default SignPopover;
