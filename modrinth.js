const myMods = ['tickflow', 'quick-stash']; 

async function fetchModrinthData() {
    const container = document.getElementById('modrinth-cards');
    
    try {
        container.innerHTML = ''; 

        for (const modSlug of myMods) {
            const response = await fetch(`https://api.modrinth.com/v2/project/${modSlug}`);
            
            if (!response.ok) {
                console.error(`Could not fetch ${modSlug}`);
                continue;
            }

            const mod = await response.json();

            const card = document.createElement('div');
            card.className = 'mod-card';

            const iconUrl = mod.icon_url || 'https://via.placeholder.com/64x64/1e293b/38bdf8?text=No+Icon';
            const downloads = mod.downloads.toLocaleString('en-US'); // Красивый формат чисел

            card.innerHTML = `
                <div class="mod-header">
                    <img src="${iconUrl}" alt="${mod.title} icon" class="mod-icon">
                    <div>
                        <div class="mod-title">${mod.title}</div>
                        <div class="mod-meta">
                            <span>↓ ${downloads}</span>
                            <span>⚖️ ${mod.license.id || 'MIT'}</span>
                        </div>
                    </div>
                </div>
                <div class="mod-desc">
                    ${mod.description}
                </div>
                <a href="https://modrinth.com/mod/${mod.slug}" target="_blank" class="mod-btn">
                    View on Modrinth
                </a>
            `;

            container.appendChild(card);
        }
    } catch (error) {
        container.innerHTML = '<p class="loading">Error loading data. Check console.</p>';
        console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', fetchModrinthData);