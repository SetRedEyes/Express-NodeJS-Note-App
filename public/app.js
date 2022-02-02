document.addEventListener('click', (event) => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id
    remove(id).then(() => {
      event.target.closest('li').remove()
    })

    if (event.target.dataset.type === 'edit') {
      const id = event.target.dataset.id

      const newTitle = prompt(
        'Введите новое название',
        ''
      ).trim()

      newTitle !== null
        ? update({ id, title: newTitle }).then(() => {
            event.target
              .closest('li')
              .querySelector('span').innerText = newTitle
          })
        : alert('Поле не должно быть пустым!')
    }
  }
})

async function remove(id) {
  await fetch(`/${id}`, { method: 'DELETE' })
}

async function update(newNote) {
  await fetch(`/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newNote)
  })
}
