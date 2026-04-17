Stage 3: The Starting Point (/start)
   * The Style: A dark terminal with a green "Scanline" effect and flickering text.
   * The Noise: 
       * Add fake "System Loading" logs that scroll past quickly.
       * Surround the riddle image with "Red Herrings": fake mathematical constants (e.g., $\pi \approx 3.14$, $e \approx 2.71$) and binary strings that mean
         nothing.
       * The Twist: Add a "Timer" at the top that counts down from 99:99. It does nothing, but it makes players panic and rush, leading to mistakes.

  Stage 4: The Result Page (/s/7b2e84)
   * The Style: A "Corrupted System" look. High contrast, distorted fonts.
   * The Noise: 
       * Instead of one line, fill the page with 500 lines of "Base64 encoded" garbage data.
       * Hide the clue "get back and find the robots" in the middle of this mess.
       * The Twist: Set the text color to almost match the background (e.g., dark grey text on black background). They will have to highlight the text with their
         mouse to read it clearly.

  Stage 5: The Source Code Page (/s/d1c559)
   * The Style: A completely white, blindingly bright page.
   * The Noise:
       * In the robots.txt, add 50 fake "Disallow" paths like /admin, /secrets, /passwords. All of them should lead to a "Rickroll" or a fake 404.
       * In the HTML source, add 10,000 lines of dummy comments (lyrics to songs, random Wikipedia text).
       * The Twist: Put the real clue at the very bottom (line 10,001) so they have to scroll for a long time, or hide it inside a fake JavaScript function name.

  Stage 6: The EXIF Image (/s/f4a812)
   * The Style: A "Security Camera" or "Evidence" folder look.
   * The Noise: 
       * Display three different images. One is the brick wall, one is a forest, one is a city.
       * Players won't know which one has the metadata. They will have to download and check all of them.
       * The Twist: Add a CSS "glitch" animation to the images so they flicker. It makes it harder to see if there is something hidden visually in the pixels
         (there isn't, but it will distract them).

  Stage 7: The Audio (/audio/spectrum-analyzer.wav)
   * The Noise: 
       * Layer the audio with "Eerie Whispers" or a high-pitched beep that happens every 5 seconds.
       * The Twist: Play the real audio backwards. The spectrogram will still look the same (coordinates), but if they try to "listen" for clues, they will be
         completely confused.