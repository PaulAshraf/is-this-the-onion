import React, {useEffect, useState} from 'react';
import './App.css';
import Score from './components/Score'
import Question from './components/Question'

import axios from 'axios'



import { Layout, Result, Button, Alert, Tooltip, Spin} from 'antd';
import { GithubOutlined, LoadingOutlined } from '@ant-design/icons';
const { Header, Footer, Content } = Layout;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function App() {

  const [onion, setOnion] = useState(null)
  const [notOnion, setNotOnion] = useState(null)

  const [correct, setCorrect] = useState(0)
  const [wrong, setWrong] = useState(0)

  const [alert, setAlert] = useState(false)

  // const [click, setClick] = useState([false, false, false, false])

  useEffect(() => {
    axios.get('https://www.reddit.com/r/theonion/hot.json').then((data) => {
      setOnion(data.data.data.children.map(obj => {return {title: obj.data.title, img: obj.data.thumbnail}}))
    })
    axios.get('https://www.reddit.com/r/nottheonion/hot.json').then((data) => {
      setNotOnion(data.data.data.children.map(obj => {return {title: obj.data.title, img: obj.data.thumbnail}}))
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
    if(onion.length === 0 && notOnion.length === 0){
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
    if(notOnion.length !== 0){
      let qs = notOnion.pop()
      return <Question title={qs.title} img={qs.img} handleOnion={handleWrong} handleNotOnion={handleCorrect}/>
    }
    if(onion.length !== 0){
      let qs = onion.pop()
      return <Question title={qs.title} img={qs.img} handleOnion={handleCorrect} handleNotOnion={handleWrong}/>
    }
    if(getRandom()){
      let qs = onion.pop()
      return <Question title={qs.title} img={qs.img} handleOnion={handleCorrect} handleNotOnion={handleWrong}/>
    }
    else{
      let qs = notOnion.pop()
      return <Question title={qs.title} img={qs.img} handleOnion={handleWrong} handleNotOnion={handleCorrect}/>
    }
  }
  

  if(wrong + correct !== 20){
    return (
      <Layout>
        {(onion && notOnion && onion.length === 0 && notOnion.length === 0)?<></>:<Header><h1 style={{color: 'white', textAlign: 'center'}}>Is This The Onion?</h1></Header>}
        <Content>
          {(onion && notOnion && onion.length === 0 && notOnion.length === 0)?<></>:<Score correct={correct} wrong={wrong}/>}
          {(onion && notOnion && onion.length === 0 && notOnion.length === 0)?<></>:wrong + correct !== 0?alert?<Alert message="Correct" type="success" showIcon />:<Alert message="False" type="error" showIcon/>:<></>}
          <br />
          {(!onion || !notOnion)?<Spin style={{ display: 'flex', justifyContent: 'center'}} indicator={antIcon} />:renderQuestion()}
        </Content>
        <Footer>
          <p style={{textAlign: 'center'}}>Paul Ashraf &copy; 2020</p>
          <br />
          <div style={{ display: 'flex', justifyContent: 'center'}}>
            <Tooltip title="Check the Source Code" placement="bottom">
              <Button type="primary" shape="circle" icon={<GithubOutlined />} target="_blank" href='https://github.com/PaulAshraf/is-this-the-onion'/>
            </Tooltip>
          </div>
        </Footer>
      </Layout>
    );
  }
  else{
    if(onion && notOnion){
      return(
        <Layout>
          <Content>
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
          </Content>
          <Footer>
            <p style={{textAlign: 'center'}}>Paul Ashraf &copy; 2020</p>
            <br />
            <div style={{ display: 'flex', justifyContent: 'center'}}>
              <Tooltip title="Check the Source Code" placement="bottom">
                <Button type="primary" shape="circle" icon={<GithubOutlined />} target="_blank" href='https://github.com/PaulAshraf/is-this-the-onion'/>
              </Tooltip>
            </div>
          </Footer>
        </Layout>
      )
    }
  }


 
}

export default App;
