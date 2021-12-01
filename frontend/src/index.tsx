import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import reportWebVitals from './reportWebVitals';
import {Col, Layout, Row} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";

ReactDOM.render(
  <Layout>
      <Header><h1>Header</h1></Header>
      <Content>
          <Row>
              <Col xs={2} sm={4} md={6} lg={8} xl={8}>

              </Col>
              <Col xs={20} sm={16} md={12} lg={8} xl={8}>
                  <App />
              </Col>
              <Col xs={2} sm={4} md={6} lg={8} xl={8}>

              </Col>
          </Row>
      </Content>
      <Footer>Footer</Footer>
  </Layout>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
