import { useState } from "react";
import "./style.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
type ModalDialogProps = {
  handleClose: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  show: boolean;
  children: any;
};
export default function ModalDialog(props: ModalDialogProps) {
  const { handleClose, show } = props;
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section
        className={"modal-main rounded-xl relative p-4" + " " + props.className}
      >
        <button
          className="absolute right-4 top-4"
          type="button"
          onClick={handleClose}
        >
          <AiOutlineCloseCircle />
        </button>
        {props.children}
      </section>
    </div>
  );
}
