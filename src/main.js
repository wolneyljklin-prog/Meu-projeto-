const app = document.getElementById('app')

app.innerHTML = `
  <div style="text-align:center; font-family:sans-serif;">
    <h1>Meu App 🚀</h1>
    <button id="btn" style="padding:10px; font-size:16px;">
      Clique aqui
    </button>
    <p id="texto"></p>
  </div>
`

document.getElementById('btn').addEventListener('click', () => {
  document.getElementById('texto').innerText = 'Funcionou ✅'
})




