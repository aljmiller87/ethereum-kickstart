import React, { useState } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import Layout from '../../../components/Layout';
import { Link, Router } from '../../../routes';

const RequestNew = props => {
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');
    const [recipient, setRecipient] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        const campaign = Campaign(props.address);
        setLoading(true);
        setErrorMessage('');

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods
            .createRequest(
                description,
                web3.utils.toWei(value, 'ether'),
                recipient)
            .send({
                from: accounts[0]
            }) // Wait for transaction to confirm
            .on('confirmation', (confirmationNumber, receipt) => {
                // If first confirmation...
                if (confirmationNumber === 1)
                  // ... navigate to root URL
                  Router.pushRoute(`/campaigns/${props.address}/requests`);
            });
        } catch (error) {
            console.log(error.message);
            setErrorMessage(error.message);
        }
        setLoading(false);
    }

    return (
        <Layout>
            <h3>Create new Request</h3>
            <Link route={`/campaigns/${props.address}/requests`}>
                <a>Back</a>
            </Link>
            <Form onSubmit={(e) => onSubmit(e)} error={!!errorMessage}>
                <Form.Field>
                    <label>Description</label>
                    <Input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                </Form.Field>
                <Form.Field>
                    <label>Value in Ether</label>
                    <Input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Recipient Address</label>
                    <Input
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                    />
                </Form.Field>
                <Message error header="Ooops!" content={errorMessage} />
                <Button loading={loading} primary>Create!</Button>
            </Form>
        </Layout>
    )
}

RequestNew.getInitialProps = async (props) => {
    const { address } = props.query;
    return { address };
}

export default RequestNew;
