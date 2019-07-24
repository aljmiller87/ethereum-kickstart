import React from 'react';
import { Card, Grid } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';

import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import ContributeForm from '../../components/ContributeForm';

const CampaignShow = props => {
    const {
        balance,
        manager,
        minimumContribution,
        requestsCount,
        approversCount
    } = props;

    const renderCards = () => {


        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'The manager created this campaign and can create requests to withdraw money.',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'You must contribute at least this much wei to become an approver.'
            },
            {
                header: requestsCount,
                meta: 'Number or Requests',
                description: 'A request tries to withdraw money from the contract. A request must be approved by approvers'
            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description: 'Number of people who have already donated to this campaign.'
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (ether)',
                description: 'The balance is how much money this campaign has raised.'
            }

        ];

        return <Card.Group items={items} />
    };
    return (
        <Layout>
            <h3>Campaign Details</h3>
            <Grid>
                <Grid.Column width={10}>
                    {renderCards()}
                </Grid.Column>
                <Grid.Column width={6}>
                    <ContributeForm address={props.address}/>
                </Grid.Column>
            </Grid>
        </Layout>
    )
}

CampaignShow.getInitialProps = async (props) => {
    const address = props.query.address;
    const campaign = Campaign(address);
    const summary = await campaign.methods.getSummary().call();
    return {
        address,
        minimumContribution: summary[0],
        balance: summary[1],
        requestsCount: summary[2],
        approversCount: summary[3],
        manager: summary[4]
     }
}

export default CampaignShow;