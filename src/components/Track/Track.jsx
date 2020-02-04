import React, {PureComponent} from "react";
import "./Track.css";
import AbletonColors from "../../AbletonColors";
import Clip from "../Clip";

class Track extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            zoom: 0.5,
            width: 0,
            height: 0,
            TrackGroup:
                this.props.track.TrackGroupId.Value < 0
                    ? ''
                    : this.props.track.TrackGroupId.Value
        };

        this.Clips = this._try(
            () =>
                this
                    .props
                    .track
                    .DeviceChain
                    .MainSequencer
                    .ClipTimeable
                    .ArrangerAutomation
                    .Events
                    .MidiClip,
            []
        );

        if (this.Clips.lenth === 0)
            this.Clips = this._try(
                () =>
                    this
                        .props
                        .track
                        .DeviceChain
                        .MainSequencer
                        .Sample
                        .ArrangerAutomation
                        .Events
                        .AudioClip,
                []
            );

        if (!Array.isArray(this.Clips))
            this.Clips = [this.Clips];
    }

    _try = (func, fallbackValue) => {
        try {
            let value = func();
            return value === null || value === undefined ? fallbackValue : value;
        } catch (e) {
            return fallbackValue;
        }
    };

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }

        const ClipList = Clips => (
            <>
                {Clips.map(clip => (
                    <Clip key={clip.Id} clip={clip} zoom={this.state.zoom}/>
                ))}
            </>
        );

        const GridLines = GridSize => (
            <>
                {Array.from(Array(GridSize), (x, index) => index + 1).map(gridLine => (
                    <span
                        key={gridLine}
                        className={"GridLine"}
                        style={{
                            left: 16 * gridLine * this.state.zoom + "%",
                            right: 100 - 16 * gridLine * this.state.zoom + "%"
                        }}
                    >
          </span>
                ))}
            </>
        );

        return (
            <div className="TrackWrapper">
                <div className={"Clips"}>
                    {GridLines(32)}
                    {ClipList(this.Clips)}
                </div>
                <div className={"TrackName"}
                     style={{background: AbletonColors.GetByIndex(this.props.track.ColorIndex.Value)}}>
                    <span className="GroupIndex">[{this.state.TrackGroup}]</span>
                    {this.props.track.Name.EffectiveName.Value}
                </div>
            </div>
        );
    }
}

Track.propTypes = {};

Track.defaultProps = {};

export default Track;
