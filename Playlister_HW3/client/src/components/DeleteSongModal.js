import React, { Component } from 'react';

export default class DeleteSongModal extends Component {
    handleConfirmRemoveSong = () => {
        this.props.deleteSongCallback();
    }

    handleCancelRemoveSong = () => {
        this.props.hideModalCallback();
    }

    render() {
        const {
            isOpenCallback,
            songToRemove } = this.props;

        let modalClass = "modal";
        if (isOpenCallback()) {
            modalClass += " is-visible";
        }
        let songTitle = "";
        if (songToRemove) {
            songTitle = songToRemove.title;
        }
        return (
            <div
                id="remove-song-modal"
                className={modalClass}
                data-animation="slideInOutLeft">
                <div className="modal-root" id='verify-remove-song-root'>
                    <div className="modal-north">
                        Remove {songTitle}?
                    </div>
                    <div className="modal-center">
                        <div className="modal-center-content">
                            Are you sure you wish to permanently remove <span>{songTitle}</span> from the playlist?
                        </div>
                    </div>
                    <div className="modal-south">
                        <input type="button" id="remove-song-confirm-button" className="modal-button" onClick={this.handleConfirmRemoveSong} value='Confirm' />
                        <input type="button" id="remove-song-cancel-button" className="modal-button" onClick={this.handleCancelRemoveSong} value='Cancel' />
                    </div>
                </div>
            </div>
        );
    }
}