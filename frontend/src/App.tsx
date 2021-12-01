import React from 'react';
import {Button, List, Space} from "antd"
import './App.css';
import {CoffeeOutlined} from "@ant-design/icons";

interface State {
    error: any
    isLoaded: boolean
    products: any[]
}

export class App extends React.Component<any, State> {

    constructor(props: any) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            products: []
        }
    }

    async componentDidMount() {
        try {
            const allProductsReq = await fetch("http://10.0.1.0:8081/smart-coffee-machine/properties/availableProducts")
            const allProd = await allProductsReq.json()
            this.setState({
                isLoaded: true,
                products: allProd
            })
        } catch (error) {
            this.setState({
                isLoaded: false,
                error
            })
        }
    }

    render() {
        const { error, isLoaded, products } = this.state
        if (error) return <div>Error: {error.message}</div>
        if (!isLoaded) return <div>Loading...</div>
        return(
            <List
                itemLayout="horizontal"
                dataSource={products}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<CoffeeOutlined />}
                            title={item.name}
                            description={item.supplier}
                        />
                        <Space>
                            <div>&euro; 0.80</div>
                            <Button type="primary" key={item.id} onClick={App.callback}>Acquista</Button>
                        </Space>
                    </List.Item>
                )}
            />
        )
  }

  private static callback(event: any) {
    console.log(event)
  }
}
