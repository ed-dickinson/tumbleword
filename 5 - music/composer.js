const grid = document.querySelector('#grid')

let notes = ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4']

const toggleStep = (beat, note, dom) => {
  console.log(beat,note, dom)
  if (dom.innerHTML === '-') {
    dom.innerHTML = 'A'
  } else {
    dom.innerHTML = '-'
  }
}

const toggleSharp = (note) => {
  let oct = note.slice(-1)
  let not = note.slice(0, 1)

  return not + (note.length === 2 ? '#' : '') + parseInt(oct)
}

const toggleNote = (j) => {
  notes[7-j] = toggleSharp(notes[7-j])
  headers[j].innerHTML = notes[7-j] + ' :'
}

let steps = []
let headers = []

for (let i = 0; i < 17; i++) {
  let step = document.createElement('span');
  grid.appendChild(step);
  step.classList.add('column')

  if (i===0) {
    for (let j = 0; j < 8; j++) {

      let header = document.createElement('span');
      step.appendChild(header)
      header.innerHTML = notes[7-j] + ' :'
      header.classList.add('header')
      header.addEventListener('click',()=>{
        toggleNote(j)
      })
      headers.push(header)
    }
  } else {
    steps.push(step)
    for (let j = 0; j < 8; j++) {

      let row = document.createElement('span');
      step.appendChild(row)
      row.innerHTML = '-'
      row.classList.add('step')
      row.addEventListener('click',()=>{
        toggleStep(i-1, j, row);
      })
    }

  }

}
