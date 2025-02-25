module.exports = {
    name: 'Events Registration',
    publisher: 'Sample',
    cards: [{
        type: 'MyExtensionCard',
        source: './src/cards/MyExtensionCard',
        title: 'Events Registration Card',
        displayCardType: 'Events Registration Card',
        description: 'This is an introductory card to the Ellucian Experience SDK',
        pageRoute: {
            route: '/',
            excludeClickSelectors: ['a']
        }
    }],
    page: {
        source: './src/page/router.jsx'
    }
};