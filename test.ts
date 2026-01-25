// test.ts - LightPins extension test suite
// Make sure all functions work and no errors are thrown

basic.showString("TEST START")

// Test single pin
lightPins.setPin(P1, 1)
basic.pause(500)
lightPins.setPin(P1, 0)

// Test multiple pins
lightPins.setPins([P1, P2, P8], 1)
basic.pause(500)
lightPins.setPins([P1, P2, P8], 0)

// Test with default pins (if your extension has default)
lightPins.setPinDefault(1)  // example, adjust if your block uses a default pin
basic.pause(500)
lightPins.setPinDefault(0)

// Test delay functionality
lightPins.setPin(P1, 1)
basic.pause(1000)
lightPins.setPin(P1, 0)

// Test edge cases
lightPins.setPins([], 1)  // no pins, should not crash
lightPins.setPin(P16, 1)  // last pin on micro:bit, check limits

basic.showString("TEST DONE")
