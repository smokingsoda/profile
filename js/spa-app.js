// Single Page Application Logic
const appContent = document.getElementById('app-content');

// Page templates
const pages = {
    home: `
        <section class="hero">
            <div class="hero-content">
                <div class="hero-photo-container">
                    <img src="images/profile.jpg" alt="王俊儒" class="hero-photo">
                </div>
                <div class="hero-info">
                    <h1 class="hero-title">王俊儒</h1>
                    <p class="hero-description">1997年生，贵州苗族人</p>
                    
                    <div class="hero-timeline">
                        <div class="timeline-item">
                            <span class="timeline-year">2004-2010</span>
                            <span class="timeline-content">都匀二小</span>
                        </div>
                        <div class="timeline-item">
                            <span class="timeline-year">2010-2013</span>
                            <span class="timeline-content">都匀三中</span>
                        </div>
                        <div class="timeline-item">
                            <span class="timeline-year">2013-2016</span>
                            <span class="timeline-content">都匀一中</span>
                        </div>
                        <div class="timeline-item">
                            <span class="timeline-year">2016-2020</span>
                            <span class="timeline-content">中南大学 机械工程本科</span>
                        </div>
                        <div class="timeline-item">
                            <span class="timeline-year">2020-2023</span>
                            <span class="timeline-content">中南大学 机械工程硕士</span>
                        </div>
                        <div class="timeline-item">
                            <span class="timeline-year">2024-2025</span>
                            <span class="timeline-content">伦敦大学学院 科学计算硕士</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <footer class="footer">
            <div class="container">
                <p>&copy; 2025 王俊儒. All rights reserved.</p>
            </div>
        </footer>
    `,

    poetry: `
        <section class="poetry-section">
            <article class="poem-stele" id="poem-1">
                <div class="poem-meta">
                    <span class="poem-title">其一</span>
                    <span class="poem-place">长沙</span>
                    <span class="poem-time">2017年夏</span>
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
                <div class="poem-meta">
                    <span class="poem-title">其二</span>
                    <span class="poem-place">长沙</span>
                    <span class="poem-time">2024年夏</span>
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
                <div class="poem-meta">
                    <span class="poem-title">其三</span>
                    <span class="poem-place">都匀</span>
                    <span class="poem-time">2024年夏</span>
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
                <div class="poem-meta">
                    <span class="poem-title">其四</span>
                    <span class="poem-place">伦敦</span>
                    <span class="poem-time">2024年秋</span>
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
                <div class="poem-meta">
                    <span class="poem-title">其五</span>
                    <span class="poem-place">伦敦</span>
                    <span class="poem-time">2024年冬</span>
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
                <div class="poem-meta">
                    <span class="poem-title">其六</span>
                    <span class="poem-place">都匀</span>
                    <span class="poem-time">2025年秋</span>
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

    music: `
        <section class="music-section">
            <div class="container">
                <div class="album">
                    <div class="album-cover">
                        <img src="music/三个时间的坐标/407E76AB-74EC-4032-962B-8CF2C4480B67_1_105_c.jpeg" alt="三个时间的坐标">
                    </div>
                    <div class="album-info">
                        <h2 class="album-title">三个时间的坐标</h2>
                        <div class="album-tracklist">
                            <div class="track" data-index="0">
                                <span class="track-number">01</span>
                                <span class="track-title">春之流</span>
                                <button class="track-play-btn">▶</button>
                            </div>
                            <div class="track" data-index="1">
                                <span class="track-number">02</span>
                                <span class="track-title">夏之蓝</span>
                                <button class="track-play-btn">▶</button>
                            </div>
                            <div class="track" data-index="2">
                                <span class="track-number">03</span>
                                <span class="track-title">冬之云</span>
                                <button class="track-play-btn">▶</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <footer class="footer">
            <p>&copy; 2025 王俊儒. All rights reserved.</p>
        </footer>
    `
};

// Navigation logic
function navigateTo(pageName, scrollTarget = null) {
    // Load page content
    appContent.innerHTML = pages[pageName] || pages.home;
    
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
                openLightbox(img.src);
            });
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

// Initialize on load
const initialPage = window.location.hash.slice(1) || 'home';
const [page, scroll] = initialPage.split('#');
navigateTo(page, scroll);

