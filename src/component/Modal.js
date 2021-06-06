import React from "react";
import ReactDOM from "react-dom";
const Modal = ({title,icon,content,actions, onDismiss}) => {
  return ReactDOM.createPortal(
    <div onClick={onDismiss} className="ui dimmer modals visible active">
      <div onClick={(e)=>e.stopPropagation()} className="ui standard modal visible active">
        <div className="ui icon header">
        <i className={`${icon}`}></i>
          {title}
        </div>
        <div className="content">
          <p>
            {content}
          </p>
        </div>
        <div className="actions">
          {actions}
        </div>
      </div>
    </div>,

    document.querySelector("#modal")
  );
};

export default Modal;
