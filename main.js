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

const list = document.getElementById('characters-list')

async function renderPage(page) {
    const loadingEl = document.getElementById('loading')
    try {
        loadingEl.style.display = 'flex'
        const data = await fetchData(page)
        if (!data) return

        const characters = data.results

        list.innerHTML = ''

        characters.forEach((char) => {
            const statusClass =
                char.status === 'Alive'
                    ? '#27ae60'
                    : char.status === 'Dead'
                    ? '#e74c3c'
                    : '#95a5a6'

            const card = document.createElement('div')
            card.className = 'col-12'
            card.innerHTML = `
                <div class="character-card" data-id="${char.id}">
                    <div class="character-img-wrapper">
                        <img src="${char.image}" alt="${char.name}" class="character-img" loading="lazy">
                    </div>
                    <div class="character-info">
                        <h2 class="char-name">${char.name}</h2>
                        <div>
                            <span class="status-badge" style="color: ${statusClass}">
                                <i class="fas fa-circle me-2" style="font-size: 8px;"></i>
                                ${char.status}
                            </span>
                        </div>
                        <div class="mt-3">
                            <p class="mb-1 text-muted small uppercase fw-bold" style="letter-spacing: 1px;">Species</p>
                            <p class="mb-0 text-dark">${char.species}</p>
                        </div>
                    </div>
                </div>
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

const charModal = new bootstrap.Modal(document.getElementById('characterModal'))
const modalBody = document.getElementById('modal-body-content')

list.addEventListener('click', async (e) => {
    const card = e.target.closest('.character-card')
    if (!card) return

    const charId = card.getAttribute('data-id')

    modalBody.innerHTML =
        '<div class="spinner-border text-primary" role="status"></div>'
    charModal.show()

    try {
        const response = await fetch(
            `https://rickandmortyapi.com/api/character/${charId}`
        )
        const char = await response.json()

        modalBody.innerHTML = `
            <img src="${char.image}" class="rounded-circle mb-3 shadow" style="width: 150px;">
            <h2 class="fw-bold mb-1">${char.name}</h2>
            <p class="text-muted mb-4">${char.species} — ${char.gender}</p>
            
            <div class="row g-3 text-start">
                <div class="col-6">
                    <small class="text-muted d-block">Status</small>
                    <span class="fw-bold">${char.status}</span>
                </div>
                <div class="col-6">
                    <small class="text-muted d-block">Origin</small>
                    <span class="fw-bold">${char.origin.name}</span>
                </div>
                <div class="col-12">
                    <small class="text-muted d-block">Last known location</small>
                    <span class="fw-bold">${char.location.name}</span>
                </div>
            </div>
        `
    } catch (error) {
        modalBody.innerHTML =
            '<p class="text-danger">Failed to load data...</p>'
    }
})

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
