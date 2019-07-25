import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';

const RequestIndex = ({ address }) => {
    return (
        <Layout>
            <h3>Pending Requests</h3>
            <Link route={`/campaigns/${address}/requests/new`}>
                <a>
                    <Button primary>Add request</Button>
                </a>
            </Link>
        </Layout>
    )
}

RequestIndex.getInitialProps = async (props) => {
    const { address } = props.query;

    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const requests = await Promise.all(
        Array(requestCount).fill().map((element, index) => {
            return campaign.methods.requests(index).call()
        })
    )

    console.log('requests', requests);

    return { address };
}

export default RequestIndex;
