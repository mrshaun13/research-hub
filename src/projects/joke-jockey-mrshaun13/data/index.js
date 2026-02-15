import { TOPICS } from './taxonomy';
import { stemJokes } from './jokes-stem';
import { natureJokes } from './jokes-nature';
import { everydayJokes } from './jokes-everyday';
import { popcultureJokes } from './jokes-popculture';
import { fantasyJokes } from './jokes-fantasy';
import { holidayJokes } from './jokes-holidays';
import { learningJokes } from './jokes-learning';
import { generationalJokes } from './jokes-generational';
import { extraJokes } from './jokes-extra';
import { stemJokes2 } from './jokes-stem-2';
import { natureJokes2 } from './jokes-nature-2';
import { everydayJokes2 } from './jokes-everyday-2';
import { popcultureJokes2 } from './jokes-popculture-2';
import { fantasyJokes2 } from './jokes-fantasy-2';
import { holidayJokes2 } from './jokes-holidays-2';
import { learningJokes2 } from './jokes-learning-2';
import { generationalJokes2 } from './jokes-generational-2';
import { extraJokes2 } from './jokes-extra-2';
import { stemJokes3 } from './jokes-stem-3';
import { natureJokes3 } from './jokes-nature-3';
import { everydayJokes3 } from './jokes-everyday-3';
import { popcultureJokes3 } from './jokes-popculture-3';
import { fantasyJokes3 } from './jokes-fantasy-3';
import { holidayJokes3 } from './jokes-holidays-3';
import { learningJokes3 } from './jokes-learning-3';
import { generationalJokes3 } from './jokes-generational-3';
import { extraJokes3 } from './jokes-extra-3';
import { stemJokes4 } from './jokes-stem-4';
import { natureJokes4 } from './jokes-nature-4';
import { everydayJokes4 } from './jokes-everyday-4';
import { popcultureJokes4 } from './jokes-popculture-4';
import { fantasyJokes4 } from './jokes-fantasy-4';
import { holidayJokes4 } from './jokes-holidays-4';
import { learningJokes4 } from './jokes-learning-4';
import { generationalJokes4 } from './jokes-generational-4';
import { extraJokes4 } from './jokes-extra-4';
import { stemJokes5 } from './jokes-stem-5';
import { megamixJokes5 } from './jokes-megamix-5';
import { megamixJokes6 } from './jokes-megamix-6';
import { megamixJokes7 } from './jokes-megamix-7';
import { megamixJokes8 } from './jokes-megamix-8';
import { megamixJokes9 } from './jokes-megamix-9';
import { megamixJokes10 } from './jokes-megamix-10';
import { megamixJokes11 } from './jokes-megamix-11';
import { megamixJokes12 } from './jokes-megamix-12';
import { megamixJokes13 } from './jokes-megamix-13';
import { megamixJokes14 } from './jokes-megamix-14';

export { STYLES, TOPICS, TOPIC_GROUPS, AGE_GROUPS, GENERATIONS } from './taxonomy';

export const ALL_JOKES = [
  ...stemJokes,
  ...natureJokes,
  ...everydayJokes,
  ...popcultureJokes,
  ...fantasyJokes,
  ...holidayJokes,
  ...learningJokes,
  ...generationalJokes,
  ...extraJokes,
  ...stemJokes2,
  ...natureJokes2,
  ...everydayJokes2,
  ...popcultureJokes2,
  ...fantasyJokes2,
  ...holidayJokes2,
  ...learningJokes2,
  ...generationalJokes2,
  ...extraJokes2,
  ...stemJokes3,
  ...natureJokes3,
  ...everydayJokes3,
  ...popcultureJokes3,
  ...fantasyJokes3,
  ...holidayJokes3,
  ...learningJokes3,
  ...generationalJokes3,
  ...extraJokes3,
  ...stemJokes4,
  ...natureJokes4,
  ...everydayJokes4,
  ...popcultureJokes4,
  ...fantasyJokes4,
  ...holidayJokes4,
  ...learningJokes4,
  ...generationalJokes4,
  ...extraJokes4,
  ...stemJokes5,
  ...megamixJokes5,
  ...megamixJokes6,
  ...megamixJokes7,
  ...megamixJokes8,
  ...megamixJokes9,
  ...megamixJokes10,
  ...megamixJokes11,
  ...megamixJokes12,
  ...megamixJokes13,
  ...megamixJokes14,
];

export const TOTAL_JOKE_COUNT = ALL_JOKES.length;

const AGE_MAX_MAP = { '4-6': 6, '7-9': 9, '10-12': 12, '13-15': 15, '16+': 99 };

export function filterJokes({ styles = [], topics = [], ageGroups = [], generations = [] }) {
  let filtered = ALL_JOKES;

  if (styles.length > 0) {
    filtered = filtered.filter(j => styles.includes(j.style));
  }

  if (topics.length > 0) {
    filtered = filtered.filter(j => j.topics.some(t => topics.includes(t)));
  }

  if (ageGroups.length > 0) {
    const maxAges = ageGroups.map(ag => AGE_MAX_MAP[ag] || 99);
    const highestMax = Math.max(...maxAges);
    filtered = filtered.filter(j => j.ageMin <= highestMax);
  }

  if (generations.length > 0) {
    filtered = filtered.filter(j => generations.includes(j.generation) || j.generation === 'universal');
  }

  return filtered;
}

export function weightedFilterJokes({ styleWeights = {}, groupWeights = {}, ageGroups = [], generations = [] }) {
  let pool = ALL_JOKES;

  if (ageGroups.length > 0) {
    const maxAges = ageGroups.map(ag => AGE_MAX_MAP[ag] || 99);
    const highestMax = Math.max(...maxAges);
    pool = pool.filter(j => j.ageMin <= highestMax);
  }

  if (generations.length > 0) {
    pool = pool.filter(j => generations.includes(j.generation) || j.generation === 'universal');
  }

  const topicToGroup = {};
  TOPICS.forEach(t => { topicToGroup[t.id] = t.group; });

  const scored = pool.map(joke => {
    let score = 0;

    const sw = styleWeights[joke.style];
    if (sw !== undefined && sw > 0) {
      score += sw;
    } else if (sw === 0) {
      return null;
    } else {
      score += 50;
    }

    let bestGroupWeight = 0;
    let anyGroupActive = false;
    joke.topics.forEach(t => {
      const g = topicToGroup[t];
      if (g) {
        const gw = groupWeights[g];
        if (gw !== undefined) {
          anyGroupActive = true;
          if (gw > bestGroupWeight) bestGroupWeight = gw;
        }
      }
    });

    if (anyGroupActive) {
      if (bestGroupWeight === 0) return null;
      score += bestGroupWeight;
    } else {
      score += 50;
    }

    return { joke, score };
  }).filter(Boolean);

  scored.sort((a, b) => b.score - a.score);
  return scored.map(s => s.joke);
}

export function getRandomJoke(jokes) {
  return jokes[Math.floor(Math.random() * jokes.length)];
}

export function shuffleJokes(jokes) {
  const shuffled = [...jokes];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getJokeStats() {
  const stats = {
    total: ALL_JOKES.length,
    byStyle: {},
    byTopic: {},
    byGeneration: {},
    byAge: { '4-6': 0, '7-9': 0, '10-12': 0, '13-15': 0, '16+': 0 },
  };

  ALL_JOKES.forEach(j => {
    stats.byStyle[j.style] = (stats.byStyle[j.style] || 0) + 1;
    j.topics.forEach(t => {
      stats.byTopic[t] = (stats.byTopic[t] || 0) + 1;
    });
    stats.byGeneration[j.generation] = (stats.byGeneration[j.generation] || 0) + 1;
    if (j.ageMin <= 6) stats.byAge['4-6']++;
    if (j.ageMin <= 9) stats.byAge['7-9']++;
    if (j.ageMin <= 12) stats.byAge['10-12']++;
    if (j.ageMin <= 15) stats.byAge['13-15']++;
    stats.byAge['16+']++;
  });

  return stats;
}
