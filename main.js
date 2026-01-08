// ========================= Factory =========================
class Transport {
    ride() {
        throw new Error('Method ride() must be implemented')
    }
    stop() {
        throw new Error('Method stop() must be implemented')
    }
}

class Car extends Transport {
    ride() {
        return 'Car is riding'
    }

    stop() {
        return 'Car has stopped'
    }
}

class Bike extends Transport {
    ride() {
        return 'Bike is riding'
    }

    stop() {
        return 'Bike has stopped'
    }
}

class TransportFactory {
    static createTransport(type) {
        switch (type.toLowerCase()) {
            case 'car':
                return new Car()
            case 'bike':
                return new Bike()
            default:
                throw new Error('This method is unknown')
        }
    }
}

const myCar = TransportFactory.createTransport('car')
console.log(myCar.ride())
console.log(myCar.stop())

const myBike = TransportFactory.createTransport('bike')
console.log(myBike.ride())
console.log(myBike.stop())

// ========================= DOM =========================

let currentPage = 1

async function fetchData(page) {
    try {
        const res = await fetch(
            `https://rickandmortyapi.com/api/character?page=${page}`
        )
        const data = await res.json()
        return data
    } catch (error) {
        console.log('Error: ', error)
    }
}

async function renderPage(page) {
    const loadingEl = document.getElementById('loading')
    try {
        loadingEl.style.display = 'block'
        const data = await fetchData(page)
        if (!data) return

        const characters = data.results

        const list = document.getElementById('characters-list')
        list.innerHTML = ''

        characters.forEach((char) => {
            const statusColor =
                char.status === 'Alive'
                    ? '#27ae60'
                    : char.status === 'Dead'
                    ? '#e74c3c'
                    : '#95a5a6'

            const card = document.createElement('div')
            card.className = 'main-character'
            card.innerHTML = `
            <div class="info">
                    <img src="${char.image}" alt="Icon" id="image" />
                    <div>
                        <div class="info_name">
                            <h2>Name:</h2>
                            <span id="name">${char.name}</span>
                        </div>
                        <div class="info_status">
                            <h2>Status:</h2>
                            <span id="status" style='color: ${statusColor}'>${char.status}</span>
                        </div>
                    </div>
                </div>
                <hr>
        `
            list.appendChild(card)
        })

        document.getElementById('page-info').textContent = `Page ${page}`
        document.getElementById('prev-btn').disabled = !data.info.prev
        document.getElementById('next-btn').disabled = !data.info.next
    } catch (error) {
        loadingEl.textContent = 'Failed to load data'
    } finally {
        loadingEl.style.display = 'none'
    }
}

const prevBtn = document.getElementById('prev-btn')
prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        renderPage(--currentPage)
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }
})
const nextBtn = document.getElementById('next-btn')
nextBtn.addEventListener('click', () => {
    renderPage(++currentPage)
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    })
})

document.addEventListener('DOMContentLoaded', () => renderPage(currentPage))
