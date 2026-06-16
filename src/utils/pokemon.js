// Minimal wrapper to fetch unique Pokemon images
export async function fetchPokemonImages(count) {
    // get a list of pokemon ids; pokemon API supports up to ~1281, limit reasonable
    const maxId = 898
    const picks = new Set()
    while (picks.size < count) {
        const id = Math.floor(Math.random() * maxId) + 1
        picks.add(id)
    }
    const ids = Array.from(picks)
    const promises = ids.map(async id => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        if (!res.ok) throw new Error('poke fetch failed')
        const data = await res.json()
        // prefer official artwork, fallback to sprite
        return (data.sprites?.other?.['official-artwork']?.front_default) || data.sprites?.front_default || ''
    })
    const images = await Promise.all(promises)
    // ensure a fallback for missing images
    return images.map(img => img || 'https://via.placeholder.com/96?text=?')
}
