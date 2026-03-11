import * as menus from './SenseiMenus'


export function beltAward(character) {
    return [
        () => {
            character.showSpeech(character.getString('help_award_congratulations'))
        },
        () => {
            character.showSpeech(character.getFormatString('help_award_belt_earned', character.beltString))
            character.showBelt()
        },
        () => {
            character.leaveGame()
        }
    ]
}

export function maskAward(character) {
    return [
        () => {
            character.showSpeech(character.getString('help_defeat_sensei_intro'))
        },
        () => {
            character.showSpeech(character.getString('help_defeat_sensei_kowtows'))
        },
        () => {
            character.showSpeech(character.getString('help_defeat_sensei_gift'))
            character.showMask()
        },
        () => {
            character.hideAward()
            character.showHideout()
            character.showSpeech(character.getString('help_defeat_sensei_final'))
        },
        () => {
            character.leaveGame()
        }
    ]
}

export function intro(character) {
    return [
        () => {
            character.showSpeech(character.getString('help_firsttime_welcome'))
        },
        () => {
            character.startSequence(introCards)
        }
    ]
}

export function introCards(character) {
    return [
        () => {
            character.showSpeech(character.getString('help_firsttime_tobegin'))
            character.scene.instructions.showCards()
        },
        () => {
            character.network.send('add_starter_deck')

            character.scene.instructions.hideCards()
            character.scene.showMenu(menus.instrWhatDoIDo)
        }
    ]
}

export function instrWhatDoIDo(character) {
    return [
        () => {
            character.showSpeech(character.getString('help_firsttime_improve'))
            character.scene.instructions.showCompete()
        },
        () => {
            character.scene.hideInstructions()
            character.showSpeech(character.getString('help_firsttime_areyouready'))
        },
        () => {
            character.scene.hideInstructions()
            character.scene.showMenu(menus.instrYesPlease)
        }
    ]
}

export function instrHowToPlay(character) {
    return [
        () => {
            character.showSpeech(character.getString('help_firsttime_pickacard'))
            character.scene.instructions.showPick()
        },
        () => {
            character.showSpeech(character.getString('help_firsttime_water'))
            character.scene.instructions.showWater()
        },
        () => {
            character.showSpeech(character.getString('help_firsttime_snow'))
            character.scene.instructions.showSnow()
        },
        () => {
            character.showSpeech(character.getString('help_firsttime_fire'))
            character.scene.instructions.showFire()
        },
        () => {
            character.showSpeech(character.getString('help_firsttime_tie'))
            character.scene.instructions.showTie()
        },
        () => {
            character.hideSpeech()
            character.scene.hideInstructions()
            character.scene.showMenu(menus.instrHowToWin)
        }
    ]
}

export function instrHowToWin(character) {
    return [
        () => {
            character.showSpeech(character.getString('help_firsttime_howtowin'))
        },
        () => {
            character.showSpeech(character.getString('help_firsttime_winsame'))
            character.scene.instructions.showWinSame()
        },
        () => {
            character.showSpeech(character.getString('help_firsttime_windifferent'))
            character.scene.instructions.showWinDifferent()
        },
        () => {
            character.showSpeech(character.getString('help_firsttime_ingamehelp'))
            character.scene.instructions.showHelp()
        },
        () => {
            character.hideSpeech()
            character.scene.hideInstructions()
            character.scene.showMenu(menus.instrHowToNinja)
        }
    ]
}

export function instrHowToNinja(character) {
    return [
        () => {
            character.showSpeech(character.getString('help_firsttime_joking'))
        },
        () => {
            character.showSpeech(character.getString('help_firsttime_gainexp'))
        },
        () => {
            character.showSpeech(character.getString('help_firsttime_belts'))
            character.scene.instructions.showBelt()
        },
        () => {
            character.showSpeech(character.getString('help_firsttime_fightme'))
            character.scene.instructions.showBlackBelt()
        },
        () => {
            character.showSpeech(character.getString('help_firsttime_ninja'))
            character.scene.instructions.showNinja()
        },
        () => {
            character.hideSpeech()
            character.scene.hideInstructions()
            character.scene.showMenu(menus.instrCountMeIn)
        }
    ]
}
