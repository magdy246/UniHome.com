import React, { useEffect, useRef } from 'react';

const VideoConference = () => {
  const jitsiContainerRef = useRef(null);

  useEffect(() => {
    const domain = 'meet.jit.si';
    const options = {
      roomName: 'my-room',
      parentNode: jitsiContainerRef.current,
      userInfo: {
        displayName: 'Student',
      },
    };
    const api = new window.JitsiMeetExternalAPI(domain, options);

    return () => api.dispose();
  }, []);

  return <div ref={jitsiContainerRef} style={{ height: '100vh', width: '100%' }} />;
};

export default VideoConference;