import React, { Component } from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";
import store from './utils/store'
import Router from './routes'

// assets
import { imageAssets } from './styles/images'
import { fontAssets } from './styles/fonts'

const persistantStore = store();

class index extends Component {
  state = {
    didLoad: false,
  }

  async componentWillMount() {
    // assets preloading
    await Promise.all([...imageAssets, ...fontAssets])
    this.setState({ didLoad: true })
  }

  render() {
    const { didLoad } = this.state
    if (!didLoad) return <View />

    return (
      <Provider store={persistantStore.store}>
        <PersistGate loading={null} persistor={persistantStore.persistor}>
          <Router />
        </PersistGate>
      </Provider>
    )
  }
}

export default index