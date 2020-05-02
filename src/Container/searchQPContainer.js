import React, { Component } from 'react';
import { Card, CardBody, CardFooter } from 'reactstrap'
import { Container, Row, Col } from 'reactstrap'
import FormQP from '../Component/searQPForm.js'
import '../Styles/style.css'

class SearchQP extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      qpData: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(event, query) {
    this.setState({
      loading: true
    })
    event.preventDefault()
    let url = 'https://teamtomato.herokuapp.com/api/v1/question/search?search_str=' + query
    await fetch(url, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
      }
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Network response was not ok.')
    }).then(response => {
      this.setState({
        qpData: response,
        loading: false
      })
      console.log(response)
    })
  }

  render() {
    let QPContainer
    let urls = []
    let urlList = []
    let staffList = []
    let shortFormList = []
    this.state.qpData.forEach(element => {
      staffList.push(element['shortForm'])
      shortFormList.push(element['staff'])
      urlList.push(element['url'])
    });
    console.log(shortFormList, staffList, urlList)
    urls = urlList.map((images, index) => (
      <Col lg={3} md={4} sm={12} key={index} className='cardPadding'>
        <Card>
          <CardBody>
            <img className="img-align" src={images} alt="Card image cap" />
            {/* <img src={images} alt='QP Image' /> */}
          </CardBody>
          <CardFooter>
            Subject | StaffName
                    {/* Need to make it dynamic */}
          </CardFooter>
        </Card>
      </Col>
    ))
    if (this.state.loading === false) {
      QPContainer =
        <Container>
          <Row>
            {urls}
          </Row>
        </Container>
    }
    else {
      QPContainer = <div></div>
    }

    return (
      <div>
        <FormQP handleSubmit={this.handleSubmit.bind(this)} />
        <br />
        {QPContainer}
      </div>
    )
  }
}

export default SearchQP;