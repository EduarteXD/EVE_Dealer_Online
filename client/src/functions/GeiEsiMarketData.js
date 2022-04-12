import resolveMarket from '../functions/ResolveEsiMarket'

/**
 * @description Fetch the Esi market data into session storage, Should only be used in a PAGE
 * @param setLoading: the hook which controls loading page display
 */
const getEsiMarketData = (setLoading) => {
  var storage = window.sessionStorage
  if (storage['EsiMarketData'] === undefined) {
    fetch('https://esi.evepc.163.com/latest/markets/prices/?datasource=serenity')
      .then((response) => response.json())
      .then((data) => {
        storage['EsiMarketData'] = JSON.stringify(resolveMarket(data))
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

export default getEsiMarketData;
