import React, { CSSProperties, FC, useState } from 'react'
import AgoraUIKit, { layout, MaxVideoView, PropsInterface, StylePropInterface } from 'agora-react-uikit'
import config from '../src/config'
const VideoChat: FC = () => {
  const [videocall, setVideocall] = useState(true)
  const state = useState(true)
  const [isHost, setHost] = useState(true)
  const [isPinned, setPinned] = useState(false)
  const [username, setUsername] = useState('')

  console.log(config.agora_app_id)
  
  const agoraProps:PropsInterface = {
    rtcProps:{
        appId: config.agora_app_id,
        channel: config.agora_app_channel,
        token:config.agora_channel_token,
        role: isHost ? 'host' : 'audience',
        layout: isPinned ? layout.pin : layout.grid
    },
    rtmProps:{
        username: username || 'user', 
        displayUsername: true
    },
    callbacks:{
        EndCall: () => setVideocall(false),
    },
    styleProps:{
      localBtnContainer:{borderWidth:'1px', borderColor:'#333333', marginTop:'5px',backgroundColor:'#8009090', borderRadius:'10px' },
      maxViewContainer:{},
  
    }
  }

 
  
  return (
    <div className='h-screen bg-slate-100'>
    <div className=' lg:m-auto lg:w-[70%] p-5  h-[100%] flex flex-1 bg-slate-400'>
      <div className='flex flex-col flex-1'>
        <div className=' w-fit  p-2 pb-0 mb-5'>
          <h1 className=' text-5xl font-semibold tracking-wide text-white mb-5 ring-slate-500' >Chat APP</h1>
        </div>
        { videocall ? ( <>

          <div className='flex space-x-3 mb-5'>
            <p style={{ fontSize: 20, width: 200 }}>You're {isHost ? 'a host' : 'an audience'}</p>
            <p className='bg-slate-800  hover:bg-slate-500  hover:transition-colors p-2 rounded-md text-white cursor-pointer'  onClick={() => setHost(!isHost)}>Change Role</p>
            <p className='bg-slate-800  hover:bg-slate-500  hover:transition-colors p-2 rounded-md text-white cursor-pointer' onClick={() => setPinned(!isPinned)}>Change Layout</p>
          </div>
          <AgoraUIKit  {...agoraProps} /></>

        ) : (
          <div style={styles.nav}>
              <input style={styles.input} placeholder='nickname' type="text" value={username} onChange={(e) => { setUsername(e.target.value) }} />
            <h3 style={styles.btn} onClick={() => setVideocall(true)}>Start Call</h3>
          </div>
        )}
      </div>
    </div>
    </div>
  )
}

const styles = {
  container: { width: '100vw', height: '100vh', display: 'flex', flex: 1, backgroundColor: '#007bff22'},
  heading: { textAlign: 'center' as const, marginBottom: 0 },
  videoContainer: { display: 'flex', flexDirection: 'column', flex: 1 } as CSSProperties,
  nav: { display: 'flex', justifyContent: 'space-around' },
  btn: { backgroundColor: '#007bff', cursor: 'pointer', borderRadius: 5, padding: '4px 8px', color: '#ffffff', fontSize: 20 },
  input: {display: 'flex', height: 24, alignSelf: 'center'} as CSSProperties
}

export default VideoChat