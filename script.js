const newsData = [
    {
        date: "2026-07-02",
        en: {
            title: "v1.0",
            summary: "It works!",
            content: "<p>It works!.</p>",
            datePrefix: "SYSTEM DATE: "
        },
        uk: {
            title: "v1.0",
            summary: "Це працює!",
            content: "<p>Це працює!</p>",
            datePrefix: "ДАТА СИСТЕМИ: "
        }
    }
];

const i18n = {
    en: {
        greeting: "Rethink...",
        intro_p: "Hi! I'm DalvSync :)",
        recent_title: "RECENT NEWS",
        read_all: "READ ALL >",
        cta_p: "Would you like to contact me?",
        btn_profile: "VIEW PROFILE",
        about_title: "ABOUT ME",
        about_subtitle: "THE PERSON BEHIND THE PIXELS",
        about_p1: "Hi! I'm DalvSync, and I'm 17 years old. I want to create my own video game, so right now I'm still working out the plot and characters for it.",
        about_p2: "I’m really inspired by Toby Fox, especially Undertale. I discovered the game in 2020 when I was 11 years old; it made a huge impression on me, and you could say that from that moment on, I’ve wanted to create my own game...",
        contact_title: "CONTACT DIRECTORY",
        contact_p: "I'm always open to communication, so you can reach out to me in a variety of ways: ",
        news_title: "SYSTEM UPDATES",
        lang_btn: "UK",
        copy: "&copy; 2026 DalvSync. Take a deep breath and enjoy."
    },
    uk: {
        greeting: "Rethink...",
        intro_p: "Привіт! Я DalvSync :)",
        recent_title: "ОСТАННІ НОВИНИ",
        read_all: "ЧИТАТИ ВСЕ >",
        cta_p: "Бажаєте зв'язатись зі мною?",
        btn_profile: "ПЕРЕГЛЯНУТИ ПРОФІЛЬ",
        about_title: "ПРО МЕНЕ",
        about_subtitle: "ЛЮДИНА ЗА ПІКСЕЛЯМИ",
        about_p1: "Привіт! Я ДалвСінк, мені 17 років. Я хочу створити свою власну комп'ютерну гру, тому зараз поки що продумую сюжет та персонажів для неї.",
        about_p2: "Я дуже надихаюсь Тобі Фоксом, зокрема Undertale. З цією грою я познайомився у 2020 році, коли мені було 11 років, ця гра справила на мене дуже велике враження, і можна сказати з того моменту у мене було бажання створити свою власну гру...",
        contact_title: "ДОВІДНИК КОНТАКТІВ",
        contact_p: "Я завжди відкритий до спілкування, тож ви можете це зробити різноманітними способами: ",
        news_title: "ОНОВЛЕННЯ СИСТЕМИ",
        lang_btn: "EN",
        copy: "&copy; 2026 DalvSync. Зроби глибокий вдих і насолоджуйся."
    }
};

let currentLang = localStorage.getItem('lang') || 'en';
let typeTimeout = null;

function renderNews() {
    const recentContainer = document.getElementById('recent-transmission-container');
    if (recentContainer && newsData.length > 0) {
        const latest = newsData[0];
        const post = latest[currentLang];
        recentContainer.innerHTML = `
            <p style="font-size: 10px; color: #888; margin-bottom: 5px;">${latest.date}</p>
            <p style="color: #ccc; line-height: 1.6;">${post.summary}</p>
        `;
    }

    const newsFeedContainer = document.getElementById('news-feed-container');
    if (newsFeedContainer && newsData.length > 0) {
        newsFeedContainer.innerHTML = newsData.map(item => {
            const post = item[currentLang];
            return `
                <article class="news-post">
                    <h2 style="color: var(--accent-color-2); margin-bottom: 10px;">${post.title}</h2>
                    <p class="news-date">${post.datePrefix}${item.date}</p>
                    <div class="news-content" style="line-height: 2;">
                        ${post.content}
                    </div>
                </article>
            `;
        }).join('');
    }
}

function applyLanguage(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[lang] && i18n[lang][key]) {
            el.innerHTML = i18n[lang][key];
        }
    });
    
    renderNews();
}

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'uk' : 'en';
    localStorage.setItem('lang', currentLang);
    applyLanguage(currentLang);
    
    const greetingElement = document.getElementById("greeting");
    if (greetingElement) {
        clearTimeout(typeTimeout);
        greetingElement.innerHTML = "";
        startTyping();
    }
}

function startTyping() {
    const greetingElement = document.getElementById("greeting");
    if (!greetingElement) return;

    const textToType = i18n[currentLang].greeting;
    let index = 0;
    
    function typeWriter() {
        if (index < textToType.length) {
            const char = textToType.charAt(index);
            greetingElement.innerHTML += char;
            index++;
            
            let speed = Math.floor(Math.random() * (150 - 50 + 1)) + 50;
            
            if (char === '.') {
                speed = 1500; 
            }
            
            typeTimeout = setTimeout(typeWriter, speed);
        }
    }
    
    typeTimeout = setTimeout(typeWriter, 900);
}

document.addEventListener("DOMContentLoaded", () => {
    applyLanguage(currentLang);
    
    const langToggleBtn = document.getElementById("lang-toggle");
    if (langToggleBtn) {
        langToggleBtn.addEventListener("click", toggleLanguage);
    }

    startTyping();
});
