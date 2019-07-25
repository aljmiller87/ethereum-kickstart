import React, { useState } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import { Router } from '../routes';

const ContributeForm = ({ address }) => {
    const [contributeValue, setContributeValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onSumbit = async (e) => {
        e.preventDefault();
        const campaign = Campaign(address);
        setError('');
        setLoading(true);
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute()
            .send({
                from: accounts[0],
                value: web3.utils.toWei(contributeValue, 'ether')
            })
            .on('confirmation', (confirmationNumber, receipt) => {
                // If first confirmation...
                if (confirmationNumber === 1) {
                    Router.replaceRoute(`/campaigns/${address}`);
                }

            });
        } catch (err) {

            setError(err.message);
        }
        setLoading(false);
        setContributeValue('');
    }
    return (
        <Form onSubmit={(e) => onSumbit(e)} error={!!error}>
            <Form.Field>
                <label>Amount to contribute</label>
                <Input
                    label="ether"
                    labelPosition="right"
                    value={contributeValue}
                    onChange={(e) => setContributeValue(e.target.value)}
                />
            </Form.Field>
            <Message error header="Ooops!" content={error} />
            <Button loading={loading} primary>
                Contribute!
            </Button>
        </Form>
    )
}

export default ContributeForm;