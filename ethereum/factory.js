// importing instance from file, not constructor from library
import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xCe8688ACB75A8909cF12ee9BC2DE611b2cAA7Dc5'
);

export default instance;