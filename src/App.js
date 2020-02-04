import React, {useCallback, useState} from 'react';
import './App.css';
import {useDropzone} from 'react-dropzone';
import Tracks from './components/Tracks/index';
import Ableton from './Ableton';

function App() {
    const [state, setState] = useState({
        Ableton: null,
        zoom: 0.2
    });

    const onDrop = useCallback(acceptedFiles => {

        const reader = new FileReader();

        reader.onabort = () => console.log('file reading was aborted');

        reader.onerror = () => console.log('file reading has failed');

        reader.onload = () => new Ableton().LoadFromArrayBuffer(reader.result, AbletonSet => setState({Ableton: AbletonSet}));

        acceptedFiles.forEach(file => reader.readAsArrayBuffer(file))
    }, []);

    const {getRootProps, getInputProps} = useDropzone({onDrop});

    const HandleChange = (e) => {
        const val = e.target.value;
        console.log(val);
        setState({
            zoom: val,
            Ableton: state.Ableton
        });
    };

    return (
    <div>
        <div {...getRootProps()} id="InputContainer">
            <input {...getInputProps()} />
            Drop an Ableton .als file here, or click to browse
        </div>
        <input type="range" min="1" max="100" className="slider" id="myRange" onChange={HandleChange}
               value={state.zoom}/>

        <Tracks ableton={state.Ableton}/>
    </div>);
}

export default App;