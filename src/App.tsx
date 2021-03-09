import React from 'react';
import './App.css';
import {DocumentUploadButton} from "./components/DocumentUploadButton";
import {readExcel} from "./utils/excel.utils";

function App() {
    const onDocumentSelected = (file: string | ArrayBuffer | null) => {
        if (!file) {
            throw new Error('Error while selecting file');
        }
        readExcel(file);
    };

    return (
        <div className="App">
            <DocumentUploadButton onDocumentSelected={(file) => onDocumentSelected(file)}/>
        </div>
    );
}

export default App;

