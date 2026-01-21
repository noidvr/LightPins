/**
 * MakeCode Extensie: FlickerLights + Snake Lights
 */
//% color=#198F4C icon="\uf0eb" weight=100
//% groups=['Basic', 'Snake', 'Pins']
namespace FlickerLights {

    // ======================
    // Actieve pins (default)
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

    //% block="Lights on for $Time (Sec.)"
    //% group="Basic"
    export function LightsOnFixed(Time: number) {
        for (let p of activePins) {
            pins.digitalWritePin(p, 1)
        }

        basic.pause(Time * 1000)

        for (let p of activePins) {
            pins.digitalWritePin(p, 0)
        }
    }

    //% block="Flicker lights random for $Time (Sec.)"
    //% group="Basic"
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
    // Snake helper (intern)
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

    //% block="Snake lights adj for $Time (Sec.)"
    //% group="Snake"
    export function SnakeAdj(Time: number) {
        let startTime = input.runningTime()
        let pauseTime = (Time * 1000) / activePins.length

        while (input.runningTime() - startTime < Time * 1000) {
            snakeLoop(pauseTime)
        }

        for (let p of activePins) {
            pins.digitalWritePin(p, 0)
        }
    }

    //% block="Snake lights adj for $Loops loops with speed $Speed (Sec.)"
    //% group="Snake"
    export function SnakeAdjWithSpeed(Loops: number, Speed: number) {
        for (let i = 0; i < Loops; i++) {
            snakeLoop(Speed * 1000)
        }

        for (let p of activePins) {
            pins.digitalWritePin(p, 0)
        }
    }

    //% block="Snake lights for $Time (Sec.)"
    //% group="Snake"
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
    export function Setpins(
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
                control.panic(42) // ❌ dubbele pin → error
            }
            temp.push(p)
        }

        activePins = temp
    }

    //% block="Reset pins to default"
    //% group="Pins"
    //% advanced=true
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
