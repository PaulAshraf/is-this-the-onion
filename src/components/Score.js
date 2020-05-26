import React from 'react'

import { Statistic, Card, Row, Col } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';



function Score(props) {

    const correct = props.correct
    const wrong = props.wrong

    return (
    <div style = {{padding: '30px'}}>
      <Row gutter={16}>
      <Col span={12}>
        <Card>
          <Statistic
            title="Correct"
            value={correct}
            valueStyle={{ color: '#3f8600' }}
            prefix={<CheckOutlined />}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <Statistic
            title="False"
            value={wrong}
            valueStyle={{ color: '#cf1322' }}
            prefix={<CloseOutlined />}
          />
        </Card>
      </Col>
    </Row>
    </div>
    )
}

export default Score
