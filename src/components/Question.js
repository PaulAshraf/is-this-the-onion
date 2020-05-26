import React from 'react'
import underscore from 'underscore'

import { Card, Button, Row, Col } from 'antd';


function Question(props) {

    const title = props.title
    const image = props.img
    const handleOnion = props.handleOnion
    const handleNotOnion = props.handleNotOnion 
    // const click = props.click

    return (
        <Card bordered={false} >
            {image!=='default'?<div style={{ display: 'flex', justifyContent: 'center'}}><img alt="thumbnail" src={image} /></div>:<></>}
            <h2>{underscore.unescape(title)}</h2>
            <Row gutter={[16, 16]}>
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
