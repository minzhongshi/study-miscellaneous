function createElement(item) {
    const type = ["ball","square","triangle","rectangle",]
    if (!type.includes(item.type)){
        throw new Error('Invalid type')
    }
    const div = document.createElement('div')
    div.className = 'item'
    div.classList.add(item.type)
    div.textContent = item.type
    return div
}