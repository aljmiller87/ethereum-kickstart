// importing instance from file, not constructor from library
import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xCB6f4049507C5f211AeBaf8F1314ADAF3397c357'
);

export default instance;