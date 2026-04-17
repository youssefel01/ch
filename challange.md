## Stage 1 — Binary paper

**Input:** A physical paper with a binary number written on it. Example: `00110100 00110010`

**TO DO:** Convert the binary to an integer and get the class number. 

**Output:** The number for example 7.

**How they move on:** The paper itself has a printed instruction at the bottom: *"This number is your classroom. Go find it BR-X."* They physically walk to classroom BR-X.

---

## Stage 2 — LinkedIn profile

**Input:** Inside classroom BR-X, there is a paper . It says: *"SMYA DYAL CHI 7AD”* 

**TO DO:** They search the name, and they should find it on linkedin open the profile. they try to find a  QR code hidden somewhere on the profile.

**Output:** They find and scan the QR code.

**How they move on:** The QR code opens a URL directly in their browser: `yoursite.com/start`.

---

## Stage 3 — The equation

**Input:** The page at `yoursite.com/start` shows a white image with a math equation written on it in  black text. Example: 

(we can make the equation harder, this is just an example.)

“

 *f(x) = x² - 3x + 2*

f(7) will tell you the direction

“

**TO DO:** They solve the equation. `f(7) = 49 - 21 + 2 = 30`.

**Output:** The number `30`.

**How they move on:** They type `yoursite.com/30` in the browser and press enter.

---

## Stage 4 — robots.txt

**Input:** The page at `yoursite.com/30` is almost empty. It contains just one line of text: *"good job, now get back and find the robots"*

**TO DO:** They understand this hint points to `robots.txt`. They type `yoursite.com/robots.txt` in the browser.

**Output:** The robots.txt file contains: *"*

User-agent: *
Disallow: /xyz

you should read everything if you want win

“

**How they move on:** They notice `/xyz` is listed in the robots.txt. They type `yoursite.com/xyz` in the browser.

---

## Stage 5 — HTML source code

**Input:** The page at `yoursite.com/xyz` looks completely blank.

**TO DO:** They press `Ctrl+U` or right-click → View Page Source. They read through the HTML. Hidden inside is a comment that says:

<!-- good job. now inspect the image at: `yoursite.com/img` -->

**Output:** The URL `yoursite.com/img`.

**How they move on:** They type `yoursite.com/img` in the browser

---

## Stage 6 — EXIF metadata

**Input:** The page at `yoursite.com/img` shows a photo. The page contains just one image.

**TO DO:** They download the image. They use an online metadata reader. Hidden in the metadata of the image in the `Comment` field is the message: *"Good job. Now listen carefully at: `yoursite.com/audio/spectrum-analyzer.wav`"*

**Output: The URL pointing to an audio file.**

**How they move on:** They open `yoursite.com/audio/spectrum-analyzer.wav` and download it.

---

## Stage 7 — Audio spectrogram

**Input:** The audio file `spectrum-analyzer.wav`. It sounds like white noise or static when played normally.

**TO DO:** They should search about spectrum-analyzer — it's a spectrogram tool. They open the file in the tool and look at the visual frequency display. Hidden in the spectrogram image are the GPS coordinates: `34.916202, -2.362201`.

**Output:** The GPS coordinates `34.916202, -2.362201`.

**How they move on:** They open Google Maps, type the coordinates, and physically walk to that location on campus.

---

## Stage 8 — Physical location + GitHub

**Input:** They arrive at the location the GPS points to. There they find a paper taped somewhere visible.

**TO DO:** They read the paper. It says:

`git clone github.com/someone/something`

**Output:** The GitHub repository URL.

**How they move on:** This is the end of the first challenge chain. They clone the repository. Inside they find code to run and a locked PDF. This is the start of the next challenge.