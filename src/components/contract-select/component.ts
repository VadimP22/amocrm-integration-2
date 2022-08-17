export function createContractSelect(contracts: Array<any>, callback: (id: string) => void): Element {
    let div = document.createElement("div")
    div.style.width = "100px"
    div.style.height = "300px"
    div.className = "overflow-y-scroll"

    for (let item of contracts) {
        if (typeof(item.pipeline_id) !== "object")
        {
            let el = document.createElement("p")
            el.className = "cursor-pointer hover:bg-gray-400"
            el.innerHTML = item.name
            el.onclick = () => {
                callback(`${item.id}`)
            }
            div.appendChild(el)
        }
    }

    return div
    
}

