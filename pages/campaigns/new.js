import React, { useState } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

const CampaignNew = props => {
    const [minimumContribution, setMinimumContribution] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleClick = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setLoading(!loading);
        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
            .createCampaign(minimumContribution)
            .send({
                from: accounts[0]
            }) // Wait for transaction to confirm
            .on('confirmation', (confirmationNumber, receipt) => {
                // If first confirmation...
                if (confirmationNumber === 1)
                  // ... navigate to root URL
                  Router.pushRoute('/');
              });

        } catch (err) {
            setErrorMessage(err.message);
        }
        setLoading(!loading);

    };

    return (
        <Layout>
            <h3>Create A Campaign</h3>
            <Form onSubmit={(e) => handleClick(e)} error={!!errorMessage}>
                <Form.Field>
                    <label>Minimum Contribution</label>
                    <Input
                    label="wei"
                    labelPosition="right"
                    value={minimumContribution}
                    required={true}
                    onChange = {e => setMinimumContribution(e.target.value)}
                />
                </Form.Field>
                <Message error header="Ooops!" content={errorMessage} />
                <Button loading={loading} primary>Create! </Button>
            </Form>
        </Layout>
    )
}

export default CampaignNew;