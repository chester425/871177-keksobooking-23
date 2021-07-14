import {renderCard} from './render-card.js';
import {getAds} from './ads.js';

const data = getAds();
renderCard(data[5]);
