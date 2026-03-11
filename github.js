async function fetchGitHubRepos() {
    const container = document.getElementById('latest-repos');

    try {
        const response = await fetch('https://api.github.com/users/DalvSync/repos?sort=updated&per_page=3');

        if (!response.ok) throw new Error('Failed to fetch');

        const repos = await response.json();
        container.innerHTML = '';

        repos.forEach(repo => {
            const date = new Date(repo.updated_at).toLocaleDateString('en-GB', {
                day: 'numeric', month: 'short', year: 'numeric'
            });

            const card = `
                <div class="mod-card" style="padding: 1.2rem;">
                    <h3 class="mod-title" style="font-size: 1.1rem; margin-bottom: 0.5rem;">
                        📁 ${repo.name}
                    </h3>
                    <p class="mod-desc" style="font-size: 0.85rem; margin-bottom: 1rem; min-height: 40px;">
                        ${repo.description || 'No description provided.'}
                    </p>
                    <div class="mod-meta" style="margin-bottom: 1rem; justify-content: space-between;">
                        <span>🟢 ${repo.language || 'Code'}</span>
                        <span>🕒 ${date}</span>
                    </div>
                    <a href="${repo.html_url}" target="_blank" class="mod-btn" style="padding: 0.4rem; font-size: 0.85rem; display: block;">
                        View Code
                    </a>
                </div>
            `;
            container.innerHTML += card;
        });
    } catch (error) {
        container.innerHTML = '<p class="loading" style="color: #f87171;">Error loading repositories.</p>';
        console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', fetchGitHubRepos);