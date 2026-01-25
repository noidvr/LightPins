/**
 * MakeCode Extension: FlickerLights + Snake Lights
 */
//% color=#198F4C icon="\uf0eb" weight=100
//% groups=['Basic', 'Snake', 'Pins']
namespace FlickerLights {

    // ======================
    // Active pins (default)
    // ======================
    let activePins: DigitalPin[] = [
        DigitalPin.P0,
        DigitalPin.P1,
        DigitalPin.P2,
        DigitalPin.P5,
        DigitalPin.P9,
        DigitalPin.P11,
        DigitalPin.P12,
        DigitalPin.P13,
        DigitalPin.P14,
        DigitalPin.P15
    ]

    // ======================
    // BASIC
    // ======================

    //% block="Turn on all lights for $Time seconds"
    //% group="Basic"
    //% blockSetVariable=activePins
    //% help="Turns on all active pins for the specified time in seconds."
    export function LightsOnFixed(Time: number) {
        for (let p of activePins) {
            pins.digitalWritePin(p, 1)
        }

        basic.pause(Time * 1000)

        for (let p of activePins) {
            pins.digitalWritePin(p, 0)
        }
    }

    //% block="Flicker lights randomly for $Time seconds"
    //% group="Basic"
    //% help="Randomly turns pins on/off to create a flicker effect for the given time in seconds."
    export function LightsFlickerRandom(Time: number) {
        let startTime = input.runningTime()

        while (input.runningTime() - startTime < Time * 1000) {
            for (let p of activePins) {
                pins.digitalWritePin(p, randint(0, 1))
            }
            basic.pause(100)
        }

        for (let p of activePins) {
            pins.digitalWritePin(p, 0)
        }
    }

    // ======================
    // Snake helper (internal)
    // ======================

    function snakeLoop(pauseTime: number) {
        for (let i = 0; i < activePins.length; i++) {
            for (let p of activePins) {
                pins.digitalWritePin(p, 0)
            }

            pins.digitalWritePin(activePins[i], 1)

            if (i > 0) {
                pins.digitalWritePin(activePins[i - 1], 1)
            }

            basic.pause(pauseTime)
        }
    }

    // ======================
    // SNAKE
    // ======================

    //% block="Snake lights with adjustable speed for $Time seconds"
    //% group="Snake"
    //% help="Runs a snake pattern along the active pins for the specified time in seconds. Speed is automatically adjusted."
    export function SnakeAdjustable(Time: number) {
        let startTime = input.runningTime()
        let pauseTime = (Time * 1000) / activePins.length

        while (input.runningTime() - startTime < Time * 1000) {
            snakeLoop(pauseTime)
        }

        for (let p of activePins) {
            pins.digitalWritePin(p, 0)
        }
    }

    //% block="Snake lights adjustable for $Loops loops with speed $Speed seconds"
    //% group="Snake"
    //% help="Runs the snake pattern for a number of loops with specified speed (in seconds per step)."
    export function SnakeAdjustableWithSpeed(Loops: number, Speed: number) {
        for (let i = 0; i < Loops; i++) {
            snakeLoop(Speed * 1000)
        }

        for (let p of activePins) {
            pins.digitalWritePin(p, 0)
        }
    }

    //% block="Snake lights for $Time seconds"
    //% group="Snake"
    //% help="Runs the snake pattern at default speed for a specified time in seconds."
    export function SnakeTime(Time: number) {
        let startTime = input.runningTime()

        while (input.runningTime() - startTime < Time * 1000) {
            snakeLoop(100)
        }

        for (let p of activePins) {
            pins.digitalWritePin(p, 0)
        }
    }

    // ======================
    // PINS
    // ======================

    //% block="Set pins %p1 %p2 %p3 %p4 %p5 %p6 %p7 %p8 %p9 %p10"
    //% p1.shadow="digitalPin"
    //% p2.shadow="digitalPin"
    //% p3.shadow="digitalPin"
    //% p4.shadow="digitalPin"
    //% p5.shadow="digitalPin"
    //% p6.shadow="digitalPin"
    //% p7.shadow="digitalPin"
    //% p8.shadow="digitalPin"
    //% p9.shadow="digitalPin"
    //% p10.shadow="digitalPin"
    //% group="Pins"
    //% advanced=true
    //% help="Set the active pins for the lights. Throws an error if a pin is used twice."
    export function SetPins(
        p1: DigitalPin,
        p2: DigitalPin,
        p3: DigitalPin,
        p4: DigitalPin,
        p5: DigitalPin,
        p6: DigitalPin,
        p7: DigitalPin,
        p8: DigitalPin,
        p9: DigitalPin,
        p10: DigitalPin
    ) {
        let temp: DigitalPin[] = []
        let inputPins = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10]

        for (let p of inputPins) {
            if (temp.indexOf(p) != -1) {
                control.panic(42) // Duplicate pin → throws error
            }
            temp.push(p)
        }

        activePins = temp
    }

    //% block="Reset pins to default"
    //% group="Pins"
    //% advanced=true
    //% help="Resets the active pins to the default set (P0, P1, P2, P5, P9, P11–P15)."
    export function ResetPins() {
        activePins = [
            DigitalPin.P0,
            DigitalPin.P1,
            DigitalPin.P2,
            DigitalPin.P5,
            DigitalPin.P9,
            DigitalPin.P11,
            DigitalPin.P12,
            DigitalPin.P13,
            DigitalPin.P14,
            DigitalPin.P15
        ]
    }
}
