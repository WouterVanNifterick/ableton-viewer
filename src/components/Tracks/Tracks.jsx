import React, {PureComponent} from 'react';
import Track from '../Track/Track';
import './Tracks.css';

class Tracks extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
        };
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }

        if (!this.props.ableton)
            return <div className="TracksWrapper">
                <div className="Header">Live set</div>
                <p>
                No set loaded
                </p>
            </div>;

        const TrackList = Tracks => (
            <>
                {Tracks.map(
                    track =>
                        <Track
                            key={track.Id}
                            track={track}
                        />
                )}
            </>
        );

        let tracks = this.props.ableton.Ableton.LiveSet.Tracks;

        let allTracks = [
            ...tracks.GroupTrack,
            ...tracks.AudioTrack,
            ...tracks.MidiTrack,
            ...tracks.ReturnTrack,
        ];

        return (
            <div className="TracksWrapper">
                <div className="Header">
                    {this.props.ableton.Ableton.Creator}
                </div>

                {TrackList(allTracks)}
            </div>
        );
    }
}

Tracks.propTypes = {};

Tracks.defaultProps = {};

export default Tracks;
