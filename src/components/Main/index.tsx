import { useState, useEffect } from 'react';
import { Collapse, Skeleton } from 'antd';
import { FixedSizeList as List } from "react-window";
import { useFetch } from '../../hooks';
import dataGroup from '../../utils/dataGroup'
import { Card } from '../../components';
import "./style.less";
const { Panel } = Collapse;

const Main: React.FC = () => {
  const [dataCroup, setDataCroup] = useState(new Map())
  const [dataList, setDataList] = useState([])
  const [posts1, loading1] = useFetch('https://6cxx9pggi4.execute-api.us-east-1.amazonaws.com/prod/mock/meeting-a/list', 'GET', { page_now: 1, page_size: 3000 })
  const [posts2, loading2] = useFetch('https://6cxx9pggi4.execute-api.us-east-1.amazonaws.com/prod/mock/meeting-b/list', 'GET', { page_now: 1, page_size: 3000 })

  useEffect(() => {
    if (!loading1 && !loading2) {
      setDataCroup(dataGroup(posts1.list, posts2.list))
    }
  }, [loading1, loading2])

  const showCompBefore = () => {
    const temp: any = [], childs: any = [], keys: string[] = [];
    if (dataCroup.size) {
      for (const iterator of dataCroup) {
        const title = iterator[0], lists = iterator[1];
        keys.push(title)
        childs.push(
          <Panel header={title} key={title}>
            {Array.isArray(lists) &&
              lists.sort((a, b) => new Date(a.create_time).getTime() - new Date(b.create_time).getTime())
                .map(({ id, title, create_time, duration }) => (<Card
                  key={id}
                  id={id}
                  title={title}
                  create_time={create_time}
                  duration={duration}
                />)
                )}
          </Panel>
        )
      }
      temp.push(<Collapse defaultActiveKey={keys} ghost>
        {childs}
      </Collapse>)
    }
    setDataList(temp)
  }

  useEffect(() => {
    showCompBefore()
  }, [dataCroup])
  const showComp = ({ index, style }) => {
    console.log(dataList)
    return <div style={style}>{dataList[index]}</div>
  }

  return (
    <div className='main'>
      <h4 className='main-title'>Meeting Notes</h4>
      {
        dataList.length ?
          <List
            height={900}
            width={360}
            itemSize={70}
            itemCount={dataList.length}
          >
            {showComp}
          </List>
          :
          <Skeleton active />
      }
    </div>
  );
};

export default Main;
