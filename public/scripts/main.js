const entity1Form = document.getElementById('entity1Form');
const entity1NameInput = document.getElementById('entity1Name');
const entity1List = document.getElementById('entity1List');

const entity2Form = document.getElementById('entity2Form');
const entity2NameInput = document.getElementById('entity2Name');
const entity2List = document.getElementById('entity2List');

// Функція для створення елементу списку
function createListItem(text) {
    const li = document.createElement('li');
    li.textContent = text;
    return li;
}

// Отримання сутностей 1
fetch('/api/entity1')
    .then(response => response.json())
    .then(entities => {
        entities.forEach(entity => {
            const li = createListItem(entity.name);
            entity1List.appendChild(li);
        });
    });

// Отримання сутностей 2
fetch('/api/entity2')
    .then(response => response.json())
    .then(entities => {
        entities.forEach(entity => {
            const li = createListItem(entity.name);
            entity2List.appendChild(li);
        });
    });

// Додавання сутності 1
entity1Form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = entity1NameInput.value;

    fetch('/api/entity1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
    })
        .then(response => response.json())
        .then(createdEntity => {
            const li = createListItem(createdEntity.name);
            entity1List.appendChild(li);
            entity1NameInput.value = '';
        });
});

// Додавання сутності 2
entity2Form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = entity2NameInput.value;

    fetch('/api/entity2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
    })
        .then(response => response.json())
        .then(createdEntity => {
            const li = createListItem(createdEntity.name);
            entity2List.appendChild(li);
            entity2NameInput.value = '';
        });
});
