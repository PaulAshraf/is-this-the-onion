import React from 'react'

import { Card, Button, Row, Col } from 'antd';


function Question(props) {

    const title = props.title
    // const image = props.image
    const handleOnion = props.handleOnion
    const handleNotOnion = props.handleNotOnion 
    // const click = props.click

    return (
        <Card bordered={false}>
            <h2>{title}</h2>
            <Row gutter={16}>
                <Col span={12}>
                    <Button block onClick={handleOnion} key="onion">
                        <strong>The Onion</strong>
                    </Button>
                </Col>
                <Col span={12}>
                    <Button block onClick={handleNotOnion} key="notOnion">
                        <strong>Not The Onion</strong>
                    </Button>
                </Col>
            </Row>
        </Card>
    )
}

export default Question
