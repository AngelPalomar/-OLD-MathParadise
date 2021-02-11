import { Howl } from 'howler'

export const boomSound = new Howl({
    src: ['sounds/boom_sound.mp3']
})

export const comboSound = new Howl({
    src: ['sounds/combo_sound.mp3']
})

export const gameoverSound = new Howl({
    src: ['sounds/gameover_sound.mp3']
})

export const startSound = new Howl({
    src: ['sounds/question_sound.mp3']
})

export const questionSound = new Howl({
    src: ['sounds/question_sound.mp3']
})

export const correctSound = new Howl({
    src: ['sounds/correct_sound.mp3']
})

export const incorrectSound = new Howl({
    src: ['sounds/incorrect_sound.mp3']
})

export const ticktockSound = new Howl({
    src: ['sounds/ticktock_sound.mp3'],
    loop: true
})

export const joinSound = new Howl({
    src: ['sounds/join_sound.mp3'],
    loop: true
})
