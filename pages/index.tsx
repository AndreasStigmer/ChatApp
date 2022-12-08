import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'

const VideoChat=dynamic(()=>import('../components/videocall'), {ssr:false})

export default function Home() {
  return (
   <>
   <VideoChat></VideoChat>
   </>
  )
}
