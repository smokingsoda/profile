import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PoemStele, { type PoemData } from './PoemStele';
import styles from './Poetry.module.css';

const POEMS: PoemData[] = [
  {
    id: 'poem-1',
    titleZh: '其一',
    titleEn: 'Poem I',
    place: '长沙',
    time: '2017年夏',
    image: 'images/云迫.jpeg',
    imageAlt: '长沙',
    text: '雲迫烟迴雨腳稠日斜晝盡夏花羞山摧水涌笛輪歇池滿樹頽蟲鳥休異客少眠聽瀝瀝月華不照望幽幽久停無計還家早待發難安對篋愁',
  },
  {
    id: 'poem-2',
    titleZh: '其二',
    titleEn: 'Poem II',
    place: '长沙',
    time: '2024年夏',
    image: 'images/孤巷.jpeg',
    imageAlt: '长沙',
    text: '孤巷荒檐迷出入重雲疊嶂隱晨昏風搖濃翠向天亂夜織陰霖朝戶喧四載沉浮開棘路一朝聚散斷萍根濁醪猶醉前時夢新句還吟舊日痕',
  },
  {
    id: 'poem-3',
    titleZh: '其三',
    titleEn: 'Poem III',
    place: '都匀',
    time: '2024年夏',
    image: 'images/梅雨.jpeg',
    imageAlt: '都匀',
    text: '梅雨連旬今始歇滿城靑綠竟昏冥孤潭鬱鬱盈腥腐遺院森森困古亭倦鳥銜愁難自駐詩家琢句總長停頻回舊景循宵月漫卷幽雲暗晚汀',
  },
  {
    id: 'poem-4',
    titleZh: '其四',
    titleEn: 'Poem IV',
    place: '伦敦',
    time: '2024年秋',
    image: 'images/鸟惊.jpeg',
    imageAlt: '伦敦',
    text: '鳥驚薄暮梢頭月月冷相侵天色秋葉落蕭疏隨水逝舟搖飄轉逐雲流湖光歲久似清淺林影年長猶隱幽火瘦燭消車馬咽晚烟幾點入孤洲',
  },
  {
    id: 'poem-5',
    titleZh: '其五',
    titleEn: 'Poem V',
    place: '伦敦',
    time: '2024年冬',
    image: 'images/海北.jpeg',
    imageAlt: '伦敦',
    text: '海北冬深光景短荒丘野寂只鴉鳴亂雲挾雨惹風驟鬱靄垂帷墜斗明顔色去來虛荻岸芳菲開謝倦江城臨扉頻舉酒樽重倚閣回看月影輕',
  },
  {
    id: 'poem-6',
    titleZh: '其六',
    titleEn: 'Poem VI',
    place: '都匀',
    time: '2025年秋',
    image: 'images/野径.jpeg',
    imageAlt: '都匀',
    text: '野徑荒煙合蒼葭沒古丘鐘聲催晚景雁影掠空樓隨歲扁舟遠臨江寒月幽夜闌風更急吹夢與雲遊',
  },
  {
    id: 'poem-7',
    titleZh: '临江仙',
    titleEn: 'Linjiang Xian',
    place: '大理',
    time: '2025年冬',
    image: 'images/临江仙.JPG',
    imageAlt: '大理',
    text: '雪綫輕勾蒼嶺色遙連洱海千重長風獵獵上雲峰水杉臨冷畔鷗鷺點晴空且把寒薪燃熱焰亂紅飛入星叢火中明滅舊時容煙消林野闊新月挂天東',
  },
];

export default function Poetry() {
  const location = useLocation();

  // Handle scroll-to-poem from hash or state
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <section className={styles['poetry-section']}>
      {POEMS.map((poem) => (
        <PoemStele key={poem.id} poem={poem} />
      ))}
    </section>
  );
}
