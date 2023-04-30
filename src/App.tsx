import React, { useRef, useState, useEffect, FormEventHandler, } from 'react';
import { Table, Badge, DatePicker, Button, Layout, Menu, theme, AutoComplete, Input, Alert, Typography, Spin } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import type { MenuProps } from 'antd';
import emailjs from '@emailjs/browser';
import {
  AppstoreAddOutlined,
  StarOutlined,
  BookOutlined,
} from '@ant-design/icons';
import './index.css'
const { Title, Text } = Typography;

const labels = ["S.M.A.R.T", "Matrix", "Journal"]

const items: MenuProps['items'] = [
  StarOutlined,
  AppstoreAddOutlined,
  BookOutlined,
].map((icon, index) => ({
  key: String(index),
  icon: React.createElement(icon),
  label: labels[index],
}));

import { useForm, SubmitHandler } from "react-hook-form";

function SmartComponent({ title, description, child }: { title: string, description: string, child: any }) {
  return <div style={{ display: "flex", justifyContent: "space-between", alignItems: "space-between", padding: "0.8rem 0" }}>
    <div style={{ width: "15.75rem" }}>
      <Title level={1} style={{ margin: 0, padding: 0 }}>{title}</Title>
      <Text type="secondary">{description}</Text>
    </div>
    {child}
  </div>
}

function VDivider({ padding }: { padding: string }) {
  return <div style={{ padding }} />
}

function SmartFormPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const form = React.useRef<HTMLFormElement>()
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    setIsSuccess(false)
    setIsLoading(true)
    emailjs.sendForm('service_gs7jdh9', 'template_bkea0fb', form.current, 'NbySbPA3Np5UaJCBA')
      .then((result) => {
        setIsLoading(false)
        setIsSuccess(true)
        console.log('result: ', result)
      }, (error) => {
        setIsLoading(false)
        setError("There is an error with creating your goals. Please try again later.")
        console.log(error.text);
      });
  }

  return (
    <>
      {isSuccess && <Alert banner type="success" showIcon closable message="Your SMART goal has been succesfully created!" />}
      {error && <Alert banner type="error" showIcon closable message={error} />}
      <form ref={form} className="formation" style={{ display: "flex", flexDirection: "column", paddingRight: "2rem" }} >
        <SmartComponent title="Specific" description="What exactly are you trying to achieve?" child={<textarea rows={10} cols={60} style={{ padding: "0.8rem 0 0 0.4rem", borderRadius: "0.4rem", border: "1px solid lightgray" }} {...register("specific")} />} />
        <SmartComponent title="Measurable" description="How will you know when you've achieved it?" child={<textarea rows={10} cols={60} style={{ padding: "0.8rem 0 0 0.4rem", borderRadius: "0.4rem", border: "1px solid lightgray" }} {...register("measurable")} />} />
        <SmartComponent title="Actionable" description="Is it genuinely possible to achieve it?" child={<textarea rows={10} cols={60} style={{ padding: "0.8rem 0 0 0.4rem", borderRadius: "0.4rem", border: "1px solid lightgray" }} {...register("actionable")} />} />
        <SmartComponent title="Relevant" description="Is it relevant to anything in your life?" child={<textarea rows={10} cols={60} style={{ padding: "0.8rem 0 0 0.4rem", borderRadius: "0.4rem", border: "1px solid lightgray" }} {...register("relevant")} />} />
        <VDivider padding={"2rem 0"} />
        <SmartComponent title="Time-bound" description="When do you want to achieve this by?" child={<input type="date" style={{ borderRadius: "0.8rem", border: "1px solid lightgray" }} {...register("timeBound")} />} />
        <VDivider padding={"2rem 0"} />
        <Button disabled={isLoading} type="primary" onClick={handleSubmit(onSubmit)} style={{ width: "8rem", alignSelf: "flex-end" }}>
          Create
        </Button>
      </form>
    </>
  )

}

const App: React.FC = () => {
  const [page, setPage] = useState('0')

  const colorBgContainer = "#F7F7F7"

  // return (<Layout hasSider>
  //   <Sider
  //     style={{
  //       // background: colorBgContainer,
  //       overflow: 'auto',
  //       height: '100vh',
  //       position: 'fixed',
  //       left: 0,
  //       top: 0,
  //       bottom: 0,
  //     }}
  //     collapsible
  //   >
  //     <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
  //     <Menu
  //       theme="light"
  //       mode="inline"
  //       defaultSelectedKeys={[page]}
  //       items={items}
  //       style={{ borderInlineEnd: "none", background: colorBgContainer }}
  //       onClick={(e) => {
  //         setPage(e.key)
  //       }}
  //     />
  //   </Sider>
  //   <Layout className="site-layout" style={{ marginLeft: 200, display: "flex", padding: "3.2rem 4rem", height: "100vh", background: "#FFF" }}>
  //     {/* <Header /> */}
  //     {page === '0' && <SmartFormPage />}
  //     {page === '1' && <h1>Test 1</h1>}
  //     {page === '2' && <h1>Test 2</h1>}
  //   </Layout>
  // </Layout>
  // );

  return <h1 className="text-green-400">Hello World!</h1>
}



export default App;
