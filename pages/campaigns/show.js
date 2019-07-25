import React from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

const CampaignShow = props => {
    const {
        address,
        balance,
        manager,
        minimumContribution,
        requestsCount,
        approversCount
    } = props;

    // const fetchContractSummary = async () => {
    //     console.log('address in fetchContractSummary', address);
    //     const campaign = Campaign(address);
    //     const summary = await campaign.methods.getSummary().call();
    //     return {
    //         address,
    //         minimumContribution: summary[0],
    //         balance: summary[1],
    //         requestsCount: summary[2],
    //         approversCount: summary[3],
    //         manager: summary[4]
    //     }
    // }

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
                <Grid.Row>
                    <Grid.Column width={10}>
                        {renderCards()}

                    </Grid.Column>
                    <Grid.Column width={6}>
                        <ContributeForm address={props.address} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Link route={`/campaigns/${address}/requests`}>
                            <a>
                                <Button primary>Requests</Button>
                            </a>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Layout>
    )
}

CampaignShow.getInitialProps = async (props) => {
    console.log('CampaignShow.getInitialProps called');
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