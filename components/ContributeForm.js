import React, { useState } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

const ContributeForm = ({ address }) => {
    const [contributeValue, setContributeValue] = useState('');
    const onSumbit = async (e) => {
        e.preventDefault();
        console.log('getting to onSubmit');
        const campaign = Campaign(address);
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(contributeValue, 'ether')
            })
        } catch (err) {

        }
    }
    return (
        <Form onSubmit={(e) => onSumbit(e)}>
            <Form.Field>
                <label>Amount to contribute</label>
                <Input
                    label="ether"
                    labelPosition="right"
                    value={contributeValue}
                    onChange={(e) => setContributeValue(e.target.value)}
                />
            </Form.Field>
            <Button primary>
                Contribute!
            </Button>
        </Form>
    )
}

export default ContributeForm;