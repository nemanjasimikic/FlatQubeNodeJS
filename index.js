const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')

const port = 3000
const liveApiUrl = 'https://ton-swap-indexer.broxus.com/v1'
const testApiUrl = 'https://ton-swap-indexer-test.broxus.com/v1'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

//#region CMC
  // Get dex pools info.
  app.get('/cmc/dex', (req, res) => { 
        axios({
            method: 'get',
            url: liveApiUrl + '/cmc/dex'
          })
        .then(function (response) {
            res.send(response.data)
        })
        .catch(function(error){
            console.error(error)
            res.send('Error')
        })
  })

  // Get farming pools info.
  app.get('/cmc/farming', (req, res) => { 
    axios({
        method: 'get',
        url: liveApiUrl + '/cmc/farming'
      })
    .then(function (response) {
        res.send(response.data)
    })
    .catch(function(error){
        console.error(error)
        res.send('Error')
    })
})
//#endregion

//#region CURRENCIES
  // Get currency data info by token root address.
  app.post('/currencies/:currencies', (req, res) => {
        console.log(`Method params: ${req.params.currencies}`)

        axios({
            method: 'post',
            url: `${liveApiUrl}/currencies/${req.params.currencies}`
          })
        .then(function(response){
            res.send(response.data)
        })
        .catch(function(error){
            console.error(error)
            res.send('Error')
        })
  })
  
  // Get currencies prices by token root address.
  app.post('/currencies_usdt_prices', (req, res) => {
        console.log(`Request body data: ${req.body.currency_addresses}`)

        axios({
            method: 'post',
            url: `${liveApiUrl}/currencies_usdt_prices`,
            data: {
                currency_addresses: req.body.currency_addresses
              }
            })
        .then(function(response){
            res.send(response.data)
        })
        .catch(function(error){
            console.error(error)
            res.send('Error')
        })
  })

  // Get currency data info.
    // PAYLOAD EXAMPLE
    //   {
    //     "currency_addresses": [
    //       "0:f2679d80b682974e065e03bf42bbee285ce7c587eb153b41d761ebfd954c45e1"
    //     ],
    //     "limit": 0,
    //     "offset": 0,
    //     "ordering": "tvlascending",
    //     "whiteListUri": "https://raw.githubusercontent.com/broxus/ton-assets/master/manifest.json"
    //   }
  app.post('/currencies', (req, res) => {
    console.log(`Request body data: ${req.body.currency_addresses}`)

    axios({
        method: 'post',
        url: `${liveApiUrl}/currencies`,
        data: {
            currency_addresses: req.body.currency_addresses,
            limit: req.body.limit,
            offset: req.body.offset,
            ordering: req.body.ordering,
            whiteListUri: req.body.whiteListUri
          }
        })
    .then(function(response){
        res.send(response.data)
    })
    .catch(function(error){
        console.error(error)
        res.send('Error')
    })
  })

  // Get currency price data info.
  app.post('/currencies/:currencies/prices', (req, res) => {
    console.log(`Request paramas: ${req.params.currencies}`)

    axios({
        method: 'post',
        url: `${liveApiUrl}/currencies/${req.params.currencies}/prices`,
        data: {
            from: req.body.from,
            timeframe: req.body.timeframe,
            to: req.body.to
          }
        })
    .then(function(response){
        res.send(response.data)
    })
    .catch(function(error){
        console.error(error)
        res.send('Error')
    })
  })

  // Get currency volume data info.
  app.post('/currencies/:currencies/volume', (req, res) => {
    console.log(`Request paramas: ${req.params.currencies}`)

    axios({
        method: 'post',
        url: `${liveApiUrl}/currencies/${req.params.currencies}/volume`,
        data: {
            from: req.body.from,
            timeframe: req.body.timeframe,
            to: req.body.to
          }
        })
    .then(function(response){
        res.send(response.data)
    })
    .catch(function(error){
        console.error(error)
        res.send('Error')
    })
  })

  // Get currency tvl data info.
  app.post('/currencies/:currencies/tvl', (req, res) => {
    console.log(`Request paramas: ${req.params.currencies}`)

    axios({
        method: 'post',
        url: `${liveApiUrl}/currencies/${req.params.currencies}/tvl`,
        data: {
            from: req.body.from,
            timeframe: req.body.timeframe,
            to: req.body.to
          }
        })
    .then(function(response){
        res.send(response.data)
    })
    .catch(function(error){
        console.error(error)
        res.send('Error')
    })
  })
  //#endregion

//#region MAIN
   // Get main volume data info.
  app.post('/main/volume', (req, res) => {

        axios({
            method: 'post',
            url: `${liveApiUrl}/main/volume`,
            data: {
                from: req.body.from,
                timeframe: req.body.timeframe,
                to: req.body.to,
            }

        })
        .then(function(response){
            res.send(response.data)
        })
        .catch(function(error){
            console.error(error)
            res.send('Error')
        })
  })
  
  // Get main tvl data info.
  app.post('/main/tvl', (req, res) => {

    axios({
        method: 'post',
        url: `${liveApiUrl}/main/tvl`,
        data: {
            from: req.body.from,
            timeframe: req.body.timeframe,
            to: req.body.to,
        }
    })
    .then(function(response){
        res.send(response.data)
    })
    .catch(function(error){
        console.error(error)
        res.send('Error')
    })
  })
//#endregion

//#region PAIRS

  // Get all pairs data
  app.post('/pairs', (req, res) => {

    axios({
        method: 'post',
        url: `${liveApiUrl}/pairs`,
        data: {
            currencyAddress: req.body.currencyAddress,
            currency_addresses: req.body.currency_addresses,
            limit: req.body.limit,
            offset: req.body.offset,
            ordering: req.body.ordering,
            tvlAmountGe: req.body.tvlAmountGe,
            tvlAmountLe: req.body.tvlAmountLe,
            whiteListUri: req.body.whiteListUri
          }
        })
    .then(function(response){
        res.send(response.data)
    })
    .catch(function(error){
        console.error(error)
        res.send('Error')
    })
})

  // Get pair data info by lp address.
  app.post('/pairs/address/:address', (req, res) => {

    axios({
        method: 'post',
        url: `${liveApiUrl}/pairs/address/${req.params.address}`
    })
    .then(function(response){
        res.send(response.data)
    })
    .catch(function(error){
        console.error(error)
        res.send('Error')
    })
  })

  // Get cross pairs data.
  app.post('/pairs/cross_pairs', (req, res) => {

    axios({
        method: 'post',
        url: `${liveApiUrl}/pairs/cross_pairs`,
        data: {
            fromCurrencyAddress: req.body.fromCurrencyAddress,
            toCurrencyAddresses: req.body.toCurrencyAddresses
        }
    })
    .then(function(response){
        res.send(response.data)
    })
    .catch(function(error){
        console.error(error)
        res.send('Error')
    })
  })

  // Get pair data info by token root addresses.
  app.post('/pairs/left/:left/right/:right', (req, res) => {

    axios({
        method: 'post',
        url: `${liveApiUrl}/pairs/left/${req.params.left}/right/${req.params.right}`
    })
    .then(function(response){
        res.send(response.data)
    })
    .catch(function(error){
        console.error(error)
        res.send('Error')
    })
  })

  // Get ohlcv pair data info by token root addresses.
  app.post('/pairs/left/:left/right/:right/ohlcv', (req, res) => {

    axios({
        method: 'post',
        url: `${liveApiUrl}/pairs/left/${req.params.left}/right/${req.params.right}/ohlcv`,
        data: {
            from: req.body.from,
            timeframe: req.body.timeframe,
            to: req.body.to
        }
    })
    .then(function(response){
        res.send(response.data)
    })
    .catch(function(error){
        console.error(error)
        res.send('Error')
    })
  })

  // Get ohlcv pair data info by lp address.
    // PAYLOAD EXAMPLE
    // localhost:3000/pairs/address/0:83b88abbcd562c8d8dc4cab30ec1ded86a4ded99000ca02425715e5cec754f06/ohlcv
    // from: 1646741858511
    // timeframe: "H1"
    // to: 1647346658513
  app.post('/pairs/address/:address/ohlcv', (req, res) => {
    console.log(`Request params: ${req.params.address}`)

    axios({
        method: 'post',
        url: `${liveApiUrl}/pairs/address/${req.params.address}/ohlcv`,
        data: {
            from: req.body.from,
            timeframe: req.body.timeframe,
            to: req.body.to
          }
        })
    .then(function(response){
        res.send(response.data)
    })
    .catch(function(error){
        console.error(error)
        res.send('Error')
    })
  })

  // Get pair volume data info.
  app.post('/pairs/address/:address/volume', (req, res) => {

    axios({
        method: 'post',
        url: `${liveApiUrl}/pairs/address/${req.params.address}/volume`,
        data: {
            from: req.body.from,
            timeframe: req.body.timeframe,
            to: req.body.to
        }
    })
    .then(function(response){
        res.send(response.data)
    })
    .catch(function(error){
        console.error(error)
        res.send('Error')
    })
  })

  
  // Get pair tvl data info.
  app.post('/pairs/address/:address/tvl', (req, res) => {

    axios({
        method: 'post',
        url: `${liveApiUrl}/pairs/address/${req.params.address}/tvl`,
        data: {
            from: req.body.from,
            timeframe: req.body.timeframe,
            to: req.body.to
        }
    })
    .then(function(response){
        res.send(response.data)
    })
    .catch(function(error){
        console.error(error)
        res.send('Error')
    })
  })



//#endregion

//#region TRANSACTIONS

  // Get Transactions data.
  // TODO
  app.post('/transactions', (req, res) => {

    axios({
        method: 'post',
        url: `${liveApiUrl}/transactions`,
        data: {
            createdAtGe: req.body.createdAtGe,
            createdAtLe: req.body.createdAtLe,
            currencyAddress: req.body.currencyAddress,
            currencyAddresses: req.body.currencyAddresses,
            eventType: req.body.eventType,
            leftAmountGe: req.body.leftAmountGe,
            leftAmountLe: req.body.leftAmountLe,
            limit: req.body.limit,
            offset: req.body.offset,
            ordering: req.body.ordering,
            poolAddress: req.body.poolAddress,
            rightAmountGe: req.body.rightAmountGe,
            rightAmountLe: req.body.rightAmountLe,
            timestampBlockGe: req.body.timestampBlockGe,
            timestampBlockLe: req.body.timestampBlockLe,
            tvGe: req.body.tvGe,
            tvLe: req.body.tvLe,
            userAddress: req.body.userAddress,
            whiteListUri: req.body.whiteListUri,
          }
        })
    .then(function(response){
        res.send(response.data)
    })
    .catch(function(error){
        console.error(error)
        res.send('Error')
    })
})
//#endregion