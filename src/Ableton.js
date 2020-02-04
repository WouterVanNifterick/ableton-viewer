import Zlib from 'zlib';
import xml2js from 'xml2js';

class Ableton{
    Color(index){
        
    }
   
    NormalizeAbletonNode(abletonNode){
        // Make sure that all tracks are arrays
        let LiveSet = abletonNode.LiveSet;
        let Tracks = LiveSet.Tracks;
        if (typeof Tracks.AudioTrack  === 'undefined') Tracks.AudioTrack  = [];
        if (typeof Tracks.MidiTrack   === 'undefined') Tracks.MidiTrack   = [];
        if (typeof Tracks.ReturnTrack === 'undefined') Tracks.ReturnTrack = [];
        if (typeof Tracks.GroupTrack  === 'undefined') Tracks.GroupTrack = [];
        if (!Array.isArray(Tracks.AudioTrack))  Tracks.AudioTrack  = [Tracks.AudioTrack];
        if (!Array.isArray(Tracks.MidiTrack))   Tracks.MidiTrack   = [Tracks.MidiTrack];
        if (!Array.isArray(Tracks.ReturnTrack)) Tracks.ReturnTrack = [Tracks.ReturnTrack];
        if (!Array.isArray(Tracks.GroupTrack))  Tracks.GroupTrack  = [Tracks.GroupTrack];
        abletonNode.LiveSet.Tracks = Tracks;
    }

    LoadFromArrayBuffer(arrayBuffer, OnLoaded, OnError){        
        let fileBuffer = Buffer.from(arrayBuffer);
        let xml = Zlib.gunzipSync(fileBuffer).toString();
        let parser = new xml2js.Parser({mergeAttrs: true, explicitArray: false});
        parser.parseString(xml,
            (err, result) => {
                if(err){
                    OnError(err);
                    return;
                }

                this.NormalizeAbletonNode(result.Ableton);                

                OnLoaded(result);
            });
    }
}

export default Ableton;