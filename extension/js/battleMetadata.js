// Global battle metadata determines turn and phase and who's playing
// returns Object of consolidated DOM values

export default getBattleMetadata;
function getBattleMetadata() {
    const h3 = document.querySelectorAll('h3');
    const h4 = document.querySelectorAll('.unformatted h4[align=center]');

    // this metadata is only available on viewbattle.asp
    if (!h4.length || !h3.length) {
        console.warn("Battle metadata unavailable");
        return null;
    }

    let [_, char, number] = h4[0].innerText.match(/:\s(\w{1})(\d*)$/);
    const gameName = h3[0].firstChild.innerText;
    const globalLocation = `${char}${number}`;

    const status = h4[1].innerText.match(/:\s?(\d+),\s(.*)$/);
    const round = Number(status[1].trim());
    const description = status[2]
        .trim()
        .replace(/'s\s+/, ';')
        .toLowerCase();
    const [activePlayer, phase] = description.split(';');

    // Can summon a native creature during battle
    const defenderSummon = round === 4;

    return {
        globalLocation,
        round,
        activePlayer,
        defenderSummon,
        phase,
        gameName
    };
}
