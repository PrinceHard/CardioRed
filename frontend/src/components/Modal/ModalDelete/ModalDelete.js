import React from "react";

import "./ModalDelete.css";

const ModalDelete = ({ element, show, setShow, setShowModalView, deleteElement }) => {
    if (!show) {
        return null;
    }

    const article = element === "Consulta" ? "a" : "o";

    return (
        <div className="modal fade show">
            <div className="modal-dialog modal-sm modal-dialog-centered modal-delete">
                <div className="modal-content ">
                    <div className="modal-header">
                        <h5 className="modal-title">{element}</h5>
                        <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
                    </div>
                    <div className="modal-body">
                        Tem certeza que deseja remover {article} {element.toLowerCase()} selecionad{article}?
                    </div>
                    <div className="modal-footer d-flex justify-content-between modal-footer-delete">
                        <button
                            type="button"
                            className="btn btn-primary btn-modal-delete btn-left"
                            onClick={() => setShow(false)}
                        >
                            Não
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary btn-modal-delete"
                            onClick={() => {
                                deleteElement();
                                setShow(false);
                                setShowModalView(false);
                            }}
                        >
                            Sim
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalDelete;
