import React, { useEffect, useRef } from 'react';

const VideoConference = () => {
  const jitsiContainerRef = useRef(null);

  useEffect(() => {
    // Function to load the Jitsi external API script
    const loadJitsiScript = () => {
      return new Promise((resolve, reject) => {
        const existingScript = document.getElementById('jitsi-script');
        if (!existingScript) {
          const script = document.createElement('script');
          script.src = 'https://meet.jit.si/external_api.js';
          script.id = 'jitsi-script';
          script.async = true;
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        } else {
          resolve();
        }
      });
    };

    // Load the script and initialize the Jitsi API
    loadJitsiScript()
      .then(() => {
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
      })
      .catch((error) => {
        console.error('Failed to load Jitsi script:', error);
      });
  }, []);

  return <div ref={jitsiContainerRef} style={{ height: '100vh', width: '100%' }} />;
};

export default VideoConference;
