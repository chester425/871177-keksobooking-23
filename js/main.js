import {renderCard} from './render-card.js';
import {getAds} from './ads.js';
import {renderForm} from './form.js';

const data = getAds();
renderCard(data[5]);
// renderForm();
