import React, { useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

const RequestRow = ({ request, id, address, approversCount}) => {
    const [loading, setLoading] = useState(false);
    const [finalizeLoading, setFinalizeLoading] = useState(false);
    const readyToFinalize = request.approvalCount > approversCount / 2;
    const onApprove = async () => {
        setLoading(true);
        try {
            const campaign = Campaign(address);
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.approveRequest(id).send({
                from: accounts[0]
            });
        } catch (error) {

        }
        setLoading(false);

    }
    const onFinalize = async () => {
        setFinalizeLoading(true);
        try {
            const campaign = Campaign(address);
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.finalizeRequest(id).send({
                from: accounts[0]
            });
        } catch (error) {

        }
        setFinalizeLoading(false);

    }
    return (
        <Table.Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
            <Table.Cell>{id + 1}</Table.Cell>
            <Table.Cell>{request.description}</Table.Cell>
            <Table.Cell>{web3.utils.fromWei(request.value, 'ether')}</Table.Cell>
            <Table.Cell>{request.recipient}</Table.Cell>
            <Table.Cell>{request.approvalCount}/{approversCount}</Table.Cell>
            <Table.Cell>
                { request.complete ? 'Approved' :
                    <Button
                        color="green"
                        basic
                        onClick={onApprove}
                        loading={loading}
                    >
                        Approve
                    </Button>
                }
            </Table.Cell>
            <Table.Cell>
                { request.complete ? 'Finalized' :
                    <Button
                        color="teal"
                        basic
                        onClick={onFinalize}
                        loading={finalizeLoading}
                    >
                        Finalize
                    </Button>
                }
            </Table.Cell>
        </Table.Row>
    )
}

export default RequestRow;
