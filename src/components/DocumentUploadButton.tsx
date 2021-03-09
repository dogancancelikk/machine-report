import React, { ChangeEvent } from 'react';

export interface DocumentUploadButtonProps {
    onDocumentSelected: (file: string | ArrayBuffer| null) => void;
}

export const DocumentUploadButton = (props: DocumentUploadButtonProps) => {
    const { onDocumentSelected } = props;
    const reader = new FileReader();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.persist();
        let files = event.target.files;
        if (files !== undefined) {
            reader.onloadend = () => {
                if (files !== undefined) {
                    onDocumentSelected(reader.result);
                }
            };
            if (files && files.length !== 0) {
                reader.readAsArrayBuffer(files[0]);
            }
        }
    };

    return (
        <div>
            <input type="file" onChange={handleChange}/>
        </div>
    );
};
