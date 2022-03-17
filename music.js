const synth = new Tone.FMSynth().toMaster()
const synth2 = new Tone.FMSynth().toMaster()


synth2.volume.value = -10

Tone.Transport.bpm.value = 60;

const music = (()=> {
  let bar = 1;
  const convertFlatNote = () => {

  }
  const init = () => {
    Tone.Transport.start();
    Tone.start();
  }
  const start = () => {
    synth.triggerAttackRelease('C6', '16n');
  }
  const changeTempo = (speed) => {
    // interval is at speed*100, starts at 10 so 1000msec or 1 sec

    Tone.Transport.bpm.value = 600 / speed;
  }
  const octave_notes = ['C','C#','D','D#','E', 'F','F#','G','G#','A','A#','B']
  const notes1 = [0,2,4,5,7]
  const moveBar = () => {
    if (bar === 2) {
      bar = 1;
    } else {
      bar++;
    }
  }
  const getBackupNote = (note, row) => {
    let oct = note.slice(-1)
    let not = note.slice(0, -1)
    let new_oct = parseInt(oct) - row + 3
    return {note: not + (parseInt(oct) - row + 3), octave: new_oct}
  }
  const transpose = (note, amount) => {
    let oct = note.slice(-1)
    let not = note.slice(0, -1)
    return not + (parseInt(oct) + amount)
  }
  let tune = ['B', ,'B','E', ,'F#', ,'A','F#', ,'F#','E', ,'D#', ,'E']
  console.log(tune.length, tune)
  const rowDrop = (column, row) => {

    // let reg_note = ((7 - row) * 10) + (notes1[column])
    // let shifted_note = octave_notes[reg_note%12]
    // let octave = (reg_note - (reg_note%12)) / 12
    // let note = shifted_note + (octave+2).toString()

    let now = Tone.now();





    let notes_to_play = []

    if (bar === 1) {
      notes_to_play.push({note:'C4', delay: 0})
      if (column===3) { notes_to_play.push({note:'A3', delay: 0.025}) }
      if (column===0) { notes_to_play.push({note:'D3', delay: 0.025}) }
      notes_to_play.push({note:'F4', delay: 0.05})
      notes_to_play.push({note:'D4', delay: 0.075})
    } else if (bar === 2) {
      if (row===0 && column!==1) { notes_to_play.push({note:'C3', delay: 0}) }
      if (column===1) { notes_to_play.push({note:'A3', delay: 0}) }
      notes_to_play.push({note:'F4', delay: 0.025})
      if (column===4) { notes_to_play.push({note:'A4', delay: 0.05}) }
      notes_to_play.push({note:'G4', delay: 0.075})
    }



    notes_to_play.forEach(note => {
      synth.volume.value = 0
      synth.triggerAttackRelease(note.note, '32n', now + (speed * (mobile_drop_triggered?note.delay/2:note.delay)))

      let backup_note = getBackupNote(note.note, row);

      // console.log(new_oct, not, backup_note)
      synth2.volume.value = -10 + (20 - (backup_note.octave * 4))
      // console.log(oct, synth2.volume.value)
      synth2.triggerAttackRelease(backup_note.note, '32n', now + (speed * (mobile_drop_triggered?note.delay/2:note.delay)))
    })

    moveBar();

  }

  const rowEnd = (column, row, right_position) => {
    let now = Tone.now();
    let notes = ['D3', 'A3', 'C4', 'D4', 'A4']
    synth.volume.value = -7
    synth.triggerAttackRelease(notes[column], '8n', now)
    synth.triggerAttackRelease(transpose(notes[column],right_position?1:-1), '32n', now + (speed * 0.05))

    let backup_note = getBackupNote(notes[column], row)
    synth2.volume.value = -10 + (20 - (backup_note.octave * 4)) - 7
    synth2.triggerAttackRelease(backup_note.note, '8n', now)
    synth2.triggerAttackRelease(transpose(backup_note.note,right_position?1:-1), '32n', now + (speed * 0.05))
    moveBar();

  }
  const rowClear = (column, row) => {

  }
  return {
    init,
    start,
    rowDrop,
    rowEnd,
    rowClear,
    changeTempo,
  };
})();


// 1  6   13  18  25  30  37  42  49
// C  F   C   F   C   F   C   F   C
