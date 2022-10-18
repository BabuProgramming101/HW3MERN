import React, { Component } from 'react';

export default class DeleteListModal extends Component {

    handleDeleteMarkedList = () => {
        this.props.deleteMarkedListCallback();
    }

    handleCancelDeleteList = () => {
        this.props.hideModalCallback();
    }
 
    render() {
        const {isOpenCallback, nameOfList} = this.props;
        let name = "";
        if (nameOfList) {
            name = nameOfList.name;
        }
        let modalClass = "modal";
        if (isOpenCallback()) {
            modalClass += " is-visible";
        }
        return (
            <div
                id="delete-list-modal"
                className={modalClass}
                data-animation="slideInOutLeft">
                <div className="modal-root" id='verify-delete-list-root'>
                    <div className="modal-north">
                    Delete Playlist?
                    </div>
                    <div className="modal-center">
                        <div className="modal-center-content">
                            Are you sure you wish to permanently delete the <span>{name}</span> playlist?
                        </div>
                    </div>
                    <div className="modal-south">
                        <input type="button" id="remove-song-confirm-button" className="modal-button" onClick={this.handleDeleteMarkedList} value='Confirm' />
                        <input type="button" id="remove-song-cancel-button" className="modal-button" onClick={this.handleCancelDeleteList} value='Cancel' />
                    </div>
                </div>
            </div>
        );
    }
}