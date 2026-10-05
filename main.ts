function go_forward (degrees: number) {
    control_motor(1023, 1.5, "forward")
    for (let index = 0; index < 15; index++) {
        control_motor(1023, 1, "forward")
        control_motor(1023, 1, "\"backward\"")
    }
    stop_motor()
}
function go_backward (degrees: number) {
    control_motor(1023, 1.5, "backward")
    stop_motor()
}
function control_motor (voltage_level: number, seconds: number, direction: string) {
    if (direction == "forward") {
        pins.analogWritePin(AnalogPin.P1, voltage_level)
        pins.analogWritePin(AnalogPin.P2, 0)
    } else {
        pins.analogWritePin(AnalogPin.P2, voltage_level)
        pins.analogWritePin(AnalogPin.P1, 0)
    }
    basic.pause(seconds * 1000)
    stop_motor()
    basic.pause(100)
}
input.onButtonPressed(Button.A, function () {
    go_forward(135)
    basic.pause(1000)
    go_backward(135)
})
function stop_motor () {
    pins.analogWritePin(AnalogPin.P1, 0)
    pins.analogWritePin(AnalogPin.P2, 0)
}
function open_and_close () {
    go_forward(135)
    basic.pause(1000)
    go_backward(135)
}
let new_mail = false
led.plot(1, 0)
led.plot(1, 1)
led.plot(1, 2)
led.plot(1, 3)
led.plot(1, 4)
led.plot(2, 0)
led.plot(2, 1)
led.plot(2, 2)
led.plot(2, 3)
led.plot(2, 4)
loops.everyInterval(500, function () {
    if (pins.digitalReadPin(DigitalPin.P5) == 0) {
        led.plot(1, 0)
        led.plot(1, 1)
        led.plot(1, 2)
        led.plot(1, 3)
        led.plot(1, 4)
        led.plot(2, 0)
        led.plot(2, 1)
        led.plot(2, 2)
        led.plot(2, 3)
        led.plot(2, 4)
        new_mail = true
    } else {
        led.unplot(1, 1)
        led.unplot(1, 2)
        led.unplot(1, 3)
        led.unplot(2, 1)
        led.unplot(2, 2)
        led.unplot(2, 3)
        new_mail = false
    }
    if (new_mail) {
        open_and_close()
    }
})
