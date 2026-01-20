/**
 * MakeCode Extensie: FlickerLights + Snake Lights
 */
//% color=#198F4C icon="\uf0eb" weight=100
namespace FlickerLights {

    //======================
    // Oude blokken
    //======================

    //% block="Lights on for $Time (Sec.)"
    export function LightsOnFixed(Time: number) {
        // Zet alle pins aan
        pins.digitalWritePin(DigitalPin.P0, 1)
        pins.digitalWritePin(DigitalPin.P1, 1)
        pins.digitalWritePin(DigitalPin.P2, 1)
        pins.digitalWritePin(DigitalPin.P5, 1)
        pins.digitalWritePin(DigitalPin.P9, 1)
        pins.digitalWritePin(DigitalPin.P11, 1)
        pins.digitalWritePin(DigitalPin.P12, 1)
        pins.digitalWritePin(DigitalPin.P13, 1)
        pins.digitalWritePin(DigitalPin.P14, 1)
        pins.digitalWritePin(DigitalPin.P15, 1)
        basic.pause(Time * 1000)
        // Zet alle pins uit
        pins.digitalWritePin(DigitalPin.P0, 0)
        pins.digitalWritePin(DigitalPin.P1, 0)
        pins.digitalWritePin(DigitalPin.P2, 0)
        pins.digitalWritePin(DigitalPin.P5, 0)
        pins.digitalWritePin(DigitalPin.P9, 0)
        pins.digitalWritePin(DigitalPin.P11, 0)
        pins.digitalWritePin(DigitalPin.P12, 0)
        pins.digitalWritePin(DigitalPin.P13, 0)
        pins.digitalWritePin(DigitalPin.P14, 0)
        pins.digitalWritePin(DigitalPin.P15, 0)
    }

    //% block="Flicker lights random for $Time (Sec.)"
    export function LightsFlickerRandom(Time: number) {
        let startTime = input.runningTime()
        while (input.runningTime() - startTime < Time * 1000) {
            // Zet elke pin random aan of uit
            pins.digitalWritePin(DigitalPin.P0, randint(0, 1))
            pins.digitalWritePin(DigitalPin.P1, randint(0, 1))
            pins.digitalWritePin(DigitalPin.P2, randint(0, 1))
            pins.digitalWritePin(DigitalPin.P5, randint(0, 1))
            pins.digitalWritePin(DigitalPin.P9, randint(0, 1))
            pins.digitalWritePin(DigitalPin.P11, randint(0, 1))
            pins.digitalWritePin(DigitalPin.P12, randint(0, 1))
            pins.digitalWritePin(DigitalPin.P13, randint(0, 1))
            pins.digitalWritePin(DigitalPin.P14, randint(0, 1))
            pins.digitalWritePin(DigitalPin.P15, randint(0, 1))
            basic.pause(100) // flicker snelheid
        }
        // Zet alle pins uit
        for (let p of [
            DigitalPin.P0, DigitalPin.P1, DigitalPin.P2, DigitalPin.P5,
            DigitalPin.P9, DigitalPin.P11, DigitalPin.P12, DigitalPin.P13,
            DigitalPin.P14, DigitalPin.P15
        ]) {
            pins.digitalWritePin(p, 0)
        }
    }

    //======================
    // Snake lights helper
    //======================
    function snakeLoop(pauseTime: number) {
        let pinsArray = [
            [DigitalPin.P0, DigitalPin.P1],
            [DigitalPin.P1, DigitalPin.P2],
            [DigitalPin.P2, DigitalPin.P5],
            [DigitalPin.P5, DigitalPin.P9],
            [DigitalPin.P9, DigitalPin.P11],
            [DigitalPin.P11, DigitalPin.P12],
            [DigitalPin.P12, DigitalPin.P13],
            [DigitalPin.P13, DigitalPin.P14],
            [DigitalPin.P14, DigitalPin.P15],
            [DigitalPin.P15]
        ]

        for (let step = 0; step < pinsArray.length; step++) {
            // Zet alle uit
            for (let p of [
                DigitalPin.P0, DigitalPin.P1, DigitalPin.P2, DigitalPin.P5,
                DigitalPin.P9, DigitalPin.P11, DigitalPin.P12, DigitalPin.P13,
                DigitalPin.P14, DigitalPin.P15
            ]) {
                pins.digitalWritePin(p, 0)
            }
            // Zet huidige step aan
            for (let p of pinsArray[step]) {
                pins.digitalWritePin(p, 1)
            }
            basic.pause(pauseTime)
        }
    }

    //======================
    // Snake lights blokken
    //======================

    //% block="Snake lights adj for $Time (Sec.)"
    export function snakeAdj(Time: number) {
        let startTime = input.runningTime()
        while (input.runningTime() - startTime < Time * 1000) {
            let pauseTime = (Time * 1000) / 10 // verdeel over 10 stappen
            snakeLoop(pauseTime)
        }
        // Zet alles uit na afloop
        for (let p of [
            DigitalPin.P0, DigitalPin.P1, DigitalPin.P2, DigitalPin.P5,
            DigitalPin.P9, DigitalPin.P11, DigitalPin.P12, DigitalPin.P13,
            DigitalPin.P14, DigitalPin.P15
        ]) {
            pins.digitalWritePin(p, 0)
        }
    }

    //% block="Snake lights adj for $Loops loops with speed $Speed (Sec.)"
    export function snakeAdjWithSpeed(Loops: number, Speed: number) {
        for (let i = 0; i < Loops; i++) {
            snakeLoop(Speed * 1000)
        }
        // Zet alles uit na afloop
        for (let p of [
            DigitalPin.P0, DigitalPin.P1, DigitalPin.P2, DigitalPin.P5,
            DigitalPin.P9, DigitalPin.P11, DigitalPin.P12, DigitalPin.P13,
            DigitalPin.P14, DigitalPin.P15
        ]) {
            pins.digitalWritePin(p, 0)
        }
    }

    //% block="Snake lights for $Time (Sec.)"
    export function snakeTime(Time: number) {
        let startTime = input.runningTime()
        while (input.runningTime() - startTime < Time * 1000) {
            snakeLoop(100) // originele snelheid 100ms
        }
        // Zet alles uit na afloop
        for (let p of [
            DigitalPin.P0, DigitalPin.P1, DigitalPin.P2, DigitalPin.P5,
            DigitalPin.P9, DigitalPin.P11, DigitalPin.P12, DigitalPin.P13,
            DigitalPin.P14, DigitalPin.P15
        ]) {
            pins.digitalWritePin(p, 0)
        }
    }

}
