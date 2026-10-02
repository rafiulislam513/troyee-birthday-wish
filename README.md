# Troyee Birthday Website ❤️

A mobile-first interactive birthday website built with plain HTML, CSS and JavaScript.

## 1. Open in VS Code

1. Extract this folder.
2. Open VS Code.
3. Click **File > Open Folder**.
4. Select the `troyee-birthday-site` folder.

## 2. Recommended VS Code extension

Install **Live Server** by Ritwick Dey.

Then right-click `index.html` and choose:

**Open with Live Server**

The website will open in your browser.

## 3. Folder structure

troyee-birthday-site/
│
├── index.html
├── styles.css
├── script.js
├── README.md
└── assets/
    ├── images/
    │   ├── photo-1.svg
    │   ├── photo-2.svg
    │   ├── ...
    │   ├── photo-8.svg
    │   └── video-poster.svg
    │
    ├── video/
    │   └── birthday-message.mp4   <-- PUT YOUR VIDEO HERE
    │
    └── audio/
        └── background.mp3        <-- OPTIONAL MUSIC

## 4. Add her real photos

The current `photo-1.svg` to `photo-8.svg` files are placeholders.

The easiest method:

1. Put her photos into `assets/images/`.
2. Rename them:
   - photo-1.jpg
   - photo-2.jpg
   - ...
   - photo-8.jpg
3. In `index.html`, change each path from:
   `assets/images/photo-1.svg`
   to:
   `assets/images/photo-1.jpg`

Do the same for all eight.

You can also use PNG or WEBP.

## 5. Add your birthday video

Export your video as MP4.

Name it exactly:

birthday-message.mp4

Put it here:

assets/video/birthday-message.mp4

The website is designed for a portrait 3:4 video.

## 6. Add background music

If you want music, put an MP3 here:

assets/audio/background.mp3

The ♫ button in the top-right turns it on/off.

Browsers do not allow music to autoplay before user interaction, so she needs to tap the music button.

## 7. Important mobile testing

In Chrome:

1. Press F12.
2. Click the phone/tablet icon.
3. Test around:
   - 360 × 800
   - 390 × 844
   - 430 × 932

Also test on your real phone before publishing.

## 8. The game

Controls:
- Left arrow
- Jump
- Right arrow

Goal:
- Collect at least 3 hearts.
- Reach the DISTANCE wall.
- Wait while the heart bridge appears.
- Cross the bridge.
- Reach "ME".
- The video chapter unlocks.

The game also works with keyboard arrows on desktop.

## 9. Editing text

Most text is inside `index.html`.

The 23 love-heart messages are inside `script.js` in:

`const loveLines = [...]`

## 10. Publishing later

When everything is finished, we can publish it on GitHub Pages like your previous gift website.

Do NOT upload yet if you still want us to refine the design, photos, game, video sequence, animations or wording.


## Enhanced game version

The upgraded game now includes:
- 8 required heart shards
- 3 lives
- checkpoints
- spike hazards
- moving platforms
- moving hostile glow-orbs
- a wind/push section
- a locked DISTANCE gate
- a heart bridge that physically builds tile-by-tile across the final gap

The rest of the birthday content remains unchanged.
