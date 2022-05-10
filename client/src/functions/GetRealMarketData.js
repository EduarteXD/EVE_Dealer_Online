/**
 * @description Fetch the Esi market data into session storage, Should only be used in a PAGE
 * @param setLoading: the hook which controls loading page display
 */
const getRealMarketData = (setLoading) => {
  var storage = window.sessionStorage
  if (storage['MarketData'] === undefined) {
    fetch('api/data/market')
      .then((response) => response.json())
      .then((data) => {
        storage['MarketData'] = JSON.stringify(data)
        // setMarketData(data)
        // hooks.setMarketData(resolveMarket(data))
        // hooks.setMarketRequest(true)
        setLoading(false)
      })
  }
  else {
    setLoading(false)
  }

}

export default getRealMarketData;
