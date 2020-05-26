import React, {useEffect, useState} from 'react';
import './App.css';
import Score from './components/Score'
import Question from './components/Question'

import axios from 'axios'

import { Layout, Result, Button, Alert, Tooltip} from 'antd';
import { GithubOutlined } from '@ant-design/icons';
const { Header, Footer, Content } = Layout;

function App() {

  const [onion, setOnion] = useState(['.'])
  const [notOnion, setNotOnion] = useState(['.'])

  const [correct, setCorrect] = useState(0)
  const [wrong, setWrong] = useState(0)

  const [alert, setAlert] = useState(false)

  // const [click, setClick] = useState([false, false, false, false])

  useEffect(() => {
    axios.get('https://www.reddit.com/r/theonion/hot.json').then((data) => {
      setOnion(data.data.data.children.map(obj => {return obj.data.title}))
    })
    axios.get('https://www.reddit.com/r/nottheonion/hot.json').then((data) => {
      setNotOnion(data.data.data.children.map(obj => {return obj.data.title}))
    })
  }, [])

  function handleCorrect(){
    setAlert(true)
    setCorrect(correct + 1)
  }

  function handleWrong(){
    setAlert(false)
    setWrong(wrong + 1)
  }

  function getRandom() {
    return Math.random()<0.5
  }

  function renderQuestion(){
    if(getRandom()){
      let title = onion.pop()
      return <Question title={title} handleOnion={handleCorrect} handleNotOnion={handleWrong}/>
    }
    else{
      let title = notOnion.pop()
      return <Question title={title} handleOnion={handleWrong} handleNotOnion={handleCorrect}/>
    }
  }

  if(onion.length + notOnion.length !== 0){
    return (
      <Layout>
        <Header><h1 style={{color: 'white', textAlign: 'center'}}>Is This The Onion?</h1></Header>
        <Content>
          <Score correct={correct} wrong={wrong}/>
          {wrong + correct !== 0?alert?<Alert message="Correct" type="success" showIcon />:<Alert message="False" type="error" showIcon/>:<></>}
          <br />
          {renderQuestion()}
        </Content>
        <Footer>
        <p style={{textAlign: 'center'}}>Paul Ashraf &copy; 2020</p>
        <br />
        <div style={{ display: 'flex', justifyContent: 'center'}}>
        <Tooltip title="Checkout the Source Code" placement="bottom">
          <Button type="primary" shape="circle" icon={<GithubOutlined />} target="_blank" href='https://github.com/PaulAshraf/is-this-the-onion'/>
        </Tooltip>
        </div>
        </Footer>
      </Layout>
    );
  }
  else{
    return(
      <Result
        status="success"
        title="Finshed the Round"
        extra={[
          <Score correct={correct} wrong={wrong}/>,
          <br />,
          <Button type="primary" key="playAgain" onClick={() => {window.location.reload()}}>
            Play Again
          </Button>,
        ]}
      />
    )
  }


 
}

export default App;
