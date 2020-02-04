import React, {PureComponent} from 'react';
import AbletonColors from "../../AbletonColors";
import "./Clip.css";

class Clip extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            zoom: this.props.zoom
        };
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }

        let clip = this.props.clip;

        return (
            <span
                key={clip.Id}
                className={"Clip"}
                style={{
                    left: clip.CurrentStart.Value * this.state.zoom + "%",
                    right: 100 - clip.CurrentEnd.Value * this.state.zoom + "%",
                    color: AbletonColors.GetFGByIndex(clip.ColorIndex.Value)
                }}
            >
        <span
            className={'Events'}
            style={{
                backgroundColor: AbletonColors.GetByIndex(clip.ColorIndex.Value)
            }}
        >
        &nbsp;
        </span>

        <span className={'ClipName'}>
            {clip.Name.Value}
        </span>
      </span>
        );
    }
}

export default Clip;
