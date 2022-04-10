import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Player } from '@vime/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  constructor() {
    // this.createOwnCustomVideoPlayer();
  }
  ngAfterViewInit(): void {
    this.createOwnCustomVideoPlayer();
  }

  createOwnCustomVideoPlayer() {
    const videoPlayer = !!document.createElement('video').canPlayType;

    if (videoPlayer) {
      const videoContainer = document.getElementById(
        'videoContainer'
      ) as HTMLElement;
      const video = document.getElementById('video') as HTMLMediaElement;
      const videoControls = document.getElementById(
        'video-controls'
      ) as HTMLElement;

      // Hide the default controls
      video.controls = false;
      videoControls.style.display = 'block';

      const playpause = document.getElementById('playpause') as HTMLElement;
      const stop = document.getElementById('stop') as HTMLElement;
      const mute = document.getElementById('mute') as HTMLElement;
      const volinc = document.getElementById('volinc') as HTMLElement;
      const voldec = document.getElementById('voldec') as HTMLElement;
      const progress = document.getElementById(
        'progress'
      ) as HTMLProgressElement;
      const progressBar = document.getElementById(
        'progress-bar'
      ) as HTMLElement;
      const fullscreen = document.getElementById('fs') as HTMLElement;

      playpause.addEventListener('click', function (e) {
        if (video.paused || video.ended) video.play();
        else video.pause();
      });

      stop.addEventListener('click', function (e) {
        video.pause();
        video.currentTime = 0;
        progress.value = 0;
      });

      mute.addEventListener('click', function (e) {
        video.muted = !video.muted;
      });

      volinc.addEventListener('click', function (e) {
        alterVolume('+');
      });
      voldec.addEventListener('click', function (e) {
        alterVolume('-');
      });
      const alterVolume = function (dir: string) {
        var currentVolume = Math.floor(video.volume * 10) / 10;
        if (dir === '+') {
          if (currentVolume < 1) video.volume += 0.1;
        } else if (dir === '-') {
          if (currentVolume > 0) video.volume -= 0.1;
        }
      };

      video.addEventListener('loadedmetadata', function () {
        progress.setAttribute('max', video.duration + '');
      });
      video.addEventListener('timeupdate', function () {
        if (!progress.getAttribute('max'))
          progress.setAttribute('max', video.duration + '');
        progress.value = video.currentTime;
        progressBar.style.width =
          Math.floor((video.currentTime / video.duration) * 100) + '%';
      });
      progress.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const pos = (e.pageX - rect.left) / this.offsetWidth;
        video.currentTime = pos * video.duration;
      });
      fullscreen.addEventListener('click', function (e) {
        handleFullscreen();
      });
      const doc = document.documentElement;
      const handleFullscreen = function () {
        if (isFullScreen()) {
          if (document.exitFullscreen) document.exitFullscreen();
          setFullscreenData(false);
        } else {
          if (videoContainer.requestFullscreen)
            videoContainer.requestFullscreen();
          setFullscreenData(true);
        }
      };
      var isFullScreen = function () {
        return !!(document.fullscreen || document.fullscreenElement);
      };

      var setFullscreenData = function (state: boolean) {
        videoContainer.setAttribute('data-fullscreen', !!state + '');
      };
      document.addEventListener('fullscreenchange', function (e) {
        setFullscreenData(
          !!(document.fullscreen || document.fullscreenElement)
        );
      });
    }
  }
}
