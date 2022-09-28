import { Layout } from 'antd';
const { Sider, Content } = Layout;
import { Main, Menu, Container } from './components'
import 'antd/dist/antd.css';

const App = () => {
  return (
    <div className='layout'>
      <Layout>
        <Layout>
          <Sider width={'60px'}>
            <Menu />      
          </Sider>
          <Sider width={'380px'}>
            <Main />
          </Sider>
          <Content>
            <Container />
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default App;