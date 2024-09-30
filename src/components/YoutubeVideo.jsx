import React from 'react';
import "video-react/dist/video-react.css"; // Adjusted import statement
import { Player } from 'video-react';
import Youtube from "./Assets/Videos/React Paypal checkout شرح كامل [Sandbox and Live accounts].mp4"


const YoutubeVideo = (props) => {
  return (
    <Player
      playsInline
      poster="/assets/poster.png" // Ensure this path is correct
      src={Youtube}
      controls // Added controls for playback
      autoPlay // Optional: uncomment if you want the video to play automatically
      loop // Optional: uncomment if you want the video to loop
    />
  );
};

export default YoutubeVideo;
