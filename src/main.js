const app = document.getElementById('app')

app.innerHTML = `
  <h1>Meu App 🚀</h1>
  <button id="btn">Clique aqui</button>
  <p id="texto"></p>
`

document.getElementById('btn').addEventListener('click', () => {
  document.getElementById('texto').innerText = 'Você clicou no botão ✅'
})



