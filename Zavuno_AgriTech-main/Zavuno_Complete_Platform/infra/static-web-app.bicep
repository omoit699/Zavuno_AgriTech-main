param location string = 'southafricanorth'
param repositoryUrl string = 'https://github.com/omoit699/Zavuno_AgriTech'
param repositoryBranch string = 'main'
param appName string = 'zavuno-agri-tech'

resource staticApp 'Microsoft.Web/staticSites@2024-03-01' = {
  name: appName
  location: location
  sku: {
    name: 'Standard'
    tier: 'Standard'
  }
  properties: {
    repositoryUrl: repositoryUrl
    branch: repositoryBranch
    buildProperties: {
      appLocation: '/'
      apiLocation: ''
      outputLocation: 'dist'
    }
  }
}

output staticAppUrl string = staticApp.properties.defaultHostname
