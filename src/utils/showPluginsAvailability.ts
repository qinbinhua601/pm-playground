export default function showPluginsAvailability() {
  const plugins = window.view.state.plugins.map((item: any) => item.key)

  const $app = document.getElementById('app')
  if(plugins.includes('fixChromeCompositionKey$')) {
    if ($app !== null) {
      $app.innerText = 'fixChromeComposition'
    }
  }
  
  if (plugins.includes('fixChromeCompositionSolution2Key$')) {
    if ($app !== null) {
      $app.innerText = 'fixChromeComposition2'
    }
  }
}