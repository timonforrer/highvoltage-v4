import React from 'react';
import getYoutubeID from 'get-youtube-id'
import LiteYoutubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYoutubeEmbed.css'

export default (props) => {
  // eslint-disable-next-line react/prop-types
  const {url, renderDefault, title} = props
  if (!url) {
    return <div>Missing youtube URL…</div>
  }
  const id = getYoutubeID(url)
  return (
    <div>
      {renderDefault({...props, title: `${title ?? ''} (click to edit)`})}
      <LiteYoutubeEmbed id={id} />
    </div>
  )
}