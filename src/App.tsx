import React, { useState, useEffect } from 'react';
import { Table, Badge } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AutoComplete, Input } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import dataArray from "../db.json"
import './index.css'

interface DataType {
  key: React.Key;
  company: string;
  policy: React.ReactElement;
  notes: string;
  // more: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Company',
    width: 120,
    dataIndex: 'company',
    key: 'company',
    fixed: 'left',
    render: (text, _, index) => {
      return {
        props: {
          style: {
            background: index % 2 === 0 ? '#ffffff' : '#fbfbfb'
          },
        },
        children: <div>{text}</div>
      }
    }
  },
  {
    title: 'Policy',
    width: 100,
    dataIndex: 'policy',
    key: 'policy',
  },
  { title: 'Notes', dataIndex: 'notes', key: 'notes' },
];

const getData = () => {
  const d: DataType[] = []
  for (let i = 0; i < dataArray.length; i++) {
    const curr = dataArray[i]
    d.push({
      key: i,
      company: curr.company,
      policy: <Badge count={curr.policy} style={{ backgroundColor: curr.policy === "RTO" ? "#f5222d" : curr.policy === "Hybrid" ? "#faad14" : '#52c41a' }} />,
      notes: curr.notes,
    })
  }
  return d
}

const App: React.FC = () => <HomePage />


const HomePage = () => {
  const d = getData()
  const cache = [...d]
  const [data, setData] = useState(d)

  const handleSearch = (name: string) => {
    if (name === "") {
      return setData(cache)
    }
    const filteredData = cache.filter((datum: DataType) => datum.company?.toLowerCase().includes(name.toLowerCase()))
    setData(filteredData)
  }

  const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e?.keyCode === 8) {
      const filteredData = cache.filter((datum: DataType) => datum.company?.toLowerCase().includes(name.toLowerCase()))
      setData(filteredData)
    }
  }

  return <div>
    <AutoComplete
      dropdownMatchSelectWidth={252}
      style={{ width: window.innerWidth - 16, margin: '0 0 1rem 0' }}
      // options={options}
      // onSelect={onSelect}
      onSearch={handleSearch}
    >
      <Input.Search size="large" placeholder="Search company name" onKeyDown={handleBackspace} enterButton />
    </AutoComplete>

    <Table
      columns={columns}
      rowClassName={(_, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
      dataSource={data}
      scroll={{ x: window.innerWidth + 100, y: window.innerHeight }}
    />
  </div>
}

export default App;