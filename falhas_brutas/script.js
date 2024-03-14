const imageContainer = document.getElementById('image-container');
const image = document.getElementById('image');
const faultList = document.getElementById('fault-list');
const faultDescription = document.getElementById('fault-description');
let faults = [];

imageContainer.addEventListener('click', function(event) {
    const { offsetX, offsetY } = event;
    const fault = { x: offsetX, y: offsetY };
    faults.push(fault);
    const marker = document.createElement('div');
    marker.classList.add('fault-marker');
    marker.style.left = `${fault.x}px`;
    marker.style.top = `${fault.y}px`;
    imageContainer.appendChild(marker);
    marker.addEventListener('click', function() {
        faultDescription.style.left = `${fault.x + 25}px`;
        faultDescription.style.top = `${fault.y}px`;
        faultDescription.style.display = 'block';
        faultDescription.innerHTML = `
            <textarea id="description" placeholder="Descrição da falha"></textarea>
            <button onclick="saveFault(${faults.length - 1})">Salvar</button>
        `;
    });
});

function saveFault(index) {
    const description = document.getElementById('description').value;
    faults[index].description = description;
    updateFaultList();
    faultDescription.style.display = 'none';
}

function updateFaultList() {
    faultList.innerHTML = '';
    faults.forEach((fault, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Fault ${index + 1}: X: ${fault.x}, Y: ${fault.y}, Description: ${fault.description || 'N/A'}`;
        faultList.appendChild(listItem);
    });
}
