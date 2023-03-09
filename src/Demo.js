import { useState, useEffect } from 'react';

import { createFFmpeg } from "@ffmpeg/ffmpeg"

let ffmpeg = null;

const TESTDATA_URL = 'https://github.com/ffmpegwasm/testdata';

function Demo() {
	const IS_COMPATIBLE = typeof SharedArrayBuffer === 'function';
	// const IS_COMPATIBLE = false;
  const mainName = IS_COMPATIBLE ? 'proxy_main' : 'main';
  const corePath = IS_COMPATIBLE ?
    'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js'
    : 'https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js';

    useEffect(() => {
      if (ffmpeg === null) {
        ffmpeg = createFFmpeg({
          log: true,
          mainName,
          corePath,
        });
      }
      ffmpeg.setLogger(({ type, message }) => {
        if (type !== 'info') {
          // setMessage(message);
        }
      });
      ffmpeg.setProgress(({ ratio }) => {
        if (ratio >= 0 && ratio <= 1) {
          // setProgress(ratio * 100);
        }
        if (ratio === 1) {
          // setTimeout(() => { setProgress(0); }, 1000);
        }
      });
    });

  return (
    <div  container direction="column" >
      <p align="center" variant="h4">
        Demo
      </p>
      <p  align="center" variant="h6">
        Try ffmpeg.wasm now!
      </p>
			{!IS_COMPATIBLE ? (
				<p align="center" variant="h6">
					Your browser doesn't support SharedArrayBuffer, thus ffmpeg.wasm single thread version is used. (which is SLOW) Please use latest version of Chromium or any other browser supports SharedArrayBuffer.
				</p>
			): null}
			{/* <FFmpeg mainName={mainName} corePath={corePath} {...props} /> */}
				
				<div container justify="space-between" alignItems="flex-end">
					<div item>
						
					</div>
					<div item>
						
					</div>
				</div>
				
      {/*
      <p className={classes.para} align="center" variant="h6">
        Live Demo on CodePen
      </p>
      <div container justify="center" spacing={2}>
        {
          CODEPENS.map(({ title, url }) => (
            <div item key={url}>
              <DemoLinkCard
                img={codepen}
                title={title}
                url={url}
              />
            </div>
          ))
        }
      </div>
      */}
    </div>
  );
}

export default Demo;
