# LightPins - Micro:bit Extension

Control multiple LEDs and lights easily with your Micro:bit using the LightPins extension. This extension works for **micro:bit V1 and V2**.

---

## How to import

### Tutorial
Watch this tutorial to see LightPins in action:  
[Transistor & LED Tutorial](https://youtu.be/rCJGUBgNr3M)

### Extension link
Use the following link to import the extension:  
[LightPins Extension](https://noidvr.github.io/LightPins/)

---

## Using the extension in MakeCode

You can add this repository as an **extension** in MakeCode:

1. Open [MakeCode for micro:bit](https://makecode.microbit.org/)
2. Click **New Project**
3. Click **Extensions** (under the gear menu)
4. Search for: `https://github.com/noidvr/LightPins` and import it

> ⚠️ Make sure you follow the pin usage instructions below to avoid damaging your Micro:bit.

---

## Pin usage and safety

- Maximum total current for all GPIO pins: **15 mA**  
- Avoid switching on more than a few pins at once without a current limiter
- Recommended options for multiple LEDs:
  - **Transistors**
  - **Shift registers**
  - **NeoPixels**

**Important pins:**
- Pins 5 and 11 → buttons A and B  
- Pin 9 → available on V2 without disabling the LED display  
- Pins 8 and 16 → available on both V1 and V2

---

## Editing this project

To edit this repository in MakeCode:

1. Open [MakeCode for micro:bit](https://makecode.microbit.org/)
2. Click **Import** → **Import URL**
3. Paste: `https://github.com/noidvr/LightPins`
4. Click **Import**

---

## Examples

Here are some example code snippets using LightPins blocks:

```typescript
// Turn on LED at pin P1 for 1 second
lightPins.setPin(P1, 1)
basic.pause(1000)
lightPins.setPin(P1, 0)
