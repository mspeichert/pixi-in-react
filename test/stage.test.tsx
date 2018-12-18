import React from 'react'
// import * as PIXI from 'pixi.js'
import { mount } from 'enzyme'
import { Stage } from '../src'

// let renderMock = jest.fn()
jest.mock('../src/renderer', () => jest.fn())

describe('Stage', () => {
  it('renders canvas element', () => {
    const wrapper = mount(<Stage width={300} height={30} />)
    expect(wrapper.exists('canvas')).toBeTruthy()
  })

  it('renders passed canvas element', () => {
    const canvas = document.createElement('canvas')
    const wrapper = mount(
      <Stage width={300} height={30} options={{ view: canvas }} />
    )
    expect(wrapper.find(canvas)).toBeDefined()
  })

  it('uses render method once on mount', () => {
    const wrapper = mount(<Stage width={300} height={30} />)
    // expect(renderMock).toHaveBeenCalledTimes(1)
  })

  // Since functional components don't have instances, we can't chceck
  // it('renders pixi application with props applied', () => {
  //   const options = {}

  //   const wrapper = mount(<Stage width={300} height={30} options={options} />)

  //   // console.log(wrapper.toJSON())
  // })
})
