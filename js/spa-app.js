// Single Page Application Logic
const appContent = document.getElementById('app-content');

// Language System
let currentLang = localStorage.getItem('language') || 'zh';

const translations = {
    zh: {
        'nav-home': '首页',
        'nav-poetry': '诗',
        'nav-poem1': '其一',
        'nav-poem2': '其二',
        'nav-poem3': '其三',
        'nav-poem4': '其四',
        'nav-poem5': '其五',
        'nav-poem6': '其六',
        'nav-music': '音乐',
        'name': '王俊儒',
        'intro': '1997年生，贵州苗族人',
        'poem-title': '其',
        'footer': '© 2025 王俊儒. All rights reserved.',
        'album-title': '三个时间的坐标',
        'track1': '春之流',
        'track2': '夏之蓝',
        'track3': '冬之云',
        'school1': '都匀二小',
        'school2': '都匀三中',
        'school3': '都匀一中',
        'school4': '中南大学 机械工程本科',
        'school5': '中南大学 机械工程硕士',
        'school6': '伦敦大学学院 科学计算硕士'
    },
    en: {
        'nav-home': 'Home',
        'nav-poetry': 'Poetry',
        'nav-poem1': 'Poem I',
        'nav-poem2': 'Poem II',
        'nav-poem3': 'Poem III',
        'nav-poem4': 'Poem IV',
        'nav-poem5': 'Poem V',
        'nav-poem6': 'Poem VI',
        'nav-music': 'Music',
        'name': 'Junru Wang',
        'intro': 'Born in 1997, Miao ethnicity, Guizhou',
        'poem-title': 'Poem ',
        'footer': '© 2025 Junru Wang. All rights reserved.',
        'album-title': 'Three Coordinates of Time',
        'track1': 'Spring Flows',
        'track2': 'Summer Blues',
        'track3': 'Winter Clouds',
        'school1': 'Duyun No.2 Primary School',
        'school2': 'Duyun No.3 Middle School',
        'school3': 'Duyun No.1 High School',
        'school4': 'Central South University, B.Eng. in Mechanical Engineering',
        'school5': 'Central South University, M.Eng. in Mechanical Engineering',
        'school6': 'University College London, M.Sc. in Scientific Computing'
    }
};

// 地点翻译
const placeTranslations = {
    zh: { '长沙': '长沙', '都匀': '都匀', '伦敦': '伦敦' },
    en: { '长沙': 'Changsha', '都匀': 'Duyun', '伦敦': 'London' }
};

// 时间翻译
const timeTranslations = {
    zh: { '2017年夏': '2017年夏', '2024年夏': '2024年夏', '2024年秋': '2024年秋', '2024年冬': '2024年冬', '2025年秋': '2025年秋' },
    en: { '2017年夏': 'Sum. 2017', '2024年夏': 'Sum. 2024', '2024年秋': 'Aut. 2024', '2024年冬': 'Win. 2024', '2025年秋': 'Aut. 2025' }
};

function t(key) {
    return translations[currentLang][key] || key;
}

function translatePlace(place) {
    return placeTranslations[currentLang][place] || place;
}

function translateTime(time) {
    return timeTranslations[currentLang][time] || time;
}

// Page templates
const pages = {
    home: () => `
        <section class="hero">
            <div class="hero-content">
                <img src="images/profile.jpg" alt="王俊儒" class="hero-photo-simple">
                <h1 class="hero-title">${t('name')}</h1>
                <p class="hero-description">${t('intro')}</p>
            </div>
        </section>
        <footer class="footer">
            <div class="container">
                <p>${t('footer')}</p>
            </div>
        </footer>
    `,

    poetry: () => `
        <section class="poetry-section">
            <article class="poem-stele" id="poem-1">
                <div class="poem-meta" data-lang="${currentLang}">
                    <span class="poem-title" data-lang="${currentLang}">${t('poem-title')}${currentLang === 'zh' ? '一' : 'I'}</span>
                    <span class="poem-place" data-lang="${currentLang}">${translatePlace('长沙')}</span>
                    <span class="poem-time" data-lang="${currentLang}">${translateTime('2017年夏')}</span>
                </div>
                <div class="poem-with-image">
                    <div class="poem-image">
                        <img src="images/云迫.jpeg" alt="长沙" class="poem-img">
                    </div>
                    <div class="stele-container">
                        <div class="poem-text">雲迫烟迴雨腳稠日斜晝盡夏花羞山摧水涌笛輪歇池滿樹頽蟲鳥休異客少眠聽瀝瀝月華不照望幽幽久停無計還家早待發難安對篋愁</div>
                    </div>
                </div>
            </article>

            <article class="poem-stele" id="poem-2">
                <div class="poem-meta" data-lang="${currentLang}">
                    <span class="poem-title" data-lang="${currentLang}">${t('poem-title')}${currentLang === 'zh' ? '二' : 'II'}</span>
                    <span class="poem-place" data-lang="${currentLang}">${translatePlace('长沙')}</span>
                    <span class="poem-time" data-lang="${currentLang}">${translateTime('2024年夏')}</span>
                </div>
                <div class="poem-with-image">
                    <div class="poem-image">
                        <img src="images/孤巷.jpeg" alt="长沙" class="poem-img">
                    </div>
                    <div class="stele-container">
                        <div class="poem-text">孤巷荒檐迷出入重雲疊嶂隱晨昏風搖濃翠向天亂夜織陰霖朝戶喧四載沉浮開棘路一朝聚散斷萍根濁醪猶醉前時夢新句還吟舊日痕</div>
                    </div>
                </div>
            </article>

            <article class="poem-stele" id="poem-3">
                <div class="poem-meta" data-lang="${currentLang}">
                    <span class="poem-title" data-lang="${currentLang}">${t('poem-title')}${currentLang === 'zh' ? '三' : 'III'}</span>
                    <span class="poem-place" data-lang="${currentLang}">${translatePlace('都匀')}</span>
                    <span class="poem-time" data-lang="${currentLang}">${translateTime('2024年夏')}</span>
                </div>
                <div class="poem-with-image">
                    <div class="poem-image">
                        <img src="images/梅雨.jpeg" alt="都匀" class="poem-img">
                    </div>
                    <div class="stele-container">
                        <div class="poem-text">梅雨連旬今始歇滿城靑綠竟昏冥孤潭鬱鬱盈腥腐遺院森森困古亭倦鳥銜愁難自駐詩家琢句總長停頻回舊景循宵月漫卷幽雲暗晚汀</div>
                    </div>
                </div>
            </article>

            <article class="poem-stele" id="poem-4">
                <div class="poem-meta" data-lang="${currentLang}">
                    <span class="poem-title" data-lang="${currentLang}">${t('poem-title')}${currentLang === 'zh' ? '四' : 'IV'}</span>
                    <span class="poem-place" data-lang="${currentLang}">${translatePlace('伦敦')}</span>
                    <span class="poem-time" data-lang="${currentLang}">${translateTime('2024年秋')}</span>
                </div>
                <div class="poem-with-image">
                    <div class="poem-image">
                        <img src="images/鸟惊.jpeg" alt="伦敦" class="poem-img">
                    </div>
                    <div class="stele-container">
                        <div class="poem-text">鳥驚薄暮梢頭月月冷相侵天色秋葉落蕭疏隨水逝舟搖飄轉逐雲流湖光歲久似清淺林影年長猶隱幽火瘦燭消車馬咽晚烟幾點入孤洲</div>
                    </div>
                </div>
            </article>

            <article class="poem-stele" id="poem-5">
                <div class="poem-meta" data-lang="${currentLang}">
                    <span class="poem-title" data-lang="${currentLang}">${t('poem-title')}${currentLang === 'zh' ? '五' : 'V'}</span>
                    <span class="poem-place" data-lang="${currentLang}">${translatePlace('伦敦')}</span>
                    <span class="poem-time" data-lang="${currentLang}">${translateTime('2024年冬')}</span>
                </div>
                <div class="poem-with-image">
                    <div class="poem-image">
                        <img src="images/海北.jpeg" alt="伦敦" class="poem-img">
                    </div>
                    <div class="stele-container">
                        <div class="poem-text">海北冬深光景短荒丘野寂只鴉鳴亂雲挾雨惹風驟鬱靄垂帷墜斗明顔色去來虛荻岸芳菲開謝倦江城臨扉頻舉酒樽重倚閣回看月影輕</div>
                    </div>
                </div>
            </article>

            <article class="poem-stele" id="poem-6">
                <div class="poem-meta" data-lang="${currentLang}">
                    <span class="poem-title" data-lang="${currentLang}">${t('poem-title')}${currentLang === 'zh' ? '六' : 'VI'}</span>
                    <span class="poem-place" data-lang="${currentLang}">${translatePlace('都匀')}</span>
                    <span class="poem-time" data-lang="${currentLang}">${translateTime('2025年秋')}</span>
                </div>
                <div class="poem-with-image">
                    <div class="poem-image">
                        <img src="images/野径.jpeg" alt="都匀" class="poem-img">
                    </div>
                    <div class="stele-container">
                        <div class="poem-text">野徑荒煙合蒼葭沒古丘鐘聲催晚景雁影掠空樓隨歲扁舟遠臨江寒月幽夜闌風更急吹夢與雲遊</div>
                    </div>
                </div>
            </article>
        </section>
    `,

    music: () => `
        <section class="music-section">
            <div class="container">
                <div class="album">
                    <div class="album-cover">
                        <img src="music/三个时间的坐标/407E76AB-74EC-4032-962B-8CF2C4480B67_1_105_c.jpeg" alt="${t('album-title')}">
                    </div>
                    <div class="album-info">
                        <h2 class="album-title">${t('album-title')}</h2>
                        <div class="album-tracklist">
                            <div class="track" data-index="0">
                                <span class="track-number">01</span>
                                <span class="track-title">${t('track1')}</span>
                                <button class="track-play-btn">▶</button>
                            </div>
                            <div class="track" data-index="1">
                                <span class="track-number">02</span>
                                <span class="track-title">${t('track2')}</span>
                                <button class="track-play-btn">▶</button>
                            </div>
                            <div class="track" data-index="2">
                                <span class="track-number">03</span>
                                <span class="track-title">${t('track3')}</span>
                                <button class="track-play-btn">▶</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <footer class="footer">
            <p>${t('footer')}</p>
        </footer>
    `
};

// Navigation logic
function navigateTo(pageName, scrollTarget = null) {
    // Load page content
    const pageTemplate = pages[pageName] || pages.home;
    appContent.innerHTML = typeof pageTemplate === 'function' ? pageTemplate() : pageTemplate;
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === pageName) {
            link.classList.add('active');
        }
    });

    // Update URL hash
    window.location.hash = pageName;

    // Scroll to top or specific element
    if (scrollTarget) {
        setTimeout(() => {
            const element = document.getElementById(scrollTarget);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Re-initialize page-specific features
    initPageFeatures(pageName);
}

// Lightbox global handlers (initialize once)
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

function closeLightbox() {
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function openLightbox(imageSrc) {
    // 检查图片源是否有效
    if (!imageSrc || imageSrc === 'undefined') {
        console.warn('Invalid image source for lightbox');
        return;
    }
    
    if (lightbox && lightboxImg) {
        lightbox.style.display = 'flex';
        lightboxImg.src = imageSrc;
        document.body.style.overflow = 'hidden';
    }
}

// Set up lightbox close handlers (once)
if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.style.display === 'block') {
        closeLightbox();
    }
});

// Initialize page-specific features
function initPageFeatures(pageName) {
    if (pageName === 'poetry') {
        // Re-initialize lightbox for images
        const poemImages = document.querySelectorAll('.poem-img');
        
        poemImages.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                if (img.src && img.complete) {
                    openLightbox(img.src);
                }
            });
            
            // 添加 3D 倾斜效果 - 鼠标跟随（仅桌面端）
            const container = img.parentElement;
            
            // 检测是否为桌面设备（有鼠标）
            const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
            
            if (isDesktop && window.innerWidth > 768) {
                container.addEventListener('mousemove', (e) => {
                    const rect = img.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = (y - centerY) / centerY * -10; // 垂直倾斜
                    const rotateY = (x - centerX) / centerX * 10;  // 水平倾斜
                    
                    img.style.transform = `
                        perspective(1000px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        scale3d(1.05, 1.05, 1.05)
                    `;
                });
                
                container.addEventListener('mouseleave', () => {
                    img.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                });
            }
        });
        
        // 给诗文的每个字添加交互效果
        const poemTexts = document.querySelectorAll('.poem-text');
        const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        
        poemTexts.forEach(poemText => {
            // 检查是否已经处理过（避免重复）
            if (poemText.querySelector('.char')) return;
            
            // 获取诗文内容
            const text = poemText.textContent;
            
            // 将每个字包裹在 span 中
            const wrappedText = text.split('').map(char => {
                return `<span class="char">${char}</span>`;
            }).join('');
            
            poemText.innerHTML = wrappedText;
            
            // 仅在桌面端添加 3D 效果
            if (isDesktop && window.innerWidth > 768) {
                const chars = poemText.querySelectorAll('.char');
                
                chars.forEach(char => {
                    char.addEventListener('mouseenter', (e) => {
                        const rect = char.getBoundingClientRect();
                        
                        // 添加鼠标移动监听
                        const onMouseMove = (moveEvent) => {
                            const x = moveEvent.clientX - rect.left;
                            const y = moveEvent.clientY - rect.top;
                            
                            const centerX = rect.width / 2;
                            const centerY = rect.height / 2;
                            
                            // 进一步减小旋转角度
                            const rotateX = (y - centerY) / centerY * -8; // 垂直倾斜
                            const rotateY = (x - centerX) / centerX * 8;  // 水平倾斜
                            
                            // 计算阴影方向 - 阴影应该在远离鼠标的方向
                            const offsetX = (x - centerX) / centerX;  // -1 到 1
                            const offsetY = (y - centerY) / centerY;  // -1 到 1
                            
                            // 阴影偏移（与鼠标方向相反）- 模拟真实光源投射
                            const shadowX = -offsetX * 2;  // 光源投射距离
                            const shadowY = -offsetY * 2;  // 光源投射距离
                            
                            // 模拟真实光源的投射阴影 - 带模糊效果
                            const shadows = [];
                            // 近距离阴影 - 清晰，加重
                            shadows.push(`${shadowX * 0.5}px ${shadowY * 0.5}px 1px rgba(0, 0, 0, 0.35)`);
                            // 中距离阴影 - 模糊增加，加重
                            shadows.push(`${shadowX * 1}px ${shadowY * 1}px 2px rgba(0, 0, 0, 0.22)`);
                            // 远距离阴影 - 更模糊，模拟光的扩散，加重
                            shadows.push(`${shadowX * 1.5}px ${shadowY * 1.5}px 4px rgba(0, 0, 0, 0.15)`);
                            
                            char.style.textShadow = shadows.join(', ');
                            char.style.transform = `
                                perspective(1500px)
                                rotateX(${rotateX}deg)
                                rotateY(${rotateY}deg)
                                scale(1.4)
                                translateZ(40px)
                            `;
                        };
                        
                        // 鼠标移出时清理
                        const onMouseLeave = () => {
                            char.style.transform = 'perspective(1500px) rotateX(0) rotateY(0) scale(1) translateZ(0)';
                            // 恢复默认阴影
                            char.style.textShadow = '';
                            char.removeEventListener('mousemove', onMouseMove);
                            char.removeEventListener('mouseleave', onMouseLeave);
                        };
                        
                        char.addEventListener('mousemove', onMouseMove);
                        char.addEventListener('mouseleave', onMouseLeave);
                    });
                });
            }
        });
    }

    if (pageName === 'music') {
        // Re-initialize music track clicks
        document.querySelectorAll('.track').forEach((track) => {
            track.addEventListener('click', () => {
                const index = parseInt(track.dataset.index);
                if (window.playTrackByIndex) {
                    window.playTrackByIndex(index);
                }
            });
        });

        document.querySelectorAll('.track-play-btn').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const track = btn.closest('.track');
                const index = parseInt(track.dataset.index);
                if (window.playTrackByIndex) {
                    window.playTrackByIndex(index);
                }
            });
        });
    }
}

// Handle navigation clicks
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-page]');
    if (link) {
        e.preventDefault();
        const pageName = link.dataset.page;
        const scrollTarget = link.dataset.scroll;
        navigateTo(pageName, scrollTarget);
    }
});

// Handle browser back/forward
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1) || 'home';
    const [page, scroll] = hash.split('#');
    navigateTo(page, scroll);
});

// Mobile optimizations
document.addEventListener('DOMContentLoaded', () => {
    // Prevent double-tap zoom on buttons (iOS)
    const buttons = document.querySelectorAll('button, .track, .poem-image img');
    buttons.forEach(button => {
        button.addEventListener('touchend', (e) => {
            e.preventDefault();
            button.click();
        }, { passive: false });
    });

    // Improve scroll performance on mobile
    if ('ontouchstart' in window) {
        document.body.style.webkitOverflowScrolling = 'touch';
    }

    // Handle dropdown on mobile (click instead of hover)
    if (window.innerWidth <= 768) {
        const dropdown = document.querySelector('.nav-dropdown');
        if (dropdown) {
            dropdown.addEventListener('click', (e) => {
                e.preventDefault();
                const menu = dropdown.querySelector('.dropdown-menu');
                if (menu) {
                    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
                }
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!dropdown.contains(e.target)) {
                    const menu = dropdown.querySelector('.dropdown-menu');
                    if (menu) {
                        menu.style.display = 'none';
                    }
                }
            });
        }
    }
});

// Language Toggle
function updateLanguage() {
    // 更新 body 的 data-lang 属性以切换字体
    document.body.setAttribute('data-lang', currentLang);
    
    // 更新导航栏文本
    document.querySelectorAll('[data-lang-key]').forEach(el => {
        const key = el.getAttribute('data-lang-key');
        el.textContent = t(key);
    });
    
    // 更新语言按钮文本
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.textContent = currentLang === 'zh' ? 'EN' : '中文';
    }
    
    // 重新加载当前页面
    const currentPage = window.location.hash.slice(1).split('#')[0] || 'home';
    navigateTo(currentPage);
}

// 语言切换按钮事件
document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'zh' ? 'en' : 'zh';
            localStorage.setItem('language', currentLang);
            updateLanguage();
        });
    }
    
    // 初始化语言
    updateLanguage();
});

// Initialize on load
const initialPage = window.location.hash.slice(1) || 'home';
const [page, scroll] = initialPage.split('#');
navigateTo(page, scroll);

